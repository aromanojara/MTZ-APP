<script lang="ts">
	import { fade } from "svelte/transition";
    import MainCard from "../../../../components/MainCard.svelte";
    import PlayersList from "../../../../components/PlayersList.svelte";
    import JoinButton from "../../../../components/JoinButton.svelte";
    import LeaveButton from "../../../../components/LeaveButton.svelte";

	export let data;
	$: ({matches} = data);	

	let localsData = data.localsData;
	
	let players = data.matches[0].players
	let picture = data.user[0].foto
	let attendance = parseInt(data.matches[0].attendance);
	let name = data.user[0].nombre + " " + data.user[0].apellido
	let joined = data.joined;

</script>

<head>
	<title>Partido ─ MTZ</title>
</head>

<div class="index">

	<div in:fade style="position: -webkit-sticky; position: sticky; top: 0; background-color: white;">
		
	
		<div class="back-container">
			<a href="/matches/active" class="left-arrow"><i class="fa-solid fa-arrow-left"></i>Volver al listado</a>
		</div>
		

		<div class="title-container">
			<i class="fa-solid fa-circle-info" style="display: flex; flex-direction: column; justify-content: center; padding-right: 13px; padding-left: 22px; font-size: 24px; font-weight: 600; line-height: 11px;"></i>
			<p style="font-size: 32px; font-weight: 600; line-height: 39px;">Detalle</p>
		</div>
		
		<div style="display: flex; justify-content: center; padding-bottom: 15px;">
			<MainCard href="" place={matches[0].place} title={matches[0].title} time={matches[0].hora} quotaLeft={matches[0].quotaLeft} date={matches[0].fecha}/>	
		</div>

		<!-- wrapper fixes scroll hiding players card with footer -->
		<div id="wrapper" style="margin-bottom: 108px">

			<!-- Inscritos -->
			<PlayersList title="Jugadores Inscritos" attendance={attendance} quota={matches[0].quota} players={players} localsData={localsData} />
			<!-- Inscritos -->

			<!-- Botones -->
			{#if attendance < matches[0].quota}
				{#if !joined && attendance < matches[0].quota}
					<JoinButton action="?/JoinClass" name={name} email={localsData.email} picture={picture} />
				{/if}
				{#if joined}
					<LeaveButton action="?/LeaveClass" name={name} email={localsData.email} />
				{/if}
			{/if}
			<!-- Botones -->
		</div>
	</div>


	<div class="icon-bar">
		<a class="inactive" href="/clases/active"><i class="fa-solid fa-volleyball"></i><p>Clases</p></a>
		<a class="inactive" href="/payments/active"><i class="fa-solid fa-money-bill-wave" style="font-weight: 600;"></i><p>Pagos</p></a>
		<a class="inactive" href="/events/active"><i class="fa-solid fa-calendar-days" style="font-weight: 600;"></i><p>Eventos</p></a>
		<a class="active" href="/matches/active"><i class="fa-solid fa-trophy" style="font-weight: 600;"></i><p>Partidos</p></a>
		<a class="inactive" href="/profile"><i class="fa-solid fa-user" style="font-weight: 600;"></i><p>Perfil</p></a>
	</div>

</div>

<style>

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

</style>

	
