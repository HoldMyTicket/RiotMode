<rm-toast>

	<div show="{displayToast}" class="message-container">
		<div onclick="{hideToast}" class="toast { toastPosition }">{ parseHTML(opts.text) }</div>
	</div>
	
	<style scoped>
		.toast {
			position: absolute;
			margin: 20px;
			max-width: 200px;
			color: rgba(255, 255, 255, 1);
			background-color: rgba(0, 0, 0, 0.8);
			padding: 20px;
			-webkit-border-radius: 5px;
            -moz-border-radius: 5px;
            -o-border-radius: 5px;
            border-radius: 5px;
		}
		
		.top-left {
			top: 0;
			left: 0;
		}
		
		.top-right {
			top: 0;
			right: 0;
		}
		
		.bottom-left {
			left: 0;
			bottom: 0;
		}
		
		.bottom-right {
			right: 0;
			bottom: 0;
		}
		
		
	</style>
	
	/**
     * Toast component for RiotJS v2.2
     * 
     * @author joseph-perez
     */
	
	var me = this;
	
	this.mixin(RMeventMixin);
	this.displayToast = false;
	this.toastDuration = opts.duration || 1500;
	this.toastPosition = opts.position || 'bottom-right';
	
	this.on('mount', function() {
		me.update();
	});
	
	showToast(e) {
		this.displayToast = true;
		this.update();
		if(typeof RiotControl != 'undefined')
			RiotControl.trigger('toastopened');
		this.fire('open', e);
		
		setTimeout(function() {
			me.hideToast();
		}, me.toastDuration);
	}
	
	hideToast(e) {
		this.displayToast = false;
		this.update();
		if(typeof RiotControl != 'undefined')
			RiotControl.trigger('toastclosed');
		this.fire('close', e);
	}
	
	parseHTML(text) {
		this.root.querySelector('.toast').innerHTML = text;
	}
</rm-toast>
