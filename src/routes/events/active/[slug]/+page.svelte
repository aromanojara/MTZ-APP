<script lang="ts">
	import { fade } from "svelte/transition";
    import MainCard from "../../../../components/MainCard.svelte";
    import PlayersList from "../../../../components/PlayersList.svelte";
    import JoinButton from "../../../../components/JoinButton.svelte";
    import LeaveButton from "../../../../components/LeaveButton.svelte";
    import Navbar from "../../../../components/Navbar.svelte";

	export let data;
	$: ({events} = data);	

	let localsData = data.localsData;
	
	let players = data.events[0].players
	let picture = data.user[0].foto
	let attendance = parseInt(data.events[0].attendance);
	let name = data.user[0].nombre + " " + data.user[0].apellido
	let joined = data.joined;

	let _id = data.events[0]._id
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
	<title>Evento ─ MTZ</title>
</head>

<div class="index">

	<div in:fade style="position: -webkit-sticky; position: sticky; top: 0; background-color: white;">
		
	
		<div class="back-container">
			<a href="/events/active" class="left-arrow"><i class="fa-solid fa-arrow-left"></i>Volver al listado</a>
		</div>
		

		<div class="title-container">
			<i class="fa-solid fa-circle-info" style="display: flex; flex-direction: column; justify-content: center; padding-right: 13px; padding-left: 22px; font-size: 24px; font-weight: 600; line-height: 11px;"></i>
			<p style="font-size: 32px; font-weight: 600; line-height: 39px;">Detalle</p>
		</div>
		
		{#if copied}
			<p class="success">¡Se copió el Id en el Portapapeles!</p>
		{/if}

		<div style="display: flex; justify-content: center; padding-bottom: 15px;" on:click={addToCounter}>
			<MainCard href="" place={events[0].place} title={events[0].title} time={events[0].hora} quotaLeft={events[0].quotaLeft} date={events[0].fecha} leftIcon={"fa-regular fa-clock"} centerIconText={"Cupos"}/>
		</div>
		<a href="/admin" bind:this={adminPanel} hidden>a</a>

		<!-- wrapper fixes scroll hiding players card with footer -->
		<div id="wrapper" style="margin-bottom: 108px">

			<!-- Inscritos -->
			<PlayersList title="Jugadores Inscritos" attendance={attendance} quota={events[0].quota} players={players} localsData={localsData} />
			<!-- Inscritos -->

			<!-- Botones planes -->
			{#if attendance < events[0].quota}
				{#if !joined && attendance < events[0].quota}
					<JoinButton action="?/JoinClass" name={name} email={localsData.email} picture={picture} text={"Inscribirse"}/>
				{/if}

				{#if joined}
					<LeaveButton action="?/LeaveClass" name={name} email={localsData.email} text={"Desinscribirse"}/>
				{/if}
			{/if}
			<!-- Botones planes -->
		</div>
	</div>

	<Navbar selection={"events"}/>

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

	
