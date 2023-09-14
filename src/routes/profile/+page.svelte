<script lang="ts">
	import { page } from '$app/stores';
    import { loop_guard } from 'svelte/internal';
	import { fade } from "svelte/transition";
    import Navbar from '../../components/Navbar.svelte';

	export let data;
	$: ({user} = data);

	let x = 1;
	let adminPanel;

    function addToCounter() {
		if (x === 5 && data.user[0].admin) {
			adminPanel.click()
		} else if (x === 5 && !data.user[0].admin) {
			x = 1
		} else {
			console.log(x);
			x++;
		}
	}

</script>

<head>
	<title>Perfil ─ MTZ</title>
</head>

<div class="index">
	<div class="title-container">
		<i class="fa-solid fa-user" style="display: flex; flex-direction: column; justify-content: center; padding-right: 13px; padding-left: 22px; font-size: 24px; font-weight: 600; padding-top: 2px;"></i>
		<p style="font-size: 32px; font-weight: 600; line-height: 39px;">Perfil</p>
	</div>
	
	<div in:fade class="form-container">
		<form action="" method="post">
			<div class="form_group">

				<div class="img">
					<img class="img" src="{user[0].foto}" alt="logo.png" referrerpolicy="no-referrer" on:click={addToCounter}/>
					<a href="/admin" bind:this={adminPanel} hidden>a</a>
				</div>

				<div class="name-container">
					<p style="margin-bottom: 6px">Nombre</p>
					<input type="text" id="name" name="name" class="name" value="{user[0].nombre}" disabled>
				</div>
				<div class="lastName-container">
					<p style="margin-bottom: 6px">Apellido</p>
					<input type="text" id="lastName" name="lastName" class="lastName" value="{user[0].apellido}" disabled>
				</div>
				<div class="email-container">
					<p style="margin-bottom: 6px">Email</p>
					<input type="text" id="email" name="email" class="email" value="{user[0]._id}" disabled>
				</div>
			</div>
			<div class="button-container">
				<input type="submit" formaction="?/LogOut" value="Cerrar Sesión" class="button-logout">
			</div>
		</form>
	</div>

	<Navbar selection={"profile"}/>

</div>

<style>

	.img {
		display: flex;
		margin: auto;
		justify-content: center;
		height: 96px;
		width: 96px;
		border-radius: 50%;
		object-fit: contain;
		background: #dfdfdf;
	}

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

	.name-container, .lastName-container, .email-container {
		width: 100%;
		position: relative;
		background-color: transparent;
		margin: 10px 0;
	}

	.button-container {
		width: 90%;
		position: fixed;
		background-color: transparent;
		margin: 10px 0;
		bottom: 80px;
		left: 50%;
    	transform: translateX(-50%);
	}

	.name, .lastName, .email {
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

	.name:focus {
		outline-style: solid;
		outline-color: #F1C40F;
	}

	.lastName:focus {
		outline-style: solid;
		outline-color: #F1C40F;
	}

	.button-logout {
		background: #B54545;
		color: white;
		box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
		border-radius: 6px;
		width: 100%;
		height: 40px;
		border-color: transparent;
		font-weight: bold;
	}


</style>

	
