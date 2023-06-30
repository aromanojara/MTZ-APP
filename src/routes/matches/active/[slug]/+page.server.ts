import { users } from '../../../../db/users';
import { matches } from '../../../../db/matches';
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
		
		throw redirect (303, '/matches/active/'+event.params.slug+'');
		
    },

	LeaveClass: async (event, params) => {
		
		const data = await event.request.formData();
		const name = data.get('name');
		const email = data.get('email');

		let dataMatches = await matches.find({_id: new ObjectId(event.params.slug) }).toArray();

		const quotaLeft = parseInt(dataMatches[0].quotaLeft) + 1;
		const attendance = parseInt(dataMatches[0].attendance) - 1;	

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
		
	return{
			user: dataUser,
			matches: dataMatches,
			joined: joined,
			joinedWaitlist: joinedWaitlist,
			localsData: localsData
	}
}
