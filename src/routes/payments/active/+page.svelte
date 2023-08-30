<script lang="ts">
	import { redirect } from "@sveltejs/kit";
    import { loop_guard } from 'svelte/internal';
    import { fade } from "svelte/transition";
	import MainCard from "../../../components/MainCard.svelte";

	export let data;
	$: ({payments} = data);	
</script>

<head>
	<title>Pagos Activos ─ MTZ</title>
</head>

<div class="index">

	<div style="position: -webkit-sticky; position: sticky; top: 0; background-color: white;">
		<div class="title-container">
			<i class="fa-solid fa-money-bill-wave" style="display: flex; flex-direction: column; justify-content: center; padding-right: 13px; padding-left: 22px; font-size: 24px; font-weight: 600; line-height: 11px; padding-top: 6px;"></i>
			<p style="font-size: 32px; font-weight: 600; line-height: 39px;">Pagos</p>
		</div>

		<div style="display: flex; justify-content: center; margin-bottom: 20px;">
			<div class="clases-selector-container">
				<a href="/payments/history"><button class="history-clases">Historial</button></a>
				<button class="active-clases">Activos</button>
			</div>
		</div>

		<div in:fade id="wrapper" style="margin-bottom: 66px"> <!-- wrapper fixes scroll hiding training card -->

			{#each payments as payment}
				<div style="display: flex; justify-content: center; padding-bottom: 15px;">
					<MainCard href="/payments/active/{payment._id}" place={payment.place} title={payment.title} time={payment.amount} quotaLeft={payment.quotaLeft} date={payment.fecha} leftIcon={"fa-solid fa-money-bill-wave"} centerIconText={"Pendientes"}/>
				</div>
			{/each}

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

	.history-clases {
		background-color:#B54545;
		color: white;
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
		background-color: white;
		color: #B54545;
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

</style>

	
