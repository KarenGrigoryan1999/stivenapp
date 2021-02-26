var variables = "";
var txt = "";
var ansver = "";
var backspaceCount = 0;
var buttonStart = document.getElementById("start");
var codeArea = document.getElementById("codeArea");
var debugArea = document.getElementById("debugArea");
var argum = 0;

function buttonStartClick(arg){
    argum = arg;
    var code = getCode().replace(/\u00A0/g," ").replace(/input\(/g,"inputTextReplaceFunction(");
    //console.log(code);
    $.post("/send.php",{data:code,param:variables,id:arg},function(data,textStatus,jqXHR){
        data = data.replace(/\[/,'');
        data = data.replace(/\]/,'');
        data = data.split(",");
        debugArea.value = "";
        for(i = 0; i < data.length-1; i++){
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
                setTimeout(() => {
                    //var getParam = '"'+prompt(data[data.length-2],"")+'"';                   
                    var getParam = '"'+ansver+'"';//
                    variables += getParam+" ";
                    buttonStartClick(arg);
                    ansver = "";//
                    backspaceCount = 0;//
                },100);
            }//
            }else{
                console.log(data);
                go(data);
                debugArea.value +="\n\n\n...Программа была завершена с кодом 0";
                variables = "";
            }
        }
    })
    canvasResize();
}
$('#debugArea').keydown(function(e){
    if(e.keyCode == 13){
        buttonStartClick(argum);
    }
    if(e.keyCode == 8 && backspaceCount == 0){
        e.preventDefault();
    }
    if(e.keyCode != 8){
        backspaceCount++;
    }
    if(e.keyCode == 8 && backspaceCount > 0){
        ansver = ansver.substring(0, ansver.length - 1);
        backspaceCount--;
    }
})

$('#debugArea').keyup(function(e){
    if(e.keyCode == 13){
    //ansver = debugArea.value.replace(txt,"").replace("\n","");
    ansver = debugArea.value.slice(txt.length-1).replace("\n","").replace("\n","");
    console.log(variables);
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
            console.log(codeArea.innerText);
            codeArea.onkeyup(0);
        }
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
 function canvasResize(){
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
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
    str = str.replace(/\"/g,'');
    str = str.split(' ');
    for(var j = 0; j < parseInt(str[1]);j++){
        animCounter++;
        setTimeout( function timer(sstr){
        cont.fillStyle = (sstr[3] == "True")?"gray":"white";
        cont.fillRect(x, y, 30, 30);
        if(sstr[0] == "right"){x++;}
        else if(sstr[0] == "left") {x--;}
        else if(sstr[0] == "up"){y--;}
        else if(sstr[0] == "down") {y++;}
        var img = new Image();
        img.src = "img\\"+sstr[0]+".png";
        img.onload = function(){cont.drawImage(img,x,y,30,30);}
        }, (animCounter)*(str[2]),str);
    }
 }
 }

 function showConsole(){
     if($("#debugArea").css("display") == "none"){
        $("#debugArea").css("display","block");
        $("#canvas").css("display","none");
        $("#consoleButton").html("<img src = '/img/up.png' width = '16px' style = 'padding-right:4px'>Графика");
     }else{
        $("#debugArea").css("display","none");
        $("#canvas").css("display","block");
        $("#consoleButton").html("<img src = '/img/console.webp' width = '16px' style = 'padding-right:4px'>Консоль");
     }
 }
$("#debugArea").css("display","none");