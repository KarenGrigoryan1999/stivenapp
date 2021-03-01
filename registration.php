<?php 
    $mysqli = new mysqli("localhost", "root", "1234567890", "codeschool");
    if(isset($_POST['login']) && isset($_POST['password']) && isset($_POST['password2']) && isset($_POST['email'])){
        $error = false;
        $login = $_POST['login'];
        $mail = $_POST['email'];
        $password = $_POST['password'];
            $chech_login = "SELECT * FROM `user_list_of_school` WHERE `login` = '$login'";
            $result_set = $mysqli->query($chech_login);
            $result_set = $result_set->fetch_assoc();
            $error_list = '<div class="alert alert-danger" role="alert">';
            if($result_set != null){
                $error_list .="<p>Логин $login уже занят!</p>";
                $error = true;
            }
            if(strlen($login) > 10){
                $error_list .= "<p>Логин слишком длинный!</p>";
                $error = true;
            }
            $chech_email = "SELECT * FROM `user_list_of_school` WHERE `mail` = '$mail'";
            $result_set2 = $mysqli->query($chech_email);
            $result_set2 = $result_set2->fetch_assoc();
            if($result_set2 != null){
                $error_list .= "<p>Данная почта уже кем-то используется!</p>";
                $error = true;
            }
            if(!preg_match('/.*@.*\..*/',$mail)){
                $error_list .= "<p>Неверный формат email!</p>";
                $error = true;
            }
            if($_POST['password'] != $_POST['password2']){ 
                $error_list .= "<p>Пароли не совпадают!</p>";
                $error = true;
            }
            if(strlen($_POST['password']) < 8){
                $error_list .= "<p>Пароль должен содержать не менее 8 символов!</p>";
                $error = true;
            }
            $error_list .= '</div>';
            if(!$error){
                setcookie("login",$login,time()+60*60*24*30,"/");
                setcookie("password",$_POST['password'],time()+60*60*24*30,"/");
                $password = hash('md5',$password);
                $query = "INSERT INTO `user_list_of_school` (`id`, `login`, `mail`, `password`) VALUES (NULL, '$login', '$mail', '$password')";
                $mysqli->query($query);
                die("Регистрация прошла успешно!<br>Пройдите процедуру <a href = '/'>входа</a>");
            }
            else{
                echo $error_list;
            }
    }
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0-alpha.4/css/bootstrap.min.css" integrity="2hfp1SzUoho7/TsGGGDaFdsuuDL0LX2hnUp6VkX3CUQ2K4K+xjboZdsXyp4oUHZj" crossorigin="anonymous">
    <script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0-alpha.4/js/bootstrap.min.js" integrity="VjEeINv9OSwtWFLAtmc4JCtEJXXBub00gtSnszmspDLCtC0I4z4nqz7rEFbIZLLU" crossorigin="anonymous"></script>
    <title>Регистрация</title>
</head>
<body style = "padding:20px;">
    <div id = "reg_form">
        <form method = "POST" action = "/registration.php">
            <label for id = "login">Введите ваш логин</label><br>
            <input class="form-control" type = "text" id = "login" name = "login" placeholder = "Введите логин"><br>
            <label for id = "email">Введите ваш email</label><br>
            <input class="form-control" type = "text" id = "email" name = "email" placeholder = "Введите email"><br>
            <label for id = "password">Введите пароль</label><br>
            <input class="form-control" type = "password" id = "password" name = "password" placeholder = "Введите пароль"><br>
            <label for id = "password2">Введите пароль ещё раз</label><br>
            <input class="form-control" type = "password" id = "password2" name = "password2" placeholder = "Введите пароль ещё раз"><br>
            <input type = "submit" class="btn btn-primary" value = "Регистрация">
        </form>
    </div>
</body>
</html>