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

function display(arr) {
    var string = "\n";
    for (i in arr) {
        string += arr[i] + "\n\n";
        console.log(i+ ": " + arr[i]);
    }
    return string;
}