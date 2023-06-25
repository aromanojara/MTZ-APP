import { redirect } from "@sveltejs/kit";
import { OAuth2Client } from "google-auth-library";
import { SECRET_CLIENT_ID, SECRET_CLIENT_SECRET } from '$env/static/private';


export const actions={
	OAuth2: async({url})=>{
		// const redirectURL = 'http://localhost:5173/oauth';
		const redirectURL = `${url.origin}/oauth`;

		const oAuth2Client = new OAuth2Client(
			SECRET_CLIENT_ID,
			SECRET_CLIENT_SECRET,
			redirectURL
		)

		const authorizeUrl = oAuth2Client.generateAuthUrl({
			access_type: 'offline',
			scope: 'https://www.googleapis.com/auth/userinfo.profile https://www.googleapis.com/auth/userinfo.email openid',
			prompt: 'consent'
		})

		throw redirect(302, authorizeUrl)
	}

	// login: async({url})=> {
	// 	const redirectURL = `${url.origin}/clases/active`;
	// 	// throw redirect(302, redirectURL)
	// }

}