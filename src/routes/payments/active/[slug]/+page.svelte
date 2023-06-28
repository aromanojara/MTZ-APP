<script lang="ts">
	import { fade } from "svelte/transition";

	export let data;
	$: ({payments} = data);	

	let localsData = data.localsData;
	
	let players = data.payments[0].players
	let paid = parseInt(data.payments[0].paid);
	let name = data.user[0].nombre + " " + data.user[0].apellido
	let joined = data.joined;
	let joinedWaitlist = data.joinedWaitlist;

	let disabled = false;
	function handleClick() {
		disabled = true;
    }

</script>

<head>
	<title>Pago ─ MTZ</title>
</head>

<div class="index">

	<div in:fade style="position: -webkit-sticky; position: sticky; top: 0; background-color: white;">
		
	
		<div class="back-container">
			<a href="/payments/active" class="left-arrow"><i class="fa-solid fa-arrow-left"></i></a>
			<a href="/payments/active" class="left-arrow-text"><p>Volver al listado</p></a>
		</div>
		

		<div class="title-container">
			<i class="fa-solid fa-circle-info" style="display: flex; flex-direction: column; justify-content: center; padding-right: 13px; padding-left: 22px; font-size: 24px; font-weight: 600; line-height: 11px;"></i>
			<p style="font-size: 32px; font-weight: 600; line-height: 39px;">Detalle</p>
		</div>
		
		<div style="display: flex; justify-content: center; padding-bottom: 15px;">
			<!-- Make prettier? -->
			<div class="clases-container" style="cursor: pointer;">
				<div class="clases-place">
					{payments[0].place}
				</div>
				<div class="clases-title">
					{payments[0].title}
				</div>
				<div class="clases-icon-row">
					<div class="clases-icon-row">
						<div class="clases-icon-column-left">
							<i class="fa-solid fa-money-bill-wave"></i> {payments[0].amount}
						</div>
						<div class="clases-icon-column">
							<i class="fa-solid fa-users"></i> {payments[0].quotaLeft} Pendientes
						</div>
						<div class="clases-icon-column-right">
							<i class="fa-solid fa-calendar-days"></i> {payments[0].fecha}
						</div>
					</div>
				</div>
			</div>
		</div>

		<!-- wrapper fixes scroll hiding players card with footer -->
		<div id="wrapper" style="margin-bottom: 66px">

			<!-- Inscritos planes -->

			<div style="display: flex; justify-content: center; padding-bottom: 15px;">
				<div class="clases-container-players">

					<div>
						<p class="players-count">Pagos realizados ({paid}/{payments[0].quota})</p>
					</div>
					
					<!-- wrapper makes div height dynamic -->
					<div id="wrapper">

						{#if paid >= 1}
						<!-- for each player -->
						{#each players as player}
							{#if player.nombre == localsData.name + ' ' + localsData.lastName}
								<div class="name-time-yellow">
									<div style="display: flex; padding-left: 18px;">
										<!-- FIX text-overflow: ellipsis; white-space: nowrap; -->
										<div style="display: flex; align-items: center; margin-right: 12px; text-overflow: ellipsis; white-space: nowrap;">
											<i class="fa-solid fa-user"></i>
										</div>
										<p>{player.nombre}</p>
									</div>
									<div style="padding-right: 18px;">
										<p>{player.fecha}</p>
									</div>
								</div>
							{:else}
								<div class="name-time">
									<div style="display: flex; padding-left: 18px;">
										<!-- FIX text-overflow: ellipsis; white-space: nowrap; -->
										<div style="display: flex; align-items: center; margin-right: 12px; text-overflow: ellipsis; white-space: nowrap;">
											<i class="fa-solid fa-user"></i>
										</div>
										<p>{player.nombre}</p>
									</div>
									<div style="padding-right: 18px;">
										<p>{player.fecha}</p>
									</div>
								</div>
							{/if}
						{/each}
						{:else}
						<!-- display nothing -->
						<div class="name-time-paid"></div>
						{/if}
					</div>

				</div>
			</div>

			<!-- Inscritos planes -->

			<!-- Botones planes -->
			{#if !joinedWaitlist && paid < 18}
				{#if !joined && paid < 18}
					<div id="joinContainer" class="button-container">
						<form method="post" action="?/JoinClass">
							<input type="text" name="name" bind:value={name} hidden>
							<input type="text" name="email" bind:value={localsData.email} hidden>
							<button class="button-join" on:click|once={handleClick} hidden={disabled}>
								Pagué
							</button>
						</form>

					</div>
				{/if}

				{#if joined}
					<div id="dropoutContainer" class="button-container">
						<form method="post" action="?/LeaveClass">
							<input type="text" name="name" bind:value={name} hidden>
							<input type="text" name="email" bind:value={localsData.email} hidden>
							<button class="button-dropout" on:click|once={handleClick} hidden={disabled}>
								Me equivoqué, aún no pago
							</button>
						</form>
					</div>
				{/if}
			{/if}
			<!-- Botones planes -->
		</div>
	</div>


	<div class="icon-bar">
		<a class="inactive" href="/clases/active"><i class="fa-solid fa-volleyball"></i><p>Clases</p></a>
		<a class="active" href="/payments/active"><i class="fa-solid fa-money-bill-wave" style="font-weight: 600;"></i><p>Pagos</p></a>
		<a class="inactive" href="/events/active"><i class="fa-solid fa-calendar-days" style="font-weight: 600;"></i><p>Eventos</p></a>
		<a class="inactive" href="/matches/active"><i class="fa-solid fa-trophy" style="font-weight: 600;"></i><p>Partidos</p></a>
		<a class="inactive" href="/profile"><i class="fa-solid fa-user" style="font-weight: 600;"></i><p>Perfil</p></a>
	</div>

</div>

<style>

	.button-dropout {
		background: white;
		color: #B54545;
		box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
		border-radius: 6px;
		width: 100%;
		height: 40px;
		border-color: #B54545;
		font-weight: bold;
		border-style: solid;
	}

	.button-join {
		background: #B54545;
		color: white;
		box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
		border-radius: 6px;
		width: 100%;
		height: 40px;
		border-color: transparent;
		font-weight: bold;
	}

	.button-container {
		width: 90%;
		background-color: transparent;
		margin: auto;
	}

	.name-time {
		display: flex; 
		justify-content: space-between;
		margin-top: -15px;
		color: #B54545;
		font-weight: bold;
	}

	.name-time-yellow {
		display: flex; 
		justify-content: space-between;
		margin-top: -15px;
		color: #F1C40F;
		font-weight: bold;
	}
	
	.name-time-paid {
		display: flex; 
		justify-content: space-between;
		margin-top: -15px;
		color: #F1C40F;
		font-weight: bold;
	}

	.players-count {
		font-weight: 600;
		font-size: 16px;
		margin-left: 17px;
	}

	.clases-container-players {
		display: flex;
		background-color: #FFFFFF;
		border-radius: 6px;
		filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25));
		width: 90%;
		flex-direction: column;
	}

	.clases-place{
		display: flex;
		margin-right: auto;
		padding-left: 18px;
		font-size: 12px;
	}

	.clases-title {
		display: flex;
		font-weight: 500;
		margin-right: auto;
		padding-left: 18px;
		font-size: 16px;
	}

	.clases-icon-row {
		display: flex;
  		justify-content: space-between;
		width: 100%;
		font-size: 14px;

	}

	.clases-icon-column-left {
		padding-left: 18px;
	}
	
	.clases-icon-column-right {
		padding-right: 18px;
	}

	.clases-container {
		display: flex;
		justify-content: space-evenly;
		align-items: center;
		height: 7rem;
		background-color: #FFFFFF;
		border-radius: 6px;
		filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25));
		width: 90%;
		flex-direction: column;
	}

	

	.index {
    	display: flex;
		margin: auto;
		justify-content: center;
		flex-direction: column;
	}

	.icon-bar {
		position: fixed;
		left: 0;
		bottom: 0;
		width: 100%;
		background-color: #FCFCFC;
		box-shadow: 0px 4px 17px rgba(0, 0, 0, 0.25);
	}

	.icon-bar a {
		float: left; /* Float links side by side */
		text-align: center; /* Center-align text */
		width: 20%; /* Equal width (5 icons with 20% width each = 100%) */
		padding: 12px 0; /* Some top and bottom padding */
		font-size: 24px; /* Increased font size */
		text-decoration: none;
	}

	.active {
		background-color: #FCFCFC; /* Add an active/current color */
		color: #B54545;
	}

	.inactive {
		background-color: #FCFCFC; /* Add an active/current color */
		color: black;
	}

	.icon-bar p {	
		margin-top: 0px;
		margin-bottom: 0px;
		font-size: 12px;
	}

	.title-container {
		display: flex;
		flex-direction: row;
		text-align: center;
		margin-bottom: -15px;
	}

	.back-container {
		display: flex;
		flex-direction: row;
		text-align: center;
		margin-bottom: -30px;
		margin-top: 8px;
	}

	.left-arrow {
		display: flex;
		flex-direction: column;
		justify-content: center;
		padding-right: 8px;
		padding-left: 22px;
		font-size: 24px;
		font-weight: 600;
		line-height: 11px;
		color: #B54545;
		text-decoration: none;
	}

	.left-arrow-text{
		font-size: 16px;
		font-weight: 600;
		line-height: 39px;
		color: #B54545;
		text-decoration: none;
	}

</style>

	
