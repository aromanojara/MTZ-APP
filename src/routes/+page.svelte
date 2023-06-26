<script>
	
</script>

<head>
	<title>Login ─ MTZ</title>
</head>

<div class="index">

	<div class="img_container">
		<img src="/logo.png" alt="Logo MTZ">
	</div>

	<!-- Remove "a" tag, add action ?/login and modify +page.server.js to do something  -->
	<div class="form_container">
		<!-- action="?/login" -->
		<form action="" method="post">
			<div class="form_group">
				<div class="email_container">
					<i class="fa-regular fa-envelope"></i>
					<input type="text" id="email" name="email" placeholder="Correo electrónico" class="email">
				</div>
				<div class="password_container">
					<i class="fa-solid fa-key"></i>
					<input type="password" id="password" name="password" placeholder="Contraseña" class="password">
					<!-- <i class="fa-regular fa-eye"></i> -->
				</div>
			</div>
			<div class="button_container">
				<a href="/"><input type="submit" value="Iniciar Sesión" class="button_login"></a>
			</div>
		</form>

		<!-- Olvidé mi contraseña -->

		<!-- <div class=recover_email>
			<a href="/"><p><u>Olvidé mi contraseña</u></p></a>
		</div> -->

		<hr class="solid">

		<form class="auth-form" method="post" action="?/OAuth2">
			<div class="google_container">
				<button type="submit" class="google-sign-in-button">
					Entrar con Google
				</button>
			</div>
		</form>

	</div>

</div>

<style>

	hr.solid {
		border: 1px solid #F1C40F;
		border-radius: 2px;
	}

	.google_container {
		display: flex;
		margin: auto;
		justify-content: center;
		flex-direction: column;
	}

	.google-sign-in-button {
		cursor: pointer;
		transition: background-color .3s, box-shadow .3s;
			
		padding: 12px 40px 12px 42px;
		border: none;
		border-radius: 3px;
		box-shadow: 0 -1px 0 rgba(0, 0, 0, .04), 0 1px 1px rgba(0, 0, 0, .25);
		
		color: #757575;
		font-size: 14px;
		font-weight: 500;
		font-family: -apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen,Ubuntu,Cantarell,"Fira Sans","Droid Sans","Helvetica Neue",sans-serif;
		
		background-image: url(data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTgiIGhlaWdodD0iMTgiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGcgZmlsbD0ibm9uZSIgZmlsbC1ydWxlPSJldmVub2RkIj48cGF0aCBkPSJNMTcuNiA5LjJsLS4xLTEuOEg5djMuNGg0LjhDMTMuNiAxMiAxMyAxMyAxMiAxMy42djIuMmgzYTguOCA4LjggMCAwIDAgMi42LTYuNnoiIGZpbGw9IiM0Mjg1RjQiIGZpbGwtcnVsZT0ibm9uemVybyIvPjxwYXRoIGQ9Ik05IDE4YzIuNCAwIDQuNS0uOCA2LTIuMmwtMy0yLjJhNS40IDUuNCAwIDAgMS04LTIuOUgxVjEzYTkgOSAwIDAgMCA4IDV6IiBmaWxsPSIjMzRBODUzIiBmaWxsLXJ1bGU9Im5vbnplcm8iLz48cGF0aCBkPSJNNCAxMC43YTUuNCA1LjQgMCAwIDEgMC0zLjRWNUgxYTkgOSAwIDAgMCAwIDhsMy0yLjN6IiBmaWxsPSIjRkJCQzA1IiBmaWxsLXJ1bGU9Im5vbnplcm8iLz48cGF0aCBkPSJNOSAzLjZjMS4zIDAgMi41LjQgMy40IDEuM0wxNSAyLjNBOSA5IDAgMCAwIDEgNWwzIDIuNGE1LjQgNS40IDAgMCAxIDUtMy43eiIgZmlsbD0iI0VBNDMzNSIgZmlsbC1ydWxlPSJub256ZXJvIi8+PHBhdGggZD0iTTAgMGgxOHYxOEgweiIvPjwvZz48L3N2Zz4=);
		background-color: white;
		background-repeat: no-repeat;
		background-position: 12px 12px;
	}

	.google-sign-in-button:hover {
		box-shadow: 0 -1px 0 rgba(0, 0, 0, .04), 0 2px 4px rgba(0, 0, 0, .25);
	}

	.google-sign-in-button:active {
		background-color: #eeeeee;
	}

	.google-sign-in-button:active {
		outline: none;
			box-shadow: 
			0 -1px 0 rgba(0, 0, 0, .04),
			0 2px 4px rgba(0, 0, 0, .25),
			0 0 0 3px #c8dafc;
	}

	.google-sign-in-button:disabled {
		filter: grayscale(100%);
		background-color: #ebebeb;
		box-shadow: 0 -1px 0 rgba(0, 0, 0, .04), 0 1px 1px rgba(0, 0, 0, .25);
		cursor: not-allowed;
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

	}

	.form_container {
    	display: block;
		padding-left: 1.5rem;
    	padding-right: 1.5rem;
		
	}

	.email_container {
		width: 100%;
		position: relative;
		background-color: transparent;
		margin: 10px 0;
	}

	.email_container i {
		position: absolute;
	}

	i {
		padding: 12px;
		min-width: 50px;
	}

	.password_container {
		width: 100%;
		position: relative;
		background-color: transparent;
		margin: 10px 0;
	}

	.password_container i {
		position: absolute;
	}

	.button_container {
		width: 100%;
		position: relative;
		background-color: transparent;
		margin: 10px 0;
	}

	.email {
		background: #ffffff;
		box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
		border-radius: 6px;
		width: 100%;
		height: 40px;
		box-sizing: border-box;
		border-color: transparent;
		font-size: 14px;
		padding-left: 35px;
		box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.20);
	}

	.email:focus {
		outline-style: solid;
		outline-color: #F1C40F;
	}

	.password {
		background: #ffffff;
		box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
		border-radius: 6px;
		width: 100%;
		height: 40px;
		box-sizing:border-box;
		border-color: transparent;
		font-size: 14px;
		padding-left: 35px;
		box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.20);
	}

	.password:focus {
		outline-style: solid;
		outline-color: #F1C40F;
	}

	.button_login {
		background: #B54545;
		color: white;
		box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
		border-radius: 6px;
		width: 100%;
		height: 40px;
		border-color: transparent;
		font-weight: bold;
	}

	.button_login:disabled {
		background: white;
		color: #B54545;
		box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
		border-radius: 6px;
		border-color: #B54545;
		width: 100%;
		height: 40px;
		border-color: solid;
		font-weight: bold;
	}

	/* .recover_email {
		display: flex;
		justify-content: center;

	}

	.recover_email a{
		font-weight:100;
	}

	.recover_email a:visited {
	color: black;
	} */

	img{
		display: flex;
		width: 174px;
		height: 190px;
		filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25));
	}

</style>