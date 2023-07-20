<script lang="ts">
    import { fade } from "svelte/transition";

	export let data;
	$: ({events} = data);
	
</script>

<head>
	<title>Eventos Activos ─ MTZ</title>
</head>

<div class="index">

	<div style="position: -webkit-sticky; position: sticky; top: 0; background-color: white;">
		<div class="title-container">
			<i class="fa-solid fa-calendar-days" style="display: flex; flex-direction: column; justify-content: center; padding-right: 13px; padding-left: 22px; font-size: 24px; font-weight: 600; line-height: 11px; padding-top: 4px;"></i>
			<p style="font-size: 32px; font-weight: 600; line-height: 39px;">Eventos</p>
		</div>

		<div style="display: flex; justify-content: center; margin-bottom: 20px;">
			<div class="clases-selector-container">
				<a href="/events/history"><button class="history-clases">Historial</button></a>
				<button class="active-clases">Activos</button>
			</div>
		</div>

		<!-- <div style="display: flex; justify-content: center;">
			<a href="/" style="width: 100%; display: flex; justify-content: space-evenly; align-items: left; margin-top: 20px; margin-bottom: 20px; text-decoration: none;">
				<div class="clases-finder-container" style=" justify-content: flex-start;">
					<i class="fa-solid fa-calendar-days" style="display: flex; margin-left: 25px; margin-right: px; color: white; font-size: 20px"></i>
					<h4 style="margin-top: 2px; margin-bottom: 0px; margin-left: 9px; margin-right: 9px; color: white; ">Filtrar por fecha</h4>
				</div>
			</a>
		</div> -->

		<div in:fade id="wrapper" style="margin-bottom: 66px"> <!-- wrapper fixes scroll hiding event card -->

			{#each events as event}
				<div style="display: flex; justify-content: center; padding-bottom: 15px;">
					<a href="/events/active/{event._id}" class="clases-container" style="cursor: pointer; text-decoration: none; color: black;">
						<div class="clases-place">
							{event.place}
						</div>
						<div class="clases-title">
							{event.title}
						</div>
						<div class="clases-icon-row">
							<div class="clases-icon-column-left">
								<i class="fa-regular fa-clock"></i> {event.hora}
							</div>
							<div class="clases-icon-column">
								<i class="fa-solid fa-users"></i> {event.quotaLeft} Cupos
							</div>
							<div class="clases-icon-column-right">
								<i class="fa-solid fa-calendar-days"></i> {event.fecha}
							</div>
						</div>
					</a>
				</div>
			{/each}

		</div> 
	</div>


	<div class="icon-bar">
		<a class="inactive" href="/clases/active"><i class="fa-solid fa-volleyball"></i><p>Clases</p></a>
		<a class="inactive" href="/payments/active"><i class="fa-solid fa-money-bill-wave" style="font-weight: 600;"></i><p>Pagos</p></a>
		<a class="active" href="/events/active"><i class="fa-solid fa-calendar-days" style="font-weight: 600;"></i><p>Eventos</p></a>
		<a class="inactive" href="/matches/active"><i class="fa-solid fa-trophy" style="font-weight: 600;"></i><p>Partidos</p></a>
		<a class="inactive" href="/profile"><i class="fa-solid fa-user" style="font-weight: 600;"></i><p>Perfil</p></a>
	</div>

</div>

<style>

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

	/* .clases-finder-container {
		display: flex;
		justify-content: space-evenly;
		align-items: center;
		height: 3rem;
		background-color: #F1C40F;
		border-radius: 6px;
		filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25));
		width: 90%;
		
	} */

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

	
