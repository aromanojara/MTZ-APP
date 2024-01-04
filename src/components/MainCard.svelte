<script>
	export let href
	export let place
	export let title
	export let time
	export let quotaLeft
	export let date
	export let leftIcon
	export let centerIconText

	if (quotaLeft == 1) {
		centerIconText = centerIconText.slice(0,-1);
	}
	
</script>

<a href={href} class="clases-container" style="cursor: pointer; text-decoration: none; color: black;">
	<div class="clases-place">
		{place}
	</div>
	<div class="clases-title">
		{title}
	</div>
	<div class="clases-icon-row">
		<div class="clases-icon-column-left">
			<i class={leftIcon}></i> {time}
		</div>
		<div>
			<i class="fa-solid fa-users"></i> {quotaLeft} {centerIconText}
		</div>
		<div class="clases-icon-column-right">
			<i class="fa-solid fa-calendar-days"></i> {date}
		</div>
	</div>
</a>


<style>

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
	
</style>