<page-install>
	<style scope>
		.option {
			margin:0;
			margin-top:20px;
			color: #6ab344;
		}
		pre {
			margin: 0;
		}
	</style>
	<h3>How to get RiotMode</h3>
	<p>You can install every tag the following ways.</p>
	<h5>Package Managers</h5>
	<p class="option">BOWER</p>
	<pre>
		<code>
			bower install RiotMode
		</code>
	</pre>
	this.on('mount',function() {
		$('pre code').each(function(i, block) {
		  hljs.highlightBlock(block);
		});
	});
</page-install>