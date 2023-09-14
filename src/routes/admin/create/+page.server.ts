import { users } from '../../../db/users';
import { trainings } from '../../../db/trainings';
import { matches } from '../../../db/matches';
import { events } from '../../../db/events';
import { payments } from '../../../db/payments';
import type { PageServerLoad } from './$types';

export const actions = {

    CreateCard: async (event, params) => {
		// Log who created the card
    }
};

export const load: PageServerLoad = async function({cookies, locals, request}) {
	
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
}