<script>
	export let action
	export let name
	export let email
	export let text
	
	let disabled = false

	function handleClick() {
		disabled = true;
    }

</script>

<div id="dropoutContainer" class="button-container">
	<form method="post" action="{action}">
		<input type="text" name="name" bind:value={name} hidden>
		<input type="text" name="email" bind:value={email} hidden>
		<button class="button-dropout" on:click|once={handleClick} hidden={disabled}>
			{text}
		</button>
	</form>
</div>

<style>

	.button-container {
		width: 90%;
		background-color: transparent;
		margin: auto;
	}

	.button-dropout {
		background: white;
		color: #B54545;
		box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
		border-radius: 6px;
		width: 100%;
		height: 40px;
		border-color: #B54545;
		font-weight: bold;
		border-style: solid;
	}
	
</style>