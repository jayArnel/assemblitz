function clean_code(code) {
    var clean = [];
    var lines = code.split('\n');
    for (i in lines) {
        var l = lines[i].trim();
        if (l.length > 0 || l.charAt(';')) {
            clean.push(new Command(+i + 1, l));
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
            symbol_table[label] = 91 * 100+ (+i);
            symbol_table[91 * 100+ (+i)] = +i;
        }
    }
}

function translate(code) {
    var lines = clean_code(code);
    add_labels(lines);
    if (lines[0].name != 'begin') {
        return new Error("Missing BEGIN Statement", 0);
    } else {
        memory[0] = 1000;
    }
    if (lines[lines.length - 1].name != 'end') {
        return new Error("Missing END statement", lines[lines.length - 1].line);
    } else {
        memory[lines.length - 1] = 1011;
    }
    for (var i = 1; i < lines.length-1; i++) {
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
                    if (num_param(name)){
                        if (!isNaN(param)) {
                            memory[i] = symbol_table[name] * 100 + (+param);
                        }
                    } else if (var_param(name)) {
                        var mem = register(param);   
                        memory[i] = symbol_table[name] * 100 + mem;
                    } else if (label_param(name)){
                        if (symbol_table[param] == undefined) {
                            return new Error("Label Not Found", command.line);
                        }
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

function run() {
    for (var i = 0; i < 29 && +memory[i] != 1011 && memory[i] != undefined; i++) {
        var out = execute(i);
        if (out instanceof Error) {
            return out;
        }
    }   
}

function execute(i){
    var code = +memory[i];
    var method = +(code.toString().substring(0,2));
    var param = +(code % 100);
    if (method == 11) {
        //mod
        var arg2 = reg.pop();
        if (arg2 instanceof Error) {
            return new Error("Empty Stack", commands[i].line);
        }
        var arg1 = reg.pop();
        if (arg1 instanceof Error) {
            return new Error("Null Operand", commands[i].line);   
        }
        var out = reg.push(arg1 % arg2);
        if (out instanceof Error) {
            return new Error("Stack Overflow", commands[i].line);   
        }
    } else if (method == 12) {
        //add
        var arg2 = reg.pop();
        if (arg2 instanceof Error) {
            return new Error("Empty Stack", commands[i].line);
        }
        var arg1 = reg.pop();
        if (arg1 instanceof Error) {
            return new Error("Null Operand", commands[i].line);   
        }
        var out = reg.push(arg1 + arg2);
        if (out instanceof Error) {
            return new Error("Stack Overflow", commands[i].line);   
        }
    } else if (method == 13) {
        //sub
        var arg2 = reg.pop();
        if (arg2 instanceof Error) {
            return new Error("Empty Stack", commands[i].line);
        }
        var arg1 = reg.pop();
        if (arg1 instanceof Error) {
            return new Error("Null Operand", commands[i].line);   
        }
        var out = reg.push(arg1 - arg2);
        if (out instanceof Error) {
            return new Error("Stack Overflow", commands[i].line);   
        }
    } else if (method == 14){
        //cmp
        var arg2 = reg.pop();
        if (arg2 instanceof Error) {
            return new Error("Empty Stack", commands[i].line);
        }
        var arg1 = reg.pop();
        if (arg1 instanceof Error) {
            return new Error("Null Operand", commands[i].line);   
        }
        var out = reg.push(arg1 == arg2);
        if (out instanceof Error) {
            return new Error("Stack Overflow", commands[i].line);   
        }
    } else if (method == 21) {
        //pushi
        var op = reg.push(param);
        if (op instanceof Error) {
            return new Error("Stack Overflow", commands[i].line);
        }
    } else if (method == 22) {
        //pushv
        var val = memory[param];
        if (val == null) {
            return new Error("Uninitialized Variable", commands[i].line);
        }
        var op = reg.push(val);
        if (op instanceof Error) {
            return new Error("Stack Overflow", commands[i].line);
        }
    } else if (method == 42) {
        //pop
        var val = reg.pop();
        if (val instanceof Error) {
            return new Error("Empty Stack", commands[i].line);
        }
        memory[param] = val;
    } else if (method == 52) {
        //read
        var val = prompt("Input:");
        memory[param] = val;
    } else if (method == 62) {
        //disp
        var val = memory[param];
        if (val === null) {
            return new Error("Uninitialized Variable", commands[i].line);
        }
        $("#out").append(memory[param]+'<br>');
    } else if (method == 63) {
        //jmp
        i = param;
    } else if (method == 73) {
        //jl
        var arg2 = reg.pop();
        if (arg2 instanceof Error) {
            return new Error("Empty Stack", commands[i].line);
        }
        var arg1 = reg.pop();
        if (arg1 instanceof Error) {
            return new Error("Null Operand Error", commands[i].line);   
        }
        if (arg2 < arg1) {
            i = param;
        }
    } else if (method == 83) {
        //jg
        var arg2 = reg.pop();
        if (arg2 instanceof Error) {
            return new Error("Empty Stack", commands[i].line);
        }
        var arg1 = reg.pop();
        if (arg1 instanceof Error) {
            return new Error("Null Operand Error", commands[i].line);   
        }
        if (arg2 > arg1) {
            i = param;
        }
    } else if (method == 93) {
        //jeq
        var arg2 = reg.pop();
        if (arg2 instanceof Error) {
            return new Error("Empty Stack", commands[i].line);
        }
        var arg1 = reg.pop();
        if (arg1 instanceof Error) {
            return new Error("Null Operand Error", commands[i].line);   
        }
        if (arg2 == arg1) {
            i = param;
        }
    }
    $("#stack").html(reg.stack.join('<br>'));
}
function register(name){
    var add = symbol_table[name];
    if (add == undefined) {
        for (var i = 30; i < 39; i++){
            if (memory[i] === undefined) {
                symbol_table[name] = i;
                memory[i] = null;
                return i;
            }
        }
        return new Error("Memory Overflow");
    }
    return add;
}
function isMethod(name) {
    return methods.indexOf(name)>-1;
}

function isLabel(name) {   
    if (name.charAt(name.length - 1) == ':'){
        return true;
    }
    return false;
}

function no_param(method) {
    return symbol_table[method].toString().length == 4;
}

function has_param(method) {
    return symbol_table[method].toString().length == 2;   
}

function num_param(method) {
    return symbol_table[method] % 10 == 1;   
}

function var_param(method) {
    var code = symbol_table[method];
    return code % 10 == 2;   
}

function label_param(method) {
    return symbol_table[method] % 10 == 3;    
}

