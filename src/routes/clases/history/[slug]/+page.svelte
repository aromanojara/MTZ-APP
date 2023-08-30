<script lang="ts">
    import { loop_guard } from 'svelte/internal';
	import { fade } from "svelte/transition";
    import MainCard from '../../../../components/MainCard.svelte';
    import PlayersList from '../../../../components/PlayersList.svelte';
    import WaitListPlayersList from '../../../../components/WaitListPlayersList.svelte';

	export let data;
	$: ({trainings} = data);
	// console.log($page.data);	
	let localsData = data.localsData;
	let players = data.trainings[0].players;
	let playersWaitList = data.trainings[0].playersWaitList
	let attendance = parseInt(data.trainings[0].attendance);

</script>

<head>
	<title>Historial ─ MTZ</title>
</head>

<div class="index">

	<div in:fade style="position: -webkit-sticky; position: sticky; top: 0; background-color: white;">
			
		<div class="back-container">
			<a href="/clases/history" class="left-arrow"><i class="fa-solid fa-arrow-left"></i>Volver al listado</a>
		</div>
		
		<div class="title-container">
			<i class="fa-solid fa-circle-info" style="display: flex; flex-direction: column; justify-content: center; padding-right: 13px; padding-left: 22px; font-size: 24px; font-weight: 600; line-height: 11px;"></i>
			<p style="font-size: 32px; font-weight: 600; line-height: 39px;">Detalle</p>
		</div>
		
		<div style="display: flex; justify-content: center; padding-bottom: 15px;">
			<MainCard href="" place={trainings[0].place} title={trainings[0].title} time={trainings[0].hora} quotaLeft={trainings[0].quotaLeft} date={trainings[0].fecha} leftIcon={"fa-regular fa-clock"} centerIconText={"Cupos"}/>
		</div>

		<!-- wrapper fixes scroll hiding players card with footer -->
		<div id="wrapper" style="margin-bottom: 108px">
			<PlayersList title="Jugadores Inscritos con Plan" attendance={attendance} quota={trainings[0].quota} players={players} localsData={localsData} />
			<WaitListPlayersList playersWaitList={playersWaitList} localsData={localsData} />
		</div>
	</div>


	<div class="icon-bar">
		<a class="active" href="/clases/active"><i class="fa-solid fa-volleyball"></i><p>Clases</p></a>
		<a class="inactive" href="/payments/active"><i class="fa-solid fa-money-bill-wave" style="font-weight: 600;"></i><p>Pagos</p></a>
		<a class="inactive" href="/events/active"><i class="fa-solid fa-calendar-days" style="font-weight: 600;"></i><p>Eventos</p></a>
		<a class="inactive" href="/matches/active"><i class="fa-solid fa-trophy" style="font-weight: 600;"></i><p>Partidos</p></a>
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

	
