var eventMixin = {
    fire: function (action) {
        var args = [];
        if(arguments.length > 1){
            for(var i=1; i< arguments.length; i++){
                args.push(arguments[i]);
            }
        }
            
		  if(typeof this.opts['on'+action] == 'function') {
			  this.opts['on'+action].apply(this, args);
		  }
    }
}    