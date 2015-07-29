riot.tag('rm-markdown', '', function(opts) {
	
	var me = this;

	this.on('mount', function() {
		if(!window.marked) {
			me.root.innerHTML = "<span style='color:red;'>Please load the marked library to use this tag.<span>";
		} else {
			me.set(opts.content);
		}
	});
	
	this.set = function(md) {
		me.root.innerHTML = marked(md);
	}.bind(this);


});
