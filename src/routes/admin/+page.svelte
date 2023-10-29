<script>
	// import Navbar from "../../components/Navbar.svelte";
	import { fade } from "svelte/transition";

</script>

<head>
	<title>Admin ─ MTZ</title>
</head>

<div class="index">

	<div in:fade style="position: -webkit-sticky; position: sticky; top: 0; background-color: white;">

		<div class="back-container">
			<a href="/profile" class="left-arrow"><i class="fa-solid fa-arrow-left"></i>Volver</a>
		</div>

		<div class="title-container">
			<i class="fa-solid fa-user-tie" style="display: flex; flex-direction: column; justify-content: center; padding-right: 13px; padding-left: 22px; font-size: 24px; font-weight: 600; padding-top: 2px;"></i>
			<p style="font-size: 32px; font-weight: 600; line-height: 39px;">Admin</p>
		</div>
		
		<div in:fade>
			
			<div class="module-container">
				<a href="/admin/create" class="clases-container">Crear Tarjeta</a>
			</div>

			<!-- <div class="module-container">
				<a href="/admin/edit" class="clases-container">Editar Tarjeta</a>
			</div> -->

			<div class="module-container">
				<a href="/admin/delete" class="clases-container">Borrar Tarjeta</a>
			</div>

		</div>

	</div>

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

	.clases-container {
		display: flex;
		justify-content: space-evenly;
		align-items: center;
		height: 4rem;
		background-color: #B54545;
		border-radius: 6px;
		filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25));
		width: 90%;
		flex-direction: column;
		cursor: pointer;
		text-decoration: none;
		color: white;
		font-weight: bold;
	}

	.module-container {
		display: flex;
		justify-content: center;
		width: 100%;
		background-color: transparent;
		
		margin-bottom: 20px;
	}

</style>