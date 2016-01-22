riot.tag2('rm-datepicker', '<div class="rm-datepicker"> <input class="base-input" type="text" onclick="{show}" value="{value}" readonly> <div show="{open}" class="view"> <div class="view-title"> <a onclick="{previous}"><i class="material-icons left-arrow">&#xE5C4;</i></a> <span class="month">{header}</span> <a onclick="{next}"><i class="material-icons right-arrow">&#xE5C8;</i></a> </div> <div class="daysofweek"> <span>Mo</span> <span>Tu</span> <span>We</span> <span>Th</span> <span>Fr</span> <span>Sa</span> <span>Su</span> </div> <div class="weekrow" each="{rows in mydata}"> <a class="{nohover: day.asNumber < 0, today: day.active, selected:day.selected}" onclick="{pick}" each="{day in rows}">{day.asNumber > 0 ? day.asNumber : \'&nbsp;\'}</a> </div> </div> </div>', 'rm-datepicker *,[riot-tag="rm-datepicker"] * {box-sizing:border-box;} rm-datepicker table,[riot-tag="rm-datepicker"] table,rm-datepicker caption,[riot-tag="rm-datepicker"] caption,rm-datepicker tbody,[riot-tag="rm-datepicker"] tbody,rm-datepicker tfoot,[riot-tag="rm-datepicker"] tfoot,rm-datepicker thead,[riot-tag="rm-datepicker"] thead,rm-datepicker tr,[riot-tag="rm-datepicker"] tr,rm-datepicker th,[riot-tag="rm-datepicker"] th,rm-datepicker td,[riot-tag="rm-datepicker"] td { margin: 0; padding: 0 !important; border: 0; outline: 0; font-size: 100%; vertical-align: baseline; background: transparent; text-align:center; } rm-datepicker a,[riot-tag="rm-datepicker"] a { color: rgb(117,117,117); text-decoration:none; } rm-datepicker .rm-datepicker,[riot-tag="rm-datepicker"] .rm-datepicker { position: relative; -webkit-touch-callout: none; -webkit-user-select: none; -khtml-user-select: none; -moz-user-select: none; -ms-user-select: none; user-select: none; } rm-datepicker .base-input,[riot-tag="rm-datepicker"] .base-input { height:40px; padding-left:5px; border:1px solid #D3D3D3; box-sizing:border-box; padding-left:5px; cursor: pointer; color: rgb(85, 85, 85); font-size:1em; } rm-datepicker .view,[riot-tag="rm-datepicker"] .view { position: absolute; background: #FFF; border: 1px solid #D3D3D3; width:280px; height:auto; margin-top:5px; -webkit-box-sizing: border-box; -moz-box-sizing: border-box; -webkit-box-shadow: 0 2px 10px -4px #444; -moz-box-shadow: 0 2px 10px -4px #444; box-shadow: 0 2px 10px -4px #444; z-index:10; } rm-datepicker .view-title,[riot-tag="rm-datepicker"] .view-title { display:block; text-align:center; background: #f5f5f5; color: #666; line-height: 50px; text-transform: uppercase; } rm-datepicker .view-title a,[riot-tag="rm-datepicker"] .view-title a { cursor: pointer; } rm-datepicker .left-arrow,[riot-tag="rm-datepicker"] .left-arrow { float:left; line-height:50px; margin-left:10px; color:#555; } rm-datepicker .right-arrow,[riot-tag="rm-datepicker"] .right-arrow { float:right; line-height:50px; margin-right:10px; color:#555; } rm-datepicker .daysofweek,[riot-tag="rm-datepicker"] .daysofweek { background: #f5f5f5; width:100%; height:23px; color: #222; font-weight: 700; } rm-datepicker .daysofweek span,[riot-tag="rm-datepicker"] .daysofweek span { float:left; text-align:center; width:14.285714285%; } rm-datepicker .weekrow,[riot-tag="rm-datepicker"] .weekrow { height:auto; padding:2px 0; width:100%; } rm-datepicker .weekrow a,[riot-tag="rm-datepicker"] .weekrow a { height:40px; border-radius: 40px; display: inline-block; line-height: 40px; width:14.285714285%; text-align:center; } rm-datepicker .weekrow a:hover,[riot-tag="rm-datepicker"] .weekrow a:hover { background:rgb(233,229,227); cursor:pointer; } rm-datepicker .today,[riot-tag="rm-datepicker"] .today { } rm-datepicker .selected,[riot-tag="rm-datepicker"] .selected { background: #fff; border: 2px solid #119ec3; } rm-datepicker .nohover:hover,[riot-tag="rm-datepicker"] .nohover:hover {content:"";background:none;cursor:default;padding:0 !important;}', '', function(opts) {

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

	this.show = function(e) {
		me.open = !me.open;
	}.bind(this)

	this.pick = function(e) {
		var target = e.target || e.srcElement;
		me.date = moment({
				year: me.month.year(),
				month: me.month.month(),
				day: target.innerHTML
		});
		me.value = me.date.format(me.format);

		if(me.opts.onset != 'undefined')
			me.opts.onset();

		me.build(me.month);
		me.open = false;
		me.update();
	}.bind(this)

	this.previous = function(e) {
		if(me.min && me.min.diff(me.month) > 0)
			return;
		me.month.subtract(1, 'months');
		me.build(me.month);
	}.bind(this)

	this.next = function(e) {
		if(me.max && me.max.diff(me.month,'months') == 0)
			return;

		me.month.add(1, 'months');
		me.build(me.month);
	}.bind(this)

	this.build = function(date) {
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
	}.bind(this)

}, '{ }');
