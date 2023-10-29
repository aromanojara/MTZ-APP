<script>
	// import Navbar from "../../components/Navbar.svelte";
	import { fade } from "svelte/transition";
	import { onMount } from 'svelte';

	let id = ""
	let test = ""
	
	async function pasteFromClipboard() {
		
		try {
			const text = await navigator.clipboard.readText();
			console.log(text);
			id = text;
		} catch (error) {
			test = error
		}

    }

	let selected;
	let displayCheckboxPayment = true;

	function selection() {
		if (selected === "payments") {
			displayCheckboxPayment = false;
		} else {
			displayCheckboxPayment = true;
		}
	}

</script>

<head>
	<title>Borrar Tarjeta ─ MTZ</title>
</head>

<div class="index">

	<div in:fade style="position: -webkit-sticky; position: sticky; top: 0; background-color: white;">

		<div class="back-container">
			<a href="/admin" class="left-arrow"><i class="fa-solid fa-arrow-left"></i>Volver</a>
		</div>

		<div class="title-container">
			<i class="fa-solid fa-square-minus" style="display: flex; flex-direction: column; justify-content: center; padding-right: 13px; padding-left: 22px; font-size: 24px; font-weight: 600; padding-top: 2px;"></i>
			<p style="font-size: 32px; font-weight: 600; line-height: 39px;">Borrar Tarjeta</p>
		</div>
	
		<div class="form-container">
			<form action="" method="post">
				<div class="form_group">

					<p style="margin-bottom: 6px">Tipo de tarjeta</p>
					<div class="container">
						<select id="deleteType" name="deleteType" bind:value={selected} on:change={() => selection()} class="type" placeholder="Ej: Club Domínica Sport">
							<option value="trainings">Clase</option>
							<option value="matches">Partido</option>
							<option value="events">Evento</option>
							<option value="payments">Pago</option>
						</select>
					</div>

					<p style="margin-bottom: 6px;">Card Id a borrar</p>
					<div class="container">
						<input type="text" id="toDelete" name="toDelete" class="toDelete" placeholder="Ej: 64ac69bae81e11e51673af6d" bind:value={id} required>
						<button class="paste" on:click|preventDefault={pasteFromClipboard}>Pegar</button>
					</div>

					{#if displayCheckboxPayment}
						<div class="checkbox-container">
							<input type="checkbox" id="paymentCheckbox" name="paymentCheckbox" class="paymentCheckbox"> ¿Borrar pago asociado?
						</div>
					{/if}

					<div class="button-container">
						<input type="submit" formaction="?/DeleteCard" value="Borrar tarjeta" class="button-create">
					</div>

				</div>
			</form>
			<textarea name="" id="" bind:value={test} cols="30" rows="10"></textarea>
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
		display: flex;
		justify-content: space-between;
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
		-webkit-appearance: none;
	}

	.paste {
		background: #F1C40F;
		color: white;
		box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.20);
		border-radius: 6px;
		border-color: transparent;
		font-weight: bold;
		-webkit-appearance: none;
	}

	.toDelete {
		background: #ffffff;
		border-radius: 6px;
		width: 80%;
		height: 40px;
		box-sizing: border-box;
		border-color: transparent;
		font-size: 14px;
		padding-left: 10px;
		box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.20);
		-webkit-appearance: none;
	}

	.toDelete:focus, .type:focus {
		outline-style: solid;
		outline-color: #F1C40F;
	}

	.type {
		background: #ffffff;
		border-radius: 6px;
		width: 100%;
		height: 40px;
		box-sizing: border-box;
		border-color: transparent;
		font-size: 14px;
		padding-left: 10px;
		box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.20);
		-webkit-appearance: none;
	}

</style>