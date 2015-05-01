$(document).ready(function(){
    $("#run").click(function(){
    	reg = new Stack(5);
    	memory = new Array(40);
    	symbol_table = [];
		symbol_table['begin'] = 1000;
		symbol_table['end'] = 1011;
		symbol_table['mod'] = 1100;
		symbol_table['add'] = 1200;
		symbol_table['sub'] = 1300;
		symbol_table['cmp'] = 1400;

		symbol_table['pushi'] = 21;
		symbol_table['pushv'] = 22;
		symbol_table['pop'] = 42;
		symbol_table['read'] = 52;
		symbol_table['disp'] = 62;
		symbol_table['jmp'] = 63;
		symbol_table['jl'] = 73;
		symbol_table['jg'] = 83;
		symbol_table['jeq'] = 93;
    	$('#mach').text('');
    	$("#out").text('Run:');
    	$("#stack").text('');
        var code = $("#input").val();
        var out = translate(code);
        if (out instanceof Error) {
        	$("#out").append('<br>'+out);
        } else {
        	$("#mach").html(get_machine_code().join('<br>'));
        	var out2 = execute();
        	if (out2 instanceof Error) {
        		$("#out").append('<br>'+out2);

        	}
    	}
        $("#out").append("<br> Done.");
    });
	$("#translate").click(function(){
		console.log('init');
    	reg = new Stack(5);
    	memory = new Array(40);
    	symbol_table = [];
		symbol_table['begin'] = 1000;
		symbol_table['end'] = 1011;
		symbol_table['mod'] = 1100;
		symbol_table['add'] = 1200;
		symbol_table['sub'] = 1300;
		symbol_table['cmp'] = 1400;

		symbol_table['pushi'] = 21;
		symbol_table['pushv'] = 22;
		symbol_table['pop'] = 42;
		symbol_table['read'] = 52;
		symbol_table['disp'] = 62;
		symbol_table['jmp'] = 63;
		symbol_table['jl'] = 73;
		symbol_table['jg'] = 83;
		symbol_table['jeq'] = 93;
    	$('#mach').text('');
        var code = $("#input").val();
        var out = translate(code);
        if (out instanceof Error) {
        	$("#out").append('<br>'+out);
        } else {
        	$("#mach").html(get_machine_code().join('<br>'));
        }
    });
    $('#input').on('scroll', function () {
	    $('.line-nums').scrollTop($(this).scrollTop());
	});
});

function get_machine_code(){
	var mach = [];
	var i;
	for (var i = 0; i < 29 && memory[i] != 1011 && memory[i] != undefined; i++) {
		mach.push(memory[i]);
	}
	if (memory[i] == 1011) {
		mach.push(1011);
	}
	return mach;
}