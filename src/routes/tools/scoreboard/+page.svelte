<script>

</script>

<body id="contents">

	<div class="set-duration-container">
		<div class="play-sound-container"><i class="fa-solid fa-circle-play"></i></div>
		<p class="set-duration-clock">00:00</p>
		<div class="settings-container"><i class="fa-solid fa-gear"></i></div>
	</div>

	<p class="set-duration-text">Set Duration</p>

	<div class="home-text-container">
		<input type="text" class="home-text" value="Home" size="8">
	</div>

	<div class="away-text-container">
		<input type="text" class="away-text" value="Away" size="8">
	</div>

	<div class="home-score-container">
		<div class="home-score-background">
			<p class="home-score-text">25</p>
		</div>
	</div>

	<div class="away-score-container">
		<div class="away-score-background">
			<p class="away-score-text">4</p>
		</div>
	</div>

	<div class="home-set-score-container">
		<div class="home-set-score-background">
			<p class="home-set-score-text">1</p>
		</div>
	</div>
	
	<div class="away-set-score-container">
		<div class="away-set-score-background">
			<p class="away-set-score-text">3</p>
		</div>
	</div>
	
</body>

<p id="turn">oye gira la wea</p>

<style>

	@media only screen and (orientation:landscape) {
		#contents {display: block;}
		#turn {display: none;}
	}

	@media only screen and (orientation:portrait) {
		#contents {display: none;}
		#turn {display: block;}
	}

	@font-face {
		font-family: 'ds-digitalnormal';
		font-weight: normal;
		font-style: normal;
		src: url('/assets/ds-digi-webfont.woff2') format('woff2');
	}

	.set-duration-container {
		display: flex;
		flex-direction: row;
		margin: auto;
		justify-content: center;
		width: 7.75rem;
		height: 3.0625rem;
		flex-shrink: 0;
		border-radius: 0rem 0rem 1.25rem 1.25rem;
		background: #292929;
	}

	.set-duration-clock {
		display: flex;
		flex-direction: column;
		justify-content: center;
		flex-shrink: 0;
		color: #FFF;
		text-align: center;
		font-family: 'ds-digitalnormal';
		font-size: 2.5rem;
		font-style: normal;
		font-weight: 400;
		line-height: normal;
		margin-top: 0px;
		margin-bottom: 0px;
	}

	.set-duration-text {
		display: flex;
		margin: auto;
		justify-content: center;
		width: 7.75rem;
		height: 0.6875rem;
		flex-shrink: 0;
		color: #000;
		text-align: center;
		text-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
		font-size: 0.875rem;
		font-style: normal;
		font-weight: 700;
		line-height: normal;
	}

	.play-sound-container {
		padding: 0px;
		display: block;
		position: fixed;
		top: 5px;
		left: 8px;
		text-align: center;
		text-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
		font-size: 2rem;
		font-style: normal;
		font-weight: 900;
		line-height: normal;
	}

	.settings-container {
		padding: 0px;
		display: block;
		position: fixed;
		top: 5px;
		right: 8px;
		text-align: center;
		text-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
		font-size: 2rem;
		font-style: normal;
		font-weight: 900;
		line-height: normal;
	}

	.home-text-container {
		position: absolute;
		left: 8vw;
	}

	.home-text {
		color: #B54545;
		text-align: center;
		text-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
		font-size: 36px;
		font-style: normal;
		font-weight: 700;
		line-height: normal;
		border-right-width: 0px;
		border-left-width: 0px;
		border-top-width: 0px;
		border-bottom-width: 0px;

	}

	.away-text-container {
		position: absolute;
		right: 8vw;
	}

	.away-text {
		color: #F1C40F;
		text-align: center;
		text-shadow: 0px 4px 4px rgba(0, 0, 0, 0.15);
		font-size: 36px;
		font-style: normal;
		font-weight: 700;
		line-height: normal;
		border-right-width: 0px;
		border-left-width: 0px;
		border-top-width: 0px;
		border-bottom-width: 0px;
	}

	.home-score-container {
		position: absolute;
		left: 10.5vw;
		top: 29vh;
		filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25));
	}

	.home-score-background {
		width: 13rem;
		padding-top: 13rem;
		background-color: #B54545;
		border-radius: 20px;
	}

	.away-score-container {
		position: absolute;
		right: 10.5vw;
		top: 29vh;
		filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25));
	}

	.away-score-background {
		width: 13rem;
		padding-top: 13rem;
		background-color: #F1C40F;
		border-radius: 20px;
	}

	.home-score-text {
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		color: white;
		font-family: 'ds-digitalnormal';
		font-size: 8rem;
		font-style: normal;
		font-weight: 400;
		line-height: normal;
		margin-top: 0px;
    	margin-bottom: 0px;
		text-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
	}

	.away-score-text {
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		color: white;
		font-family: 'ds-digitalnormal';
		font-size: 8rem;
		font-style: normal;
		font-weight: 400;
		line-height: normal;
		margin-top: 0px;
    	margin-bottom: 0px;
		text-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
	}

	.home-set-score-container {
		position: absolute;
		left: 42vw;
		top: 29vh;
		filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25));
	}

	.home-set-score-background {
		width: 3rem;
		padding-top: 3rem;
		background-color: #B54545;
		border-radius: 10px;
	}


	.home-set-score-text {
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		color: white;
		font-family: 'ds-digitalnormal';
		font-size: 2.5rem;
		font-style: normal;
		font-weight: 400;
		line-height: normal;
		margin-top: 0px;
    	margin-bottom: 0px;
		text-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
	}

	.away-set-score-container {
		position: absolute;
		right: 42vw;
		top: 29vh;
		filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25));
	}

	.away-set-score-background {
		width: 3rem;
		padding-top: 3rem;
		background-color: #F1C40F;
		border-radius: 10px;
	}


	.away-set-score-text {
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		color: white;
		font-family: 'ds-digitalnormal';
		font-size: 2.5rem;
		font-style: normal;
		font-weight: 400;
		line-height: normal;
		margin-top: 0px;
    	margin-bottom: 0px;
		text-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
	}

</style>