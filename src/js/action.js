$(document).ready(function(){
    $("#run").click(function(){
    	console.log(Command.prototype);
    	memory = new Array(40);
    	$('#mach').text('');
    	$("#out").text('');
    	$("#stack").text('');
        var code = $("#input").val();
        var out = translate(code);
        if (out instanceof Error) {
        	$("#out").text(out);
        } else {
        	$("#mach").html(get_machine_code().join('<br>'));
        	var out2 = execute();
        	if (out2 instanceof Error) {
        		$("#out").text(out2);
        	}
    	}
    });
});

function get_machine_code(){
	var mach = [];
	for (var i = 0; i < 29 && memory[i] != 1011 && memory[i] != undefined; i++) {
		mach.push(memory[i]);
	}
	return mach;
}