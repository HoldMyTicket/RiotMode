riot.tag2('rm-autocomplete', '<div class="wrap"> <input type="text" name="{opts.name}" class="base_input" autocomplete="off" placeholder="{placeholder}" onkeydown="{handleText}" value="{value}"> <div show="{open}" class="list_container"> <ul class="list"> <li class="list_row" show="{noResults && value.length > 1}"> {noResultsMessage} </li> <li class="list_row item{item.active ? \' active\' : \'\'}" onclick="{parent.pick}" each="{item, i in filteredList}" onclick="{parent.select}" data-value="{item.value || item.text}"> {item.text} </li> </ul> </div> </div>', 'rm-autocomplete *,[riot-tag="rm-autocomplete"] * { box-sizing: border-box; } rm-autocomplete .active,[riot-tag="rm-autocomplete"] .active { background:rgb(215,215,215); } rm-autocomplete .base,[riot-tag="rm-autocomplete"] .base { height:40px; padding-left:5px; margin-bottom:0px; width:100%; } rm-autocomplete .base_input,[riot-tag="rm-autocomplete"] .base_input { border: none; border-bottom: 1px solid rgba(0,0,0,.12); display: block; font-size: 16px; margin: 0; padding: 4px 0; width: 100%; background: 0 0; text-align: left; color: inherit; } rm-autocomplete .base_input:focus,[riot-tag="rm-autocomplete"] .base_input:focus { outline: 0; } rm-autocomplete .list_container,[riot-tag="rm-autocomplete"] .list_container { position:absolute; left:0; right:0; background:#fff; height:auto; overflow-x:hidden; overflow-y:auto; border: 1px solid rgba(0, 0, 0, 0.117647); border-top:none; box-shadow: rgb(68, 68, 68) 0px 2px 10px -4px; z-index: 3; } rm-autocomplete .noselect,[riot-tag="rm-autocomplete"] .noselect { -webkit-touch-callout: none; -webkit-user-select: none; -khtml-user-select: none; -moz-user-select: none; -ms-user-select: none; user-select: none; } rm-autocomplete .list,[riot-tag="rm-autocomplete"] .list { list-style-type: none; padding:0; margin:0; -webkit-margin-before: 0; -webkit-margin-after: 0; } rm-autocomplete .list .list_row,[riot-tag="rm-autocomplete"] .list .list_row { position:relative; display: block; padding:5px 15px; margin:0px; overflow:auto; border-bottom: 1px solid rgba(0, 0, 0, 0.117647); } rm-autocomplete .list .list_row .accent,[riot-tag="rm-autocomplete"] .list .list_row .accent { position:absolute; top:0; right:0; padding:5px; font-size:12px; font-style:italic; color:rgb(169,169,169); -webkit-font-smoothing: antialiased; -moz-osx-font-smoothing: grayscale; } rm-autocomplete .list .list_row:last-child,[riot-tag="rm-autocomplete"] .list .list_row:last-child { border-bottom:none; } rm-autocomplete .list .list_row:hover,[riot-tag="rm-autocomplete"] .list .list_row:hover { background: rgb(240, 240, 240); cursor: pointer; } rm-autocomplete textarea:focus,[riot-tag="rm-autocomplete"] textarea:focus,rm-autocomplete input:focus,[riot-tag="rm-autocomplete"] input:focus { outline: 0; } rm-autocomplete .wrap,[riot-tag="rm-autocomplete"] .wrap { position: relative; }', '', function(opts) {


  var me = this;

  this.mixin(RMajaxMixin);
  this.mixin(RMeventMixin);

  this.open = false;
  this.select = opts.type === "select" ? true : false;
  this.maxHeight = opts.height || '520px';
  this.parameter = opts.parameter || false;
  this.placeholder = opts.placeholder || '';
  this.value = '';
  this.data_value = '';
  this.input_name = '';

  this.url = opts.url || false;
  if(this.url !== false)
    this.ajax = true;
  this.list = opts.list || [];
  this.filteredList = opts.list || [];

  this.noResults = false;
  this.noResultsMessage = opts.message || 'No results...';
  this.atIndex = -1;

  this.on('mount',function(){

    if(this.ajax && !this.parameter) {
      this.ajaxGet(this.url, function(res) {
        var json = JSON.parse(res);
        me.list = json;
        me.filteredList = json;
        me.update();
      });
    }

    if(opts.value) {
      this.root.querySelector('.base_input').value = opts.value
      this.value = opts.value;
      this.update();
    }
    if(parseInt(opts.limit) == 0) {
      this.root.querySelector('.base_input').onfocus = function(e) {
        me.openWindow(e);
      }
    }
    this.root.querySelector('.list').style.maxHeight = this.maxHeight;

    document.addEventListener('click', me.globalClose);
    document.addEventListener('focus', me.globalClose, true);

  });

  this.on('unmount', function () {
    document.removeEventListener('click', me.globalClose);
    document.removeEventListener('focus', me.globalClose, true);
  });

  this.setValue = function(val, dataVal) {
    var chosen = val || this.root.querySelector('.base_input').value
    this.root.querySelector('.base_input').value = chosen
    this.value = chosen;
    this.data_value = dataVal;
    this.input_name = this.root.querySelector('.base_input').name;
    this.fire('set',{'value':chosen, 'data_value':dataVal, 'input_name':this.input_name});
  }.bind(this)

  this.pick = function(e) {
    var target = e.srcElement || e.originalTarget;
    this.setValue(target.innerHTML.replace(/<(?:.|\n)*?>/gm, '').trim(), target.dataset.value);
    this.atIndex = -1;
    this.closeWindow();
  }.bind(this)

  this.handleText = function(e) {
    if ([13, 27, 38, 40].indexOf(e.keyCode) > -1) {
      e.preventDefault();
      this.keys(e.keyCode)
    } else {
      var target = e.srcElement || e.originalTarget;
      this.getList(target.value);
    }
    return true;
  }.bind(this)

  this.keys = function(val) {
    if (val == 27) {
      this.closeWindow();
    } else if (val == 13) {
      if(this.filteredList.length == 1) {
        this.setValue(this.filteredList[0].text, this.filteredList[0].value);
        this.closeWindow();
        this.root.querySelector('.base_input').blur();
        return;
      } else {
        this.filteredList.forEach(function(item) {
          if(item.active) {
            me.setValue(item.text, item.value);
            me.closeWindow();
          }
        });
      }

    } else if (val == 38) {
      if(this.atIndex <= 0)
        return;
      this.atIndex--;
      this.activate();
    } else if (val == 40) {
      if(this.atIndex + 1 >= this.filteredList.length)
        return;

      this.atIndex++;
      this.activate();
    }
  }.bind(this)

  this.getList = function(value) {

    if(value.length < (parseInt(opts.limit) || 3)) {
      this.filteredList = [];
      this.open = false;
      this.update();
      return;
    }

    if(this.parameter) {
      var path = this.url + '/' + this.parameter + '/' + encodeURIComponent(value);

      clearTimeout(this.timeout);

      this.timeout = setTimeout(function() {
        me.ajaxGet(path, function(res) {
          me.filteredList = JSON.parse(res);
          if(me.filteredList && me.filteredList.length > 0) {
            me.openWindow();
          } else {
            me.closeWindow();
          }
          me.update();
        });
      });

    } else {

      var ret = this.list.filter(function(c) {
        return c.text.match(RegExp(value,'i'));
      });

      this.filteredList = ret;
      if(this.filteredList && this.filteredList.length > 0) {
        this.open = true;
      }
      this.update();
    }
  }.bind(this)

  this.activate = function() {

    if(typeof this.filteredList[this.atIndex] === 'undefined') {
      return;
    }

    this.deactivate();
    this.filteredList[this.atIndex].active = true;
    this.update();

    var active = this.root.querySelector('.active');
    var table = this.root.querySelector('.list');

    var diff = active.getBoundingClientRect().top - table.getBoundingClientRect().top;
    var max = parseInt(table.style.maxHeight);

    if(diff >= max || diff < 0) {
      active.scrollIntoView();
    }

  }.bind(this)

  this.deactivate = function() {
    this.filteredList.forEach(function(item) {
      item.active = false;
    });
  }.bind(this)

  this.openWindow = function(e) {
    if(this.open)
      return;
    this.open = true;
    this.update();
  }.bind(this)

  this.closeWindow = function(e) {
    this.open = false;
    this.atIndex = -1;
    this.update();
  }.bind(this)

  this.globalClose = function(e) {
    if (e != undefined && this.root.contains(e.target)) {
      return;
    }
    this.closeWindow();
  }.bind(this)

}, '{ }');
