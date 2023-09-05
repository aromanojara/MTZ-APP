<script>

	export let selection

</script>

{#if selection === "clases"}

	<div class="icon-bar">
		<a class="active" href="/clases/active"><i class="fa-solid fa-volleyball"></i><p>Clases</p></a>
		<a class="inactive" href="/matches/active"><i class="fa-solid fa-trophy"></i><p>Partidos</p></a>
		<a class="inactive" href="/events/active"><i class="fa-solid fa-calendar-days"></i><p>Eventos</p></a>
		<a class="inactive" href="/payments/active"><i class="fa-solid fa-money-bill"></i><p>Pagos</p></a>
		<a class="inactive" href="/profile"><i class="fa-solid fa-user"></i><p>Perfil</p></a>
	</div>

{:else if selection === "matches"}

	<div class="icon-bar">
		<a class="inactive" href="/clases/active"><i class="fa-solid fa-volleyball"></i><p>Clases</p></a>
		<a class="active" href="/matches/active"><i class="fa-solid fa-trophy"></i><p>Partidos</p></a>
		<a class="inactive" href="/events/active"><i class="fa-solid fa-calendar-days"></i><p>Eventos</p></a>
		<a class="inactive" href="/payments/active"><i class="fa-solid fa-money-bill"></i><p>Pagos</p></a>
		<a class="inactive" href="/profile"><i class="fa-solid fa-user"></i><p>Perfil</p></a>
	</div>

{:else if selection === "events"}

	<div class="icon-bar">
		<a class="inactive" href="/clases/active"><i class="fa-solid fa-volleyball"></i><p>Clases</p></a>
		<a class="inactive" href="/matches/active"><i class="fa-solid fa-trophy"></i><p>Partidos</p></a>
		<a class="active" href="/events/active"><i class="fa-solid fa-calendar-days"></i><p>Eventos</p></a>
		<a class="inactive" href="/payments/active"><i class="fa-solid fa-money-bill"></i><p>Pagos</p></a>
		<a class="inactive" href="/profile"><i class="fa-solid fa-user"></i><p>Perfil</p></a>
	</div>

{:else if selection === "payments"}

	<div class="icon-bar">
		<a class="inactive" href="/clases/active"><i class="fa-solid fa-volleyball"></i><p>Clases</p></a>
		<a class="inactive" href="/matches/active"><i class="fa-solid fa-trophy"></i><p>Partidos</p></a>
		<a class="inactive" href="/events/active"><i class="fa-solid fa-calendar-days"></i><p>Eventos</p></a>
		<a class="active" href="/payments/active"><i class="fa-solid fa-money-bill"></i><p>Pagos</p></a>
		<a class="inactive" href="/profile"><i class="fa-solid fa-user"></i><p>Perfil</p></a>
	</div>

{:else if selection === "profile"}

	<div class="icon-bar">
		<a class="inactive" href="/clases/active"><i class="fa-solid fa-volleyball"></i><p>Clases</p></a>
		<a class="inactive" href="/matches/active"><i class="fa-solid fa-trophy"></i><p>Partidos</p></a>
		<a class="inactive" href="/events/active"><i class="fa-solid fa-calendar-days"></i><p>Eventos</p></a>
		<a class="inactive" href="/payments/active"><i class="fa-solid fa-money-bill"></i><p>Pagos</p></a>
		<a class="active" href="/profile"><i class="fa-solid fa-user"></i><p>Perfil</p></a>
	</div>

{/if}



<style>
	
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

	.icon-bar p {	
		margin-top: 0px;
		margin-bottom: 0px;
		font-size: 12px;
	}

	.active {
		background-color: #FCFCFC; /* Add an active/current color */
		color: #B54545;
	}

	.inactive {
		background-color: #FCFCFC; /* Add an active/current color */
		color: black;
	}

</style>