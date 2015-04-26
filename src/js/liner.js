window.onload = function(){          
    BehaveHooks.add(['keydown'], function(data){
        var numLines = data.lines.total,
            fontSize = parseInt( getComputedStyle(data.editor.element)['font-size'] ),
            padding = parseInt( getComputedStyle(data.editor.element)['padding'] );
        data.editor.element.style.height = (((numLines*fontSize)+padding))+'px';
    });

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
        textarea:       document.getElementById('input-user'),
        replaceTab:     true,
        softTabs:       true,
        tabSize:        4,
        autoOpen:       true,
        overwrite:      true,
        autoStrip:      true,
        autoIndent:     true
    });

};