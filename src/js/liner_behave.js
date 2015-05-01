window.onload = function(){


	/*
	 * This hook adds Line Number Functionality
	 */
	BehaveHooks.add(['keydown'], function(data){
		var numLines = data.lines.total,
			house = document.getElementsByClassName('line-nums')[0],
			html = '',
			i;
		for(i=0; i<numLines; i++){
			html += '<div>'+(i+1)+'</div>';					
		}
		house.innerHTML = html;
	});
	
	var editor = new Behave({
	
		textarea: 		document.getElementById('input'),
		replaceTab: 	true,
	    softTabs: 		true,
	    tabSize: 		4,
	    autoOpen: 		true,
	    overwrite: 		true,
	    autoStrip: 		true,
	    autoIndent: 	true
	});
	
};