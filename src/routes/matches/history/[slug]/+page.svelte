<script lang="ts">
	import { fade } from "svelte/transition";
    import MainCard from "../../../../components/MainCard.svelte";
    import PlayersList from "../../../../components/PlayersList.svelte";
    import Navbar from "../../../../components/Navbar.svelte";
    import WaitListPlayersList from "../../../../components/WaitListPlayersList.svelte";

	export let data;
	$: ({matches} = data);

	let localsData = data.localsData;
	let players = data.matches[0].players;
	let playersWaitList = data.matches[0].playersWaitList
	let attendance = parseInt(data.matches[0].attendance);

</script>

<head>
	<title>Partido ─ MTZ</title>
</head>

<div class="index">

	<div in:fade style="position: -webkit-sticky; position: sticky; top: 0; background-color: white;">
		
	
		<div class="back-container">
			<a href="/matches/history" class="left-arrow"><i class="fa-solid fa-arrow-left"></i>Volver al listado</a>
		</div>
		

		<div class="title-container">
			<i class="fa-solid fa-circle-info" style="display: flex; flex-direction: column; justify-content: center; padding-right: 13px; padding-left: 22px; font-size: 24px; font-weight: 600; line-height: 11px;"></i>
			<p style="font-size: 32px; font-weight: 600; line-height: 39px;">Detalle</p>
		</div>
		
		<div style="display: flex; justify-content: center; padding-bottom: 15px;">
			<MainCard href="" place={matches[0].place} title={matches[0].title} time={matches[0].hora} quotaLeft={matches[0].quotaLeft} date={matches[0].fecha} leftIcon={"fa-regular fa-clock"} centerIconText={"Cupos"}/>
		</div>

		<!-- wrapper fixes scroll hiding players card with footer -->
		<div id="wrapper" style="margin-bottom: 108px">
			<PlayersList title="Jugadores Inscritos" attendance={attendance} quota={matches[0].quota} players={players} localsData={localsData} />
			<WaitListPlayersList playersWaitList={playersWaitList} localsData={localsData} title={"Barra Oficial"}/>
		</div>
	</div>

	<Navbar selection={"matches"}/>

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

	
