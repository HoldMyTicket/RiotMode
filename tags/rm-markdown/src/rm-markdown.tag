<rm-markdown>
	
	var me = this;

	this.on('mount', function() {
		if(!window.marked) {
			me.root.innerHTML = "<span style='color:red;'>Please load the marked library to use this tag.<span>";
		} else {
			me.set(opts.content);
		}
	});
	
	set(md) {
		me.root.innerHTML = marked(md);
	}

</rm-markdown>
