//Data Structures
var reg;
var symbol_table;
var memory;
var methods = ['begin', 'end', 'mod', 'add', 'sub', 'cmp', 'pushi',
	'pushv', 'pop','read', 'disp', 'jmp', 'jl', 'jg','jeq'];

$(document).ready(function(){
    $("#run").click(function(){
    	init();
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
		init();
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

/***** Objects *****/
function Error(name, line){
    this.verbose = name;
    this.line = line;
}

Error.prototype.toString = function(){
    return "Error: "+this.verbose + ". Line " + this.line;
}

function Stack(cap) {
    this.cap = cap;
    this.stack = [];

    this.push = function(e) {
        if (this.stack.length + 1 > cap) {
            return new Error('Stack Overflow');
        } else {
            this.stack.push(e);
        }
    }

    this.pop = function(e) {
        if (this.stack.length == 0) {
            return new Error('Empty Stack');
        } else {
            return this.stack.pop();
        }
    }
}

var commands = []
function Command(line, command) {
    this.index = null;
    this.line = line;
    this.params = [];
    var tokens = command.split(' ');
    this.name = tokens[0].toLowerCase();
    for (var i = 1; i < tokens.length; i++){
        if (tokens[i].length > 0) {
            this.params.push(tokens[i]);
        }
    }
    this.command = this.name +" "+ this.params.join(' ');
    this.num_of_params = function(){
        this.params.length;
    }
    commands.push(this);
}

/****  end of Objets *****/

/*** functions ***/
function init() {
	reg = new Stack(5);
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

	memory = new Array(40);
	$('#mach').text('');
	$("#out").text('');
	$("#stack").text('');
}

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

