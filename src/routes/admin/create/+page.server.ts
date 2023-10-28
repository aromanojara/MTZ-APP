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



		// // Genero la fecha de hoy para revisar el timezone actual
		// // Se debe utilizar toLocaleString para agregar timeZone
		// let chileanDate = new Date().toLocaleString("es-CL", {timeZone: 'America/Santiago'})
		// // Para generar un date objetct con el timezone CL se debe tratar el string y dar vuelta el mes y el día, de lo contrario puede generar errores con los meses
		// const [fechaParte, horaParte] = chileanDate.split(', ');
		// const partesFecha = fechaParte.split('-');

		// const dia = partesFecha[0];
		// const mes = partesFecha[1];
		// const año = partesFecha[2];
		// chileanDate = `${mes}-${dia}-${año}, ${horaParte}`;

		// // Se genera el objeto date formateado
		// let chileanDateObj = new Date(chileanDate)

		// // Input datetime-local string to date object
		// let dateObj = new Date(date);
		// let paymentDateObj = new Date(paymentDate);

		// dateObject gets modified by adjusting the minutes and adding the chilean timezone offset
		let filterDate = new Date(moment.tz(date, "America/Santiago").format());
		let filterPaymentDate = new Date(moment.tz(paymentDate, "America/Santiago").format());
		
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