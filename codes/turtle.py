class Turtle(object):
        def __init__(self, speed, trace):
            self.speed = speed
            self.trace = trace
        
        def left(self,path):
            print("left",path,self.speed,self.trace)
        
        def right(self,path):
            print("right",path,self.speed,self.trace)
            
        def up(self,path):
            print("up",path,self.speed,self.trace)
            
        def down(self,path):
            print("down",path,self.speed,self.trace)