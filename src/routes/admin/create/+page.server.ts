import { users } from '../../../db/users';
import db from "../../../db/mongo"
import { redirect } from "@sveltejs/kit";
import type { PageServerLoad } from './$types';
import moment from 'moment-timezone';

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

		let filterDate = new Date(moment.tz(date, "America/Santiago").format());
		let filterPaymentDate = new Date(moment.tz(paymentDate, "America/Santiago").format());		

		// Prevents creating a card in the past
		if (date) {
			
			if (filterDate < new Date(moment.tz(new Date(), "America/Santiago").format())) {
				console.log("No puedes crear una tarjeta para el pasado");		
				return
			}
		}

		// Check if card has associated payment or not
		if(paymentCheckbox){

			await db.collection("payments").insertOne({
				place: place, // Lugar
				title: title, // Título
				date: filterPaymentDate, // Fecha
				dateYM: paymentDate.slice(0,7), // Fecha para filtrar historial
				eventDate: date,
				quota: quota, // Límite de personas
				quotaLeft: quota, // Cupos restantes
				paid: 0,
				players: [], // Lista de jugadores con plan
				paidPlayers: [],
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

						throw redirect (303, '/clases/active/');
		
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

						throw redirect (303, '/matches/active/');
		
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

						throw redirect (303, '/events/active/');
					}

				  })
				.catch(err => {
					console.log("Error getting ObjectId");
					return
				});

		} else {
			// if card doesn't have associated payment

			if(cardType === "trainings"){

				await db.collection(cardType).insertOne({
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

				throw redirect (303, '/clases/active/');

			} else if (cardType === "matches") {

				await db.collection(cardType).insertOne({
					place: place, // Lugar
					title: title, // Título
					date: filterDate, // Fecha
					dateYM: date.slice(0,7), // Fecha para filtrar historial
					quota: quota, // Límite de personas
					quotaLeft: quota, // Cupos restantes
					attendance: 0, // Asistentes
					players: [], // Lista de jugadores con plan
				})

				throw redirect (303, '/matches/active/');

			} else if (cardType === "events") {

				await db.collection(cardType).insertOne({
					place: place, // Lugar
					title: title, // Título
					date: filterDate, // Fecha
					dateYM: date.slice(0,7), // Fecha para filtrar historial
					quota: quota, // Límite de personas
					quotaLeft: quota, // Cupos restantes
					attendance: 0, // Asistentes
					players: [], // Lista de jugadores con plan
				})

				throw redirect (303, '/events/active/');
				
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

				throw redirect (303, '/payments/active/');
				
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