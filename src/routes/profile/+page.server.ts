import { users } from '../../db/users';
import type { PageServerLoad } from './$types';
import { redirect } from "@sveltejs/kit";

export const actions = {

    LogOut: async (event, params) => {
		
        event.cookies.delete("jwt")

		throw redirect (303, '/');
    }
};

export const load: PageServerLoad = async function({ cookies, locals}) {

	if (!locals.user) {
		throw redirect(302, "/")
		
	}

	const localsData = locals.user
	
	let dataUsers = await users.find({ _id: localsData.email }).toArray();
	
	return{
			users: dataUsers,
	}
};
