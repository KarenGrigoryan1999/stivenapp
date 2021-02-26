
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

import turtle
t = turtle.Turtle(10,True)
a = 2
while a > 0:
    t.right(100)
    t.down(100)
    t.left(100)
    t.up(100)
    a-=1
