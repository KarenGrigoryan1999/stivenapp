
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
    t.right(50)
    t.up(50)
    t.left(50)
    t.down(50)
    t.down(50)
    a -= 1
t.right(150)
t.down(50)
print("hello world!")


while a > 0:
    t.right(50)
    t.up(50)
    t.left(50)
    t.down(50)
    t.down(50)
    a -= 1
t.right(150)
t.down(50)
print("hello world!")




#a = inputTextReplaceFunction("vvedi a:")
for i in range(1,5):
    print(i)
    print(i+1)
    for j in range(1,5):
        print("hello",j)
print("thank you!")
t.right(150)
t.down(50)
print("my name is Karen")
print("I made this code editor for you!")
print("hello world!")
#a = inputTextReplaceFunction("vvedi a:")
for i in range(1,5):
    print(i)
    print(i+1)
    for j in range(1,5):
        print("hello",j)
print("thank you!")
for i in range(1,15):
    print("this number is eq",i)
a = 15
while a > 0:
    print(a)
    a -= 1

