
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

import traceback
try:
    import turtle
    t = turtle.Turtle(10)
    t.angle(37)
    t.tracing(True)
    t.setcolor("blue")
    t.right(100)
    t.down(100)
    t.left(100)
    t.angle(103)
    t.tracing(False)
    t.up(200)
except (ValueError,ZeroDivisionError,TypeError,SyntaxError,OSError,NameError,KeyError,IndexError,ImportError,AttributeError):
    print("");print("");print("");print(traceback.format_exc());
else:
    print("");print("");print("");print("request code 0");