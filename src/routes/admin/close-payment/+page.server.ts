import { users } from '../../../db/users';
import db from "../../../db/mongo"
import type { PageServerLoad } from './$types';
import { redirect } from "@sveltejs/kit";
import { ObjectId } from 'mongodb';

export const actions = {

    ClosePayment: async (event, params) => {
		// Log who deleted the card

		let data = await event.request.formData();
		let toClose = data.get('toClose');		

		if (!ObjectId.isValid(toClose)) {
			return
		}

		//get data
		let dataPayments = await db.collection("payments").find({_id: new ObjectId(toClose) }).toArray();

		const paid = parseInt(dataPayments[0].paid)
		const quota = paid
		const quotaLeft = 0
		const ready = true;

		//update data
		await db.collection("payments").updateOne(
			{ _id: new ObjectId(toClose) },
			{
				$set:{
						quota: quota,
						quotaLeft: quotaLeft,
						paid: paid,
						ready: ready
				}
			}
		);	

		throw redirect (303, '/payments/active/');
			
	}

};

export const load: PageServerLoad = async function({ cookies, locals}) {

	if (!locals.user) {
		throw redirect(302, "/")
	}


	const localsData = locals.user	
	
	let dataUsers = await users.find({ _id: localsData.email }).toArray();

	if (!dataUsers[0].admin) {
		throw redirect(302, "/")
	}

	return{
			user: dataUsers,
	}
};
