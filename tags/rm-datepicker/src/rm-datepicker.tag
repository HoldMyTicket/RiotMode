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
			border: 1px solid #D3D3D3;
			width:280px;
			height:auto;
			margin-top:5px;
			-webkit-box-sizing: border-box;
			-moz-box-sizing: border-box;
			-webkit-box-shadow: 0 2px 10px -4px #444;
			-moz-box-shadow: 0 2px 10px -4px #444;
			box-shadow: 0 2px 10px -4px #444;
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
		table td {
			height:40px;
			border-radius: 20px;
		}
		table td .today, .today:hover{
			background:rgb(176, 174, 173);
		}
		table td:hover {
			background:rgb(233,229,227);
			cursor:pointer;
		}
		table thead tr {
			color: rgb(0,188,214);
		}
		.today {
			background:rgb(190, 190, 190);
		}
		.nohover:hover {background:none;cursor:default;}
	</style>

	<div class="rm-datepicker">
		<input class="base_input" type="text" onclick="{ show }" value="{ date }" readonly>
		<div show={ open } class="view">
			<div class="view_title">
				<a onclick="{ previous }"><i class="material-icons left_arrow">&#xE5C4;</i></a>
				<span class="month">{ header }</span>&nbsp;<span class="year">{ currentYear }</span>
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
						<td class="{ nohover: day.asNumber < 0, today: day.active }" each="{ day in rows }">
							<a onclick="{ parent.parent.pick }">{ day.asNumber > 0 ? day.asNumber : '' }</a>	
						</td>
					</tr>
				</tbody>
			</table>
		</div>
	</div>

	var me = this;
	var longMonthNames = ["January", "Febuary", "March", "April", "May", "June",
  		"July", "August", "September", "October", "November", "December"
	];
	var shortMonthNames = ["Jan", "Feb", "Mar", "Apr", "May", "June",
  		"July", "Aug", "Sep", "Oct", "Nov", "Dec"
	];

	this.today = new Date();
	this.currentDay = this.today.getDate();
	this.currentMonth = this.today.getMonth();
	this.currentYear = this.today.getFullYear();
	this.header = longMonthNames[this.currentMonth];
	this.open = false;

	this.on('mount', function() {
		Date.prototype.monthDays= function(){
		    var d = new Date(this.getFullYear(), this.getMonth()+1, 0);
		    return d.getDate();
		}
		me.date = shortMonthNames[me.currentMonth]+" "+me.currentDay+", "+me.currentYear;
		me.build(me.currentYear, me.currentMonth);
	});

	show(e) {
		me.open = !me.open;
	}

	this.pick = function(e) {
		console.log(this);
		var target = e.target;
		me.date = shortMonthNames[me.currentMonth]+" "+target.innerHTML+", "+me.currentYear;
		me.open = false;
		//e.stopPropagation();		
		me.update();
	}

	previous(e) {
		me.currentYear = (me.currentMonth == 0 ? --me.currentYear : me.currentYear); 
		me.currentMonth = (me.currentMonth == 0 ? 11 : --me.currentMonth);
		me.header = longMonthNames[me.currentMonth];
		me.build(me.currentYear,me.currentMonth);
		me.update();
	}

	next(e) {
		me.currentYear = (me.currentMonth == 11 ? ++me.currentYear : me.currentYear); 
		me.currentMonth = (me.currentMonth < 11 ? ++me.currentMonth : 0); 
		me.header = longMonthNames[me.currentMonth];
		me.build(me.currentYear,me.currentMonth);
		me.update();
	}
	
	build(year, month) {
		var month = new Date(year, month, 1);
		var firstDay = month.getDay();
		var totalDays = month.monthDays();
		var outDay = 1;
		
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
					var active = me.currentDay == outDay && me.currentMonth == me.today.getMonth() ? true : false;
					week.push({asNumber:outDay,active:active});
					outDay++;
				}
			}
			me.mydata.push(week);
		}
	//	me.update();
	}

</rm-datepicker>
