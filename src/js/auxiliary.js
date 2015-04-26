function isArray(arr) {
    return arr.constructor.toString().indexOf("Array") > -1;
}

function isError(err) {
    return err.constructor.toString().indexOf("Error") > -1;
}

function clean_array(arr) {
    if (arr.length > 1) {
        var new_arr = []
        for (i in arr){
            if (arr[i].length > 0){
                new_arr.push(arr[i]);   
            }
        }
        return new_arr;
    } else {
        return arr;
    }
    
}

function register_var(name) {
    var code = symbol_table[name];
    if (code == undefined) {
        for (var i = 31; i < 40; i++) {
            if (memory[i] == undefined) {
                symbol_table[name] = memory[i];
                return i;
            }
        }
        return new Error();
    } else {
        if (code <= 4000 && code >= 3100) {
            return code / 100;
        } else {
            return new Error("Reserved Word Use Error", line);
        }

    }
}

function display(arr) {
    var string = "\n";
    for (i in arr) {
        string += arr[i] + "\n\n";
        console.log(i+ ": " + arr[i]);
    }
    return string;
}