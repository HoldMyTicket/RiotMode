<rm-chart>
	
	<style scoped>
		.noselect {
		    -webkit-touch-callout: none;
		    -webkit-user-select: none;
		    -khtml-user-select: none;
		    -moz-user-select: none;
		    -ms-user-select: none;
		    user-select: none;
		}
	</style>
	
	<div id="chart" class="noselect" style="width: 100%; height: 100%"></div>
	
	var me = this;

	this.on('mount',function() {
		google.setOnLoadCallback(function() {
			me.make();
		});
	});
	
	make() {
		var data = new google.visualization.arrayToDataTable(opts.data);
		var options = {
			title:opts.title
		}
		if(opts.dragToZoom && opts.type === 'line') 
			options.explorer = { actions: ['dragToZoom', 'rightClickToReset'], axis: 'horizontal' }
			
		var type = {
			'line': new google.visualization.LineChart(this.chart),
			'bar' : new google.visualization.BarChart(this.chart),
			'pie' : new google.visualization.PieChart(this.chart)
		}
		var chart = type[opts.type];
		chart.draw(data, options);
	}

</rm-chart>
