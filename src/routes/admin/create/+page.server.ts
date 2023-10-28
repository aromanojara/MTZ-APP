import { users } from '../../../db/users';
import db from "../../../db/mongo"
import { redirect } from "@sveltejs/kit";
import type { PageServerLoad } from './$types';

export const actions = {

    CreateCard: async (event, params) => {
		// Log who created the card

		let data = await event.request.formData();
		let cardType = data.get('createType');
		let place = data.get('place');
		let title = data.get('title');
		let date = data.get('date');
		let quota = parseInt(data.get('quota'));
		let paymentCheckbox = data.get('paymentCheckbox');
		let paymentDate = data.get('paymentDate');
		let paymentAmount = parseInt(data.get('paymentAmount'));

		let amount = "$" + paymentAmount.toLocaleString('es-CL');

		let filterDate = new Date(new Date(date).toLocaleString("es-CL", {timeZone: 'America/Santiago'}));
		let filterPaymentDate = new Date(new Date(paymentDate).toLocaleString("es-CL", {timeZone: 'America/Santiago'}));

		console.log(date);
		console.log(filterDate);
		
		// Prevents creating a card in the past
		if (date) {
			
			if (filterDate < new Date(new Date().toLocaleString("es-CL", {timeZone: 'America/Santiago'}))) {
				console.log("No puedes crear una tarjeta para el pasado");		
				return
			}
		}
			

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