        var codeArea = document.getElementById("codeArea");
        var codeAreaLength = codeArea.innerText.length;
        var enter = false;
        var space = false;
        var ent = 0;
        var tab = 0;
        var wqw = false;

        codeArea.onclick = function(){
            enter = false;
            space = false;
            ent = 0;
            tab = 0;
        }
        //codeArea.onkeydown = function(e){
            //codeAreaLength = codeArea.innerText.length; 
        //}
        function createTab(){
            var editor = document.getElementById("codeArea");
            var doc = editor.ownerDocument.defaultView;
            var sel = doc.getSelection();
            var range = sel.getRangeAt(0);
    
            var tabNode = document.createTextNode("\u00a0\u00a0\u00a0\u00a0");
            range.insertNode(tabNode);
    
            range.setStartAfter(tabNode);
            range.setEndAfter(tabNode); 
            sel.removeAllRanges();
            sel.addRange(range);
        }
        document.getElementById('codeArea').addEventListener('keydown', function(e) {
            var keyCode = e.keyCode || e.which; 
 
            if (e.keyCode === 9) { // tab key
                tab++;
                e.preventDefault();
                createTab();
            }
          });




        codeArea.onkeyup = function(e){    
            //alert(e.keyCode);
            codeAreaLength = codeArea.innerText.length;
            if(e.keyCode == 13){ ent++;
            if(ent > 0 && tab > 0){
                for(let i = 0; i < tab; i++){
                    createTab();
                }
            }
        }
            if(e.keyCode == 8 && tab > 0){tab = 0;}
            if(e.keyCode != 18 && e.keyCode != 37 && e.keyCode != 38 && e.keyCode != 39 && e.keyCode != 40 && e.keyCode != 37
            && e.keyCode != 13 && e.keyCode != 8 && e.keyCode != 16 && (e.keyCode != 17 && e.keyCode != 65)
            && (e.keyCode != 90 && e.keyCode != 17)&& (e.keyCode != 88 && e.keyCode != 17) && (e.keyCode != 67 && e.keyCode != 17)){ 
            if(e.keyCode != 13 && e.keyCode != 32) enter = false;         
            if(e.keyCode == 13 && getCaretCharacterOffsetWithin(codeArea) == codeArea.innerText.replace(/\n/g,"").length){
            let pos = getCaretCharacterOffsetWithin(codeArea); 
            codeArea.innerHTML = codeArea.innerHTML+" ";
            setCurrentCursorPosition(pos+6);
            }else{
            let pos = getCaretCharacterOffsetWithin(codeArea);
            codeArea.innerHTML = codeArea.innerHTML.replace(/<\/div><div>/g,"");
            codeArea.innerHTML = codeArea.innerHTML.replace(/<br><div>/g,"<br>");
            codeArea.innerHTML = codeArea.innerHTML.replace(/<div><br><\/div>/g,"<br>");
            setCurrentCursorPosition(pos+5);
            var code = codeArea.innerText;
            //alert(code);
            var txt6 = [];
            txt6 = txt6.concat(code.match(/[0-9]/g));
            var trueFalse = code.match(/\bTrue|False\b/g);
            if(trueFalse != null) txt6 = txt6.concat(trueFalse);
            if(txt6 != null){
                for(var i = 0; i < txt6.length; i++){
                    code = code.replace(new RegExp(String.raw`${txt6[i]}`,'g'),"<span class ='numbers'>"+txt6[i]+"</span>").replace(/\n/g,"<br>").replace(/<div>/g,"").replace(/<\/div>/g,"");
                } 
            }
            var txt3 = [];
            txt3 = txt3.concat(code.match(/\bfor\b/g));
            let inputIO = code.match(/\b(from|as|break|while|else|import|def|if|in|print|input|range)\b/g);
            if(inputIO != null) txt3 = txt3.concat(inputIO);
            if(txt3 != null){
                for(var i = 0; i < txt3.length; i++){
                    code = code.replace(new RegExp(String.raw`\b${txt3[i]}\b`,'g'),"<span class ='func'>"+txt3[i]+"</span>").replace(/\n/g,"<br>").replace(/<div>/g,"").replace(/<\/div>/g,"");
                } 
            }
            //alert(code);
            var txt1 = [];
            txt1 = txt1.concat(code.match(/\".*?\"/g));      
            if(txt1 != null && txt1[0] != null){
                for(var i = 0; i < txt1.length; i++){
                    let removeHTML = txt1[i].replace(/\<span.*?\>/g,"");
                    removeHTML = removeHTML.replace(/<\/span>/g,"");
                    txt1[i] = txt1[i].replace(/\(/g,"\\(").replace(/\)/g,"\\)").replace(/\"/g,'\\"').replace(/\./g,'\\.').replace(/\=/g,'\\=');               
                    code = code.replace(new RegExp(String.raw`${txt1[i]}`,'g'),"<span class ='simpletext'>"+removeHTML+"</span>").replace(/\n/g,"<br>");
                }
            }     
            let variant2 = code.match(/\'\'\'[^\=].*?\'\'\'(?!\>)/g);
            if(variant2 != null && variant2[0] != null){
                for(var i = 0; i < variant2.length; i++){
                    let removeHTML = variant2[i].replace(/\<span.*?\>/g,"");
                    removeHTML = removeHTML.replace(/<\/span>/g,"");
                    variant2[i] = variant2[i].replace(/\(/g,"\\(").replace(/\)/g,"\\)").replace(/\"/g,'\\"').replace(/\./g,'\\.').replace(/\=/g,'\\=');               
                    code = code.replace(new RegExp(String.raw`${variant2[i]}`,'g'),"<span class ='simpletext'>"+removeHTML+"</span>").replace(/\n/g,"<br>");
                }
            } 
            //alert(code);
            var txt4 = code.match(/#.*?(?=\<br\>)/g);
            //console.log(code);
            console.log(txt4);
            if(txt4 != null){
                for(var i = 0; i < txt4.length; i++){
                    let removeHTML = txt4[i].replace(/\<span.*?\>/g,"");
                    removeHTML = removeHTML.replace(/<\/span>/g,"");
                    txt4[i] = txt4[i].replace(/\(/g,"\\(").replace(/\)/g,"\\)").replace(/\"/g,'\\"').replace(/\./g,'\\.').replace(/\=/g,'\\=');  
                    code = code.replace(new RegExp(String.raw`${txt4[i]}`,'g'),"<span class ='comment'>"+removeHTML+"</span>").replace(/\n/g,"<br>").replace(/<div>/g,"").replace(/<\/div>/g,"");
                } 
            }  
            if(txt1 != null || /*txt2 != null ||*/ txt3 != null || txt4 != null || txt6 != null || variant2 != null){
                let pos = getCaretCharacterOffsetWithin(codeArea);  
                code = code.replace(/\<br\>\<br\>/g,"<br> <br>");
                //code = code.replace(/\s/g," ");
                //code = code.replace(/\s/g,"&ensp;");
                codeArea.innerHTML = code;
                //console.log(code+"\n---"+code.replace(/ <br><br>/g," <br>"));
                if(ent > 1){
                    if(ent > 4) setCurrentCursorPosition(pos+5+ent+(ent-3));
                    else
                    setCurrentCursorPosition(pos+6);
                    ent = 0;
                }else{
                if(e.keyCode == 13){ wqw = true;setCurrentCursorPosition(pos+6);}
                else{
                    ent = 0;
                    if(space){
                        setCurrentCursorPosition(pos+5);
                            enter = space = false;
                    }
                    else{
                        if(wqw == true){
                            setCurrentCursorPosition(pos+4);
                            wqw = false;
                        }else
                    setCurrentCursorPosition(pos+5);
                    }
                }
            }//
            }
        }
        }

        }
        codeArea.oninput = function(){
            if(codeArea.innerText.length>codeAreaLength+2){
                codeArea.onkeyup(0);
            }
            if(codeArea.innerText.length==codeAreaLength+1){
                codeAreaLength = codeArea.innerText.length+1;
                if(getCharacterPrecedingCaret(codeArea) == '('){
                    document.execCommand('insertHTML',false,')');
                    let pos = getCaretCharacterOffsetWithin(codeArea);
                    setCurrentCursorPosition(pos+4);
                }
                if(getCharacterPrecedingCaret(codeArea) == '<'){
                    document.execCommand('insertHTML',false,'>');
                    let pos = getCaretCharacterOffsetWithin(codeArea);
                    setCurrentCursorPosition(pos+4);
                }
                if(getCharacterPrecedingCaret(codeArea) == '{'){
                    document.execCommand('insertHTML',false,'}');
                    let pos = getCaretCharacterOffsetWithin(codeArea);
                    setCurrentCursorPosition(pos+4);
                }
                if(getCharacterPrecedingCaret(codeArea) == '"'){
                    document.execCommand('insertHTML',false,'"');
                    let pos = getCaretCharacterOffsetWithin(codeArea);
                    setCurrentCursorPosition(pos+4);
                }
            }
            $("#autocomplite").css("top",$('#codeArea').caret('position')['top']);
            $("#autocomplite").css("left",$('#codeArea').caret('position')['left']);
        }

        function insertAtCursor(myField, myValue) { 
            //IE support 
            if (document.selection) { 
                myField.focus(); 
                sel = document.selection.createRange(); 
                sel.text = myValue; 
            }
                //Mozilla/Firefox/Netscape 7+ support 
            else if (myField.selectionStart || myField.selectionStart == '0'){  
                var startPos = myField.selectionStart; 
                var endPos = myField.selectionEnd; 
                myField.value = myField.value.substring(0, startPos)+ myValue 
                     + myField.value.substring(endPos, myField.value.length); 
                } else { 
                    myField.value += myValue; 
                } 
            }

        function getCaretCharacterOffsetWithin(element) {
            var caretOffset = 0;
            var doc = element.ownerDocument || element.document;
            var win = doc.defaultView || doc.parentWindow;
            var sel;
            if (typeof win.getSelection != "undefined") {
                sel = win.getSelection();
                if (sel.rangeCount > 0) {
                    var range = win.getSelection().getRangeAt(0);
                    var preCaretRange = range.cloneRange();
                    preCaretRange.selectNodeContents(element);
                    preCaretRange.setEnd(range.endContainer, range.endOffset);
                    caretOffset = preCaretRange.toString().length;
                }
            } else if ( (sel = doc.selection) && sel.type != "Control") {
                var textRange = sel.createRange();
                var preCaretTextRange = doc.body.createTextRange();
                preCaretTextRange.moveToElementText(element);
                preCaretTextRange.setEndPoint("EndToEnd", textRange);
                caretOffset = preCaretTextRange.text.length;
            }
            return caretOffset;
        }
        function createRange(node, chars, range) {
            if (!range) {
                range = document.createRange()
                range.selectNode(node);
                range.setStart(node, 0);
            }

            if (chars.count === 0) {
                range.setEnd(node, chars.count);
            } else if (node && chars.count >0) {
                if (node.nodeType === Node.TEXT_NODE) {
                    if (node.textContent.length < chars.count) {
                        chars.count -= node.textContent.length;
                    } else {
                        range.setEnd(node, chars.count);
                        chars.count = 0;
                    }
                } else {
                    for (var lp = 0; lp < node.childNodes.length; lp++) {
                    range = createRange(node.childNodes[lp], chars, range);

                    if (chars.count === 0) {
                        break;
                    }
                    }
                }
            } 

            return range;
        };

function setCurrentCursorPosition(chars) {
    if (chars >= 0) {
        var selection = window.getSelection();

        range = createRange(document.getElementById("codeArea").parentNode, { count: chars });

        if (range) {
            range.collapse(false);
            selection.removeAllRanges();
            selection.addRange(range);
        }
    }
};
function getCharacterPrecedingCaret(containerEl) {
    var precedingChar = "", sel, range, precedingRange;
    if (window.getSelection) {
        sel = window.getSelection();
        if (sel.rangeCount > 0) {
            range = sel.getRangeAt(0).cloneRange();
            range.collapse(true);
            range.setStart(containerEl, 0);
            precedingChar = range.toString().slice(-1);
        }
    } else if ( (sel = document.selection) && sel.type != "Control") {
        range = sel.createRange();
        precedingRange = range.duplicate();
        precedingRange.moveToElementText(containerEl);
        precedingRange.setEndPoint("EndToStart", range);
        precedingChar = precedingRange.text.slice(-1);
    }
    return precedingChar;
}
function getCode(){
    return codeArea.innerText;
}
$('body').on('paste',function(e) {
    //codeArea.onkeyup(0);
});
codeArea.onkeyup(0);