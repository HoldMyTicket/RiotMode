<rm-graph>
	
	<canvas id="myChart" width="800" height="400"></canvas>

	var me = this;
	
	this.data = opts.data || false;
	this.options = opts.options || {};
	
	this.on('mount', function() {
		var ctx = me.myChart.getContext("2d");
		me.chart = new Chart(ctx).Radar(me.data);
	});
</rm-graph>
