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
// Errors


//compiler errors
var unknown_method_error = new Error('Unknown Method Error');
var operand_error = new Error('Operand Error');

//runtime errors
var stack_overflow_error = new Error('Stack Overflow Error');
var empty_stack_error = new Error('Empty Stack Error');
var null_operand_error = new Error('Null Operand Error');
var null_compare_error = new Error('Null Compare Error');
var overflow_error = new Error('Overflow Error');
var missing_begin_error = new Error('Missing Begin Error');
var misplaced_begin_error = new Error('Misplaced Begin Error');

//end of errors


var code = "begin \n \
read N \n\
push N \n\
push 2 \n\
mod \n\
\n \
push 0\n\
jeq even\n\
push 0\n\
pop ans\n\
jmp stop\n\
even:\n\
push 1\n\
pop ans\n\
stop:\n\
disp ans\n\
end";