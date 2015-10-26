var RMeventMixin = {
    fire: function (action) {
        var args = [];
        if(arguments.length > 1){
            for(var i=1; i< arguments.length; i++){
                args.push(arguments[i]);
            }
        }
            
		  if(typeof this.opts['on'+action] == 'function') {
			  this.opts['on'+action].apply(this, args);
		  }
    }
};    
var RMajaxMixin = {
    ajaxGet: function (url, cb) {
        var xhr = new XMLHttpRequest();
        xhr.open('GET', encodeURI(url));
        xhr.onload = function () {
            cb(xhr.responseText);
        };
        xhr.send();
    }
};    
riot.tag('rm-a', '<div class="wrap"> <input type="text" name="{opts.name}" class="base_input" autocomplete="off" placeholder="{ }" onkeyup="{ handleText }"> <div show="{ open }" class="list_container"> <ul class="list"> <li class="list-row" show="{ noResults && value.length > 1}"> { noResultsMessage } </li> <li class="list-row item{ item.active ? \' active\' : \'\'}" onclick="{ parent.pick }" each="{ item, i in filteredList }" onclick="{ parent.select }" data-value="{ item.value || item.text }"> { item.text } </li> </ul> </div> </div>', 'rm-a *, [riot-tag="rm-a"] *{ box-sizing: border-box; } rm-a .active, [riot-tag="rm-a"] .active{ background:rgb(215,215,215); } rm-a .base, [riot-tag="rm-a"] .base{ height:40px; padding-left:5px; margin-bottom:0px; width:100%; } rm-a .base_input, [riot-tag="rm-a"] .base_input{ border: none; border-bottom: 1px solid rgba(0,0,0,.12); display: block; font-size: 16px; margin: 0; padding: 4px 0; width: 100%; background: 0 0; text-align: left; color: inherit; } rm-a .base_input:focus, [riot-tag="rm-a"] .base_input:focus{ outline: 0; } rm-a .noborder .border, [riot-tag="rm-a"] .noborder .border{ border: 0; } rm-a .border, [riot-tag="rm-a"] .border{ height:35px; padding-left:5px; border:1px solid rgba(0,0,0,.12); box-sizing:border-box; } rm-a .border:-moz-placeholder, [riot-tag="rm-a"] .border:-moz-placeholder{ color: rgb(169,169,169); } rm-a .border:-ms-input-placeholder, [riot-tag="rm-a"] .border:-ms-input-placeholder{ color: rgb(169,169,169); } rm-a .border::-webkit-input-placeholder, [riot-tag="rm-a"] .border::-webkit-input-placeholder{ color: rgb(169,169,169); } rm-a .border::-moz-placeholder, [riot-tag="rm-a"] .border::-moz-placeholder{ color: rgb(169,169,169); } rm-a .err, [riot-tag="rm-a"] .err{border: 1px dashed red; color: rgb(169,169,169);} rm-a .filter, [riot-tag="rm-a"] .filter{padding:0;margin:0px;} rm-a .filter:hover, [riot-tag="rm-a"] .filter:hover{background:none;} rm-a .filter-input, [riot-tag="rm-a"] .filter-input{ background:none; border:none; border-bottom:1px solid rgba(0, 0, 0, 0.117647); box-sizing:border-box; color: rgb(85, 85, 85); padding:5px; font-size:16px; height:35px; margin:0px; width:100%; } rm-a .list-container, [riot-tag="rm-a"] .list-container{ position:absolute; left:0; right:0; background:#fff; height:auto; overflow-x:hidden; overflow-y:auto; border: 1px solid rgba(0, 0, 0, 0.117647); border-top:none; box-shadow: rgb(68, 68, 68) 0px 2px 10px -4px; z-index: 3; } rm-a .noselect, [riot-tag="rm-a"] .noselect{ -webkit-touch-callout: none; -webkit-user-select: none; -khtml-user-select: none; -moz-user-select: none; -ms-user-select: none; user-select: none; } rm-a .list, [riot-tag="rm-a"] .list{ list-style-type: none; padding:0; margin:0; -webkit-margin-before: 0; -webkit-margin-after: 0; } rm-a .list .list-row, [riot-tag="rm-a"] .list .list-row{ position:relative; display: block; padding:5px 15px; margin:0px; overflow:auto; border-bottom: 1px solid rgba(0, 0, 0, 0.117647); } rm-a .list .list-row .accent, [riot-tag="rm-a"] .list .list-row .accent{ position:absolute; top:0; right:0; padding:5px; font-size:12px; font-style:italic; color:rgb(169,169,169); -webkit-font-smoothing: antialiased; -moz-osx-font-smoothing: grayscale; } rm-a .list .list-row:last-child, [riot-tag="rm-a"] .list .list-row:last-child{ border-bottom:none; } rm-a .list .list-row:hover, [riot-tag="rm-a"] .list .list-row:hover{ background: rgb(240, 240, 240); cursor: pointer; } rm-a textarea:focus, [riot-tag="rm-a"] textarea:focus,rm-a input:focus, [riot-tag="rm-a"] input:focus{ outline: 0; } rm-a .wrap, [riot-tag="rm-a"] .wrap{ position: relative; }', function(opts) {
   
  var me = this;

  this.mixin(RMajaxMixin);
  this.mixin(RMeventMixin);

  this.open = false;
  this.select = opts.type === "select" ? true : false;
  this.maxHeight = opts.height || '520px';
  this.parameter = opts.parameter || false;
  
  this.url = opts.url || false;
  if(this.url !== false)
    this.ajax = true;
  this.list = opts.list || [];
  this.filteredList = opts.list || [];
  
  this.noResults = false;
  this.noResultsMessage = opts.message || 'No results...';
  
  this.on('mount',function(){
    
    if(this.ajax) {
      this.ajaxGetTesting(this.url, function(res) {
        var json = JSON.parse(res);
        me.list = json;
        me.filteredList = json;
        me.update();
      });
    }
    
    this.root.querySelector('.list').style.maxHeight = this.maxHeight;

    document.addEventListener('click', me.globalClose);
    document.addEventListener('focus', me.globalClose, true);
    
  });

  this.on('unmount', function () {
    document.removeEventListener('click', me.globalClose);
    document.removeEventListener('focus', me.globalClose, true);
  });
  
  this.handleText = function(e) {

    if ([13, 27, 38, 40].indexOf(e.keyCode) > -1) {
      e.preventDefault();
      this.keys(e.keyCode)
    } else {
      var target = e.srcElement || e.originalTarget;
      this.getList(target.value);
    }
  }.bind(this);
  
  this.keys = function() {
    
  }.bind(this);
  
  this.getList = function(value) {
    if(value.length < 2)
      return;

    if(this.parameter) {
      var path = this.url + '/' + this.parameter + '/' + encodeURIComponent(value);
      
      clearTimeout(this.timeout);

      this.timeout = setTimeout(function() {
        this.ajaxGet(path, function(res) { return JSON.parse(res); });
      });
      
    } else {
      
      return this.list.filter(function(e) {
        return c.text.match(RegExp(target.value,'i'));
      });
        
    }
  }.bind(this);
  
  this.openWindow = function(e) {
    if(this.open)
      return;
    this.open = true;
    this.update();      
  }.bind(this);

  this.closeWindow = function(e) {
    this.open = false;
    this.update();
  }.bind(this);

  this.globalClose = function(e) {
    if (e != undefined && this.root.contains(e.target)) {
      return;
    }
    this.closeWindow();
  }.bind(this);
 

});

riot.tag('rm-autocomplete', '<div class="wrap noselect{opts.noborder ? \' noborder\' : \'\'}"> <input type="text" name="{opts.name}" class="mdl-textfield__input base { border : select }" autocomplete="off" placeholder="{ opts.placeholder || \'Type...\' }" onkeyup="{ handleText }" value="{ value }"> <div show="{ open }" class="list-container"> <ul class="list"> <li show="{ select && !noFilter }" class="filter"> <input type="text" class="filter-input" placeholder="Filter" onkeyup="{ handleText }" autocomplete="off"> </li> <li class="list-row" show="{ noResults && value.length > 1}"> { noResultsMessage } </li> <li class="list-row item{ item.active ? \' active\' : \'\'}" onclick="{ parent.pick }" each="{ item, i in filteredList }" onclick="{ parent.select }" data-value="{ item.value || item.text }"> { item.text }<span class="accent">{ item.accent }</span> </li> </ul> </div> </div>', 'rm-autocomplete *, [riot-tag="rm-autocomplete"] *{ box-sizing: border-box; } rm-autocomplete .active, [riot-tag="rm-autocomplete"] .active{ background:rgb(215,215,215); } rm-autocomplete .base, [riot-tag="rm-autocomplete"] .base{ height:40px; padding-left:5px; margin-bottom:0px; width:100%; } rm-autocomplete .noborder .border, [riot-tag="rm-autocomplete"] .noborder .border{ border: 0; } rm-autocomplete .border, [riot-tag="rm-autocomplete"] .border{ height:35px; padding-left:5px; border:1px solid rgba(0,0,0,.12); box-sizing:border-box; } rm-autocomplete .border:-moz-placeholder, [riot-tag="rm-autocomplete"] .border:-moz-placeholder{ color: rgb(169,169,169); } rm-autocomplete .border:-ms-input-placeholder, [riot-tag="rm-autocomplete"] .border:-ms-input-placeholder{ color: rgb(169,169,169); } rm-autocomplete .border::-webkit-input-placeholder, [riot-tag="rm-autocomplete"] .border::-webkit-input-placeholder{ color: rgb(169,169,169); } rm-autocomplete .border::-moz-placeholder, [riot-tag="rm-autocomplete"] .border::-moz-placeholder{ color: rgb(169,169,169); } rm-autocomplete .err, [riot-tag="rm-autocomplete"] .err{border: 1px dashed red; color: rgb(169,169,169);} rm-autocomplete .filter, [riot-tag="rm-autocomplete"] .filter{padding:0;margin:0px;} rm-autocomplete .filter:hover, [riot-tag="rm-autocomplete"] .filter:hover{background:none;} rm-autocomplete .filter-input, [riot-tag="rm-autocomplete"] .filter-input{ background:none; border:none; border-bottom:1px solid rgba(0, 0, 0, 0.117647); box-sizing:border-box; color: rgb(85, 85, 85); padding:5px; font-size:16px; height:35px; margin:0px; width:100%; } rm-autocomplete .list-container, [riot-tag="rm-autocomplete"] .list-container{ position:absolute; left:0; right:0; background:#fff; height:auto; overflow-x:hidden; overflow-y:auto; border: 1px solid rgba(0, 0, 0, 0.117647); border-top:none; box-shadow: rgb(68, 68, 68) 0px 2px 10px -4px; z-index: 3; } rm-autocomplete .noselect, [riot-tag="rm-autocomplete"] .noselect{ -webkit-touch-callout: none; -webkit-user-select: none; -khtml-user-select: none; -moz-user-select: none; -ms-user-select: none; user-select: none; } rm-autocomplete .list, [riot-tag="rm-autocomplete"] .list{ list-style-type: none; padding:0; margin:0; -webkit-margin-before: 0; -webkit-margin-after: 0; } rm-autocomplete .list .list-row, [riot-tag="rm-autocomplete"] .list .list-row{ position:relative; display: block; padding:5px 15px; margin:0px; overflow:auto; border-bottom: 1px solid rgba(0, 0, 0, 0.117647); } rm-autocomplete .list .list-row .accent, [riot-tag="rm-autocomplete"] .list .list-row .accent{ position:absolute; top:0; right:0; padding:5px; font-size:12px; font-style:italic; color:rgb(169,169,169); -webkit-font-smoothing: antialiased; -moz-osx-font-smoothing: grayscale; } rm-autocomplete .list .list-row:last-child, [riot-tag="rm-autocomplete"] .list .list-row:last-child{ border-bottom:none; } rm-autocomplete .list .list-row:hover, [riot-tag="rm-autocomplete"] .list .list-row:hover{ background: rgb(240, 240, 240); cursor: pointer; } rm-autocomplete textarea:focus, [riot-tag="rm-autocomplete"] textarea:focus,rm-autocomplete input:focus, [riot-tag="rm-autocomplete"] input:focus{ outline: 0; } rm-autocomplete .wrap, [riot-tag="rm-autocomplete"] .wrap{ position: relative; }', function(opts) {

  var tag = this;

  this.mixin(RMajaxMixin);
  this.mixin(RMeventMixin);

  this.open = false;
  this.select = opts.type === "select" ? true : false;
  this.maxHeight = opts.height || '520px';
  this.noFilter = opts.nofilter || false;
  this.url = opts.url || false;
  if(this.url !== false)
    this.ajax = true;
  this.parameter = opts.parameter || false;
  this.list = opts.list || [];
  this.filteredList = opts.list || [];
  this.noResults = false;
  this.noResultsMessage = opts.message || 'No results...';
  this.atIndex = -1;

  this.timeout = false;


  this.on('mount',function(){
    
    var base = this.root.querySelector('.base');

    if(opts.name)
      tag.setup(base);
    else
      tag.error(base,'No name attribute');

    document.addEventListener('click', tag.globalClose);
    document.addEventListener('focus', tag.globalClose, true);
    
  });

  this.on('unmount', function () {
    document.removeEventListener('click', tag.globalClose);
    document.removeEventListener('focus', tag.globalClose, true);
  });

  this.setup = function(input) {
    
    if(tag.select)
      input.readOnly = true;

    if(tag.ajax) {
      tag.ajaxGet(tag.url, function(res) {
        var json = JSON.parse(res);
        tag.list = json;
        tag.filteredList = json;
        tag.update();
      });
    }
    
    tag.root.querySelector('.list').style.maxHeight = tag.maxHeight;
    input.onfocus = function(e) {
      if(!tag.open) {
        tag.openWindow(e);
      }
    }
    
  }.bind(this);

  this.error = function(input, message) {
    input.readOnly = true;
    input.classList.add('err');
    input.value = message;
    tag.closeWindow();
  }.bind(this);

  this.openWindow = function(e) {
    
    if(tag.open)
      return;

    tag.open = true;
    tag.update();

    if(tag.select)
      tag.root.querySelector('.filter-input').select();
      
  }.bind(this);

  this.closeWindow = function(e) {
    tag.atIndex = -1;
    tag.open = false;
    tag.update();
  }.bind(this);

  this.globalClose = function(e) {
    if (e != undefined && tag.root.contains(e.target)) {
      return;
    }
    tag.closeWindow();
  }.bind(this);

  this.pick = function(e) {
    var target = e.srcElement || e.originalTarget;
    tag.value = target.innerHTML.replace(/<(?:.|\n)*?>/gm, '').trim();
    tag.fire('change',{'value':tag.value});
    tag.closeWindow();
  }.bind(this);

  this.handleText = function(e) {

    if ([13, 27, 38, 40].indexOf(e.keyCode) > -1) {
      e.preventDefault();
      tag.keys(e.keyCode)
    } else {

      tag.deactivate();

      var target = e.srcElement || e.originalTarget;

      if(target.value.length < 2) {
        tag.filteredList = tag.list || [];
        return;
      }

      if(tag.parameter) {
      
        var path = tag.url + '/' + tag.parameter + '/' + encodeURIComponent(target.value);

        clearTimeout(tag.timeout);

        tag.timeout = setTimeout(function() {
          tag.ajaxGet(path, function(res) {
            var json = JSON.parse(res);
            if(json.length > 0)
              tag.noResults = false;
            else
              tag.noResults = true;
            tag.filteredList = json;
            tag.update();
          });
        },100);

      } else {

        tag.filteredList = tag.list.filter(function(c) {
          return c.text.match(RegExp(target.value,'i'));
        });

      }

      tag.noResults = false;
      if(tag.filteredList.length < 1 && !tag.parameter)
        tag.noResults = true;
    }

    tag.update();
    
  }.bind(this);

  this.keys = function(val) {
    
    if (val == 27) {
      tag.closeWindow();
    } else if (val == 13) {
      
      if(tag.filteredList.length == 1) {
        
        tag.value = tag.filteredList[0].text;
        tag.closeWindow();
        tag.root.querySelector('.base').blur();
        return;
        
      } else {
        
        tag.filteredList.forEach(function(item) {
          if(item.active) {
            tag.value = item.text;
            tag.fire('change',{'value':item.text});
            tag.closeWindow();
          }
        });
        
      }
      
    } else if (val == 38) {

      if(tag.atIndex <= 0)
        return;
      
      tag.atIndex--;
      tag.activate();
      
    } else if (val == 40) {
      
      if(tag.atIndex + 1 >= tag.filteredList.length)
        return;

      tag.atIndex++;
      tag.activate();
      
    }
    
  }.bind(this);

  this.activate = function() {

    if(typeof tag.filteredList[tag.atIndex] === 'undefined') {
      return;
    }

    tag.deactivate();
    tag.filteredList[tag.atIndex].active = true;
    tag.update();

    var active = tag.root.querySelector('.active');
    var table = tag.root.querySelector('.list');

    var diff = active.getBoundingClientRect().top - table.getBoundingClientRect().top;
    var max = parseInt(table.style.maxHeight);

    if(diff >= max || diff < 0) {
      active.scrollIntoView();
    }
    
  }.bind(this);

  this.deactivate = function() {
    tag.filteredList.forEach(function(item) {
      item.active = false;
    });
  }.bind(this);


});

riot.tag('rm-chart', '<div id="chart" class="noselect" style="width: 100%; height: 100%"></div>', 'rm-chart .noselect, [riot-tag="rm-chart"] .noselect{ -webkit-touch-callout: none; -webkit-user-select: none; -khtml-user-select: none; -moz-user-select: none; -ms-user-select: none; user-select: none; }', function(opts) {
	
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
		var data = new google.visualization.arrayToDataTable(opts.data);
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

riot.tag('rm-datepicker', '<div class="rm-datepicker"> <input class="base-input" type="text" onclick="{ show }" value="{ value }" readonly> <div show="{ open }" class="view"> <div class="view-title"> <a onclick="{ previous }"><i class="material-icons left-arrow">&#xE5C4;</i></a> <span class="month">{ header }</span> <a onclick="{ next }"><i class="material-icons right-arrow">&#xE5C8;</i></a> </div> <div class="daysofweek"> <span>Mo</span> <span>Tu</span> <span>We</span> <span>Th</span> <span>Fr</span> <span>Sa</span> <span>Su</span> </div> <div class="weekrow" each="{ rows in mydata }"> <a class="{ nohover: day.asNumber < 0, today: day.active, selected:day.selected }" onclick="{ pick }" each="{ day in rows }">{ day.asNumber > 0 ? day.asNumber : \'&nbsp;\' }</a> </div> </div> </div>', 'rm-datepicker *, [riot-tag="rm-datepicker"] *{box-sizing:border-box;} rm-datepicker table, [riot-tag="rm-datepicker"] table,rm-datepicker caption, [riot-tag="rm-datepicker"] caption,rm-datepicker tbody, [riot-tag="rm-datepicker"] tbody,rm-datepicker tfoot, [riot-tag="rm-datepicker"] tfoot,rm-datepicker thead, [riot-tag="rm-datepicker"] thead,rm-datepicker tr, [riot-tag="rm-datepicker"] tr,rm-datepicker th, [riot-tag="rm-datepicker"] th,rm-datepicker td, [riot-tag="rm-datepicker"] td{ margin: 0; padding: 0 !important; border: 0; outline: 0; font-size: 100%; vertical-align: baseline; background: transparent; text-align:center; } rm-datepicker a, [riot-tag="rm-datepicker"] a{ color: rgb(117,117,117); text-decoration:none; } rm-datepicker .rm-datepicker, [riot-tag="rm-datepicker"] .rm-datepicker{ position: relative; -webkit-touch-callout: none; -webkit-user-select: none; -khtml-user-select: none; -moz-user-select: none; -ms-user-select: none; user-select: none; } rm-datepicker .base-input, [riot-tag="rm-datepicker"] .base-input{ height:40px; padding-left:5px; border:1px solid #D3D3D3; box-sizing:border-box; padding-left:5px; cursor: pointer; color: rgb(85, 85, 85); font-size:1em; } rm-datepicker .view, [riot-tag="rm-datepicker"] .view{ position: absolute; background: #FFF; border: 1px solid #D3D3D3; width:280px; height:auto; margin-top:5px; -webkit-box-sizing: border-box; -moz-box-sizing: border-box; -webkit-box-shadow: 0 2px 10px -4px #444; -moz-box-shadow: 0 2px 10px -4px #444; box-shadow: 0 2px 10px -4px #444; z-index:10; } rm-datepicker .view-title, [riot-tag="rm-datepicker"] .view-title{ display:block; text-align:center; background: #f5f5f5; color: #666; line-height: 50px; text-transform: uppercase; } rm-datepicker .view-title a, [riot-tag="rm-datepicker"] .view-title a{ cursor: pointer; } rm-datepicker .left-arrow, [riot-tag="rm-datepicker"] .left-arrow{ float:left; line-height:50px; margin-left:10px; color:#555; } rm-datepicker .right-arrow, [riot-tag="rm-datepicker"] .right-arrow{ float:right; line-height:50px; margin-right:10px; color:#555; } rm-datepicker .daysofweek, [riot-tag="rm-datepicker"] .daysofweek{ background: #f5f5f5; width:100%; height:23px; color: #222; font-weight: 700; } rm-datepicker .daysofweek span, [riot-tag="rm-datepicker"] .daysofweek span{ float:left; text-align:center; width:14.285714285%; } rm-datepicker .weekrow, [riot-tag="rm-datepicker"] .weekrow{ height:auto; padding:2px 0; width:100%; } rm-datepicker .weekrow a, [riot-tag="rm-datepicker"] .weekrow a{ height:40px; border-radius: 40px; display: inline-block; line-height: 40px; width:14.285714285%; text-align:center; } rm-datepicker .weekrow a:hover, [riot-tag="rm-datepicker"] .weekrow a:hover{ background:rgb(233,229,227); cursor:pointer; } rm-datepicker .today, [riot-tag="rm-datepicker"] .today{ } rm-datepicker .selected, [riot-tag="rm-datepicker"] .selected{ background: #fff; border: 2px solid #119ec3; } rm-datepicker .nohover:hover, [riot-tag="rm-datepicker"] .nohover:hover{content:"";background:none;cursor:default;padding:0 !important;}', function(opts) {

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
	}.bind(this);

	this.pick = function(e) {
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
	}.bind(this);

	this.previous = function(e) {
		if(me.min && me.min.diff(me.month) > 0)
			return;
		me.month.subtract(1, 'months');
		me.build(me.month);
	}.bind(this);

	this.next = function(e) {
		if(me.max && me.max.diff(me.month,'months') == 0)
			return;
	
		me.month.add(1, 'months');
		me.build(me.month);
	}.bind(this);
	
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
	}.bind(this);


});

riot.tag('rm-google-map', '<div class="wrapper"> <div if="{ infoWindow }" class="infoWindow"> <div class="card"> <div class="description"> <p class="title">Sunshine Theater</p> <span class="address">120 Central Ave SW, Albuquerque, NM 87102</span> </div> </div> </div> <div class="rm-google-map"></div> </div>', 'rm-google-map .wrapper, [riot-tag="rm-google-map"] .wrapper{ position:relative; height:100%; width:100%; } rm-google-map .infoWindow, [riot-tag="rm-google-map"] .infoWindow{ position:absolute; top:0px; left:0px; width:auto; height:auto; margin: 10px; padding: 1px; -webkit-box-shadow: rgba(0, 0, 0, 0.298039) 0px 1px 4px -1px; box-shadow: rgba(0, 0, 0, 0.298039) 0px 1px 4px -1px; border-radius: 2px; background-color: white; z-index:10; } rm-google-map .card, [riot-tag="rm-google-map"] .card{padding: 9px 4px 9px 11px;} rm-google-map .description, [riot-tag="rm-google-map"] .description{ width: 200px; display: inline-block; color: #5B5B5B; } rm-google-map .description .title, [riot-tag="rm-google-map"] .description .title{ overflow: hidden; white-space: nowrap; text-overflow: ellipsis; font-weight: 500; font-size: 14px; color: black; margin:0; } rm-google-map .description .address, [riot-tag="rm-google-map"] .description .address{ margin-top: 6px; font-size: 12px; } rm-google-map .rm-google-map, [riot-tag="rm-google-map"] .rm-google-map{ margin: 0; padding: 0; width: 100%; height: 100%; } rm-google-map .rm-google-map img, [riot-tag="rm-google-map"] .rm-google-map img{ max-width: inherit; }', function(opts) {

	var me = this;

	
	this.on('mount',function() {
		window.RiotModeMap = function() {
			me.buildMap();
		}
		me.loadScript();
	});

	this.buildMap = function() {
		me.buildOpts();
		var map = new google.maps.Map(me.root.querySelector('.rm-google-map'), me.mapOptions);
		
		if(opts.address) {
			
			var geocoder = new google.maps.Geocoder();
			
			if(Array.isArray(opts.address)) {
				opts.address.forEach(function(item) {
					me.address(map,geocoder,item);
				});
			} else {
				me.address(map,geocoder,opts,address);
			}






		}
		
		if(opts.markers.length > 0) {
			for (var i = 0; i < opts.markers.length; i++) {
				var location = opts.markers[i];
			    var myLatLng = new google.maps.LatLng(location[1], location[2]);
			    var marker = new google.maps.Marker({
			        position: myLatLng,
			        map: map,
			        icon: opts.icon || '',
			        title: location[0] || '',
			        zIndex: location[3] || 1
			    });
			}
		}
	}.bind(this);
	
	this.address = function(map, geo, location) {
		geo.geocode({ 'address': location }, function(results, status) {
			if (status == google.maps.GeocoderStatus.OK) {
				map.setCenter(results[0].geometry.location);
				var marker = new google.maps.Marker({
					map: map,
					position: results[0].geometry.location,
					icon: opts.icon || '',
					animation: google.maps.Animation.DROP
				});
			}
		});
	}.bind(this);
	
	this.buildOpts = function() {
		me.mapOptions = {
			center: opts.center || { lat: 35.1107, lng: -106.6100 },
			zoom: opts.zoom || 5,
			zoomControl: opts.zoomControl || false,
			panControl: false,
    		scaleControl: true,
			mapTypeId: google.maps.MapTypeId[opts.mapType.toUpperCase()] || google.maps.MapTypeId.ROADMAP,
		};
	}.bind(this);

	this.loadScript = function() {
		if (!document.getElementById('gmap_script')) {
			var script = document.createElement('script');
			script.setAttribute('id', 'gmap_script');
			script.type = 'text/javascript';
			script.src = 'https://maps.googleapis.com/maps/api/js?sensor=false&callback=window.RiotModeMap';
			document.body.appendChild(script);
		} else {
			me.buildMap();
		}
	}.bind(this);


});

riot.tag('rm-loader', '<div id="wrap"> <div class="mdl-spinner mdl-spinner--single-color mdl-js-spinner is-active"></div> </div>', function(opts) {
	
	var me = this;
	
	this.config = {
		'spinner' : function() {
			
		},
		'spinner-single-color' : function() {
			
		},
	}
	
	this.on('mount', function() {
		var wrap = this.root.children[0];
		componentHandler.upgradeDom();
	});

});

riot.tag('rm-markdown', '<raw content="{html}"></raw>', function(opts) {

	this.html = opts.content ? marked(opts.content) : '';

	this.on('mount', function() {
		if(!window.marked) {
			me.root.innerHTML = "<span style='color:red;'>Please load the marked library to use this tag.<span>";
		}
	});


});

riot.tag('raw', '<span></span>', function(opts) {
	this.root.innerHTML = opts.content

});
riot.tag('rm-modal', '<div class="modalMaster" show="{open}"> <div class="overlay" onclick="{closeModal}"></div> <div class="modal"> <button class="close-btn" onclick="{closeModal}">X</button> <div class="modal-content"><yield></yield></div> <div class="clear"></div> </div> </div> <button hide="{hide_btn}" onclick="{ openModal }" class="{ opts[\'open-btn-class\'] }"><i class="{ opts[\'open-btn-icon\'] }"></i> { opts[\'open-btn-text\'] }</button>', 'rm-modal .modalMaster, [riot-tag="rm-modal"] .modalMaster{ position: fixed; top: 0; right: 0; bottom: 0; left: 0; z-index: 100; } rm-modal .overlay, [riot-tag="rm-modal"] .overlay{ position: fixed; top: 0; right: 0; bottom: 0; left: 0; text-align: center; z-index: 101; background-color: rgba(0, 0, 0, 0.8); } rm-modal .modal, [riot-tag="rm-modal"] .modal{ max-width: 35%; position: fixed; left: 33%; top: 20%; padding: 15px; background-color: #fff; z-index: 102; -webkit-border-radius: 5px; -moz-border-radius: 5px; -o-border-radius: 5px; border-radius: 5px; } rm-modal .modal-content, [riot-tag="rm-modal"] .modal-content{ max-height: 500px; overflow-y: auto; } rm-modal .close-btn, [riot-tag="rm-modal"] .close-btn{ background-color: black; color: white; font-weight: 200; width: 30px; height: 30px; border: 2px solid white; outline: none; cursor: pointer; font-size: 15px; position: absolute; top: -10px; right: -10px; -webkit-border-radius: 15px; -moz-border-radius: 15px; -o-border-radius: 15px; border-radius: 15px; -webkit-box-shadow: 0 0 5px 0 rgba(0,0,0,0.75); -moz-box-shadow: 0 0 5px 0 rgba(0,0,0,0.75); box-shadow: 0 0 5px 0 rgba(0,0,0,0.75); } rm-modal .close-btn:hover, [riot-tag="rm-modal"] .close-btn:hover{ background-color: white; color: black; -webkit-transition: all 0.3s ease-in-out; -moz-transition: all 0.3s ease-in-out; -o-transition: all 0.3s ease-in-out; transition: all 0.3s ease-in-out; } rm-modal .clear, [riot-tag="rm-modal"] .clear{ clear: both; } rm-modal .hidden, [riot-tag="rm-modal"] .hidden{ display: none; }', function(opts) {
    
    
    
    
    var me = this;
    
    this.mixin(RMeventMixin);
    this.open = false;
    this.hide_btn = false;

    this.on('mount',function(){
      if(!this.opts['open-btn-text'])
        this.hide_btn = true;
      this.update();
    })
    
    this.openModal = function(e) {
      this.open = true;
      this.update();
      if(typeof RiotControl != 'undefined'){
        RiotControl.trigger('modalopened');
      }
      this.fire('open', e);
    }.bind(this);
    
    this.closeModal = function(e) {
      this.open = false;
      this.update();
      if(typeof RiotControl != 'undefined'){
        RiotControl.trigger('modalclosed');
      }
      this.fire('close', e);
    }.bind(this);
    

});
riot.tag('rm-router', '<div style="display:none;" id="options"> <yield></yield> </div> <div id="base"></div>', function(opts) {
	

	var me = this;
	this.routes = opts.routes || false;
	this.mountedTag = false;
	this.mixin(RMeventMixin);

	this.on('mount', function() {
		me.initialize();

		riot.route.parser(function(path) {
			return me.parseUrl(path);
		});
		riot.route.start();
		riot.route.exec(function(url) {
			me.load(url || me.parseUrl('/'));
		});
		riot.route(function(url) {
			me.load(url);
		});
	});

	this.on('unmount', function() {
		riot.route.stop();
	});

	this.initialize = function() {
		if(me.options.innerHTML.trim() != '') {
			var sections = me.options.querySelectorAll('section');
			var routes = [];
			for (i = 0; i < sections.length; ++i) {
  				var route = sections[i].getAttribute('route');
				var path = sections[i].getAttribute('src');

				if(!path || !route) {

				}
				routes.push({'route':route, 'path':path});
			}
			me.routes = routes;
		} else {
			console.log("RiotMode: rm-router has no options!");
		}
	}.bind(this);

	this.parseUrl = function(path, mode) {


		mode = 'hash';
		var url = {
		    isHashPath: mode === 'hash'
		};

		if (typeof URL === 'function') {

		    var nativeUrl = new URL(location);
		    url.path = nativeUrl.pathname;
		    url.hash = nativeUrl.hash;
		    url.search = nativeUrl.search;
		} else {

		    var anchor = document.createElement('a');
		    anchor.href = location;
		    url.path = anchor.pathname;
		    if (url.path.charAt(0) !== '/') {
		        url.path = '/' + url.path;
		    }
		    url.hash = anchor.hash;
		    url.search = anchor.search;
		}

		if (mode !== 'pushstate') {


		    if (url.hash.substring(0, 2) === '#/') {

		        url.isHashPath = true;
		        url.path = url.hash.substring(1);
		    } else if (url.hash.substring(0, 3) === '#!/') {

		        url.isHashPath = true;
		        url.path = url.hash.substring(2);
		    } else if (url.isHashPath) {

		        if (url.hash.length === 0) {
		            url.path = '/';
		        } else {
		            url.path = url.hash.substring(1);
		        }
		    }

		    if (url.isHashPath) {
		        url.hash = '';

		        var secondHashIndex = url.path.indexOf('#');
		        if (secondHashIndex !== -1) {
		            url.hash = url.path.substring(secondHashIndex);
		            url.path = url.path.substring(0, secondHashIndex);
		        }

		        var searchIndex = url.path.indexOf('?');
		        if (searchIndex !== -1) {
		            url.search = url.path.substring(searchIndex);
		            url.path = url.path.substring(0, searchIndex);
		        }
		    }
		}

		return url;
	}.bind(this);

	this.load = function(url) {
		
		var found = false;
		for (i = 0; i < me.routes.length; ++i) {
			found = me.compare(url.path, me.routes[i].route);
			if(found) {
			    if(me.mountedTag)
			    	me.mountedTag.unmount(true);

				
			    riot.compile(me.routes[i].path, function() {
			    	me.fire('load');
					var fileName = me.routes[i].path.split('/').pop().replace(/\.[^/.]+$/, "");
			    	me.mountedTag = riot.mount(me.base, 'page-'+fileName)[0];



			    });
				return;
			}
		}
	}.bind(this);

	this.compare = function(base, match) {
		if(base === match) {
			return true;
		}
		return false;
	}.bind(this);

	this.error = function() {

	}.bind(this);


});

riot.tag('rm-table', '<table class="awesometable { tableType }"> <thead if="{ validateTableSection(tableHeaders) }"> <tr class="{ pointer: sortTable }"> <th onclick="{ sortTable ? sortByTableColumn : \'\' }" data-header-index="{ i }" each="{ headerContent, i in tableHeaders}">{ headerContent }<i data-header-index="{ i }" if="{ sortTable }" class="material-icons sort-icon">keyboard_arrow_down</i></th> </tr> </thead> <tbody if="{ validateTableSection(tableContent) }"> <tr each="{ bodyContentRows, i in tableContent }"> <td id="body" each="{ bodyContentData, i in bodyContentRows }">{ processBody(bodyContentData) }</td> </tr> </tbody> <tfoot if="{ validateTableSection(tableFooter) }"> <tr class="awesome-section"> <td each="{ footerContent, i in tableFooter }">{ processFooter(footerContent) }</td> </tr> </tfoot> </table>', 'rm-table .awesometable, [riot-tag="rm-table"] .awesometable{ width: 100%; margin-bottom: 20px; max-width: 100%; background-color: transparent; border-collapse: collapse; border-spacing: 0; font-family: helvetica; } rm-table .awesometable-fixed, [riot-tag="rm-table"] .awesometable-fixed{ table-layout: fixed; } rm-table .awesometable th, [riot-tag="rm-table"] .awesometable th,rm-table .awesometable td, [riot-tag="rm-table"] .awesometable td{ padding: 8px; line-height: 20px; text-align: left; vertical-align: top; border-top: 1px solid #dddddd; font-family: helvetica; } rm-table .awesometable.awesometable-small td, [riot-tag="rm-table"] .awesometable.awesometable-small td,rm-table .awesometable.awesometable-small th, [riot-tag="rm-table"] .awesometable.awesometable-small th{ font-size: 10px; } rm-table .awesometable th, [riot-tag="rm-table"] .awesometable th{ font-weight: bold; font-size: 11px; } rm-table .awesometable thead th, [riot-tag="rm-table"] .awesometable thead th{ vertical-align: bottom; } rm-table .awesometable caption + thead tr:first-child th, [riot-tag="rm-table"] .awesometable caption + thead tr:first-child th,rm-table .awesometable caption + thead tr:first-child td, [riot-tag="rm-table"] .awesometable caption + thead tr:first-child td,rm-table .awesometable colgroup + thead tr:first-child th, [riot-tag="rm-table"] .awesometable colgroup + thead tr:first-child th,rm-table .awesometable colgroup + thead tr:first-child td, [riot-tag="rm-table"] .awesometable colgroup + thead tr:first-child td,rm-table .awesometable thead:first-child tr:first-child th, [riot-tag="rm-table"] .awesometable thead:first-child tr:first-child th,rm-table .awesometable thead:first-child tr:first-child td, [riot-tag="rm-table"] .awesometable thead:first-child tr:first-child td{ border-top: 0; } rm-table .awesometable tbody + tbody, [riot-tag="rm-table"] .awesometable tbody + tbody{ border-top: 2px solid #dddddd; } rm-table .awesometable .awesometable, [riot-tag="rm-table"] .awesometable .awesometable{ background-color: #ffffff; } rm-table .awesometable-condensed th, [riot-tag="rm-table"] .awesometable-condensed th,rm-table .awesometable-condensed td, [riot-tag="rm-table"] .awesometable-condensed td{ padding: 4px 5px; font-size: 11px; } rm-table .awesometable-bordered, [riot-tag="rm-table"] .awesometable-bordered{ border: 1px solid #dddddd; border-collapse: separate; *border-collapse: collapse; border-left: 0; -webkit-border-radius: 4px; -moz-border-radius: 4px; border-radius: 4px; } rm-table .awesometable-bordered th, [riot-tag="rm-table"] .awesometable-bordered th,rm-table .awesometable-bordered td, [riot-tag="rm-table"] .awesometable-bordered td{ border-left: 1px solid #dddddd; } rm-table .awesometable-bordered caption + thead tr:first-child th, [riot-tag="rm-table"] .awesometable-bordered caption + thead tr:first-child th,rm-table .awesometable-bordered caption + tbody tr:first-child th, [riot-tag="rm-table"] .awesometable-bordered caption + tbody tr:first-child th,rm-table .awesometable-bordered caption + tbody tr:first-child td, [riot-tag="rm-table"] .awesometable-bordered caption + tbody tr:first-child td,rm-table .awesometable-bordered colgroup + thead tr:first-child th, [riot-tag="rm-table"] .awesometable-bordered colgroup + thead tr:first-child th,rm-table .awesometable-bordered colgroup + tbody tr:first-child th, [riot-tag="rm-table"] .awesometable-bordered colgroup + tbody tr:first-child th,rm-table .awesometable-bordered colgroup + tbody tr:first-child td, [riot-tag="rm-table"] .awesometable-bordered colgroup + tbody tr:first-child td,rm-table .awesometable-bordered thead:first-child tr:first-child th, [riot-tag="rm-table"] .awesometable-bordered thead:first-child tr:first-child th,rm-table .awesometable-bordered tbody:first-child tr:first-child th, [riot-tag="rm-table"] .awesometable-bordered tbody:first-child tr:first-child th,rm-table .awesometable-bordered tbody:first-child tr:first-child td, [riot-tag="rm-table"] .awesometable-bordered tbody:first-child tr:first-child td{ border-top: 0; } rm-table .awesometable-bordered thead:first-child tr:first-child > th:first-child, [riot-tag="rm-table"] .awesometable-bordered thead:first-child tr:first-child > th:first-child,rm-table .awesometable-bordered tbody:first-child tr:first-child > td:first-child, [riot-tag="rm-table"] .awesometable-bordered tbody:first-child tr:first-child > td:first-child{ -webkit-border-top-left-radius: 4px; -moz-border-radius-topleft: 4px; border-top-left-radius: 4px; } rm-table .awesometable-bordered thead:first-child tr:first-child > th:last-child, [riot-tag="rm-table"] .awesometable-bordered thead:first-child tr:first-child > th:last-child,rm-table .awesometable-bordered tbody:first-child tr:first-child > td:last-child, [riot-tag="rm-table"] .awesometable-bordered tbody:first-child tr:first-child > td:last-child{ -webkit-border-top-right-radius: 4px; -moz-border-radius-topright: 4px; border-top-right-radius: 4px; } rm-table .awesometable-bordered thead:last-child tr:last-child > th:first-child, [riot-tag="rm-table"] .awesometable-bordered thead:last-child tr:last-child > th:first-child,rm-table .awesometable-bordered tbody:last-child tr:last-child > td:first-child, [riot-tag="rm-table"] .awesometable-bordered tbody:last-child tr:last-child > td:first-child,rm-table .awesometable-bordered tfoot:last-child tr:last-child > td:first-child, [riot-tag="rm-table"] .awesometable-bordered tfoot:last-child tr:last-child > td:first-child{ -webkit-border-bottom-left-radius: 4px; -moz-border-radius-bottomleft: 4px; border-bottom-left-radius: 4px; } rm-table .awesometable-bordered thead:last-child tr:last-child > th:last-child, [riot-tag="rm-table"] .awesometable-bordered thead:last-child tr:last-child > th:last-child,rm-table .awesometable-bordered tbody:last-child tr:last-child > td:last-child, [riot-tag="rm-table"] .awesometable-bordered tbody:last-child tr:last-child > td:last-child,rm-table .awesometable-bordered tfoot:last-child tr:last-child > td:last-child, [riot-tag="rm-table"] .awesometable-bordered tfoot:last-child tr:last-child > td:last-child{ -webkit-border-bottom-right-radius: 4px; -moz-border-radius-bottomright: 4px; border-bottom-right-radius: 4px; } rm-table .awesometable-bordered tfoot + tbody:last-child tr:last-child td:first-child, [riot-tag="rm-table"] .awesometable-bordered tfoot + tbody:last-child tr:last-child td:first-child{ -webkit-border-bottom-left-radius: 0; -moz-border-radius-bottomleft: 0; border-bottom-left-radius: 0; } rm-table .awesometable-bordered tfoot + tbody:last-child tr:last-child td:last-child, [riot-tag="rm-table"] .awesometable-bordered tfoot + tbody:last-child tr:last-child td:last-child{ -webkit-border-bottom-right-radius: 0; -moz-border-radius-bottomright: 0; border-bottom-right-radius: 0; } rm-table .awesometable-bordered caption + thead tr:first-child th:first-child, [riot-tag="rm-table"] .awesometable-bordered caption + thead tr:first-child th:first-child,rm-table .awesometable-bordered caption + tbody tr:first-child td:first-child, [riot-tag="rm-table"] .awesometable-bordered caption + tbody tr:first-child td:first-child,rm-table .awesometable-bordered colgroup + thead tr:first-child th:first-child, [riot-tag="rm-table"] .awesometable-bordered colgroup + thead tr:first-child th:first-child,rm-table .awesometable-bordered colgroup + tbody tr:first-child td:first-child, [riot-tag="rm-table"] .awesometable-bordered colgroup + tbody tr:first-child td:first-child{ -webkit-border-top-left-radius: 4px; -moz-border-radius-topleft: 4px; border-top-left-radius: 4px; } rm-table .awesometable-bordered caption + thead tr:first-child th:last-child, [riot-tag="rm-table"] .awesometable-bordered caption + thead tr:first-child th:last-child,rm-table .awesometable-bordered caption + tbody tr:first-child td:last-child, [riot-tag="rm-table"] .awesometable-bordered caption + tbody tr:first-child td:last-child,rm-table .awesometable-bordered colgroup + thead tr:first-child th:last-child, [riot-tag="rm-table"] .awesometable-bordered colgroup + thead tr:first-child th:last-child,rm-table .awesometable-bordered colgroup + tbody tr:first-child td:last-child, [riot-tag="rm-table"] .awesometable-bordered colgroup + tbody tr:first-child td:last-child{ -webkit-border-top-right-radius: 4px; -moz-border-radius-topright: 4px; border-top-right-radius: 4px; } rm-table .awesometable-striped tbody tr:nth-child(odd) td, [riot-tag="rm-table"] .awesometable-striped tbody tr:nth-child(odd) td{ background-color: #F6F6F6; } rm-table .awesometable-hover tbody tr:hover td, [riot-tag="rm-table"] .awesometable-hover tbody tr:hover td,rm-table .awesometable-hover tbody tr:hover th, [riot-tag="rm-table"] .awesometable-hover tbody tr:hover th{ background-color: #f3f3f3; } rm-table .awesometable tr.foot td, [riot-tag="rm-table"] .awesometable tr.foot td{ background: #eee; font-weight: bold; } rm-table table td[class*="span"], [riot-tag="rm-table"] table td[class*="span"],rm-table table th[class*="span"], [riot-tag="rm-table"] table th[class*="span"],rm-table .row-fluid table td[class*="span"], [riot-tag="rm-table"] .row-fluid table td[class*="span"],rm-table .row-fluid table th[class*="span"], [riot-tag="rm-table"] .row-fluid table th[class*="span"]{ display: table-cell; float: none; margin-left: 0; } rm-table .awesometable td.span1, [riot-tag="rm-table"] .awesometable td.span1,rm-table .awesometable th.span1, [riot-tag="rm-table"] .awesometable th.span1{ float: none; width: 44px; margin-left: 0; } rm-table .awesometable td.span2, [riot-tag="rm-table"] .awesometable td.span2,rm-table .awesometable th.span2, [riot-tag="rm-table"] .awesometable th.span2{ float: none; width: 124px; margin-left: 0; } rm-table .awesometable td.span3, [riot-tag="rm-table"] .awesometable td.span3,rm-table .awesometable th.span3, [riot-tag="rm-table"] .awesometable th.span3{ float: none; width: 204px; margin-left: 0; } rm-table .awesometable td.span4, [riot-tag="rm-table"] .awesometable td.span4,rm-table .awesometable th.span4, [riot-tag="rm-table"] .awesometable th.span4{ float: none; width: 284px; margin-left: 0; } rm-table .awesometable td.span5, [riot-tag="rm-table"] .awesometable td.span5,rm-table .awesometable th.span5, [riot-tag="rm-table"] .awesometable th.span5{ float: none; width: 364px; margin-left: 0; } rm-table .awesometable td.span6, [riot-tag="rm-table"] .awesometable td.span6,rm-table .awesometable th.span6, [riot-tag="rm-table"] .awesometable th.span6{ float: none; width: 444px; margin-left: 0; } rm-table .awesometable td.span7, [riot-tag="rm-table"] .awesometable td.span7,rm-table .awesometable th.span7, [riot-tag="rm-table"] .awesometable th.span7{ float: none; width: 524px; margin-left: 0; } rm-table .awesometable td.span8, [riot-tag="rm-table"] .awesometable td.span8,rm-table .awesometable th.span8, [riot-tag="rm-table"] .awesometable th.span8{ float: none; width: 604px; margin-left: 0; } rm-table .awesometable td.span9, [riot-tag="rm-table"] .awesometable td.span9,rm-table .awesometable th.span9, [riot-tag="rm-table"] .awesometable th.span9{ float: none; width: 684px; margin-left: 0; } rm-table .awesometable td.span10, [riot-tag="rm-table"] .awesometable td.span10,rm-table .awesometable th.span10, [riot-tag="rm-table"] .awesometable th.span10{ float: none; width: 764px; margin-left: 0; } rm-table .awesometable td.span11, [riot-tag="rm-table"] .awesometable td.span11,rm-table .awesometable th.span11, [riot-tag="rm-table"] .awesometable th.span11{ float: none; width: 844px; margin-left: 0; } rm-table .awesometable td.span12, [riot-tag="rm-table"] .awesometable td.span12,rm-table .awesometable th.span12, [riot-tag="rm-table"] .awesometable th.span12{ float: none; width: 924px; margin-left: 0; } rm-table .awesometable tbody tr.success td, [riot-tag="rm-table"] .awesometable tbody tr.success td{ background-color: #dff0d8; } rm-table .awesometable tbody tr.error td, [riot-tag="rm-table"] .awesometable tbody tr.error td{ background-color: #f2dede; } rm-table .awesometable tbody tr.warning td, [riot-tag="rm-table"] .awesometable tbody tr.warning td{ background-color: #fcf8e3; } rm-table .awesometable tbody tr.info td, [riot-tag="rm-table"] .awesometable tbody tr.info td{ background-color: #d9edf7; } rm-table .awesometable-hover tbody tr.success:hover td, [riot-tag="rm-table"] .awesometable-hover tbody tr.success:hover td{ background-color: #d0e9c6; } rm-table .awesometable-hover tbody tr.error:hover td, [riot-tag="rm-table"] .awesometable-hover tbody tr.error:hover td{ background-color: #ebcccc; } rm-table .awesometable-hover tbody tr.warning:hover td, [riot-tag="rm-table"] .awesometable-hover tbody tr.warning:hover td{ background-color: #faf2cc; } rm-table .awesometable-hover tbody tr.info:hover td, [riot-tag="rm-table"] .awesometable-hover tbody tr.info:hover td{ background-color: #c4e3f3; } rm-table .awesometable tr.awesome-section:nth-child(odd), [riot-tag="rm-table"] .awesometable tr.awesome-section:nth-child(odd),rm-table .awesometable tr.awesome-section:nth-child(even), [riot-tag="rm-table"] .awesometable tr.awesome-section:nth-child(even){ background: #eee; font-weight: bold; color: #000; } rm-table .awesometable tr.awesome-section td, [riot-tag="rm-table"] .awesometable tr.awesome-section td{ font-weight: bold; font-size: 15px; } rm-table .awesometable tr.awesome-section2, [riot-tag="rm-table"] .awesometable tr.awesome-section2{ background-color: black; color: #EEE; } rm-table .awesometable div.show-on-hover, [riot-tag="rm-table"] .awesometable div.show-on-hover{ visibility: hidden; opacity:0; } rm-table .awesometable tr:hover .show-on-hover, [riot-tag="rm-table"] .awesometable tr:hover .show-on-hover{ visibility: visible; opacity: 100; } rm-table .awesometable-rowhover tr:hover td, [riot-tag="rm-table"] .awesometable-rowhover tr:hover td{ border-top: 1px solid #999; border-bottom: 1px solid #999; } rm-table .awesometable-rowhover tr:hover td:first-child, [riot-tag="rm-table"] .awesometable-rowhover tr:hover td:first-child{ border-left: 1px solid #999; } rm-table .awesometable-rowhover tr:hover td:last-child, [riot-tag="rm-table"] .awesometable-rowhover tr:hover td:last-child{ border-right: 1px solid #999; } rm-table .awesometable .head-multiple td, [riot-tag="rm-table"] .awesometable .head-multiple td{ background-color: #E9E9E9; } rm-table .awesometable .head-single td, [riot-tag="rm-table"] .awesometable .head-single td{ background-color: #E9E9E9; } rm-table .awesometable .sub-ticket td, [riot-tag="rm-table"] .awesometable .sub-ticket td{ font-size: .8em; color: #333; background-color: white; padding-top: 3px; padding-bottom: 3px; } rm-table .awesometable .sub-ticket td:first-child, [riot-tag="rm-table"] .awesometable .sub-ticket td:first-child{ padding-left: 25px; } rm-table .awesometable .boldfoot td, [riot-tag="rm-table"] .awesometable .boldfoot td{ font-weight: bold; } rm-table .awesometable .reversed-footer td, [riot-tag="rm-table"] .awesometable .reversed-footer td{ font-size: 1.1em; font-weight: bold; } rm-table .awesometable .reversed-footer.small td, [riot-tag="rm-table"] .awesometable .reversed-footer.small td{ padding-top: 3px; padding-bottom: 3px; font-size: .83em; background-color: #CCC; } rm-table .awesometable.table td.span12, [riot-tag="rm-table"] .awesometable.table td.span12,rm-table .awesometable.table th.span12, [riot-tag="rm-table"] .awesometable.table th.span12{ float: none; width: 924px; margin-left: 0; } rm-table .awesometable.table tbody tr.success > td, [riot-tag="rm-table"] .awesometable.table tbody tr.success > td{ background-color: #dff0d8; } rm-table .awesometable.table tbody tr.error > td, [riot-tag="rm-table"] .awesometable.table tbody tr.error > td{ background-color: #f2dede; } rm-table .awesometable.table tbody tr.warning > td, [riot-tag="rm-table"] .awesometable.table tbody tr.warning > td{ background-color: #fcf8e3; } rm-table .awesometable.table tbody tr.info > td, [riot-tag="rm-table"] .awesometable.table tbody tr.info > td{ background-color: #d9edf7; } rm-table .awesometable.table-hover tbody tr.success:hover > td, [riot-tag="rm-table"] .awesometable.table-hover tbody tr.success:hover > td{ background-color: #d0e9c6; } rm-table .awesometable.table-hover tbody tr.error:hover > td, [riot-tag="rm-table"] .awesometable.table-hover tbody tr.error:hover > td{ background-color: #ebcccc; } rm-table .awesometable.table-hover tbody tr.warning:hover > td, [riot-tag="rm-table"] .awesometable.table-hover tbody tr.warning:hover > td{ background-color: #faf2cc; } rm-table .awesometable.table-hover tbody tr.info:hover > td, [riot-tag="rm-table"] .awesometable.table-hover tbody tr.info:hover > td{ background-color: #c4e3f3; } rm-table .awesometable-nc tr.head th, [riot-tag="rm-table"] .awesometable-nc tr.head th{ background-color: #f0f0f0; } rm-table .pointer, [riot-tag="rm-table"] .pointer{ cursor: pointer; } rm-table .sort-icon, [riot-tag="rm-table"] .sort-icon{ vertical-align: middle; }', function(opts) {
    
    
    var me = this;
    
    this.tableType = opts.type;
    this.tableHeaders = opts.tableHeaders;
    this.tableContent = opts.tableContent;
    this.tableFooter = opts.tableFooter;
    this.sortTable = opts.sortTable || false;
    this.toggleSort = false;
    
    this.validateTableSection = function(section) {
        if(section === null || section === undefined)
            return false;
        
        if(Array.isArray(section) === false)
            return false;
            
        return true;
    }.bind(this);
    
    this.processBody = function(cells) {
        if(cells.indexOf('$') !== -1) {
            cells = parseFloat(cells.replace('$', ''));
            cells = cells.toFixed(2, 10);
            
            return '$'+cells;
        }
        
        return cells;
    }.bind(this);
    
    this.processFooter = function(cells) {
        var currency_found = false;
        var total = 0;
        var averageCount = 0;
        var cellIndex;
        
        if(cells.indexOf('{{') !== -1) {
            cellIndex = cells.replace(/[^0-9.]/g, '');
        } else {
            return cells;
        }
        
        for(var i = 0; i < this.tableContent.length; i++) {
            if(this.tableContent[i][cellIndex].indexOf('$') !== -1) {
                currency_found = true;
            } else {
                currency_found = false;
            }
            
            if(isNaN(parseFloat(this.tableContent[i][cellIndex].replace('$', ''))) === false) {
                averageCount++;
                total += parseFloat(this.tableContent[i][cellIndex].replace('$', ''));
            }
        }
        
        if(cells.indexOf('{{total') !== -1)
            return currency_found ? '$'+total.toFixed(2, 10) : total;
            
        if(cells.indexOf('{{average') !== -1)
            return currency_found ? '$'+(total/averageCount).toFixed(2, 10) : (total/averageCount).toFixed(2, 10);
    }.bind(this);
    
    this.sortByTableColumn = function(e) {
        var rows = this.tableContent;
        var currency_found = false;
        var columnIndex = e.target.dataset.headerIndex;
        
        var mappedRows = rows.map(function(el, i) {
            return {index: i, value: el};
        });
        
        mappedRows.sort(function(a, b) {
            if(!me.toggleSort)
                return +(a.value[columnIndex] > b.value[columnIndex]) || +(a.value[columnIndex] === b.value[columnIndex]) - 1;
            
            if(me.toggleSort)
                return +(a.value[columnIndex] < b.value[columnIndex]) || +(a.value[columnIndex] === b.value[columnIndex]) - 1;
        });
        
        var result = mappedRows.map(function(el) {
            return rows[el.index];
        });
        
        if(e.target.nodeName === 'TH') {
            !this.toggleSort ? e.target.querySelector('i').innerText = 'keyboard_arrow_up' : e.target.querySelector('i').innerText = 'keyboard_arrow_down';
        } else if(e.target.nodeName === 'I') {
            !this.toggleSort ? e.target.innerText = 'keyboard_arrow_up' : e.target.innerText = 'keyboard_arrow_down';
        }
        
        this.toggleSort = !this.toggleSort;
        this.tableContent = result;
    }.bind(this);

});
riot.tag('rm-text-field', '<div class="mdl-textfield mdl-js-textfield"> <textarea if="{ opts.type == \'multiple\' && opts.type !=\'expanding\'}" name="{name}" class="mdl-textfield__input" type="text" rows="{rows}" id="text_{id}" ></textarea> <input if="{ opts.type != \'multiple\' && opts.type !=\'expanding\'}" name="{name}" class="mdl-textfield__input" type="text" id="text_{_id}"> <label class="mdl-textfield__label" for="text_{_id}">{ opts.placeholder || \'Type...\' }</label> <span if="{ opts.type == \'numeric\' || opts.type == \'email\' || opts.regex }" class="mdl-textfield__error">{ error }</span> <div if="{ opts.type == \'expanding\' }" class="mdl-textfield__expandable-holder"> <input name="{name}" class="mdl-textfield__input" type="text" id="text_{_id}"> <label class="mdl-textfield__label" for="text_{id}">Expandable Input</label> </div> </div>', function(opts) {

	
	var me = this;

    this.value = '';
    this.type = opts.type || 'text';
    this.width = opts.width || '100px';
    this.floating = opts.floating || false;
    this.rows = parseInt(opts.rows) || 2;
    this.regex = opts.regex || false;
    this.error = opts.error || "Input error!";
	this.name = opts.name || false;
		

    this.on('mount',function() {
		var wrap = this.root.children[0];
		
		wrap.style.width = me.width;

		if(!me.name) {
			wrap.innerHTML = "<span style='color:red;'>Set name attribute!</span>";
			return;
		}

	    if(me.floating) {
	  		wrap.classList.add('mdl-textfield--floating-label');
	  	}

		if(me.type === 'expanding') {
			var label = me.root.querySelector('label');
			wrap.classList.add('mdl-textfield--expandable');
			label.setAttribute('class','mdl-button mdl-js-button mdl-button--icon');
			label.innerHTML = '<i class="material-icons">search</i>';
		}

        me.assignRegex();
		componentHandler.upgradeElement(wrap); //call to load materialdesign on el
    });

    this.assignRegex = function() {
        var input = me.root.querySelector('input');

        if(me.type === 'numeric') {
            input.setAttribute('pattern','-?[0-9]*(\.[0-9]+)?');
            me.error = 'Input is not a number!';
            me.update();
            return;
        }

        if(me.type === 'email') {
       	    input.setAttribute('pattern','^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$');
            me.error = opts.error || 'Invalid email!';
            me.update();
            return;
        }

        if(me.regex) {
            input.setAttribute('pattern',opts.regex);
		    		me.update();
        }
    }.bind(this);


});

riot.tag('rm-toast', '<div show="{displayToast}" class="message-container"> <div onclick="{hideToast}" class="toast { toastPosition }">{ parseHTML(opts.text) }</div> </div>', 'rm-toast .toast, [riot-tag="rm-toast"] .toast{ position: absolute; margin: 20px; max-width: 200px; color: rgba(255, 255, 255, 1); background-color: rgba(0, 0, 0, 0.8); padding: 20px; z-index: 10; -webkit-border-radius: 5px; -moz-border-radius: 5px; -o-border-radius: 5px; border-radius: 5px; } rm-toast .top-left, [riot-tag="rm-toast"] .top-left{ top: 0; left: 0; } rm-toast .top-right, [riot-tag="rm-toast"] .top-right{ top: 0; right: 0; } rm-toast .bottom-left, [riot-tag="rm-toast"] .bottom-left{ left: 0; bottom: 0; } rm-toast .bottom-right, [riot-tag="rm-toast"] .bottom-right{ right: 0; bottom: 0; }', function(opts) {
	
	
	
	var me = this;
	
	this.mixin(RMeventMixin);
	this.displayToast = false;
	this.toastDuration = opts.duration || 1500;
	this.toastPosition = opts.position || 'bottom-right';
	
	this.on('mount', function() {
		me.update();
	});
	
	this.showToast = function(e) {
		this.displayToast = true;
		this.update();
		if(typeof RiotControl != 'undefined')
			RiotControl.trigger('toastopened');
		this.fire('open', e);
		
		setTimeout(function() {
			me.hideToast();
		}, me.toastDuration);
	}.bind(this);
	
	this.hideToast = function(e) {
		this.displayToast = false;
		this.update();
		if(typeof RiotControl != 'undefined')
			RiotControl.trigger('toastclosed');
		this.fire('close', e);
	}.bind(this);
	
	this.parseHTML = function(text) {
		this.root.querySelector('.toast').innerHTML = text;
	}.bind(this);

});

riot.tag('rm-toggle', '<div class="wrap"> <label class="mdl-{ toggleType } mdl-js-{ toggleType } mdl-js-ripple-effect"> <input type="{ toggleType != \'switch\' ? toggleType : \'checkbox\' }" name="{ toggleName }" class="mdl-{ toggleType }__{ toggleType === \'radio\' ? \'button\' : \'input\' }" value="{ toggleValue }" onclick="{ toggle }" __checked="{ ischecked }"> <span if="{ toggleLabelText && toggleType !== \'icon-toggle\' }" class="mdl-{ toggleType }__label">{ toggleLabelText }</span> <i if="{ toggleType === \'icon-toggle\' }" class="mdl-icon-toggle__label material-icons">{ opts.icon }</i> </label> </div>', function(opts) {
    
    
    var me = this;
    
    this.mixin(RMeventMixin);
    this.toggleType = opts.type || 'checkbox';
    this.toggleValue = opts.value || '';
    this.toggleName = opts.name || '';
    this.toggleLabelText = opts['label-text'] || '';
    this.ischecked = this.opts.ischecked || false;

    this.mdl_timer = false;

    this.on('mount', function() {

      Object.observe(me.opts, function (changes) {
        if(changes[0].name == 'ischecked' && changes[0].type == "update" && me.ischecked != me.opts.ischecked){
          me.ischecked = me.opts.ischecked;
          me.checkToggle();
        }
      });
      
      var wrap = me.root.children[0].querySelector('label');
      componentHandler.upgradeElement(wrap);
      
    });

    this.checkToggle = function() {
      switch(me.toggleType) {
        case 'checkbox':
          me.ischecked ? me.root.querySelector('label').MaterialCheckbox.check() : me.root.querySelector('label').MaterialCheckbox.uncheck();
        break;
        case 'radio':
          me.ischecked ? me.root.querySelector('label').MaterialRadio.check() : me.root.querySelector('label').MaterialRadio.uncheck();
        break;
        case 'icon-toggle':
          me.ischecked ? me.root.querySelector('label').MaterialIconToggle.check() : me.root.querySelector('label').MaterialIconToggle.uncheck();
        break;
        case 'switch':
          me.ischecked ? me.root.querySelector('label').MaterialSwitch.on() : me.root.querySelector('label').MaterialSwitch.off();
        break;
      }
      me.update();
    }.bind(this);
    
    this.toggle = function(e) {

      me.opts.ischecked = me.ischecked;
      me.fire('toggle', e);

    }.bind(this);
    

});