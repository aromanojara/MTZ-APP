<script>

	export let filterDate
	let dateForm

</script>

<div style="display: flex; justify-content: center; align-items: center; margin-bottom: 20px;">
	<form class="date-form" method="post" action="?/FilterByDate" bind:this={dateForm}>
		<input type="month" name="filterDate" bind:value={filterDate} on:change={() => dateForm.requestSubmit()}>
	</form>
</div>

<style>

	.date-form {
		display: flex;
		justify-content: center;
		align-items: center;
		width: 100%;
		filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25));
	}

	input[type="month"] {
		display: flex;
		justify-content: center;
		align-items: center;
		text-align: center;
		height: 3rem;
		color: white;
		font-weight: bold;
		background-color: #F1C40F;
		border-radius: 6px;
		padding: 0px;
		border-style: none;
		width: 90%;
		font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
		-webkit-appearance: none;
	}

	input[type="month"]:focus {
		outline: none;
	}

	::-webkit-calendar-picker-indicator {
		background: transparent;
		bottom: 0;
		color: transparent;
		cursor: pointer;
		height: auto;
		left: 0;
		position: absolute;
		right: 0;
		top: 0;
		width: auto;
	}

	::-webkit-datetime-edit {
		padding: 0px;
	}

</style>