<rm-loader>

	<h2>Yum loader</h2>
	<div id="p2" class="mdl-progress mdl-js-progress mdl-progress__indeterminate progress-demo"></div>


	var me = this;
	this.on('mount', function() {
		this.p.addEventListener('mdl-componentupgraded', function() {
	      this.MaterialProgress.setProgress(44);
	    });
	});
</rm-loader>
