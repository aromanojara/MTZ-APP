import { users } from '../../../../db/users';
import { matches } from '../../../../db/matches';
import { payments } from '../../../../db/payments.js';
import type { PageServerLoad } from './$types';
import { ObjectId } from 'mongodb';
import { redirect } from "@sveltejs/kit";


export const actions = {

    JoinClass: async (event, params) => {
		
        const data = await event.request.formData();
		const name = data.get('name');
		const email = data.get('email');
		const picture = data.get('picture');

		let dataMatches = await matches.find({_id: new ObjectId(event.params.slug) }).toArray();

		const quotaLeft = parseInt(dataMatches[0].quotaLeft) - 1;
		const attendance = parseInt(dataMatches[0].attendance) + 1;	
		let date = new Date().toLocaleString("es-CL", {timeZone: 'America/Santiago'})
		const dia = date.substring(0, 5);
		const formattedDia = dia.replace("-", "/");
		const hora = date.substring(12, 17);
		const fullDate = formattedDia + " " + hora

		const paymentId = dataMatches[0].paymentId;

		await matches.updateOne(
			{ _id: new ObjectId(event.params.slug) },
			{
				$set:{
						quotaLeft: quotaLeft,
						attendance: attendance
				},
				$push: { 
						players: {nombre: name, fecha: fullDate, email: email, picture: picture, sortDate: new Date()}
					},
			}
		);

		if (paymentId){

			await payments.updateOne(
				{ _id: new ObjectId(paymentId) },
				{
					$inc:{
							quota: 1,
							quotaLeft: 1,
					},
					$push: { 
							players: {nombre: name, fecha: fullDate, email: email, picture: picture, sortDate: new Date()}
					},
				}
			);	

		}

		throw redirect (303, '/matches/active/'+event.params.slug+'');
		
    },

	LeaveClass: async (event, params) => {
		
		const data = await event.request.formData();
		const name = data.get('name');
		const email = data.get('email');
		const picture = data.get('picture');

		let dataMatches = await matches.find({_id: new ObjectId(event.params.slug) }).toArray();

		const quotaLeft = parseInt(dataMatches[0].quotaLeft) + 1;
		const attendance = parseInt(dataMatches[0].attendance) - 1;

		let date = new Date().toLocaleString("es-CL", {timeZone: 'America/Santiago'})
		const dia = date.substring(0, 5);
		const formattedDia = dia.replace("-", "/");
		const hora = date.substring(12, 17);
		const fullDate = formattedDia + " " + hora

		const paymentId = dataMatches[0].paymentId;

		await matches.updateOne(
			{ _id: new ObjectId(event.params.slug) },
			{ 
				$pull: { 'players': { email: email } },
				$set:{
					quotaLeft: quotaLeft,
					attendance: attendance	
				}
			}
		);	
		
		// TODO:
		// Check if -1 quota left makes ready = true
		if (paymentId){

			let inPlayerList = true
			let dataPayments = await payments.find({_id: new ObjectId(paymentId)}).toArray();
			
			if (dataPayments[0].paidPlayers.length >= 1) {
				for (let index = 0; index < dataPayments[0].paidPlayers.length; index++) {
					if (dataPayments[0].paidPlayers[index].email == email) {
						inPlayerList = false
					}
				}
			}
			
			if (inPlayerList) {
				
				await payments.updateOne(
					{ _id: new ObjectId(paymentId) },
					{
						$inc:{
								quota: -1,
								quotaLeft: -1,
						},
						$pull: { 'players': { email: email } }
					}
				);	

			} else {
				
				await payments.updateOne(
					{ _id: new ObjectId(paymentId) },
					{
						$inc:{
								quota: -1,
								paid: -1,
						},
						$pull: { 'paidPlayers': { email: email } }
					}
				);

			}	

		}
		
		throw redirect (303, '/matches/active/'+event.params.slug+'');
		
    },

	JoinClassWaitList: async (event, params) => {
		
        const data = await event.request.formData();
		const name = data.get('name');
		const email = data.get('email');
		const picture = data.get('picture');

		// let dataTrainings = await trainings.find({_id: new ObjectId(event.params.slug) }).toArray();
		// const quotaLeft = parseInt(dataTrainings[0].quotaLeft) - 1;
		// const attendance = parseInt(dataTrainings[0].attendance) + 1;
		
		let date = new Date().toLocaleString("es-CL", {timeZone: 'America/Santiago'})
		const dia = date.substring(0, 5);
		const formattedDia = dia.replace("-", "/");
		const hora = date.substring(12, 17);
		const fullDate = formattedDia + " " + hora
		
		await matches.updateOne(
			{ _id: new ObjectId(event.params.slug) },
			{
				$push: { 
						playersWaitList: {nombre: name, fecha: fullDate, email: email, picture: picture, sortDate: new Date()}
					},
			}
		);	
		
		throw redirect (303, '/matches/active/'+event.params.slug+'');
		
    },

	LeaveClassWaitList: async (event, params) => {
		
		const data = await event.request.formData();
		const name = data.get('name');
		const email = data.get('email');

		// let dataTrainings = await trainings.find({_id: new ObjectId(event.params.slug) }).toArray();

		// const quota = parseInt(dataTrainings[0].quota) + 1;
		// const attendance = parseInt(dataTrainings[0].attendance) - 1;	

		await matches.updateOne(
			{ _id: new ObjectId(event.params.slug) },
			{ 
				$pull: { 'playersWaitList': { email: email } }
			}
		);	
		
		throw redirect (303, '/matches/active/'+event.params.slug+'');
		
    }
};

export const load: PageServerLoad = async function({ params, cookies, locals }) {
	
	if (!locals.user) {
		throw redirect(302, "/")
		
	}

	const localsData = locals.user
	let joined = false;
	let joinedWaitlist = false;
	let dataUser = await users.find({ _id: localsData.email }).toArray();

	let dataMatches = await matches.find({_id: new ObjectId(params.slug) }).toArray();
	// Formatting Date and Hour	
	
	dataMatches[0].fecha = dataMatches[0].date.toLocaleString("es-CL", {timeZone: 'America/Santiago'}).split(',')[0].replaceAll("-", "/");
	dataMatches[0].hora = dataMatches[0].date.toLocaleString("es-CL", {timeZone: 'America/Santiago'}).split(',')[1].slice(1, -3);	

	// Typecasts autogenerated object _id to string
	dataMatches[0]._id = dataMatches[0]._id.toString()
	

	// Sort players by joined Date
	const sortedPlayers = dataMatches[0].players.sort(
		(objA, objB) => Number(objA.sortDate) - Number(objB.sortDate),
	  );

	// Replace with sorted dict
	dataMatches[0].players = sortedPlayers

	if (typeof dataMatches[0].playersWaitList == 'undefined') {
		dataMatches[0].playersWaitList = []		
	}

	// Sort wait list players by joined Date
	const sortedPlayersWaitList = dataMatches[0].playersWaitList.sort(
		(objA, objB) => Number(objA.sortDate) - Number(objB.sortDate),
		);

	// Replace with sorted dict
	dataMatches[0].playersWaitList = sortedPlayersWaitList
	
	// Check if player joined main list
	if (dataMatches[0].players.length >= 1) {
		for (let index = 0; index <= dataMatches[0].players.length; index++){
		
			// Check with email
			try {
				if (dataMatches[0].players[index].email == localsData.email) {
					joined = true;
					break
				}
			} catch (error) {
				joined = false;
			}
				
		} 

	} else {
		joined = false;
	}

	// Check if player joined wait list only if not in main list
	if (joined == false) {
		if (dataMatches[0].playersWaitList.length >= 1) {
			
			for (let index = 0; index <= dataMatches[0].playersWaitList.length; index++){
			
				// Check with email
				try {
					if (dataMatches[0].playersWaitList[index].email == localsData.email) {
						joinedWaitlist = true;						
						break
					}
				} catch (error) {
					joinedWaitlist = false;
				}
					
			}
		} else {
			joinedWaitlist = false;
		}
	}
		
	return{
			user: dataUser,
			matches: dataMatches,
			joined: joined,
			joinedWaitlist: joinedWaitlist,
			localsData: localsData
	}
}

