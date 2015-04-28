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
        }
    }
}

function translate(code) {
    memory = new Array(40);
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
                            memory[i] = symbol_table[name] * 100 + (+param);
                        } else {
                            var mem = register(param);
                            memory[i] = symbol_table[name] * 100 + mem;
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
    }
    for (var i = 1; i <  29 || memory[i] == 1111; i++) {
        var code = +memory[i];
        var method = code / 100;
        var param = code - method;

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
    return symbol_table[method] % 10 == 1;   
}

function var_param(method) {
    var code = symbol_table[method];
    return code % 10 == 2 || code % 10 == 1;   
}

function label_param(method) {
    return symbol_table[method] % 10 == 3;    
}