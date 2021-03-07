var variables = "";
var txt = "";
var ansver = "";
var backspaceCount = 0;
var buttonStart = document.getElementById("start");
var codeArea = document.getElementById("codeArea");
var debugArea = document.getElementById("debugArea");
var argum = 0;

//Функция нажатия непосредственно на кнопку
function clickOnByttonStart(arg){
    if($("#start").text()=="Пуск"){
        $("#start").html("<img src = '/img/stop.webp' width = '16px' style = 'padding-right:4px'>Стоп");
        if($("#rightPanel").css("display") == "none"){
            setTimeout(function(){
            $("#rightPanel").css("display","block");
            $("#rightPanel").css("width","100%");
            $("#rightPanel").css("margin-left","0");
            $("#leftPanel").css("display","none");
            canvasResize();
            },100);
        }
        buttonStartClick(arg);
    }else{
        ansver = "";
        variables = "";
        backspaceCount = 0;
        argum = 0;
        debugArea.value +="\n\n\n...Программа была прервана пользователем";
        $("#start").html("<img src = '/img/start.webp' width = '16px' style = 'padding-right:4px'>Пуск");
    }
}
function buttonStartClick(arg){
    argum = arg;
    var code = getCode().replace(/\u00A0/g," ").replace(/input\(/g,"inputTextReplaceFunction(");
    code = code.replace(/\n/g,"\n    ");
    code = "    "+code;
    code = "import traceback\ntry:\n"+code;
    code += "\nexcept (ValueError,ZeroDivisionError,TypeError,SyntaxError,OSError,NameError,KeyError,IndexError,ImportError,AttributeError):";
    code += "\n    print(\"\");print(\"\");print(\"\");print(traceback.format_exc());";
    code += "\nelse:\n    print(\"\");print(\"\");print(\"\");print(\"request code 0\");";
    $.post("/send.php",{data:code,param:variables,id:arg},function(data,textStatus,jqXHR){
        console.log(data);
        data = data.replace(/\[/,'');
        data = data.replace(/\]/,'');
        data = data.split(",");
        debugArea.value = "";
        for(i = 0; i < data.length-1; i++){
            if(data[i] == "\"Traceback (most recent call last):\"" && i != 0 && data[i-1] == "\"\""){
                data[i] = "";
                if(i+1 < data.length)data[i+1] = "";
                if(i+3 < data.length)data[i+3] = "";
                if(i+4 < data.length)data[i+4] = "";
                if(i+5 < data.length)data[i+5] = "";
            }
            if(data[i].match(/\sline.*?/) != null && i != 0 && data[i-1] == ""){
                let lineNum = parseInt(data[i].replace(" line ",""))-15;
                data[i] = "Error on line line "+lineNum;
            };
            debugArea.value += data[i].replace(/"/g,"")+"\n";
        }
        txt = debugArea.value;
        if(data.length == 1 && data[0] == 1){
            debugArea.value = "Error!";
        }else{
            if(data[data.length-1] == 1){
                $('#debugArea').focus();
                debugArea.setSelectionRange( debugArea.value.length-1, debugArea.value.length-1);
                if(ansver != ""){//
                setTimeout(function dd(ansver) {
                    //var getParam = '"'+prompt(data[data.length-2],"")+'"';                   
                    var getParam = '"'+ansver+'"';//
                    variables += getParam+" ";
                    buttonStartClick(arg);
                    ansver = "";//
                    backspaceCount = 0;//
                },100,ansver);
                ansver = "";//
            }//
            }else{
                go(data);
                $("#start").html("<img src = '/img/start.webp' width = '16px' style = 'padding-right:4px'>Пуск");
                //debugArea.value +="\n\n\n...Программа была завершена с кодом 0";
                variables = "";
            }
        }
    })
    canvasResize();
}
$('#debugArea').keydown(function(e){
    if(e.keyCode == 13){
        ansver = debugArea.value.slice(txt.length-1).replace("\n","").replace("\n","");
        buttonStartClick(argum);
    }
    if(e.keyCode == 8 && backspaceCount == 0){
        e.preventDefault();
    }
    if(e.keyCode != 8 && e.shiftKey == false && e.ctrlKey == false
        && e.keyCode != 37 && e.keyCode != 38 && e.keyCode != 39 && e.keyCode != 40){
        console.log("x");
        backspaceCount++;
    }else{
        var text = $(this).val();
        if (this.selectionStart != this.selectionEnd) {
            e.preventDefault();
            debugArea.setSelectionRange( debugArea.value.length-1, debugArea.value.length-1);
        }
    }
    if(e.keyCode == 8 && backspaceCount > 0){
        ansver = ansver.substring(0, ansver.length - 1);
        backspaceCount--;
    }
})

$('#debugArea').keyup(function(e){
    if(e.keyCode == 13){
    //ansver = debugArea.value.replace(txt,"").replace("\n","");
    console.log(debugArea.value);
    }
})
debugArea.onclick = function(){
    debugArea.setSelectionRange( debugArea.value.length-1, debugArea.value.length-1);
}
function buttonResponseClick(arg){
    $.post("/response.php",{data:getCode().replace(/\u00A0/g," "),id:arg},function(data,textStatus,jqXHR){
        alert(data);
    })
}
function buttonSaveClick(arg){
    $.post("/save.php",{data:getCode().replace(/\u00A0/g," "),id:arg},function(data,textStatus,jqXHR){
        alert(data);
    })
}
function loadLastSaveCode(arg){
    $.post("/getLastSaveCode.php",{id:arg},function(data,textStatus,jqXHR){
        if(data != ""){
            codeArea.innerText = data.replace(/ /g,"\u00A0");
        }else{
            codeArea.innerHTML = "'''Добро пожаловать в редактор кода!<br>Мы создали его чтобы тебе легче было проверять работоспособность своего говнокода<br>'''<br>print(\"hello world\")";
        }
        codeArea.onkeyup(0);
    })
}









var splitter,cont1,cont2;
var last_x,window_width;
function init()
{
  window_width=window.innerWidth;
  splitter=document.getElementById("splitter");
  cont1=document.getElementById("leftPanel");
  cont2=document.getElementById("rightPanel");
  var dx=cont1.clientWidth;
  splitter.style.marginLeft=dx+"px";
  dx+=splitter.clientWidth;
  cont2.style.marginLeft=dx+"px";
  dx=window_width-dx;
  cont2.style.width=dx+"px";
  splitter.addEventListener("mousedown",spMouseDown);
  canvasResize();
}

function spMouseDown(e)
{
  splitter.removeEventListener("mousedown",spMouseDown);
  window.addEventListener("mousemove",spMouseMove);
  window.addEventListener("mouseup",spMouseUp);
  last_x=e.clientX;
}

function spMouseUp(e)
{
  window.removeEventListener("mousemove",spMouseMove);
  window.removeEventListener("mouseup",spMouseUp);
  splitter.addEventListener("mousedown",spMouseDown);
  resetPosition(last_x);
}

function spMouseMove(e)
{
  resetPosition(e.clientX);
}

function resetPosition(nowX)
{
  var dx=nowX-last_x;
  dx+=cont1.clientWidth;
  cont1.style.width=dx+"px";
  splitter.style.marginLeft=dx+"px";
  dx+=splitter.clientWidth;
  cont2.style.marginLeft=dx+"px";
  dx=window_width-dx;
  cont2.style.width=dx+"px";
  last_x=nowX;
}
$(window).resize(doSomethingUseful);
function doSomethingUseful() {
    init();
  }
  window.onload = function() {
    init();
    $("#codeField").css("visibility","visible");
    $("#loading").css("display","none");
 };

 
 var canvas = document.getElementById("canvas");
 var cont = canvas.getContext("2d");
 var canvas2 = document.getElementById("canvas2");
 var context2 = canvas2.getContext("2d");
 function canvasResize(){
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
    canvas2.width = canvas2.offsetWidth;
    canvas2.height = canvas2.offsetHeight;
 }
 canvasResize();
 var x = 10;
 var y = 10;
 var animCounter = 0;
 function go(path){
    cont.fillStyle = "white";
    cont.fillRect(x, y, 30, 30);
     x = 0;
     y = 90;
     animCounter = 0;
 for(var i = 0; i < path.length; i++){
    var str = path[i];
    str = str.replace(/"/g,'');
    str = str.split(' ');
    for(var j = 0; j < parseInt(str[1]);j++){
        animCounter++;
        setTimeout( function timer(sstr){
        if(sstr[3] == "True"){
            cont.fillStyle = sstr[4];
            cont.clearRect(x+15,y+15,1,1);
            cont.fillRect(x+15, y+15, 1, 1);
        }
        if(sstr[0] == "right"){x++;}
        else if(sstr[0] == "left") {x--;}
        else if(sstr[0] == "up"){y--;}
        else if(sstr[0] == "down") {y++;}
        var img = new Image();
        img.src = "img\\"+sstr[0]+".png";
        img.onload = function(){
            context2.clearRect(x-1,y-1,50,50);
            context2.drawImage(img,x,y,30,30);
        }
        }, (animCounter)*(str[2]),str);
    }
 }
 }

 function showConsole(){
     if($("#debugArea").css("display") == "none"){
        $("#debugArea").css("display","block");
        $("#canvas").css("display","none");
        $("#canvas2").css("display","none");
        $("#consoleButton").html("<img src = '/img/up.png' width = '16px' style = 'padding-right:4px'>Графика");
     }else{
        $("#debugArea").css("display","none");
        $("#canvas").css("display","block");
        $("#canvas2").css("display","block");
        $("#consoleButton").html("<img src = '/img/console.webp' width = '16px' style = 'padding-right:4px'>Консоль");
     }
 }
$("#debugArea").css("display","none");

var xx = 0;
var yy = 90;
function funcff(ang,forward){
    var w = Math.round(Math.sin(ang*Math.PI/180)*forward);
    var h = Math.round(Math.cos(ang*Math.PI/180)*forward);
    var bool = true;
    if(w<h) bool = false;
    var otnoshenie = Math.round(Math.abs(w/h));
    if(!bool) otnoshenie = Math.round(Math.abs(h/w));
    var temp;
    for(var i = 0; i < forward;i++){
        if(bool){
            if(otnoshenie == temp){
                xx+= (w/h < 0)?-1:+1;
                temp = 0;
            }else temp++;
            yy++;
        }
        if(!bool){
            if(otnoshenie == temp){
                yy++;
                temp = 0;
            }else temp++;
            xx++;
        }
    }
}