riot.tag('rm-chart', '<div id="chart" class="noselect" style="width: 100%; height: 100%"></div>', 'rm-chart .noselect { -webkit-touch-callout: none; -webkit-user-select: none; -khtml-user-select: none; -moz-user-select: none; -ms-user-select: none; user-select: none; }', function(opts) {

	var me = this;

	this.on('mount',function() {
		if (typeof google === "object" && typeof google.visualization === "object") {
			me.make();
		} else {
			google.setOnLoadCallback(function() {
				me.make();
			});
		}
	});

	this.make = function() {
		var data = opts.data;
		var options = opts.options || {};
		if(opts.dragToZoom && opts.type === 'line')
			options.explorer = { actions: ['dragToZoom', 'rightClickToReset'], axis: 'horizontal' }

		var type = {
			'material' : new google.charts.Line(this.chart),
			'line': new google.visualization.LineChart(this.chart),
			'bar' : new google.visualization.BarChart(this.chart),
			'pie' : new google.visualization.PieChart(this.chart),
			'area': new google.visualization.AreaChart(this.chart),
			'spark': new google.visualization.ImageSparkLine(this.chart)
		}
		var chart = type[opts.type];
		chart.draw(data, options);
	}.bind(this);


});
