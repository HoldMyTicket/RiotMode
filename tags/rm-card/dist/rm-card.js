riot.tag('rm-card', '<div id="wrap"> <div class="mdl-card mdl-shadow--2dp demo-card-wide"> <div class="mdl-card__title"> <h2 class="mdl-card__title-text">{ title }</h2> </div> <div class="mdl-card__supporting-text"> { text } </div> <div class="mdl-card__actions mdl-card--border"> <a class="mdl-button mdl-button--colored mdl-js-button mdl-js-ripple-effect"> Get Started </a> </div> <div class="mdl-card__menu"> <button class="mdl-button mdl-button--icon mdl-js-button mdl-js-ripple-effect"> <i class="material-icons">share</i> </button> </div> </div> </div>', function(opts) {
	
	var me = this;
	
	this.title = opts.title || '';
	this.text = opts.text || '';
	this.buttons = '';
	
	this.on('mount', function() {
		var wrap = this.root.children[0];

	});

});
