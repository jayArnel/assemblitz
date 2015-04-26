//Data Structures
var symbol_table = [];

symbol_table['begin'] = 1000;
symbol_table['end'] = 1111;
symbol_table['mod'] = 2100;
symbol_table['add'] = 2200;
symbol_table['sub'] = 2300;
symbol_table['cmp'] = 2400;

symbol_table['push'] = 41;
symbol_table['pop'] = 42;
symbol_table['read'] = 52;
symbol_table['disp'] = 62;
symbol_table['jmp'] = 63;
symbol_table['jl'] = 73;
symbol_table['jg'] = 83;
symbol_table['jeq'] = 93;

var memory = new Array(40);

var label_queue = [];


// var code = "begin \n \
// \n \
// \n \
// \n \
// read N \n\
// push N \n\
// push 2 \n\
// mod \n\
// \n \
// push 0\n\
// jeq even\n\
// push 0\n\
// pop ans\n\
// jmp stop\n\
// even:\n\
// push 1\n\
// pop ans\n\
// stop:\n\
// disp ans\n\
// end";