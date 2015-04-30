// translate(code);
// console.log('Symbol Table');
// for (i in symbol_table) {
//     console.log(i+": " +symbol_table[i]);
// }
// console.log('RAM');
// for (j in memory) {
//     console.log(j+": " +memory[j]);
// }

// execute();

console.log('RAM');
for (j in memory) {
    console.log(j+": " +memory[j]);
}
function clean_code(code) {
    var clean = [];
    var lines = code.split('\n');
    for (i in lines) {
        var l = lines[i].trim();
        if (l.length > 0) {
            clean.push(new Command(i, l));
        }
    }
    return clean;
}

function add_labels(lines) {
    for (i in lines){
        var command = lines[i];
        var name = command.name;
        if (name.charAt(name.length - 1) == ':'){
            var label = name.substring(0, name.length - 1);
            symbol_table[label] = 91 + i;
            symbol_table[91 + i] = +i;
        }
    }
}

function translate(code) {
    var lines = clean_code(code);
    add_labels(lines);
    for (i in lines) {
        var command = lines[i];
        var name = command.name;
        if (isMethod(name)) {  
            if (no_param(name)) {
                if (command.num_of_params > 0) {
                    return new Error("Unsupported Operand", command.line);
                } else {
                    memory[i] = symbol_table[name];
                }
            } else if (has_param(name)){
                if (command.num_of_params > 1) {
                    return new Error("Unsupported Multiple Operand", command.line);
                } else if (command.num_of_params == 0) {
                    return new Error("Missing Operand", command.line);
                } else {
                    var param = command.params[0];
                    if (var_param(name) && num_param(name)){
                        if (!isNaN(param)) {
                            memory[i] = (symbol_table[name]+1) * 100 + (+param);
                        } else {
                            var mem = register(param);
                            memory[i] = (symbol_table[name]+2) * 100 + mem;
                        } 
                    } else if (var_param(name)) {
                        var mem = register(param);   
                        memory[i] = symbol_table[name] * 100 + mem;
                    } else if (label_param(name)){
                        memory[i] = symbol_table[name] * 100 + (+(symbol_table[param]-9100));
                    }
                }
            }
        } else if (isLabel(name)) {
            name = name.substring(0, name.length - 1);
            memory[i] = symbol_table[name];
        } else {
            return new Error("Unsupported Method", command.line);
        }
    }   
}

function execute() {
    if (memory[0] != 1000) {
        return new Error("Missing BEGIN Statement");
    } else {
        console.log('begin');
    }
    for (var i = 1; i < 29 && +memory[i] != 1011; i++) {
        var code = memory[i];
        var method = +(code.toString().substring(0,2));
        var param = +(code % 100);
        if (method == 11) {
            console.log('mod');
            var arg2 = reg.pop();
            var arg1 = reg.pop();
            reg.push(arg1 % arg2);
        } else if (method == 12) {
            console.log('add');
            var arg2 = reg.pop();
            var arg1 = reg.pop();
            reg.push(arg1 + arg2);
        } else if (method == 13) {
            console.log('sub');
            var arg2 = reg.pop();
            var arg1 = reg.pop();
            reg.push(arg1 - arg2);
        } else if (method == 14){
            conosle.log('cmp');
            var arg2 = reg.pop();
            var arg1 = reg.pop();
            reg.push(arg1 == arg2);
        } else if (method == 21) {
            console.log('pushi');
            reg.push(param);
        } else if (method == 22) {
            console.log('pushv');
            var val = memory[param];
            reg.push(val);
        } else if (method == 42) {
            console.log('pop');
            var val = reg.pop();
            memory[param] = val;
        } else if (method == 52) {
            console.log('read');
            var val = prompt("Input:");
            memory[param] = val;
        } else if (method == 62) {
            console.log('disp');
            console.log(memory[param]);
        } else if (method == 63) {
            console.log('jmp');
            i = param;
        } else if (method == 73) {
            console.log('jl');
            var arg2 = reg.pop();
            var arg1 = reg.pop();
            if (arg2 < arg1) {
                i = param;
            }
        } else if (method == 83) {
            console.log('jg');
            var arg2 = reg.pop();
            var arg1 = reg.pop();
            if (arg2 > arg1) {
                i = param;
            }
        } else if (method == 93) {
            console.log('jeq');
            var arg2 = reg.pop();
            var arg1 = reg.pop();
            if (arg2 == arg1) {
                i = param;
            }
        }
    }   
}

function register(name){
    var add = symbol_table[name];
    if (add == undefined) {
        for (var i = 30; i < 39; i++){
            if (memory[i] == undefined) {
                symbol_table[name] = i;
                memory[i] = 0;
                return i;
            }
        }
        return new Error("Memory Overflow");
    }
    return add;
}
function isMethod(name) {
    return symbol_table[name] != undefined && !isLabel(name);
}

function isLabel(name) {
    if (name.charAt(name.length - 1) == ':'){
        name = name.substring(0, name.length - 1);
    }
    var code = symbol_table[name];
    return code != undefined && code.toString().match(/91\d\d/) != undefined;
}

function no_param(method) {
    return symbol_table[method].toString().length == 4;
}

function has_param(method) {
    return symbol_table[method].toString().length == 2;   
}

function num_param(method) {
    return symbol_table[method] % 10 == 0;   
}

function var_param(method) {
    var code = symbol_table[method];
    return code % 10 == 2 || code % 10 == 0;   
}

function label_param(method) {
    return symbol_table[method] % 10 == 3;    
}