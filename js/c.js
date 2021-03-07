var start = $("#start");
var codeArea = document.getElementById("codeArea");
start.click(function(){
    var code = codeArea.value;
$.post("/sendc.php",{data:code},function(data,textStatus,jqXHR){
    console.log(data);
})
});