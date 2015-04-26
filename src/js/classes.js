function Error(name, msg){
    this.verbose = name;
    this.msg = msg;
}

function UnknownMethodError(command, line){
    this.verbose = "Unsupported Method Error";
    this.msg = ""
    this.toString = function() {
        return this.verbose + ": " + this.msg + " on line" + this.line+ ":" + this.command;
    }
}

UnknownMethodError.prototype = new Error();

function Stack(cap) {
    this.cap = cap;
    this.stack = [];

    this.push = function(e) {
        if (stack.length + 1 > cap) {
            return new Error('Stack Overflow');
        } else {
            this.stack.push(e);
        }
    }

    this.pop = function(e) {
        if (stack.length == 0) {
            return new Error('Empty Stack');
        } else {
            return this.stack.pop();
        }
    }

    this.peek = function() {
        if (stack.length == 0) {
            return new Error('Stack Empty');
        } else {
            return this.stack[stack.length - 1];
        }
    }

    this.size = function(){
        return this.stack.length;
    }
}