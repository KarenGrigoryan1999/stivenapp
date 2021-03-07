class Turtle(object):
        def __init__(self, speed):
            self.speed = speed
            self.trace = False
            self.color = "gray"
            self.ang = 90
        
        def tracing(self,trace):
            self.trace = trace
        
        def setcolor(self,color):
            self.color = color
        
        def left(self,path):
            print("left",path,self.speed,self.trace,self.color,self.ang)
        
        def right(self,path):
            print("right",path,self.speed,self.trace,self.color,self.ang)
            
        def up(self,path):
            print("up",path,self.speed,self.trace,self.color,self.ang)
            
        def down(self,path):
            print("down",path,self.speed,self.trace,self.color,self.ang)
        
        def angle(self,_ang):
            self.ang = _ang