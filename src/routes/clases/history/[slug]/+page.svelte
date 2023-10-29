<script lang="ts">
    import { loop_guard } from 'svelte/internal';
	import { fade } from "svelte/transition";
    import MainCard from '../../../../components/MainCard.svelte';
    import PlayersList from '../../../../components/PlayersList.svelte';
    import WaitListPlayersList from '../../../../components/WaitListPlayersList.svelte';
    import Navbar from '../../../../components/Navbar.svelte';

	export let data;
	$: ({trainings} = data);

	let localsData = data.localsData;
	let players = data.trainings[0].players;
	let playersWaitList = data.trainings[0].playersWaitList
	let attendance = parseInt(data.trainings[0].attendance);

	let _id = data.trainings[0]._id
	let x = 1;
	let copied = false;
	let adminPanel;

    async function addToCounter() {
		if (x === 5 && data.user[0].admin) {

			try {
                await navigator.clipboard.writeText(_id);
                copied = true;
				adminPanel.click()
            } catch (error) {
                console.error("Failed to copy to clipboard:", error);
            }

		} else if (x === 5 && !data.user[0].admin) {
			x = 1
		} else {
			console.log(x);
			x++;
		}
	}

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

		{#if copied}
			<p class="success">¡Se copió el Id en el Portapapeles!</p>
		{/if}
		
		<div style="display: flex; justify-content: center; padding-bottom: 15px;" on:click={addToCounter}>
			<MainCard href="" place={trainings[0].place} title={trainings[0].title} time={trainings[0].hora} quotaLeft={trainings[0].quotaLeft} date={trainings[0].fecha} leftIcon={"fa-regular fa-clock"} centerIconText={"Cupos"}/>
		</div>
		<a href="/admin" bind:this={adminPanel} hidden>a</a>

		<!-- wrapper fixes scroll hiding players card with footer -->
		<div id="wrapper" style="margin-bottom: 108px">
			<PlayersList title="Jugadores Inscritos con Plan" attendance={attendance} quota={trainings[0].quota} players={players} localsData={localsData} />
			<WaitListPlayersList playersWaitList={playersWaitList} localsData={localsData} />
		</div>
	</div>

	<Navbar selection={"clases"}/>

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

	.success {
		display: flex;
		justify-content: center;
		margin-top: 0px;
		font-weight: 600;
	}

</style>

	
