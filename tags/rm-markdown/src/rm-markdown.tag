<rm-markdown>

	<raw content="{html}"/>

	this.html = opts.content ? marked(opts.content) : '';

	this.on('mount', function() {
		if(!window.marked) {
			me.root.innerHTML = "<span style='color:red;'>Please load the marked library to use this tag.<span>";
		}
	});

</rm-markdown>

<raw>
	<span></span>
	this.root.innerHTML = opts.content
</raw>