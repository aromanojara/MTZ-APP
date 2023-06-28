<script>
	import { page } from "$app/stores";
</script>

<head>
	<title>Login ─ MTZ</title>
</head>
<body>
	<div class="index">

		<div class="img_container">
			<img src="/logo.webp" alt="Logo MTZ">
		</div>
	
		<!-- Remove "a" tag, add action ?/login and modify +page.server.js to do something  -->
		<div class="form_container">
			
			<h1>¡Oops!</h1>
			<br>
			<p>Se produjo un mestierror 😥</p>
			<p>Si Ange te pregunta dile esto:</p>
			<br>
			<p>Status: {$page.status}</p>
			<p>Message: {$page.error.message}</p>
			<br>
			<p>Haz click&nbsp<a href="/">aquí</a>&nbsppara volver al inicio</p>
	
		</div>
	
	</div>
</body>


<style>

	h1, p {
		display: flex;
		margin: auto;
		justify-content: center;
	}

	.index {
    	display: flex;
		margin: auto;
		justify-content: center;
		flex-direction: column;
		height: 80%;
	}

	.img_container {
    	display: flex;
		margin: 40px auto;
		-webkit-filter: grayscale(100%); /* Safari 6.0 - 9.0 */
  		filter: grayscale(100%);

	}

	.form_container {
    	display: block;
		padding-left: 1.5rem;
    	padding-right: 1.5rem;
		
	}


	img{
		display: flex;
		width: 174px;
		height: 190px;
		filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25));
		transform: rotate(60deg);
	}

</style>