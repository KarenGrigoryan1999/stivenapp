<?php
$login = "";
$password = "";
if(isset($_COOKIE['login']) && isset($_COOKIE['password'])){
  $login = $_COOKIE['login'];
  $password = $_COOKIE['password'];
}
  echo "<form name='formPost' method = 'POST' action = '\projectEditor.php'>
  <label for = 'login'>Ваш логин:</label><br>
  <input class='form-control' type = 'text' name = 'login' value = $login>
  <br><label for = 'password'>Ваш пароль:</label><br>
  <input class='form-control' type = 'password' name = 'password' value = $password>
  <br><input class='btn btn-primary' type = 'submit' value = 'Войти'>
</form>
<p>Впервые у нас? Тогда пройдите пожалуйста процедуру </p><a href = '\\registration.php'>регистрации</a>
";?>
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Document</title>
  <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0-alpha.4/css/bootstrap.min.css" integrity="2hfp1SzUoho7/TsGGGDaFdsuuDL0LX2hnUp6VkX3CUQ2K4K+xjboZdsXyp4oUHZj" crossorigin="anonymous">
    <script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0-alpha.4/js/bootstrap.min.js" integrity="VjEeINv9OSwtWFLAtmc4JCtEJXXBub00gtSnszmspDLCtC0I4z4nqz7rEFbIZLLU" crossorigin="anonymous"></script>
</head>
<body style = "padding: 15px;">
  
</body>
</html>