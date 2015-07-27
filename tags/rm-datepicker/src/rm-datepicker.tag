<rm-datepicker>

	<style scoped>
		a {
			color: rgb(117,117,117);
			text-decoration:none;
		}
		.rm-datepicker {
			position: relative;
		    -webkit-touch-callout: none;
		    -webkit-user-select: none;
		    -khtml-user-select: none;
		    -moz-user-select: none;
		    -ms-user-select: none;
		    user-select: none;
		}
		.base_input {
			height:40px;
			padding-left:5px;
			border:1px solid #D3D3D3;
			box-sizing:border-box;
			padding-left:5px;
			cursor: pointer;
			color: rgb(85, 85, 85);
			font-size:1em;
		}
		.view {
			position: absolute;
			background: #FFF;
			border: 1px solid #D3D3D3;
			width:280px;
			height:auto;
			margin-top:5px;
			-webkit-box-sizing: border-box;
			-moz-box-sizing: border-box;
			-webkit-box-shadow: 0 2px 10px -4px #444;
			-moz-box-shadow: 0 2px 10px -4px #444;
			box-shadow: 0 2px 10px -4px #444;
			z-index:10;
		}
		.view_title {
			display:block;
			text-align:center;
			background: rgb(216,27,96);
			color: #FFF;
			line-height: 50px;
		}
		.view_title a {
			cursor: pointer;
		}
		.left_arrow {
			float:left;
			line-height:50px;
			margin-left:10px;
			color:#FFF
		}
		.right_arrow {
			float:right;
			line-height:50px;
			margin-right:10px;
			color:#FFF
		}
		table {
			padding:5px;
			width: 100%;
			text-align:center;
			table-layout: fixed;
			border-collapse:collapse;
			border-spacing:0px;
		}
		table td a{
			height:40px;
			border-radius: 20px;
			display: block;
			line-height: 40px;
		}
		table td a.today, a.today:hover{
			box-shadow: 0 0 0 2px rgb(0,188,214);
		}
		table td a:hover {
			background:rgb(233,229,227);
			cursor:pointer;
		}
		table thead tr {
			color: rgb(0,188,214);
		}
		.nohover:hover {background:none;cursor:default;}
	</style>

	<div class="rm-datepicker">
		<input class="base_input" type="text" onclick="{ show }" value="{ value }" readonly>
		<div show={ open } class="view">
			<div class="view_title">
				<a onclick="{ previous }"><i class="material-icons left_arrow">&#xE5C4;</i></a>
				<span class="month">{ header }</span>
				<a onclick="{ next }"><i class="material-icons right_arrow">&#xE5C8;</i></a>
			</div>
			
			<table>
				<thead>
					<tr>
						<th>Mo</th>
						<th>Tu</th>
						<th>We</th>
						<th>Th</th>
						<th>Fr</th>
						<th>Sa</th>
						<th>Su</th>
					</tr>
				</thead>
				<tbody>
					<tr each="{ rows in mydata }">			
						<td each="{ day in rows }">
							<a class="{ nohover: day.asNumber < 0, today: day.active, selected:day.selected }" 
									onclick="{ pick }">{ day.asNumber > 0 ? day.asNumber : '' }</a>	
						</td>
					</tr>
				</tbody>
			</table>
		</div>
	</div>

	var me = this;
	
	this.today = moment();
	this.month = opts.initial ? moment(opts.initial) : moment();
	this.min = opts.min ? moment(opts.min) : false;
	this.max = opts.max ? moment(opts.max) : false;		
	this.open = false;
	this.format = opts.format || "MMM Do YYYY";
	this.date = moment(this.month);
	this.value = this.date.format(this.format);
	
	this.on('mount', function() {
		me.build(me.month);
		me.update();
	});

	show(e) {
		me.open = !me.open;
	}

	pick(e) {
		var target = e.target || e.srcElement;
		me.date = moment({
				year: me.month.year(),
				month: me.month.month(),
				day: target.innerHTML
		}).format(me.format);		
		me.open = false;
		me.update();
	}

	previous(e) {
		me.month = me.month.subtract(1, 'months');
		me.build(me.month);
	}

	next(e) {
		me.month = me.month.add(1, 'months');
		me.build(me.month);
	}
	
	build(date) {
		var firstDay = date.startOf('month').day();
		var totalDays = date.daysInMonth();
		var outDay = 1;

		me.header = date.format("MMMM YYYY");
		me.mydata = [];
		var working = true;
		while(working) {
			var week = [];
			for(var day = 0; day < 7; day++) {
				if((outDay - 1) == totalDays) {
					working = false;
					break;
				}
				firstDay--;
				if(firstDay > 0) {
			 		week.push({asNumber:-1,active:false});
				} else {
					week.push({
						asNumber: outDay,
						active: me.today.date() == outDay,
						selected: me.date.month() == me.month.month()
									&& me.date.year() == me.month.year()
									&& me.date.day() == outDay
					});
					outDay++;
				}
			}
			me.mydata.push(week);
		}
		me.update();
	}

</rm-datepicker>
