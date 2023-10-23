import { users } from '../../../db/users';
import db from "../../../db/mongo"
import { redirect } from "@sveltejs/kit";
import type { PageServerLoad } from './$types';

export const actions = {

    CreateCard: async (event, params) => {
		// Log who created the card

		const data = await event.request.formData();
		const cardType = data.get('createType');
		const place = data.get('place');
		const title = data.get('title');
		const date = data.get('date') + ":00.000";
		const quota = parseInt(data.get('quota'));
		const paymentCheckbox = data.get('paymentCheckbox');
		const paymentDate = data.get('paymentDate') + ":00.000";
		const paymentAmount = parseInt(data.get('paymentAmount'));
		
		const amount = "$" + paymentAmount.toLocaleString('es-CL')
		const filterDate = new Date(date);
		const filterPaymentDate = new Date(paymentDate);

		// Prevents creating a card in the past
		if (date) {
			
			if (filterDate < new Date()) {
				console.log("No puedes crear una tarjeta para el pasado");		
				return
			}
		}
		
		// Check form data
		console.log(data);		

		console.log(date);
		console.log(filterDate);
		
		

		// Check if card has associated payment or not
		if(paymentCheckbox){

			db.collection("payments").insertOne({
				place: place, // Lugar
				title: title, // Título
				date: filterPaymentDate, // Fecha
				dateYM: paymentDate.slice(0,7), // Fecha para filtrar historial
				quota: quota, // Límite de personas
				quotaLeft: quota, // Cupos restantes
				paid: 0,
				players: [], // Lista de jugadores con plan
				amount: amount,
				ready: false
				})
				.then(result => {					
					let paymentId = result.insertedId.toString();
					
					if(cardType === "trainings"){

						db.collection(cardType).insertOne({
							place: place, // Lugar
							title: title, // Título
							date: filterDate, // Fecha
							dateYM: date.slice(0,7), // Fecha para filtrar historial
							quota: quota, // Límite de personas
							quotaLeft: quota, // Cupos restantes
							attendance: 0, // Asistentes
							players: [], // Lista de jugadores con plan
							playersWaitList: [], // Lista de PDs
							paymentId: paymentId
						})
		
					} else if (cardType === "matches") {
		
						db.collection(cardType).insertOne({
							place: place, // Lugar
							title: title, // Título
							date: filterDate, // Fecha
							dateYM: date.slice(0,7), // Fecha para filtrar historial
							quota: quota, // Límite de personas
							quotaLeft: quota, // Cupos restantes
							attendance: 0, // Asistentes
							players: [], // Lista de jugadores con plan
							paymentId: paymentId
						})
		
					} else if (cardType === "events") {
		
						db.collection(cardType).insertOne({
							place: place, // Lugar
							title: title, // Título
							date: filterDate, // Fecha
							dateYM: date.slice(0,7), // Fecha para filtrar historial
							quota: quota, // Límite de personas
							quotaLeft: quota, // Cupos restantes
							attendance: 0, // Asistentes
							players: [], // Lista de jugadores con plan
							paymentId: paymentId
						})
					}

				  })
				.catch(err => {
					console.log("Error getting ObjectId");
					return
				});

		} else {
			// if card doesn't have associated payment

			if(cardType === "trainings"){

				db.collection(cardType).insertOne({
					place: place, // Lugar
					title: title, // Título
					date: filterDate, // Fecha
					dateYM: date.slice(0,7), // Fecha para filtrar historial
					quota: quota, // Límite de personas
					quotaLeft: quota, // Cupos restantes
					attendance: 0, // Asistentes
					players: [], // Lista de jugadores con plan
					playersWaitList: [] // Lista de PDs
				})

			} else if (cardType === "matches") {

				db.collection(cardType).insertOne({
					place: place, // Lugar
					title: title, // Título
					date: filterDate, // Fecha
					dateYM: date.slice(0,7), // Fecha para filtrar historial
					quota: quota, // Límite de personas
					quotaLeft: quota, // Cupos restantes
					attendance: 0, // Asistentes
					players: [], // Lista de jugadores con plan
				})

			} else if (cardType === "events") {

				db.collection(cardType).insertOne({
					place: place, // Lugar
					title: title, // Título
					date: filterDate, // Fecha
					dateYM: date.slice(0,7), // Fecha para filtrar historial
					quota: quota, // Límite de personas
					quotaLeft: quota, // Cupos restantes
					attendance: 0, // Asistentes
					players: [], // Lista de jugadores con plan
				})
				
			} else if (cardType === "payments") {

				db.collection(cardType).insertOne({
					place: place, // Lugar
					title: title, // Título
					date: filterPaymentDate, // Fecha
					dateYM: paymentDate.slice(0,7), // Fecha para filtrar historial
					quota: quota, // Límite de personas
					quotaLeft: quota, // Cupos restantes
					paid: 0,
					players: [], // Lista de jugadores con plan
					amount: amount,
					ready: false
				})
				
			}
			
		}

    }
};

export const load: PageServerLoad = async function({cookies, locals, request}) {
	
	// if (!locals.user) {
	// 	throw redirect(302, "/")
	// }

	// const localsData = locals.user
	
	// let dataUsers = await users.find({ _id: localsData.email }).toArray();

	// if (!dataUsers[0].admin) {
	// 	throw redirect(302, "/")
	// }

	// return{
	// 		user: dataUsers,
	// }
}