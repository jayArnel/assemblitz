function clean_code(code) {
    console.log('cleaning code');
    var clean = [];
    var lines = code.split('\n');
    for (i in lines) {
        var l = lines[i].trim();
        if (l.length > 0) {
            clean.push(new Command(+i + 1, l));
        }
    }
    return clean;
}

function add_labels(lines) {
    console.log('adding labels');
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
    console.log('translating');
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

function execute() {
    for (var i = 1; i < 29 && +memory[i] != 1011 && memory[i] != undefined; i++) {
        var code = memory[i];
        var method = +(code.toString().substring(0,2));
        var param = +(code % 100);
        if (method == 11) {
            //mod
            var arg2 = reg.pop();
            if (arg2 == undefined) {
                return new Error("Empty Stack", commands[i].line);
            }
            var arg1 = reg.pop();
            if (arg1 == undefined) {
                return new Error("Null Operand Error", commands[i].line);   
            }
            reg.push(arg1 % arg2);
        } else if (method == 12) {
            //add
            var arg2 = reg.pop();
            if (arg2 == undefined) {
                return new Error("Empty Stack", commands[i].line);
            }
            var arg1 = reg.pop();
            if (arg1 == undefined) {
                return new Error("Null Operand Error", commands[i].line);   
            }
            reg.push(arg1 + arg2);
        } else if (method == 13) {
            var arg2 = reg.pop();
            if (arg2 == undefined) {
                return new Error("Empty Stack", commands[i].line);
            }
            var arg1 = reg.pop();
            if (arg1 == undefined) {
                return new Error("Null Operand Error", commands[i].line);   
            }
            reg.push(arg1 - arg2);
        } else if (method == 14){
            var arg2 = reg.pop();
            if (arg2 == undefined) {
                return new Error("Empty Stack", commands[i].line);
            }
            var arg1 = reg.pop();
            if (arg1 == undefined) {
                return new Error("Null Operand Error", commands[i].line);   
            }
            reg.push(arg1 == arg2);
        } else if (method == 21) {
            var op = reg.push(param);
            if (op instanceof Error) {
                return new Error("Stack Overflow", commands[i].line);
            }
        } else if (method == 22) {
            var val = memory[param];
            if (val == null) {
                return new Error("Uninitialized Variable", commands[i].line);
            }
            var op = reg.push(val);
            if (op instanceof Error) {
                return new Error("Stack Overflow", commands[i].line);
            }
        } else if (method == 42) {
            var val = reg.pop();
            if (val instanceof Error) {
                return new Error("Empty Stack", commands[i].line);
            }
            memory[param] = val;
        } else if (method == 52) {
            var val = prompt("Input:");
            memory[param] = val;
        } else if (method == 62) {
            if (memory[param] == undefined) {
                return new Error("Uninitialized Variable", commands[i].line);
            }
            $("#out").append('<br>'+memory[param]);
        } else if (method == 63) {
            i = param;
        } else if (method == 73) {
            var arg2 = reg.pop();
            var arg1 = reg.pop();
            if (arg2 < arg1) {
                i = param;
            }
        } else if (method == 83) {
            var arg2 = reg.pop();
            var arg1 = reg.pop();
            if (arg2 > arg1) {
                i = param;
            }
        } else if (method == 93) {
            var arg2 = reg.pop();
            var arg1 = reg.pop();
            if (arg2 == arg1) {
                i = param;
            }
        } else if (method == 10) {
            return new Error("Misplaced BEGIN Statement", commands[i].line);
        }
        $("#stack").text(reg.stack.join('\n'));
    }   
}

function register(name){
    var add = symbol_table[name];
    if (add == undefined) {
        for (var i = 30; i < 39; i++){
            if (memory[i] == undefined) {
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

