<rm-markdown>

	<style scoped></style>

	this.on('mount', function() {
		this.root.innerHTML = marked(opts.content);
	});

</rm-markdown>

