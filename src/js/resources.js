//Data Structures
var reg = new Stack(5);
var symbol_table = [];

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

var memory = new Array(40);

var methods = ['begin', 'end', 'mod', 'add', 'sub', 'cmp', 'pushi',
	'pushv', 'pop','read', 'disp', 'jmp', 'jl', 'jg','jeq'];