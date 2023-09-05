<script lang="ts">
	import { fade } from "svelte/transition";
	import PlayersList from "../../../../components/PlayersList.svelte";
    import MainCard from "../../../../components/MainCard.svelte";
    import JoinButton from "../../../../components/JoinButton.svelte";
	import LeaveButton from "../../../../components/LeaveButton.svelte";
    import Navbar from "../../../../components/Navbar.svelte";

	export let data;
	$: ({payments} = data);	

	let localsData = data.localsData;
	
	let players = data.payments[0].players
	let picture = data.user[0].foto
	let paid = parseInt(data.payments[0].paid);
	let name = data.user[0].nombre + " " + data.user[0].apellido
	let joined = data.joined;

</script>

<head>
	<title>Pago ─ MTZ</title>
</head>

<div class="index">

	<div in:fade style="position: -webkit-sticky; position: sticky; top: 0; background-color: white;">
		
		<div class="back-container">
			<a href="/payments/active" class="left-arrow"><i class="fa-solid fa-arrow-left"></i>Volver al listado</a>
		</div>
		

		<div class="title-container">
			<i class="fa-solid fa-circle-info" style="display: flex; flex-direction: column; justify-content: center; padding-right: 13px; padding-left: 22px; font-size: 24px; font-weight: 600; line-height: 11px;"></i>
			<p style="font-size: 32px; font-weight: 600; line-height: 39px;">Detalle</p>
		</div>
		
		<div style="display: flex; justify-content: center; padding-bottom: 15px;">
			<MainCard href="" place={payments[0].place} title={payments[0].title} time={payments[0].amount} quotaLeft={payments[0].quotaLeft} date={payments[0].fecha} leftIcon={"fa-solid fa-money-bill-wave"} centerIconText={"Pendientes"}/>
		</div>


		<div class="title-container">
			<i class="fa-solid fa-circle-info" style="display: flex; flex-direction: column; justify-content: center; padding-right: 13px; padding-left: 22px; font-size: 21px; font-weight: 600; line-height: 11px; margin-top: -14px"></i>
			<p style="font-size: 26px; font-weight: 600; line-height: 26px; margin-top: 10px;">Datos de transferencia</p>
		</div>

		<div style="display: flex; justify-content: center; padding-bottom: 15px; user-select: text;">
			<!-- Make prettier? -->
			<div class="payment-info">
				<div>Angelo Romano</div>
				<div>19.624.481-6</div>
				<div>Bci / Banco Crédito e Inversiones</div>
				<div>Cuenta Vista</div>
				<div>777019624481</div>
				<div>Mestizxsvolei@gmail.com</div>
			</div>
		</div>

		<!-- wrapper fixes scroll hiding players card with footer -->
		<div id="wrapper" style="margin-bottom: 108px">

			<!-- Inscritos planes -->
			<PlayersList title="Pagos Realizados" attendance={paid} quota={payments[0].quota} players={players} localsData={localsData} />
			<!-- Inscritos planes -->

			<!-- Botones planes -->
			{#if paid < payments[0].quota}
				{#if !joined && paid < payments[0].quota}
					<JoinButton action="?/JoinClass" name={name} email={localsData.email} picture={picture} text={"Pagué"}/>
				{/if}

				{#if joined}
					<LeaveButton action="?/LeaveClass" name={name} email={localsData.email} text={"Me equivoqué, aún no pago"}/>
				{/if}
			{/if}
			<!-- Botones planes -->
		</div>
	</div>

	<Navbar selection={"payments"}/>

</div>

<style>

	.payment-info {
		display: flex;
		justify-content: center;
		align-items: center;
		height:10rem;
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

	
