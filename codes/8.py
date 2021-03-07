
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

'''
Грёбанная черепашка
'''
import turtle
'''for i in range(10,14):'''
    #print("dd")
for i in range(1,3):
    t = turtle.Turtle(10)
    t.tracing(True)
    t.setcolor("white")
    t.right(150)
    t.setcolor("red")
    '''t.right(50)
    t.down(50)
    t.left(50)
    t.up(80)'''
    t.setcolor("white")
    t.up(40)
    t.right(100)
    '''t.down(150)
    t.left(50)
    t.setcolor("green")
    t.down(100)
    t.up(50)
    t.left(50)
    t.right(50)'''
    t.up(30)
    t.right(80)
    t.tracing(False)
    t.right(30)
