var eventMixin = {
    fire: function (action, obj) {
    	if(typeof obj.opts[action] == 'string') {
			window[obj.opts[action]]();	
		}
		else if(typeof obj.opts[action] == 'function') {
			obj.opts[action]();
		}
    }
}    