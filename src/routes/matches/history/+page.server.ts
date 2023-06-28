import { matches } from '../../../db/matches';
import type { PageServerLoad } from './$types';
import { redirect } from "@sveltejs/kit";

export const load: PageServerLoad = async function({locals}) {

	if (!locals.user) {
		throw redirect(302, "/")
		
	}
	
	let dataMatches = await matches.find({date: {$lt: new Date()}}).sort({date: -1}).toArray();

	// Formatting Date and Hour
	for (let index = 0; index < dataMatches.length; index++) {
		dataMatches[index].fecha = dataMatches[index].date.toLocaleString("es-CL", {timeZone: 'America/Santiago'}).split(',')[0].replaceAll("-", "/");
		dataMatches[index].hora = dataMatches[index].date.toLocaleString("es-CL", {timeZone: 'America/Santiago'}).split(',')[1].slice(1, -3);
		// Typecasts autogenerated object _id to string
		dataMatches[index]._id = dataMatches[index]._id.toString()
	}	
	
	return{
			matches: dataMatches
	}
}