var RMajaxMixin = {
    ajaxGet: function (url, cb) {
        var xhr = new XMLHttpRequest();
        xhr.open('GET', encodeURI(url));
        xhr.onload = function () {
            cb(xhr.responseText);
        };
        xhr.send();
    }
};    

var RMeventMixin = {
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
};    
