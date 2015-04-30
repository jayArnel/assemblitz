$(document).ready(function(){
    $("#run").click(function(){
    	memory = new Array(40);
    	$('#mach').text('');
    	$("#out").text('');
    	$("#stack").text('');
        var code = $("#input").val();
        var out = translate(code);
        if (out instanceof Error) {
        	$("#out").text(out);
        } else {
        	$("#mach").html(memory.slice(0,29).join('<br>'));
        	execute();
    	}
    });
});