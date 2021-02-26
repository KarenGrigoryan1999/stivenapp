<?
$code = $_POST["data"];
$id = $_POST['id'];
file_put_contents("studresponses/$id.py",$code);
$output = "Ответ отправлен!";
print($output);