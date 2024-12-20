import { users } from '../../../../db/users';
import { trainings } from '../../../../db/trainings';
import type { PageServerLoad } from './$types';
import { ObjectId } from 'mongodb';
import { redirect } from "@sveltejs/kit";


export const load: PageServerLoad = async function({ params, locals }) {
	if (!locals.user) {
		throw redirect(302, "/")
		
	}

	const localsData = locals.user
	let joined = false;
	let joinedWaitlist = false;
	let dataUser = await users.find({ _id: localsData.email }).toArray();
	
	let dataTrainings = await trainings.find({_id: new ObjectId(params.slug) }).toArray();
	// Formatting Date and Hour
	
	dataTrainings[0].fecha = dataTrainings[0].date.toLocaleString("es-CL", {timeZone: 'America/Santiago', hour12: false}).split(',')[0].replaceAll("-", "/");
	dataTrainings[0].hora = dataTrainings[0].date.toLocaleString("es-CL", {timeZone: 'America/Santiago', hour12: false}).split(',')[1].slice(1, -3);

	// Typecasts autogenerated object _id to string
	dataTrainings[0]._id = dataTrainings[0]._id.toString()

	// Sort players by joined Date
	const sortedPlayers = dataTrainings[0].players.sort(
		(objA, objB) => Number(objA.sortDate) - Number(objB.sortDate),
	  );

	// Replace with sorted dict
	dataTrainings[0].players = sortedPlayers

	// Sort wait list players by joined Date
	const sortedPlayersWaitList = dataTrainings[0].playersWaitList.sort(
		(objA, objB) => Number(objA.sortDate) - Number(objB.sortDate),
		);

	// Replace with sorted dict
	dataTrainings[0].playersWaitList = sortedPlayersWaitList

	// Check if player joined main list
	if (dataTrainings[0].players.length >= 1) {
		for (let index = 0; index <= dataTrainings[0].players.length; index++){
		
			// Check with email
			try {
				if (dataTrainings[0].players[index].email == localsData.email) {
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
		if (dataTrainings[0].playersWaitList.length >= 1) {
			for (let index = 0; index <= dataTrainings[0].playersWaitList.length; index++){
			
				// Check with email
				try {
					if (dataTrainings[0].playersWaitList[index].email == localsData.email) {
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
		trainings: dataTrainings,
		joined: joined,
		joinedWaitlist: joinedWaitlist,
		localsData: localsData
	}
}
