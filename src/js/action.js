function assemble() {
		var code = document.getElementById("demo").value;
		var out = compile(code);
		if (out != undefined && isError(out)) {
		    document.getElementById("out").innerHTML = document.getElementById("out").innerHTML + out.toString();
		} else {
		    document.getElementById("mla").innerHTML = document.getElementById("mla").innerHTML + display(memory);
		    display(symbol_table);
		    display(memory);
		}

}