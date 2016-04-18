<rm-markdown>

	this.on('mount', function() {
		console.log('opts.content', opts.content)
		this.root.innerHTML = marked(opts.content);
	});

</rm-markdown>

