riot.tag('rm-toast', '<div show="{displayToast}" class="message-container"> <div onclick="{hideToast}" class="toast { toastPosition }">{ parseHTML(opts.text) }</div> </div>', 'rm-toast .toast, [riot-tag="rm-toast"] .toast{ position: absolute; margin: 20px; max-width: 200px; color: rgba(255, 255, 255, 1); background-color: rgba(0, 0, 0, 0.8); padding: 20px; z-index: 10; -webkit-border-radius: 5px; -moz-border-radius: 5px; -o-border-radius: 5px; border-radius: 5px; } rm-toast .top-left, [riot-tag="rm-toast"] .top-left{ top: 0; left: 0; } rm-toast .top-right, [riot-tag="rm-toast"] .top-right{ top: 0; right: 0; } rm-toast .bottom-left, [riot-tag="rm-toast"] .bottom-left{ left: 0; bottom: 0; } rm-toast .bottom-right, [riot-tag="rm-toast"] .bottom-right{ right: 0; bottom: 0; }', function(opts) {
	
	
	
	var me = this;
	
	this.mixin(RMeventMixin);
	this.displayToast = false;
	this.toastDuration = opts.duration || 1500;
	this.toastPosition = opts.position || 'bottom-right';
	
	this.on('mount', function() {
		me.update();
	});
	
	this.showToast = function(e) {
		this.displayToast = true;
		this.update();
		if(typeof RiotControl != 'undefined')
			RiotControl.trigger('toastopened');
		this.fire('open', e);
		
		setTimeout(function() {
			me.hideToast();
		}, me.toastDuration);
	}.bind(this);
	
	this.hideToast = function(e) {
		this.displayToast = false;
		this.update();
		if(typeof RiotControl != 'undefined')
			RiotControl.trigger('toastclosed');
		this.fire('close', e);
	}.bind(this);
	
	this.parseHTML = function(text) {
		this.root.querySelector('.toast').innerHTML = text;
	}.bind(this);

});
