<rm-datepicker>

	<style scoped>
		* {box-sizing:border-box;}
		table, caption, tbody, tfoot, thead, tr, th, td {
			margin: 0;
			padding: 0 !important;
			border: 0;
			outline: 0;
			font-size: 100%;
			vertical-align: baseline;
			background: transparent;
			text-align:center;
		}
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
		.base-input {
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
		.view-title {
			display:block;
			text-align:center;
			background: rgb(216,27,96);
			color: #FFF;
			line-height: 50px;
		}
		.view-title a {
			cursor: pointer;
		}
		.left-arrow {
			float:left;
			line-height:50px;
			margin-left:10px;
			color:#FFF
		}
		.right-arrow {
			float:right;
			line-height:50px;
			margin-right:10px;
			color:#FFF
		}
		.daysofweek {
			width:100%;
			height:23px;
			color: rgb(0,188,214);
			font-weight: 700;
		}
		.daysofweek span {
			float:left;
			text-align:center;
			width:14.285714285%;
		}
		.weekrow {
			height:auto;
			padding:2px 0;
			width:100%;
		}
		.weekrow a {
			height:40px;
			border-radius: 20px;
			display: inline-block;
			line-height: 40px;
			width:14.285714285%;
			text-align:center;
		}
		.weekrow a:hover {
			background:rgb(233,229,227);
			cursor:pointer;
		}
		.today {
			box-shadow: 0 0 0 2px rgb(0,188,214);
		}
		.selected {
			background: rgb(205,205,205);
		}
		.nohover:hover {content:"";background:none;cursor:default;padding:0 !important;}
	</style>

	<div class="rm-datepicker">
		<input class="base-input" type="text" onclick="{ show }" value="{ value }" readonly>
		<div show={ open } class="view">
			<div class="view-title">
				<a onclick="{ previous }"><i class="material-icons left-arrow">&#xE5C4;</i></a>
				<span class="month">{ header }</span>
				<a onclick="{ next }"><i class="material-icons right-arrow">&#xE5C8;</i></a>
			</div>
			<div class="daysofweek">
				<span>Mo</span>
				<span>Tu</span>
				<span>We</span>
				<span>Th</span>
				<span>Fr</span>
				<span>Sa</span>
				<span>Su</span>
			</div>
	
			<div class="weekrow" each="{ rows in mydata }">
				<a class="{ nohover: day.asNumber < 0, today: day.active, selected:day.selected }" 
						onclick="{ pick }" each="{ day in rows }">{ day.asNumber > 0 ? day.asNumber : '&nbsp;' }</a>
			</div>
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
	this.value = this.month.format(this.format);
	
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
		});	
		me.value = me.date.format(me.format);
		me.build(me.month);
		me.open = false;
		me.update();
	}

	previous(e) {
		if(me.min && me.min.diff(me.month) > 0)
			return;
		me.month.subtract(1, 'months');
		me.build(me.month);
	}

	next(e) {
		if(me.max && me.max.diff(me.month,'months') == 0)
			return;
	
		me.month.add(1, 'months');
		me.build(me.month);
	}
	
	build(date) {
		var firstDay = date.startOf('month').day();
		var totalDays = date.daysInMonth();
		var outDay = 1;

		me.header = date.format("MMMM YYYY");
		me.mydata = [];
		

		var maxMonth = me.max && me.max.month() == me.month.month() && me.today.year() == me.month.year();
		
		var working = true;

		while(working) {
			var week = [];
			for(var day = 0; day < 7; day++) {
				if(maxMonth && (outDay - 1)==me.max.date() || (outDay - 1) == totalDays) {
					working = false;
					break;
				}
				firstDay--;
				if(firstDay > 0) {
			 		week.push({asNumber:-1,active:false});
				} else {
					week.push({
						asNumber: outDay,
						active: me.today.month() == me.month.month()
									&& me.today.year() == me.month.year()
									&& me.today.date() == outDay,
						selected: me.date.month() == date.month()
									&& me.date.year() == date.year()
									&& me.date.date() == outDay
					});
					outDay++;
				}
			}
			me.mydata.push(week);
		}
		me.update();
	}

</rm-datepicker>
