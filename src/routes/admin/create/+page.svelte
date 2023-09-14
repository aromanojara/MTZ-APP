<script>
	// import Navbar from "../../components/Navbar.svelte";
	import { fade } from "svelte/transition";

	let selected;
	let displayCheckboxPayment = true;
	let paymentCheckbox = false;

	function selection(params) {
		if (selected === "payments") {
			displayCheckboxPayment = false;
			paymentCheckbox = false;
		} else {
			displayCheckboxPayment = true;
		}
	}
	

</script>

<head>
	<title>Crear Tarjeta ─ MTZ</title>
</head>

<div class="index">

	<div in:fade style="position: -webkit-sticky; position: sticky; top: 0; background-color: white;">

		<div class="back-container">
			<a href="/admin" class="left-arrow"><i class="fa-solid fa-arrow-left"></i>Volver</a>
		</div>

		<div class="title-container">
			<i class="fa-solid fa-square-plus" style="display: flex; flex-direction: column; justify-content: center; padding-right: 13px; padding-left: 22px; font-size: 24px; font-weight: 600; padding-top: 2px;"></i>
			<p style="font-size: 32px; font-weight: 600; line-height: 39px;">Crear Tarjeta</p>
		</div>
		
		<div class="form-container">
			<form action="" method="post">
				<div class="form_group">

					<div class="container">
						<p style="margin-bottom: 6px">Tipo de tarjeta</p>
						<select id="createType" bind:value={selected} on:change={() => selection()} name="createType" class="type" placeholder="Ej: Club Domínica Sport">
							<option value="trainings">Clase</option>
							<option value="matches">Partido</option>
							<option value="events">Evento</option>
							<option value="payments">Pago</option>
						</select>
					</div>

					<div class="container">
						<p style="margin-bottom: 6px">Lugar</p>
						<input type="text" id="place" name="place" class="place" placeholder="Ej: Club Domínica Sport" required>
					</div>

					<div class="container">
						<p style="margin-bottom: 6px">Título</p>
						<input type="text" id="title" name="title" class="title" placeholder="Ej: Entrenamiento 1" required>
					</div>

					<div class="container">
						<p style="margin-bottom: 6px">Fecha</p>
						<input type="datetime-local" id="date" name="date" class="date" required>
					</div>

					<div class="container">
						<p style="margin-bottom: 6px">Límite de asistentes</p>
						<input type="number" id="quota" name="quota" class="quota" placeholder="Ej: 18" required>
					</div>

					{#if displayCheckboxPayment}
						<div class="checkbox-container">
							<input type="checkbox" bind:checked={paymentCheckbox} id="paymentCheckbox" name="paymentCheckbox" class="paymentCheckbox"> ¿Asociar un pago?
						</div>
					{/if}

					{#if paymentCheckbox}
						<div class="container">
							<p style="margin-bottom: 6px">Fecha de Pago</p>
							<input type="datetime-local" id="paymentDate" name="paymentDate" class="paymentDate" required>
						</div>

						<div class="container">
							<p style="margin-bottom: 6px">Valor a pagar</p>
							<input type="number" id="paymentAmount" name="paymentAmount" class="paymentAmount" placeholder="Ej: 7000" required>
						</div>
					{/if}

				</div>

				<div class="button-container">
					<input type="submit" formaction="?/CreateCard" value="Crear tarjeta" class="button-create">
				</div>

			</form>
		</div>

	</div>

</div>


<style>

	.index {
    	display: flex;
		margin: auto;
		justify-content: center;
		flex-direction: column;
	}

	.title-container {
		display: flex;
		flex-direction: row;
		text-align: center;
		margin-bottom: -15px;
	}

	.form-container {
    	display: block;
		padding-left: 1.5rem;
    	padding-right: 1.5rem;
		
	}

	.container {
		width: 100%;
		position: relative;
		background-color: transparent;
		margin: 10px 0;
	}

	.button-container {
		width: 100%;
		background-color: transparent;
		margin: auto;
	}

	.back-container {
		display: flex;
		flex-direction: row;
		text-align: center;
		margin-top: 22px;
		margin-left: 22px;
    	margin-bottom: 0px;
	}

	.left-arrow {
		display: flex;
		flex-direction: row;
		justify-content: center;
		align-items: center;
		gap: 6px;
		font-size: 16px;
		font-weight: 600;
		color: #B54545;
		text-decoration: none;
	}

	.button-create {
		background: #B54545;
		color: white;
		box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
		border-radius: 6px;
		width: 100%;
		height: 40px;
		border-color: transparent;
		font-weight: bold;
		margin-top: 20px;
		margin-bottom: 20px;
	}

	.type, .place, .title, .date, .quota, .paymentDate, .paymentAmount {
		background: #ffffff;
		box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
		border-radius: 6px;
		width: 100%;
		height: 40px;
		box-sizing: border-box;
		border-color: transparent;
		font-size: 14px;
		padding-left: 10px;
		box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.20);
	}

	.type:focus, .place:focus, .title:focus, .date:focus, .quota:focus, .paymentDate:focus, .paymentAmount:focus {
		outline-style: solid;
		outline-color: #F1C40F;
	}

	
	.checkbox-container {
		margin-top: 20px;
	}

</style>