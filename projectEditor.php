<?php 
$mysqli = new mysqli("localhost", "root", "1234567890", "codeschool");
if(!isset($_POST['login'])|| !isset($_POST['password'])){
  die("Нет данных!");
}
$login = $_POST['login'];
$chech_login = "SELECT * FROM `user_list_of_school` WHERE `login` = '$login'";
$result_set = $mysqli->query($chech_login);
$result_set = $result_set->fetch_assoc();
if($result_set == null) die("Пользователь не найден!");
if($result_set['password'] != hash('md5',$_POST['password'])) die("Неверный пароль!");
$id = $result_set['id'];
setcookie("login",$login,time()+60*60*24*30,"/");
setcookie("password",$_POST['password'],time()+60*60*24*30,"/");
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Выполнение задания - ProgramKids</title>
    <link rel="stylesheet" type="text/css" href="css/style.css">
    <link rel="stylesheet" type="text/css" href="css/editor.css">
    <link rel="stylesheet" href="/resources/demos/style.css">
</head>
<body>
<div id = "loading">
  <center>
    <p>Загрузка модулей...</p>
  </center>
</div>
<div id = "codeField">
    <div id = "leftPanel">
    <p id = "codeArea" contenteditable="true" spellcheck="false"></p>
  </div>
    <div id="splitter"></div>
    <div id = "rightPanel">
    <div class = "window-header">
      <h3>Окно консоли</h3>
    </div>
    <canvas id = "canvas"></canvas>
    <canvas id = "canvas2"></canvas>
    <textarea id = "debugArea" spellcheck="false"></textarea>
    </div>
    <script
  src="https://code.jquery.com/jquery-3.5.1.js"
  integrity="sha256-QWo7LDvxbWT2tbbQ97B53yJnYU3WhH/C8ycbRAkjPDc="
  crossorigin="anonymous"></script>
  <script src="https://code.jquery.com/ui/1.12.1/jquery-ui.js"></script>
    <script type="text/javascript" src="js/editor.js"></script>
    <script type="text/javascript" src="js/script.js"></script>
    <script type = "text/javascript" src = "https://cdnjs.cloudflare.com/ajax/libs/Caret.js/0.3.1/jquery.caret.min.js"></script>    
</div>
<div id = "codePanel">
    <?php
    echo "<button id = 'start' class = 'button compilation' onclick = 'clickOnByttonStart($id)'><img src = '/img/start.webp' width = '16px' style = 'padding-right:4px'>Пуск</button>";
    echo "<button id = 'save' class = 'button saving' onclick = 'buttonSaveClick($id)'><img src = '/img/save.webp' width = '16px' style = 'padding-right:4px'>Сохранить</button>";
    echo "<button id = 'send' class = 'button sending' onclick = 'buttonResponseClick($id)'><img src = '/img/send.webp' width = '16px' style = 'padding-right:4px'>Сдать</button>";
    echo "<button id = 'consoleButton' class = 'button sending' onclick = 'showConsole()'><img src = '/img/console.webp' width = '16px' style = 'padding-right:4px'>Консоль</button>";
    ?>
    <?php 
    echo "<p class = 'authorisation-login'><img src = '/img/i.webp' width = '18px'>$login</p>";
    echo "<p class = 'authorisation-id'>id: $id</p>";
    echo "<script>loadLastSaveCode($id);</script>";
    ?>
    </div>
    <div id = "autocomplite"></div>
</body>
</html>