import { users } from '../../../../db/users';
import { trainings } from '../../../../db/trainings';
import type { PageServerLoad } from './$types';
import { ObjectId } from 'mongodb';
import { redirect } from "@sveltejs/kit";
import { payments } from '../../../../db/payments';


export const actions = {

    Paid: async (event, params) => {
		
        const data = await event.request.formData();
		const name = data.get('name');
		const email = data.get('email');
		const picture = data.get('picture');

		let dataPayments = await payments.find({_id: new ObjectId(event.params.slug) }).toArray();

		const quota = parseInt(dataPayments[0].quota);
		const quotaLeft = parseInt(dataPayments[0].quotaLeft) - 1;
		const paid = parseInt(dataPayments[0].paid) + 1;
		
		let date = new Date().toLocaleString("es-CL", {timeZone: 'America/Santiago'})
		const dia = date.substring(0, 5);
		const formattedDia = dia.replace("-", "/");
		const hora = date.substring(12, 17);
		const fullDate = formattedDia + " " + hora
		
		const eventDate = dataPayments[0].eventDate
		console.log(eventDate);
		
		// set ready:ready 

		if (quota == paid && eventDate < new Date()) {
			const ready = true;
			await payments.updateOne(
				{ _id: new ObjectId(event.params.slug) },
				{
					$set:{
							quotaLeft: quotaLeft,
							paid: paid,
							ready: ready
					},
					$push: { 
							paidPlayers: {nombre: name, fecha: fullDate, email: email, picture: picture, sortDate: new Date()}
					},
					$pull: { 'players': { email: email }
					},
				}
			);	
			
			throw redirect (303, '/payments/history/'+event.params.slug+'');

		} else {
			
			await payments.updateOne(
				{ _id: new ObjectId(event.params.slug) },
				{
					$set:{
							quotaLeft: quotaLeft,
							paid: paid
					},
					$push: { 
						paidPlayers: {nombre: name, fecha: fullDate, email: email, picture: picture, sortDate: new Date()}
					},
					$pull: { 'players': { email: email }
					},
				}
			);	
			
			throw redirect (303, '/payments/active/'+event.params.slug+'');
		}
    },

	NotPaid: async (event, params) => {
		
		const data = await event.request.formData();
		const name = data.get('name');
		const email = data.get('email');
		const picture = data.get('picture');

		let dataPayments = await payments.find({_id: new ObjectId(event.params.slug) }).toArray();

		const quotaLeft = parseInt(dataPayments[0].quotaLeft) + 1;
		const paid = parseInt(dataPayments[0].paid) - 1;

		let date = new Date().toLocaleString("es-CL", {timeZone: 'America/Santiago'})
		const dia = date.substring(0, 5);
		const formattedDia = dia.replace("-", "/");
		const hora = date.substring(12, 17);
		const fullDate = formattedDia + " " + hora

		await payments.updateOne(
			{ _id: new ObjectId(event.params.slug) },
			{ 
				$pull: { 'paidPlayers': { email: email } 
				},
				$set:{
					quotaLeft: quotaLeft,
					paid: paid	
				},
				$push: { 
					players: {nombre: name, fecha: fullDate, email: email, picture: picture, sortDate: new Date()}
				},
			}
		);
		
		throw redirect (303, '/payments/active/'+event.params.slug+'');
		
    }

};

export const load: PageServerLoad = async function({ params, cookies, locals }) {
	
	if (!locals.user) {
		throw redirect(302, "/")
		
	}

	const localsData = locals.user
	let joined = false;
	let joinedDicom = false;
	let dataUser = await users.find({ _id: localsData.email }).toArray();

	let dataPayments = await payments.find({_id: new ObjectId(params.slug) }).toArray();
	// Formatting Date and Hour
	
	dataPayments[0].fecha = dataPayments[0].date.toLocaleString("es-CL", {timeZone: 'America/Santiago'}).split(',')[0].replaceAll("-", "/");
	dataPayments[0].hora = dataPayments[0].date.toLocaleString("es-CL", {timeZone: 'America/Santiago'}).split(',')[1].slice(1, -3);	

	// Typecasts autogenerated object _id to string
	dataPayments[0]._id = dataPayments[0]._id.toString()
	

	// Sort players by joined Date
	const sortedPlayers = dataPayments[0].players.sort(
		(objA, objB) => Number(objA.sortDate) - Number(objB.sortDate),
	  );

	// Replace with sorted dict
	dataPayments[0].players = sortedPlayers


	if (dataPayments[0].paidPlayers) {
		// Sort paidPlayers by joined Date
		const sortedPaidPlayers = dataPayments[0].paidPlayers.sort(
			(objA, objB) => Number(objA.sortDate) - Number(objB.sortDate),
		);

		// Replace with sorted dict
		dataPayments[0].paidPlayers = sortedPaidPlayers
	}

	
	// Check if player joined main list
	if (dataPayments[0].players.length >= 1) {
		for (let index = 0; index <= dataPayments[0].players.length; index++){
			// Check with email
			try {
				if (dataPayments[0].players[index].email == localsData.email) {
					joined = true;
					joinedDicom = true;
					break
				}
			} catch (error) {
				joined = false;
			}	
		} 
	} else if (dataPayments[0].paidPlayers.length >= 1) {
		for (let index = 0; index <= dataPayments[0].paidPlayers.length; index++){
			// Check with email
			try {
				if (dataPayments[0].paidPlayers[index].email == localsData.email) {
					joined = true;
					joinedDicom = false;
					break
				}
			} catch (error) {
				joined = false;
			}	
		} 
	} else {
		joined = false;
		joinedDicom = false;
	}
		

	
		
	return{
			user: dataUser,
			payments: dataPayments,
			joined: joined,
			localsData: localsData,
			joinedDicom: joinedDicom
	}
}

