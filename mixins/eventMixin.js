var eventMixin = {
    fire: function (action) {
		  if(typeof this.opts['on'+action] == 'function') {
			  this.opts['on'+action]();
		  }
    }
}    