<script>

	export let playersWaitList
	export let localsData
	export let title = "Lista de espera (Pase Diario)"

</script>

<div style="display: flex; justify-content: center; padding-bottom: 15px; padding-top: 35px;">
	<div class="clases-container-players">

		<div>
			<p class="players-count-waitlist">{title}</p>
		</div>
		
		<!-- wrapper makes div height dynamic -->
		<div id="wrapper">

			{#if playersWaitList.length >= 1}
			<!-- for each player -->
				{#each playersWaitList as wait}
					{#if wait.nombre == localsData.name + ' ' + localsData.lastName}
						<div class="name-time-yellow">
							<div class="img-name-container">
								<div class="img-container">
									<img class="img" src={wait.picture} alt="" referrerpolicy="no-referrer"/>
								</div>
								<p style="text-overflow: ellipsis; overflow: hidden; white-space: nowrap;">{wait.nombre}</p>
							</div>
							<div style="padding-right: 18px;">
								<p style="white-space: nowrap;">{wait.fecha}</p>
							</div>
						</div>
					{:else}
						<div class="name-time">
							<div class="img-name-container">
								<div class="img-container">
									<img class="img" src={wait.picture} alt="" referrerpolicy="no-referrer"/>
								</div>
								<p style="text-overflow: ellipsis; overflow: hidden; white-space: nowrap;">{wait.nombre}</p>
							</div>
							<div style="padding-right: 18px;">
								<p style="white-space: nowrap;">{wait.fecha}</p>
							</div>
						</div>
					{/if}
				{/each}
			{:else}
				<!-- display nothing -->
				<div class="name-time-attendance"></div>
			{/if}
		</div>
		
	</div>
</div>

<style>

	.clases-container-players {
		display: flex;
		background-color: #FFFFFF;
		border-radius: 6px;
		filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25));
		width: 90%;
		flex-direction: column;
	}

	.players-count-waitlist {
		font-weight: 600;
		font-size: 16px;
		margin-left: 17px;
	}

	.name-time-yellow {
		display: flex; 
		justify-content: space-between;
		margin-top: -15px;
		color: #F1C40F;
		font-weight: bold;
	}

	.img-name-container {
		display: flex;
		padding-left: 18px;
		padding-right: 15px;
		text-overflow: ellipsis;
		overflow: hidden;
		white-space: nowrap;
	}

	.img-container {
		display: flex;
		align-items: center;
		margin-right: 12px;
	}

	.img {
		display: flex;
		margin: auto;
		justify-content: center;
		height: 25px;
		width: 25px;
		border-radius: 50%;
		object-fit: contain;
		background: #dfdfdf;
	}

	.name-time {
		display: flex; 
		justify-content: space-between;
		margin-top: -15px;
		color: #B54545;
		font-weight: bold;
	}

</style>