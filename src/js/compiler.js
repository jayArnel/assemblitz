// console.log(code);
// var out = compile(code);

// if (out != undefined && isError(out)) {
//     console.log(out.toString());
// } else {
//     display(memory);
//     display(symbol_table);
// }
function compile(code) {
    //split lines
    var lines = code.split('\n');

    //for each line, separate method and parameters
    for (var line = 0, i = 0; line < lines.length; line++) {
        if (lines[line].length > 0) {
            var command = clean_array(lines[line].split(' '));
            var method = command[0];
            var params = command[1];
            var machine_code = symbol_table[method];
            if (machine_code == undefined) {
                if (method[method.length-1] == ':' && params == undefined) {
                    memory[i] = 9100 + i; 
                    symbol_table[method.slice(0, method.length - 1)] = i;
                } else {
                    return new Error("Unsupported Method Error", line + 1);
                }
            } else if (machine_code.toString().length == 4){
                if (params == undefined) {
                    memory[i] = machine_code;
                } else {
                    return new Error("Unsupported Operand Error", line + 1);
                }
            } else if (machine_code.toString().length == 2) {
                if (params == undefined) {
                    return new Error("Missing Operand Error", line + 1);
                } else if (command[2] != undefined){
                    return new Error("Multiple Operand Error", line + 1);
                }else {
                    if (machine_code % 10 == 1) {
                        if (!isNaN(params)) {
                            params = parseInt(params);
                            memory[i] = machine_code * 100 + params;
                        } else {
                            var var_index = register_var(params);
                            memory[i] = machine_code * 100 + var_index;
                        }
                    } else if (machine_code % 10 == 2) {
                        if (!isNaN(params)) {
                            return new Error("Operand Type Error", line + 1);
                        } else {
                            var var_index = register_var(params);
                            memory[i] = machine_code * 100 + var_index;
                        }
                    } else if (machine_code % 10 == 3) {
                        if (!isNaN(params)) {
                            return new Error("Operand Type Error", line + 1);
                        } else {
                            label_queue[i]=command;
                        }
                    }
                }
            }
            i++;
        }
    }
    for (i in label_queue) {
        var method = label_queue[i][0]
        var params = label_queue[i][1]
        var label = symbol_table[params];
        var machine_code = symbol_table[method];
        if(label == undefined) {
            return new Error("Unknown Label Error", i);
        } else {
            memory[i] = machine_code * 100 + label;
        }
    }       
}