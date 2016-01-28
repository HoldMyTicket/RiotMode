riot.tag('rm-markdown', '<raw content="{html}"></raw>', function(opts) {

	this.html = opts.content ? marked(opts.content) : '';

	this.on('mount', function() {
		if(!window.marked) {
			me.root.innerHTML = "<span style='color:red;'>Please load the marked library to use this tag.<span>";
		}
	});


});

riot.tag('raw', '<span></span>', function(opts) {
	this.root.innerHTML = opts.content

});