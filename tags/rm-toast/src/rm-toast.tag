<rm-toast>

	<div show="{showToast}" class="message-container">
		<div onclick="{close}" class="toast { opts.position }">{ parseHTML(opts.text) }</div>
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
	
	var me = this;
	
	this.mixin(RMeventMixin);
	this.showToast = false;
	this.toastDuration = opts.duration || 1500;
	
	this.on('mount', function() {
		me.update();
	});
	
	open(e) {
		this.showToast = true;
		this.update();
		this.fire('open', e);
		
		setTimeout(function() {
			me.close();
		}, me.toastDuration);
	}
	
	close(e) {
		this.showToast = false;
		this.update();
		this.fire('close', e);
	}
	
	parseHTML(text) {
		this.root.querySelector('.toast').innerHTML = text;
	}
</rm-toast>
