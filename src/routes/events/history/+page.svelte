<script lang="ts">
	import { fade } from "svelte/transition";
    import MainCard from "../../../components/MainCard.svelte";
	import FilterByDate from "../../../components/FilterByDate.svelte";
    import Navbar from "../../../components/Navbar.svelte";

	export let form
	export let data;
	$: ({events} = data);

	// If data is filtered by date, then replace it with the new one
	if (form !== null) {
		data = form
	}
	
</script>

<head>
	<title>Eventos Historial ─ MTZ</title>
</head>

<div class="index">

	<div style="position: -webkit-sticky; position: sticky; top: 0; background-color: white;">
		<div class="title-container">
			<i class="fa-solid fa-calendar-days" style="display: flex; flex-direction: column; justify-content: center; padding-right: 13px; padding-left: 22px; font-size: 24px; font-weight: 600; line-height: 11px; padding-top: 4px;"></i>
			<p style="font-size: 32px; font-weight: 600; line-height: 39px;">Eventos</p>
		</div>

		<div style="display: flex; justify-content: center; margin-bottom: 20px;">
			<div class="clases-selector-container">
				<button class="history-clases">Historial</button>
				<a href="/events/active"><button class="active-clases">Activos</button></a>
			</div>
		</div>

		<FilterByDate filterDate={data.filterDate} />

		<div in:fade id="wrapper" style="margin-bottom: 66px"> <!-- wrapper fixes scroll hiding event card -->

		{#each events as event}
			<div style="display: flex; justify-content: center; padding-bottom: 15px;">
				<MainCard href="/events/history/{event._id}" place={event.place} title={event.title} time={event.hora} quotaLeft={event.quotaLeft} date={event.fecha} leftIcon={"fa-regular fa-clock"} centerIconText={"Cupos"}/>
			</div>
		{/each}

		</div> 
	</div>

	<Navbar selection={"events"}/>

</div>

<style>

	.history-clases {
        background-color: white;
		color: #B54545;
		border-radius: 4px;
		font-weight: bold;
		border-color: #B54545;
		border-style: none;
		height: 33px;
		width: 87px;
		left: 49px;
		top: 4px;
		border-radius: 4px;
	}

	.active-clases {
		background-color:#B54545;
		color: white;
		border-radius: 4px;
		font-weight: bold;
		border-color: #B54545;
		border-style: none;
		height: 33px;
		width: 87px;
		left: 222px;
		top: 4px;
		border-radius: 4px;

	}

	.clases-selector-container {
		display: flex;
		justify-content: space-evenly;
		align-items: center;
		height: 3rem;
		background-color: #B54545;
		border-radius: 6px;
		filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25));
		width: 90%;
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

</style>

	
