var eventMixin = {
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
var ajaxMixin = {
    ajaxGet: function (url, cb) {
        var xhr = new XMLHttpRequest();
        xhr.open('GET', encodeURI(url));
        xhr.onload = function () {
            cb(xhr.responseText);
        };
        xhr.send();
    }
};    
riot.tag('rm-autocomplete', '<div class="wrap noselect{opts.noborder ? \' noborder\' : \'\'}"> <input type="text" name="{opts.name}" class="mdl-textfield__input base { border : select }" autocomplete="off" placeholder="{ opts.placeholder || \'Type...\' }" onkeyup="{ handleText }" value="{ value }"> <div show="{ open }" class="list-container"> <ul class="list"> <li show="{ select }" class="filter"> <input type="text" class="filter-input" placeholder="Filter" onkeyup="{ handleText }" autocomplete="off"> </li> <li class="list-row" show="{ noResults }"> No results... </li> <li class="list-row item { active: item.active }" onclick="{ parent.pick }" each="{ item, i in filteredList }" onclick="{ parent.select }"> { item.text } </li> </ul> </div> </div>', 'rm-autocomplete *, [riot-tag="rm-autocomplete"] *{ box-sizing: border-box; } rm-autocomplete .active, [riot-tag="rm-autocomplete"] .active{ background:rgb(215,215,215); } rm-autocomplete .base, [riot-tag="rm-autocomplete"] .base{ height:40px; padding-left:5px; margin-bottom:0px; width:100%; } rm-autocomplete .noborder .border, [riot-tag="rm-autocomplete"] .noborder .border{ border: 0; } rm-autocomplete .border, [riot-tag="rm-autocomplete"] .border{ height:35px; padding-left:5px; border:1px solid rgba(0,0,0,.12); box-sizing:border-box; } rm-autocomplete .border:-moz-placeholder, [riot-tag="rm-autocomplete"] .border:-moz-placeholder{ color: rgb(169,169,169); } rm-autocomplete .border:-ms-input-placeholder, [riot-tag="rm-autocomplete"] .border:-ms-input-placeholder{ color: rgb(169,169,169); } rm-autocomplete .border::-webkit-input-placeholder, [riot-tag="rm-autocomplete"] .border::-webkit-input-placeholder{ color: rgb(169,169,169); } rm-autocomplete .border::-moz-placeholder, [riot-tag="rm-autocomplete"] .border::-moz-placeholder{ color: rgb(169,169,169); } rm-autocomplete .err, [riot-tag="rm-autocomplete"] .err{border: 1px dashed red; color: rgb(169,169,169);} rm-autocomplete .filter, [riot-tag="rm-autocomplete"] .filter{padding:0;margin:0px;} rm-autocomplete .filter:hover, [riot-tag="rm-autocomplete"] .filter:hover{background:none;} rm-autocomplete .filter-input, [riot-tag="rm-autocomplete"] .filter-input{ background:none; border:none; border-bottom:1px solid rgba(0, 0, 0, 0.117647); box-sizing:border-box; color: rgb(85, 85, 85); padding:5px; font-size:16px; height:35px; margin:0px; width:100%; } rm-autocomplete .list-container, [riot-tag="rm-autocomplete"] .list-container{ position:absolute; left:0; right:0; background:#fff; height:auto; overflow-x:hidden; overflow-y:auto; border: 1px solid rgba(0, 0, 0, 0.117647); border-top:none; box-shadow: rgb(68, 68, 68) 0px 2px 10px -4px; z-index: 3; } rm-autocomplete .noselect, [riot-tag="rm-autocomplete"] .noselect{ -webkit-touch-callout: none; -webkit-user-select: none; -khtml-user-select: none; -moz-user-select: none; -ms-user-select: none; user-select: none; } rm-autocomplete .list, [riot-tag="rm-autocomplete"] .list{ list-style-type: none; padding:0; margin:0; -webkit-margin-before: 0; -webkit-margin-after: 0; } rm-autocomplete .list .list-row, [riot-tag="rm-autocomplete"] .list .list-row{ display: block; padding:5px 15px; margin:0px; border-bottom: 1px solid rgba(0, 0, 0, 0.117647); } rm-autocomplete .list .list-row:hover, [riot-tag="rm-autocomplete"] .list .list-row:hover{ background: rgb(240, 240, 240); cursor: pointer; } rm-autocomplete textarea:focus, [riot-tag="rm-autocomplete"] textarea:focus,rm-autocomplete input:focus, [riot-tag="rm-autocomplete"] input:focus{ outline: 0; } rm-autocomplete .wrap, [riot-tag="rm-autocomplete"] .wrap{ position: relative; }', function(opts) {

  var tag = this;

  this.mixin(ajaxMixin);
  this.mixin(eventMixin);

  this.open = false;
  this.select = opts.type === "select" ? true : false;
  this.maxHeight = opts.height || '520px';
  this.url = opts.url || false;
  if(this.url !== false)
    this.ajax = true;
  this.parameter = opts.parameter || false;
  this.list = opts.list || [];
  this.filteredList = opts.list || [];
  this.noResults = false;
  this.atIndex = -1;

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
        tag.list = json.choices;
        tag.filteredList = json.choices;
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
    var value = target.getAttribute('data-value') || target.innerHTML;
    tag.value = target.innerHTML.trim();
    tag.closeWindow();
  }.bind(this);

  this.handleText = function(e) {
    
    var target = e.srcElement || e.originalTarget;

    if(tag.parameter) {
      
      var path = '';

      var re = new RegExp("([?&])" + tag.parameter + "=.*?(&|$)", "i");
      var separator = tag.url.indexOf('?') !== -1 ? "&" : "?";
      if (tag.url.match(re)) {
        path = tag.url.replace(re, '$1' + tag.parameter + "=" + target.value + '$2');
      } else {
        path = tag.url + separator + tag.parameter + "=" + target.value;
      }

      tag.ajaxGet(path, function(res) {
        var json = JSON.parse(res);
        tag.filteredList = json.choices;
      });
    } else {
      tag.filteredList = tag.list.filter(function(c) {
        return c.text.match(RegExp(target.value,'i'));
      });
    }

    tag.noResults = false;
    if(tag.filteredList.length < 1)
      tag.noResults = true;

    if ([8, 13, 27, 38, 40].indexOf(e.keyCode) > -1) {
      e.preventDefault();
      tag.keys(e.keyCode)
    } else {
      tag.atIndex = -1;
    }
    tag.update();
    
  }.bind(this);

  this.keys = function(val) {
    
    if(val == 8) {
      tag.deactivate();
    } else if (val == 27) {
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
      
      if(tag.atIndex + 1 >= tag.list.length)
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
riot.tag('rm-card', '<div id="wrap"> <div class="mdl-card mdl-shadow--2dp demo-card-wide"> <div class="mdl-card__title"> <h2 class="mdl-card__title-text">{ title }</h2> </div> <div class="mdl-card__supporting-text"> { text } </div> <div class="mdl-card__actions mdl-card--border"> <a class="mdl-button mdl-button--colored mdl-js-button mdl-js-ripple-effect"> Get Started </a> </div> <div class="mdl-card__menu"> <button class="mdl-button mdl-button--icon mdl-js-button mdl-js-ripple-effect"> <i class="material-icons">share</i> </button> </div> </div> </div>', function(opts) {
	
	var me = this;
	
	this.title = opts.title || '';
	this.text = opts.text || '';
	this.buttons = '';
	
	this.on('mount', function() {
		var wrap = this.root.children[0];

	});

});

riot.tag('rm-chart', '<div id="chart" class="noselect" style="width: 100%; height: 100%"></div>', 'rm-chart .noselect, [riot-tag="rm-chart"] .noselect{ -webkit-touch-callout: none; -webkit-user-select: none; -khtml-user-select: none; -moz-user-select: none; -ms-user-select: none; user-select: none; }', function(opts) {
	
	var me = this;

	this.on('mount',function() {
		google.setOnLoadCallback(function() {
			me.make();
		});
	});
	
	this.make = function() {
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
	}.bind(this);


});

riot.tag('rm-datepicker', '<div class="rm-datepicker"> <input class="base-input" type="text" onclick="{ show }" value="{ value }" readonly> <div show="{ open }" class="view"> <div class="view-title"> <a onclick="{ previous }"><i class="material-icons left-arrow">&#xE5C4;</i></a> <span class="month">{ header }</span> <a onclick="{ next }"><i class="material-icons right-arrow">&#xE5C8;</i></a> </div> <div class="daysofweek"> <span>Mo</span> <span>Tu</span> <span>We</span> <span>Th</span> <span>Fr</span> <span>Sa</span> <span>Su</span> </div> <div class="weekrow" each="{ rows in mydata }"> <a class="{ nohover: day.asNumber < 0, today: day.active, selected:day.selected }" onclick="{ pick }" each="{ day in rows }">{ day.asNumber > 0 ? day.asNumber : \'&nbsp;\' }</a> </div> </div> </div>', 'rm-datepicker *, [riot-tag="rm-datepicker"] *{box-sizing:border-box;} rm-datepicker table, [riot-tag="rm-datepicker"] table,rm-datepicker caption, [riot-tag="rm-datepicker"] caption,rm-datepicker tbody, [riot-tag="rm-datepicker"] tbody,rm-datepicker tfoot, [riot-tag="rm-datepicker"] tfoot,rm-datepicker thead, [riot-tag="rm-datepicker"] thead,rm-datepicker tr, [riot-tag="rm-datepicker"] tr,rm-datepicker th, [riot-tag="rm-datepicker"] th,rm-datepicker td, [riot-tag="rm-datepicker"] td{ margin: 0; padding: 0 !important; border: 0; outline: 0; font-size: 100%; vertical-align: baseline; background: transparent; text-align:center; } rm-datepicker a, [riot-tag="rm-datepicker"] a{ color: rgb(117,117,117); text-decoration:none; } rm-datepicker .rm-datepicker, [riot-tag="rm-datepicker"] .rm-datepicker{ position: relative; -webkit-touch-callout: none; -webkit-user-select: none; -khtml-user-select: none; -moz-user-select: none; -ms-user-select: none; user-select: none; } rm-datepicker .base-input, [riot-tag="rm-datepicker"] .base-input{ height:40px; padding-left:5px; border:1px solid #D3D3D3; box-sizing:border-box; padding-left:5px; cursor: pointer; color: rgb(85, 85, 85); font-size:1em; } rm-datepicker .view, [riot-tag="rm-datepicker"] .view{ position: absolute; background: #FFF; border: 1px solid #D3D3D3; width:280px; height:auto; margin-top:5px; -webkit-box-sizing: border-box; -moz-box-sizing: border-box; -webkit-box-shadow: 0 2px 10px -4px #444; -moz-box-shadow: 0 2px 10px -4px #444; box-shadow: 0 2px 10px -4px #444; z-index:10; } rm-datepicker .view-title, [riot-tag="rm-datepicker"] .view-title{ display:block; text-align:center; background: rgb(216,27,96); color: #FFF; line-height: 50px; } rm-datepicker .view-title a, [riot-tag="rm-datepicker"] .view-title a{ cursor: pointer; } rm-datepicker .left-arrow, [riot-tag="rm-datepicker"] .left-arrow{ float:left; line-height:50px; margin-left:10px; color:#FFF } rm-datepicker .right-arrow, [riot-tag="rm-datepicker"] .right-arrow{ float:right; line-height:50px; margin-right:10px; color:#FFF } rm-datepicker .daysofweek, [riot-tag="rm-datepicker"] .daysofweek{ width:100%; height:23px; color: rgb(0,188,214); font-weight: 700; } rm-datepicker .daysofweek span, [riot-tag="rm-datepicker"] .daysofweek span{ float:left; text-align:center; width:14.285714285%; } rm-datepicker .weekrow, [riot-tag="rm-datepicker"] .weekrow{ height:auto; padding:2px 0; width:100%; } rm-datepicker .weekrow a, [riot-tag="rm-datepicker"] .weekrow a{ height:40px; border-radius: 20px; display: inline-block; line-height: 40px; width:14.285714285%; text-align:center; } rm-datepicker .weekrow a:hover, [riot-tag="rm-datepicker"] .weekrow a:hover{ background:rgb(233,229,227); cursor:pointer; } rm-datepicker .today, [riot-tag="rm-datepicker"] .today{ box-shadow: 0 0 0 2px rgb(0,188,214); } rm-datepicker .selected, [riot-tag="rm-datepicker"] .selected{ background: rgb(205,205,205); } rm-datepicker .nohover:hover, [riot-tag="rm-datepicker"] .nohover:hover{content:"";background:none;cursor:default;padding:0 !important;}', function(opts) {

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
		me.month = me.month.subtract(1, 'months');
		me.build(me.month);
	}.bind(this);

	this.next = function(e) {
		me.month = me.month.add(1, 'months');
		me.build(me.month);
	}.bind(this);
	
	this.build = function(date) {
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
				if(firstDay > 0) {
			 		week.push({asNumber:-1,active:false});
					firstDay--;
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

riot.tag('rm-loader', '<div id="wrap"> <div id="progstatic" style="width:250px" class="mdl-js-progress"></div> </div>', function(opts) {
	
	var me = this;
	
	this.config = {
		'spinner' : function() {
			
		},
		'spinner-single-color' : function() {
			
		},
	}
	
	this.on('mount', function() {
		var wrap = this.root.children[0];
		componentHandler.upgradeElement(wrap);
	});

});

riot.tag('rm-markdown', '', function(opts) {
	
	var me = this;

	this.on('mount', function() {
		if(!window.marked) {
			me.root.innerHTML = "<span style='color:red;'>Please load the marked library to use this tag.<span>";
		} else {
			me.set(opts.content);
		}
	});
	
	this.set = function(md) {
		me.root.innerHTML = marked(md);
	}.bind(this);


});

riot.tag('rm-modal', '<div class="wrap"> <div class="overlay" show="{ opts.opened }" onclick="{ closeModal }"></div> <div class="modal" show="{ opts.opened }"> <div class="modal-content"> <yield></yield> </div> <div class="clear"></div> </div> </div>', 'rm-modal .overlay, [riot-tag="rm-modal"] .overlay{ position: absolute; top: 0; right: 0; bottom: 0; left: 0; width: 100%; height: 100%; text-align: center; z-index: 10; background-color: rgba(0, 0, 0, 0.8); } rm-modal .overlay.fade-in-overlay, [riot-tag="rm-modal"] .overlay.fade-in-overlay{ -webkit-animation: fadeIn .25s linear; -moz-animation: fadeIn .25s linear; -o-animation: fadeIn .25s linear; animation: fadeIn .25s linear; } rm-modal .modal.scale-up-modal, [riot-tag="rm-modal"] .modal.scale-up-modal{ -webkit-animation: scaleUp .30s linear; -moz-animation: scaleUp .30s linear; -o-animation: scaleUp .30s linear; animation: scaleUp .30s linear; } rm-modal .overlay.fade-out-overlay, [riot-tag="rm-modal"] .overlay.fade-out-overlay{ -webkit-animation: fadeIn .25s reverse; -moz-animation: fadeIn .25s reverse; -o-animation: fadeIn .25s reverse; animation: fadeIn .25s reverse; } rm-modal .modal.scale-down-modal, [riot-tag="rm-modal"] .modal.scale-down-modal{ -webkit-animation: scaleUp .30s reverse; -moz-animation: scaleUp .30s reverse; -o-animation: scaleUp .30s reverse; animation: scaleUp .30s reverse; } rm-modal .modal, [riot-tag="rm-modal"] .modal{ max-width: 35%; background-color: #fff; border: 1px solid #000; padding: 15px; position: fixed; left: 31%; z-index: 11; text-align: center; -webkit-border-radius: 5px; -moz-border-radius: 5px; -o-border-radius: 5px; border-radius: 5px; } rm-modal .affirmative-btn, [riot-tag="rm-modal"] .affirmative-btn{ float: left; } rm-modal .dismissive-btn, [riot-tag="rm-modal"] .dismissive-btn{ float: right; } rm-modal .clear, [riot-tag="rm-modal"] .clear{ clear: both; } @keyframes fadeIn{ 0%{ opacity: 0; } 100%{ opacity: 1; } } @keyframes scaleUp{ 0%{ -webkit-transform: scale(0); -moz-transform: scale(0); -o-transform: scale(0); transform: scale(0); } 50%{ -webkit-transform: scale(0.5); -moz-transform: scale(0.5); -o-transform: scale(0.5); transform: scale(0.5); } 100%{ -webkit-transform: scale(1); -moz-transform: scale(1); -o-transform: scale(1); transform: scale(1); } }', function(opts) {
    
    
    var me = this;
    
    this.mixin(eventMixin);
    
    this.openModal = function(e) {
        this.fire('opened', e);
    }.bind(this);
    
    this.closeModal = function(e) {
        opts.onclose();
        this.fire('closed', e);
    }.bind(this);

});
riot.tag('rm-router', '<div style="display:none;" id="options"> <yield></yield> </div> <div id="base"></div>', function(opts) {
	

	var me = this;
	this.routes = opts.routes || false;
	this.mountedTag = false;

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

riot.tag('rm-table', '<table class="awesometable { tableType }"> <thead> <tr> <th each="{ headerContent, i in opts.tableHeaders}">{ headerContent }</th> </tr> </thead> <tbody> <tr each="{ bodyContentRows, i in opts.tableContent }"> <td each="{ bodyContentData, i in bodyContentRows }">{ bodyContentData }</td> </tr> </tbody> <tfoot> <tr> <td each="{ footerContent, i in opts.tableFooter }">{ footerContent }</td> </tr> </tfoot> </table>', 'rm-table .awesometable, [riot-tag="rm-table"] .awesometable{ width: 100%; margin-bottom: 20px; max-width: 100%; background-color: transparent; border-collapse: collapse; border-spacing: 0; font-family: helvetica; } rm-table .awesometable-fixed, [riot-tag="rm-table"] .awesometable-fixed{ table-layout: fixed; } rm-table .awesometable th, [riot-tag="rm-table"] .awesometable th,rm-table .awesometable td, [riot-tag="rm-table"] .awesometable td{ padding: 8px; line-height: 20px; text-align: left; vertical-align: top; border-top: 1px solid #dddddd; font-family: helvetica; } rm-table .awesometable.awesometable-small td, [riot-tag="rm-table"] .awesometable.awesometable-small td,rm-table .awesometable.awesometable-small th, [riot-tag="rm-table"] .awesometable.awesometable-small th{ font-size: 10px; } rm-table .awesometable th, [riot-tag="rm-table"] .awesometable th{ font-weight: bold; font-size: 11px; } rm-table .awesometable thead th, [riot-tag="rm-table"] .awesometable thead th{ vertical-align: bottom; } rm-table .awesometable caption + thead tr:first-child th, [riot-tag="rm-table"] .awesometable caption + thead tr:first-child th,rm-table .awesometable caption + thead tr:first-child td, [riot-tag="rm-table"] .awesometable caption + thead tr:first-child td,rm-table .awesometable colgroup + thead tr:first-child th, [riot-tag="rm-table"] .awesometable colgroup + thead tr:first-child th,rm-table .awesometable colgroup + thead tr:first-child td, [riot-tag="rm-table"] .awesometable colgroup + thead tr:first-child td,rm-table .awesometable thead:first-child tr:first-child th, [riot-tag="rm-table"] .awesometable thead:first-child tr:first-child th,rm-table .awesometable thead:first-child tr:first-child td, [riot-tag="rm-table"] .awesometable thead:first-child tr:first-child td{ border-top: 0; } rm-table .awesometable tbody + tbody, [riot-tag="rm-table"] .awesometable tbody + tbody{ border-top: 2px solid #dddddd; } rm-table .awesometable .awesometable, [riot-tag="rm-table"] .awesometable .awesometable{ background-color: #ffffff; } rm-table .awesometable-condensed th, [riot-tag="rm-table"] .awesometable-condensed th,rm-table .awesometable-condensed td, [riot-tag="rm-table"] .awesometable-condensed td{ padding: 4px 5px; font-size: 11px; } rm-table .awesometable-bordered, [riot-tag="rm-table"] .awesometable-bordered{ border: 1px solid #dddddd; border-collapse: separate; *border-collapse: collapse; border-left: 0; -webkit-border-radius: 4px; -moz-border-radius: 4px; border-radius: 4px; } rm-table .awesometable-bordered th, [riot-tag="rm-table"] .awesometable-bordered th,rm-table .awesometable-bordered td, [riot-tag="rm-table"] .awesometable-bordered td{ border-left: 1px solid #dddddd; } rm-table .awesometable-bordered caption + thead tr:first-child th, [riot-tag="rm-table"] .awesometable-bordered caption + thead tr:first-child th,rm-table .awesometable-bordered caption + tbody tr:first-child th, [riot-tag="rm-table"] .awesometable-bordered caption + tbody tr:first-child th,rm-table .awesometable-bordered caption + tbody tr:first-child td, [riot-tag="rm-table"] .awesometable-bordered caption + tbody tr:first-child td,rm-table .awesometable-bordered colgroup + thead tr:first-child th, [riot-tag="rm-table"] .awesometable-bordered colgroup + thead tr:first-child th,rm-table .awesometable-bordered colgroup + tbody tr:first-child th, [riot-tag="rm-table"] .awesometable-bordered colgroup + tbody tr:first-child th,rm-table .awesometable-bordered colgroup + tbody tr:first-child td, [riot-tag="rm-table"] .awesometable-bordered colgroup + tbody tr:first-child td,rm-table .awesometable-bordered thead:first-child tr:first-child th, [riot-tag="rm-table"] .awesometable-bordered thead:first-child tr:first-child th,rm-table .awesometable-bordered tbody:first-child tr:first-child th, [riot-tag="rm-table"] .awesometable-bordered tbody:first-child tr:first-child th,rm-table .awesometable-bordered tbody:first-child tr:first-child td, [riot-tag="rm-table"] .awesometable-bordered tbody:first-child tr:first-child td{ border-top: 0; } rm-table .awesometable-bordered thead:first-child tr:first-child > th:first-child, [riot-tag="rm-table"] .awesometable-bordered thead:first-child tr:first-child > th:first-child,rm-table .awesometable-bordered tbody:first-child tr:first-child > td:first-child, [riot-tag="rm-table"] .awesometable-bordered tbody:first-child tr:first-child > td:first-child{ -webkit-border-top-left-radius: 4px; -moz-border-radius-topleft: 4px; border-top-left-radius: 4px; } rm-table .awesometable-bordered thead:first-child tr:first-child > th:last-child, [riot-tag="rm-table"] .awesometable-bordered thead:first-child tr:first-child > th:last-child,rm-table .awesometable-bordered tbody:first-child tr:first-child > td:last-child, [riot-tag="rm-table"] .awesometable-bordered tbody:first-child tr:first-child > td:last-child{ -webkit-border-top-right-radius: 4px; -moz-border-radius-topright: 4px; border-top-right-radius: 4px; } rm-table .awesometable-bordered thead:last-child tr:last-child > th:first-child, [riot-tag="rm-table"] .awesometable-bordered thead:last-child tr:last-child > th:first-child,rm-table .awesometable-bordered tbody:last-child tr:last-child > td:first-child, [riot-tag="rm-table"] .awesometable-bordered tbody:last-child tr:last-child > td:first-child,rm-table .awesometable-bordered tfoot:last-child tr:last-child > td:first-child, [riot-tag="rm-table"] .awesometable-bordered tfoot:last-child tr:last-child > td:first-child{ -webkit-border-bottom-left-radius: 4px; -moz-border-radius-bottomleft: 4px; border-bottom-left-radius: 4px; } rm-table .awesometable-bordered thead:last-child tr:last-child > th:last-child, [riot-tag="rm-table"] .awesometable-bordered thead:last-child tr:last-child > th:last-child,rm-table .awesometable-bordered tbody:last-child tr:last-child > td:last-child, [riot-tag="rm-table"] .awesometable-bordered tbody:last-child tr:last-child > td:last-child,rm-table .awesometable-bordered tfoot:last-child tr:last-child > td:last-child, [riot-tag="rm-table"] .awesometable-bordered tfoot:last-child tr:last-child > td:last-child{ -webkit-border-bottom-right-radius: 4px; -moz-border-radius-bottomright: 4px; border-bottom-right-radius: 4px; } rm-table .awesometable-bordered tfoot + tbody:last-child tr:last-child td:first-child, [riot-tag="rm-table"] .awesometable-bordered tfoot + tbody:last-child tr:last-child td:first-child{ -webkit-border-bottom-left-radius: 0; -moz-border-radius-bottomleft: 0; border-bottom-left-radius: 0; } rm-table .awesometable-bordered tfoot + tbody:last-child tr:last-child td:last-child, [riot-tag="rm-table"] .awesometable-bordered tfoot + tbody:last-child tr:last-child td:last-child{ -webkit-border-bottom-right-radius: 0; -moz-border-radius-bottomright: 0; border-bottom-right-radius: 0; } rm-table .awesometable-bordered caption + thead tr:first-child th:first-child, [riot-tag="rm-table"] .awesometable-bordered caption + thead tr:first-child th:first-child,rm-table .awesometable-bordered caption + tbody tr:first-child td:first-child, [riot-tag="rm-table"] .awesometable-bordered caption + tbody tr:first-child td:first-child,rm-table .awesometable-bordered colgroup + thead tr:first-child th:first-child, [riot-tag="rm-table"] .awesometable-bordered colgroup + thead tr:first-child th:first-child,rm-table .awesometable-bordered colgroup + tbody tr:first-child td:first-child, [riot-tag="rm-table"] .awesometable-bordered colgroup + tbody tr:first-child td:first-child{ -webkit-border-top-left-radius: 4px; -moz-border-radius-topleft: 4px; border-top-left-radius: 4px; } rm-table .awesometable-bordered caption + thead tr:first-child th:last-child, [riot-tag="rm-table"] .awesometable-bordered caption + thead tr:first-child th:last-child,rm-table .awesometable-bordered caption + tbody tr:first-child td:last-child, [riot-tag="rm-table"] .awesometable-bordered caption + tbody tr:first-child td:last-child,rm-table .awesometable-bordered colgroup + thead tr:first-child th:last-child, [riot-tag="rm-table"] .awesometable-bordered colgroup + thead tr:first-child th:last-child,rm-table .awesometable-bordered colgroup + tbody tr:first-child td:last-child, [riot-tag="rm-table"] .awesometable-bordered colgroup + tbody tr:first-child td:last-child{ -webkit-border-top-right-radius: 4px; -moz-border-radius-topright: 4px; border-top-right-radius: 4px; } rm-table .awesometable-striped tbody tr:nth-child(odd) td, [riot-tag="rm-table"] .awesometable-striped tbody tr:nth-child(odd) td{ background-color: #F6F6F6; } rm-table .awesometable-hover tbody tr:hover td, [riot-tag="rm-table"] .awesometable-hover tbody tr:hover td,rm-table .awesometable-hover tbody tr:hover th, [riot-tag="rm-table"] .awesometable-hover tbody tr:hover th{ background-color: #f3f3f3; } rm-table .awesometable tr.foot td, [riot-tag="rm-table"] .awesometable tr.foot td{ background: #eee; font-weight: bold; } rm-table table td[class*="span"], [riot-tag="rm-table"] table td[class*="span"],rm-table table th[class*="span"], [riot-tag="rm-table"] table th[class*="span"],rm-table .row-fluid table td[class*="span"], [riot-tag="rm-table"] .row-fluid table td[class*="span"],rm-table .row-fluid table th[class*="span"], [riot-tag="rm-table"] .row-fluid table th[class*="span"]{ display: table-cell; float: none; margin-left: 0; } rm-table .awesometable td.span1, [riot-tag="rm-table"] .awesometable td.span1,rm-table .awesometable th.span1, [riot-tag="rm-table"] .awesometable th.span1{ float: none; width: 44px; margin-left: 0; } rm-table .awesometable td.span2, [riot-tag="rm-table"] .awesometable td.span2,rm-table .awesometable th.span2, [riot-tag="rm-table"] .awesometable th.span2{ float: none; width: 124px; margin-left: 0; } rm-table .awesometable td.span3, [riot-tag="rm-table"] .awesometable td.span3,rm-table .awesometable th.span3, [riot-tag="rm-table"] .awesometable th.span3{ float: none; width: 204px; margin-left: 0; } rm-table .awesometable td.span4, [riot-tag="rm-table"] .awesometable td.span4,rm-table .awesometable th.span4, [riot-tag="rm-table"] .awesometable th.span4{ float: none; width: 284px; margin-left: 0; } rm-table .awesometable td.span5, [riot-tag="rm-table"] .awesometable td.span5,rm-table .awesometable th.span5, [riot-tag="rm-table"] .awesometable th.span5{ float: none; width: 364px; margin-left: 0; } rm-table .awesometable td.span6, [riot-tag="rm-table"] .awesometable td.span6,rm-table .awesometable th.span6, [riot-tag="rm-table"] .awesometable th.span6{ float: none; width: 444px; margin-left: 0; } rm-table .awesometable td.span7, [riot-tag="rm-table"] .awesometable td.span7,rm-table .awesometable th.span7, [riot-tag="rm-table"] .awesometable th.span7{ float: none; width: 524px; margin-left: 0; } rm-table .awesometable td.span8, [riot-tag="rm-table"] .awesometable td.span8,rm-table .awesometable th.span8, [riot-tag="rm-table"] .awesometable th.span8{ float: none; width: 604px; margin-left: 0; } rm-table .awesometable td.span9, [riot-tag="rm-table"] .awesometable td.span9,rm-table .awesometable th.span9, [riot-tag="rm-table"] .awesometable th.span9{ float: none; width: 684px; margin-left: 0; } rm-table .awesometable td.span10, [riot-tag="rm-table"] .awesometable td.span10,rm-table .awesometable th.span10, [riot-tag="rm-table"] .awesometable th.span10{ float: none; width: 764px; margin-left: 0; } rm-table .awesometable td.span11, [riot-tag="rm-table"] .awesometable td.span11,rm-table .awesometable th.span11, [riot-tag="rm-table"] .awesometable th.span11{ float: none; width: 844px; margin-left: 0; } rm-table .awesometable td.span12, [riot-tag="rm-table"] .awesometable td.span12,rm-table .awesometable th.span12, [riot-tag="rm-table"] .awesometable th.span12{ float: none; width: 924px; margin-left: 0; } rm-table .awesometable tbody tr.success td, [riot-tag="rm-table"] .awesometable tbody tr.success td{ background-color: #dff0d8; } rm-table .awesometable tbody tr.error td, [riot-tag="rm-table"] .awesometable tbody tr.error td{ background-color: #f2dede; } rm-table .awesometable tbody tr.warning td, [riot-tag="rm-table"] .awesometable tbody tr.warning td{ background-color: #fcf8e3; } rm-table .awesometable tbody tr.info td, [riot-tag="rm-table"] .awesometable tbody tr.info td{ background-color: #d9edf7; } rm-table .awesometable-hover tbody tr.success:hover td, [riot-tag="rm-table"] .awesometable-hover tbody tr.success:hover td{ background-color: #d0e9c6; } rm-table .awesometable-hover tbody tr.error:hover td, [riot-tag="rm-table"] .awesometable-hover tbody tr.error:hover td{ background-color: #ebcccc; } rm-table .awesometable-hover tbody tr.warning:hover td, [riot-tag="rm-table"] .awesometable-hover tbody tr.warning:hover td{ background-color: #faf2cc; } rm-table .awesometable-hover tbody tr.info:hover td, [riot-tag="rm-table"] .awesometable-hover tbody tr.info:hover td{ background-color: #c4e3f3; } rm-table .awesometable tr.awesome-section:nth-child(odd), [riot-tag="rm-table"] .awesometable tr.awesome-section:nth-child(odd),rm-table .awesometable tr.awesome-section:nth-child(even), [riot-tag="rm-table"] .awesometable tr.awesome-section:nth-child(even){ background: #eee; font-weight: bold; color: #000; } rm-table .awesometable tr.awesome-section td, [riot-tag="rm-table"] .awesometable tr.awesome-section td{ font-weight: bold; font-size: 15px; } rm-table .awesometable tr.awesome-section2, [riot-tag="rm-table"] .awesometable tr.awesome-section2{ background-color: black; color: #EEE; } rm-table .awesometable div.show-on-hover, [riot-tag="rm-table"] .awesometable div.show-on-hover{ visibility: hidden; opacity:0; } rm-table .awesometable tr:hover .show-on-hover, [riot-tag="rm-table"] .awesometable tr:hover .show-on-hover{ visibility: visible; opacity: 100; } rm-table .awesometable-rowhover tr:hover td, [riot-tag="rm-table"] .awesometable-rowhover tr:hover td{ border-top: 1px solid #999; border-bottom: 1px solid #999; } rm-table .awesometable-rowhover tr:hover td:first-child, [riot-tag="rm-table"] .awesometable-rowhover tr:hover td:first-child{ border-left: 1px solid #999; } rm-table .awesometable-rowhover tr:hover td:last-child, [riot-tag="rm-table"] .awesometable-rowhover tr:hover td:last-child{ border-right: 1px solid #999; } rm-table .awesometable .head-multiple td, [riot-tag="rm-table"] .awesometable .head-multiple td{ background-color: #E9E9E9; } rm-table .awesometable .head-single td, [riot-tag="rm-table"] .awesometable .head-single td{ background-color: #E9E9E9; } rm-table .awesometable .sub-ticket td, [riot-tag="rm-table"] .awesometable .sub-ticket td{ font-size: .8em; color: #333; background-color: white; padding-top: 3px; padding-bottom: 3px; } rm-table .awesometable .sub-ticket td:first-child, [riot-tag="rm-table"] .awesometable .sub-ticket td:first-child{ padding-left: 25px; } rm-table .awesometable .boldfoot td, [riot-tag="rm-table"] .awesometable .boldfoot td{ font-weight: bold; } rm-table .awesometable .reversed-footer td, [riot-tag="rm-table"] .awesometable .reversed-footer td{ font-size: 1.1em; font-weight: bold; } rm-table .awesometable .reversed-footer.small td, [riot-tag="rm-table"] .awesometable .reversed-footer.small td{ padding-top: 3px; padding-bottom: 3px; font-size: .83em; background-color: #CCC; } rm-table .awesometable.table td.span12, [riot-tag="rm-table"] .awesometable.table td.span12,rm-table .awesometable.table th.span12, [riot-tag="rm-table"] .awesometable.table th.span12{ float: none; width: 924px; margin-left: 0; } rm-table .awesometable.table tbody tr.success > td, [riot-tag="rm-table"] .awesometable.table tbody tr.success > td{ background-color: #dff0d8; } rm-table .awesometable.table tbody tr.error > td, [riot-tag="rm-table"] .awesometable.table tbody tr.error > td{ background-color: #f2dede; } rm-table .awesometable.table tbody tr.warning > td, [riot-tag="rm-table"] .awesometable.table tbody tr.warning > td{ background-color: #fcf8e3; } rm-table .awesometable.table tbody tr.info > td, [riot-tag="rm-table"] .awesometable.table tbody tr.info > td{ background-color: #d9edf7; } rm-table .awesometable.table-hover tbody tr.success:hover > td, [riot-tag="rm-table"] .awesometable.table-hover tbody tr.success:hover > td{ background-color: #d0e9c6; } rm-table .awesometable.table-hover tbody tr.error:hover > td, [riot-tag="rm-table"] .awesometable.table-hover tbody tr.error:hover > td{ background-color: #ebcccc; } rm-table .awesometable.table-hover tbody tr.warning:hover > td, [riot-tag="rm-table"] .awesometable.table-hover tbody tr.warning:hover > td{ background-color: #faf2cc; } rm-table .awesometable.table-hover tbody tr.info:hover > td, [riot-tag="rm-table"] .awesometable.table-hover tbody tr.info:hover > td{ background-color: #c4e3f3; } rm-table .awesometable-nc tr.head th, [riot-tag="rm-table"] .awesometable-nc tr.head th{ background-color: #f0f0f0; }', function(opts) {
    
    
    var me = this;
    
    this.tableType = opts.type;

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

riot.tag('rm-toast', '<h2>Yum toast</h2> <div class="message_container" if="{ opts.toasts.length > 0 }"> <div class="toast" each="{ opts.toasts }" onclick="{ parent.toastClicked }"> { text } </div> </div>', function(opts) {
	
	var me = this;

});

riot.tag('rm-toggle', '<div class="wrap"> <label class="mdl-{ toggleClass } mdl-js-{ toggleClass } mdl-js-ripple-effect" for="{ makeId }"> <input type="{ toggleType }" id="{ makeId }" name="{ toggleName }" class="mdl-{ toggleClass }__{ toggleType === \'radio\' ? \'button\' : \'input\' }" value="{ toggleValue }" onclick="{ toggle }" __checked="{ opts.checked }"> <span if="{ toggleLabelText && toggleClass !== \'icon-toggle\' }" class="mdl-{ toggleClass }__label">{ toggleLabelText }</span> <i if="{ toggleClass === \'icon-toggle\' }" class="mdl-icon-toggle__label material-icons">{ opts.icon }</i> </label> </div>', function(opts) {
    
    
    var me = this;
    
    this.mixin(eventMixin);
    this.toggleType = '';
    this.toggleClass = '';
    this.toggleValue = opts.value || '';
    this.toggleName = opts.name || '';
    this.toggleLabelText = opts['label-text'] || '';
    
    this.on('mount', function() {
        me.initType(opts.type);
        me.update();
    });
    
    this.initType = function(toggleType) {
        switch(toggleType) {
            case 'checkbox':
                me.toggleType = 'checkbox';
                me.toggleClass = 'checkbox';
                break;
            case 'radio':
                me.toggleType = 'radio';
                me.toggleClass = 'radio';
                break;
            case 'icon-toggle':
                me.toggleType = 'checkbox';
                me.toggleClass = 'icon-toggle';
                break;
            case 'switch':
                me.toggleType = 'checkbox';
                me.toggleClass = 'switch';
                break;
            default:
                me.toggleType = 'checkbox';
                me.toggleClass = 'checkbox';
        }
    }.bind(this);
    
    this.toggle = function(e) {
        opts.checked = !opts.checked;
        this.fire('toggle', e);
    }.bind(this);
    
    this.makeId = function(e) {
        var id = '';
        var possibleChoices = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    
        for(var i = 0; i < 5; i++) {
            id += possibleChoices.charAt(Math.floor(Math.random() * possibleChoices.length));
        }
        
        return id;
    }.bind(this);

});