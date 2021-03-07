<?php
$code = $_POST["data"];
file_put_contents("codes/file.cpp",$code);
$command = escapeshellcmd("g++ ".__DIR__."/codes/file.cpp -o ".__DIR__."/codes/file");
$command = escapeshellcmd(__DIR__."/codes/file");
exec($command,$output,$out);
$command = escapeshellcmd(__DIR__."/codes/file");
exec($command,$output,$out);
$output[count($output)] = $out;
$output = json_encode($output);