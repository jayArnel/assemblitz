function display(arr) {
    var string = "\n";
    for (var i = 0; i < arr.length; i++) {
        string += arr[i] + "\n\n";
        console.log(i+ ": " + arr[i]);
    }
    return string;
}