<?php 
$login = "dddd";
$id = 1;
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
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
    <p id = "codeArea" contenteditable="true" spellcheck="false">
    '''Добро пожаловать в редактор кода!<br>Мы создали его чтобы тебе легче было проверять работоспособность своего говнокода<br>'''<br>print("hello world")
    </p></div>
    <div id="splitter"></div>
    <div id = "rightPanel" style = "width:42%;height:100%;display:block;float: left;position: absolute;min-width: 200px;">
    <div class = "window-header">
      <h3>Окно консоли</h3>
    </div>
    <canvas id = "canvas"></canvas>
    <textarea id = "debugArea" spellcheck="false"></textarea>
    </div>
    <script
  src="https://code.jquery.com/jquery-3.5.1.js"
  integrity="sha256-QWo7LDvxbWT2tbbQ97B53yJnYU3WhH/C8ycbRAkjPDc="
  crossorigin="anonymous"></script>
  <script src="https://code.jquery.com/ui/1.12.1/jquery-ui.js"></script>
    <script type="text/javascript" src="js/editor.js"></script>
    <script type="text/javascript" src="js/script.js"></script>    
</div>
<div id = "codePanel">
    <?php
    echo "<button id = 'start' class = 'button compilation' onclick = 'buttonStartClick($id)'><img src = '/img/start.webp' width = '16px' style = 'padding-right:4px'>Пуск</button>";
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
</body>
</html>