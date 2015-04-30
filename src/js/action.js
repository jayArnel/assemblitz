$(document).ready(function(){
    $("#run").click(function(){
        var code = $("#input").val();
        translate(code);
        alert(code);
        execute();
    });
});