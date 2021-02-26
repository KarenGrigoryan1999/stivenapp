<?
$code = $_POST["data"];
$id = $_POST['id'];
file_put_contents("saves/$id.py",$code);
$output = "Изменения сохранены!";
print($output);