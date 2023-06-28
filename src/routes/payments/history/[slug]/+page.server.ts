import { users } from '../../../../db/users';
import { trainings } from '../../../../db/trainings';
import type { PageServerLoad } from './$types';
import { ObjectId } from 'mongodb';
import { redirect } from "@sveltejs/kit";
import { payments } from '../../../../db/payments';

export const load: PageServerLoad = async function({ params, cookies, locals }) {
	
	if (!locals.user) {
		throw redirect(302, "/")
		
	}
	
	const localsData = locals.user

	let dataPayments = await payments.find({_id: new ObjectId(params.slug) }).toArray();
	// Formatting Date and Hour
	
	dataPayments[0].fecha = dataPayments[0].date.toLocaleString("es-CL", {timeZone: 'America/Santiago'}).split(',')[0].replaceAll("-", "/");
	dataPayments[0].hora = dataPayments[0].date.toLocaleString("es-CL", {timeZone: 'America/Santiago'}).split(',')[1].slice(1, -3);	

	// Typecasts autogenerated object _id to string
	dataPayments[0]._id = dataPayments[0]._id.toString()
		
	return{
			payments: dataPayments,
			localsData: localsData
	}
}
