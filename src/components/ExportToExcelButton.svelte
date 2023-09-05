<script>
	
	let disabled = false

	function handleClick() {
		disabled = true;
    }

</script>

<div id="joinContainer" class="button-container">
	<form method="post" action="?/Excel">
		<button class="button-excel" on:click|once={handleClick} hidden={disabled}>
			Descargar Excel
		</button>
	</form>
</div>

<style>

	.button-container {
		width: 90%;
		background-color: transparent;
		margin: auto;
	}

	.button-excel {
		background: #1D6F42;
		color: white;
		box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
		border-radius: 6px;
		width: 100%;
		height: 40px;
		border-color: transparent;
		font-weight: bold;
	}

</style>