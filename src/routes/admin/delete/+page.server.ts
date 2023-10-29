import { users } from '../../../db/users';
import db from "../../../db/mongo"
import type { PageServerLoad } from './$types';
import { redirect } from "@sveltejs/kit";
import { ObjectId } from 'mongodb';

export const actions = {

    DeleteCard: async (event, params) => {
		// Log who deleted the card

		let data = await event.request.formData();
		let cardType = data.get('deleteType');
		let toDelete = data.get('toDelete');		
		let paymentCheckbox = data.get('paymentCheckbox');

		if (!ObjectId.isValid(toDelete)) {
			return
		}

		if(cardType === "trainings"){

			if (paymentCheckbox) {
				let info = await db.collection(cardType).find({_id: new ObjectId(toDelete) }).toArray();
				let paymentId = info[0].paymentId

				if (paymentId) {
					await db.collection("payments").deleteOne({
						_id: new ObjectId(paymentId)
					});
				} else {
					console.log("No payment associated");
				}
			}

			await db.collection(cardType).deleteOne({
				_id: new ObjectId(toDelete)
			}).then(result => {
				console.log(result.deletedCount);
				if (result.deletedCount == 0) {
					return
				}				
			})
			.catch(err => {
				console.log("Error deleting ObjectId");
				return
			});

			throw redirect (303, '/clases/active/');

		} else if (cardType === "matches") {

			if (paymentCheckbox) {
				let info = await db.collection(cardType).find({_id: new ObjectId(toDelete) }).toArray();
				let paymentId = info[0].paymentId

				if (paymentId) {
					await db.collection("payments").deleteOne({
						_id: new ObjectId(paymentId)
					});
				} else {
					console.log("No payment associated");
				}
			}

			await db.collection(cardType).deleteOne({
				_id: new ObjectId(toDelete)
			});

			throw redirect (303, '/matches/active/');

		} else if (cardType === "events") {

			if (paymentCheckbox) {
				let info = await db.collection(cardType).find({_id: new ObjectId(toDelete) }).toArray();
				let paymentId = info[0].paymentId

				if (paymentId) {
					await db.collection("payments").deleteOne({
						_id: new ObjectId(paymentId)
					});
				} else {
					console.log("No payment associated");
				}
			}

			await db.collection(cardType).deleteOne({
				_id: new ObjectId(toDelete)
			});
			
			throw redirect (303, '/events/active/');

		} else if (cardType === "payments") {

			await db.collection(cardType).deleteOne({
				_id: new ObjectId(toDelete)
			});

			throw redirect (303, '/payments/active/');
			
		}
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
