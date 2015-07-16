var eventMixin = {
    fire: function (action) {
    	if(typeof this.opts[action] == 'string') {
			window[this.opts[action]]();	
		}
		else if(typeof this.opts[action] == 'function') {
			this.opts[action]();
		}
    }
}    