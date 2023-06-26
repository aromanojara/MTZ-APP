import { redirect } from "@sveltejs/kit";
import { OAuth2Client } from "google-auth-library";
import { SECRET_CLIENT_ID, SECRET_CLIENT_SECRET } from '$env/static/private';
import { users } from '../../db/users';


async function addUserToMongo(playerData) {
	console.log(playerData);

	await users.insertOne({
		"_id": playerData.email,
		"nombre": playerData.given_name,
		"apellido": playerData.family_name,
		"foto": playerData.picture
	})
	console.log("User Created!");

}

async function getUserFromMongo(playerData) {
	
	await users.updateOne(
		{ _id: playerData.email },
		{
			$set: { 
					// refreshToken: user["refresh_token"],
					nombre: playerData.given_name,
					apellido: playerData.family_name,
					foto: playerData.picture
					},
		}
	);
	console.log("User Updated!");
	
}

async function getUserData(access_token) {

	const response = await fetch(`https://www.googleapis.com/oauth2/v3/userinfo?access_token=${access_token}`);
	//console.log('response',response);
	const data = await response.json();
	//console.log('data',data);

	return data

}

export const GET = async ({url, cookies})=>{

	const redirectURL = `${url.origin}/oauth`;
	const code = await url.searchParams.get('code');

	const oAuth2Client = new OAuth2Client(
		SECRET_CLIENT_ID,
		SECRET_CLIENT_SECRET,
		redirectURL
	)

	const r = await oAuth2Client.getToken(code);
	oAuth2Client.setCredentials(r.tokens);
	const user = oAuth2Client.credentials;
	cookies.set('jwt', user.id_token, {httpOnly: true, maxAge: 60*60*24, sameSite:'strict'})
	// console.log(user);

	const data = await getUserData(user.access_token);

	const dataUser = await users.find({_id: data.email}).toArray();
	//console.log("dataUser", dataUser);

	if(dataUser.length == 0) {
		await addUserToMongo(data)
	} else if (dataUser.length == 1) {
		await getUserFromMongo(dataUser)
	}

	throw redirect (302, '/clases/active');
}