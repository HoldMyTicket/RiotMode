riot.tag2('rm-loader', '<div id="wrap"> <div class="mdl-spinner mdl-spinner--single-color mdl-js-spinner is-active"></div> </div>', '', '', function(opts) {

	var me = this;

	this.config = {
		'spinner' : function() {

		},
		'spinner-single-color' : function() {

		},
	}

	this.on('mount', function() {
		var wrap = this.root.children[0];
		componentHandler.upgradeDom();
	});
});
