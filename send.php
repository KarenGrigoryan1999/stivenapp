<?php
$firstCode = "
import sys
arg_counter = 0
def inputTextReplaceFunction(getinputstring):
    global arg_counter
    if arg_counter == len(sys.argv)-1:
        input(getinputstring)
    else:
        arg_counter+=1
        sys.stdout.write(getinputstring)
        print(sys.argv[arg_counter])#
        return sys.argv[arg_counter]       
\n";
$code = $firstCode.$_POST["data"];
$id = $_POST['id'];
file_put_contents("codes/$id.py",$code);
$command = escapeshellcmd("python3 "+__DIR__."/codes/$id.py ".$_POST['param']);
exec($command,$output,$out);
$output[count($output)] = $out;
$output = json_encode($output);
print($output);