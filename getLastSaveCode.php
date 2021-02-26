<?
$id = $_POST['id'];
if(file_exists("saves/$id.py") )
$output = file_get_contents("saves/$id.py");
else
	$output = null;
print($output);