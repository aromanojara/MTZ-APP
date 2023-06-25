import { start_mongo } from "./db/mongo";
import jwt_decode  from "jwt-decode";
import { redirect } from "@sveltejs/kit";

start_mongo().then((): void => {
	console.log("Mongo started");
}).catch(e => {console.log("Error")})

export const handle = async ({ event, resolve }) => {
    
    if (!event.cookies.get("jwt")) {
        const response = await resolve(event);
        return response;
    } 

    const idToken = event.cookies.get("jwt")
    var decoded = jwt_decode(idToken);
    
    event.locals.user = {
        name: decoded.given_name,
        lastName: decoded.family_name,
        email: decoded.email
    }

    const response = await resolve(event);    
    return response;
};