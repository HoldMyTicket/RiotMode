riot.tag('rm-loader', '<div id="wrap"> <div id="progstatic" style="width:250px" class="mdl-js-progress"></div> </div>', function(opts) {
	
	var me = this;
	
	this.config = {
		'spinner' : function() {
			
		},
		'spinner-single-color' : function() {
			
		},
	}
	
	this.on('mount', function() {
		var wrap = this.root.children[0];
		componentHandler.upgradeElement(wrap);
	});

});
