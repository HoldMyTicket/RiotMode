<rm-graph>
	
	<style scoped>
		div {
			height:500px; 
			width:500px;
		}
	</style>
	
	<div id="chart_{_id}">
	  <svg></svg>
	</div>
	
	var me = this;
	
	this.id = "#chart_"+this._id+" svg";
	this.data = opts.data || [];
	this.setup = {
		'line':function() {
			nv.addGraph(function() {
			    var chart = nv.models.lineWithFocusChart();
			    chart.xAxis.tickFormat(function(d) {
	                return d3.time.format('%x')(new Date(d))
	            });
			    chart.x2Axis.tickFormat(function(d) {
	                return d3.time.format('%x')(new Date(d))
	            });
			    chart.yAxis.tickFormat(d3.format(',f'));
			    chart.y2Axis.tickFormat(d3.format(',f'));
			  //  chart.useInteractiveGuideline(true);
			    d3.select(me.id)
			        .datum(me.data)
			        .call(chart);
			    nv.utils.windowResize(chart.update);
			    return chart;
			});
		},
		'pie':function() {
			nv.addGraph(function() {
			  var chart = nv.models.pieChart()
				  .x(function(d) { return d.label })
				  .y(function(d) { return d.value })
				  .showLabels(true);

				d3.select(me.id)
					.datum(me.data)
					.transition().duration(1200)
					.call(chart);

			  return chart;
			});
		},
		'bar':function() {
			var chart = nv.models.discreteBarChart()
		      .x(function(d) { return d.label })    //Specify the data accessors.
		      .y(function(d) { return d.value })
		      .staggerLabels(true)    //Too many bars and not enough room? Try staggering labels.
		      ;

		  d3.select(me.id)
		      .datum(me.data)
		      .call(chart);

		  nv.utils.windowResize(chart.update);

		  return chart;
			
		}
	}
	
	this.on('mount', function() {
		console.log(me.id);
		me.setup[opts.type]();
	});
</rm-graph>
