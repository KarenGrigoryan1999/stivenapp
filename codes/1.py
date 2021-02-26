
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

'''Добро пожаловать в редактор кода!
Мы создали его чтобы тебе легче было проверять работоспособность своего говнокода
'''
print("hello world")