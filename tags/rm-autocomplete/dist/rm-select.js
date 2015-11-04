riot.tag('rm-select', '<div class="wrap noselect{opts.noborder ? \' noborder\' : \'\'}"> <input type="text" class="mdl-textfield__input base { border : select }" autocomplete="off" placeholder="{ opts.placeholder || \'Type...\' }" onkeyup="{ handleText }" value="{ value }"> <input type="text" name="{opts.name}" onkeyup="{ handleText }" value="{ data_value }" hidden> <div show="{ open }" class="list-container"> <ul class="list"> <li show="{ select && !noFilter }" class="filter"> <input type="text" class="filter-input" placeholder="{ opts.filter_placeholder || \'Filter...\' }" onkeyup="{ handleText }" autocomplete="off"> </li> <li class="list-row" show="{ noResults && value.length > 1}"> { noResultsMessage } </li> <li class="list-row item{ item.active ? \' active\' : \'\'}" onclick="{ parent.pick }" each="{ item, i in filteredList }" onclick="{ parent.select }" data-value="{ item.value || item.text }"> { item.text } </li> </ul> </div> </div>', 'rm-select *, [riot-tag="rm-select"] *{ box-sizing: border-box; } rm-select .active, [riot-tag="rm-select"] .active{ background:rgb(215,215,215); } rm-select .base, [riot-tag="rm-select"] .base{ height:40px; padding-left:5px; margin-bottom:0px; width:100%; } rm-select .noborder .border, [riot-tag="rm-select"] .noborder .border{ border: 0; } rm-select .border, [riot-tag="rm-select"] .border{ height:35px; padding-left:5px; border:1px solid rgba(0,0,0,.12); box-sizing:border-box; } rm-select .border:-moz-placeholder, [riot-tag="rm-select"] .border:-moz-placeholder{ color: rgb(169,169,169); } rm-select .border:-ms-input-placeholder, [riot-tag="rm-select"] .border:-ms-input-placeholder{ color: rgb(169,169,169); } rm-select .border::-webkit-input-placeholder, [riot-tag="rm-select"] .border::-webkit-input-placeholder{ color: rgb(169,169,169); } rm-select .border::-moz-placeholder, [riot-tag="rm-select"] .border::-moz-placeholder{ color: rgb(169,169,169); } rm-select .err, [riot-tag="rm-select"] .err{border: 1px dashed red; color: rgb(169,169,169);} rm-select .filter, [riot-tag="rm-select"] .filter{padding:0;margin:0px;} rm-select .filter:hover, [riot-tag="rm-select"] .filter:hover{background:none;} rm-select .filter-input, [riot-tag="rm-select"] .filter-input{ background:none; border:none; border-bottom:1px solid rgba(0, 0, 0, 0.117647); box-sizing:border-box; color: rgb(85, 85, 85); padding:5px; font-size:16px; height:35px; margin:0px; width:100%; } rm-select .list-container, [riot-tag="rm-select"] .list-container{ position:absolute; left:0; right:0; background:#fff; height:auto; overflow-x:hidden; overflow-y:auto; border: 1px solid rgba(0, 0, 0, 0.117647); border-top:none; box-shadow: rgb(68, 68, 68) 0px 2px 10px -4px; z-index: 3; } rm-select .noselect, [riot-tag="rm-select"] .noselect{ -webkit-touch-callout: none; -webkit-user-select: none; -khtml-user-select: none; -moz-user-select: none; -ms-user-select: none; user-select: none; } rm-select .list, [riot-tag="rm-select"] .list{ list-style-type: none; padding:0; margin:0; -webkit-margin-before: 0; -webkit-margin-after: 0; } rm-select .list .list-row, [riot-tag="rm-select"] .list .list-row{ position:relative; display: block; padding:5px 15px; margin:0px; overflow:auto; border-bottom: 1px solid rgba(0, 0, 0, 0.117647); } rm-select .list .list-row .accent, [riot-tag="rm-select"] .list .list-row .accent{ position:absolute; top:0; right:0; padding:5px; font-size:12px; font-style:italic; color:rgb(169,169,169); -webkit-font-smoothing: antialiased; -moz-osx-font-smoothing: grayscale; } rm-select .list .list-row:last-child, [riot-tag="rm-select"] .list .list-row:last-child{ border-bottom:none; } rm-select .list .list-row:hover, [riot-tag="rm-select"] .list .list-row:hover{ background: rgb(240, 240, 240); cursor: pointer; } rm-select textarea:focus, [riot-tag="rm-select"] textarea:focus,rm-select input:focus, [riot-tag="rm-select"] input:focus{ outline: 0; } rm-select .wrap, [riot-tag="rm-select"] .wrap{ position: relative; }', function(opts) {

  var tag = this;

  this.mixin(RMajaxMixin);
  this.mixin(RMeventMixin);

  this.open = false;
  this.select = true;
  this.maxHeight = opts.height || '520px';
  this.noFilter = opts.nofilter || false;
  this.url = opts.url || false;
  if(this.url !== false)
    this.ajax = true;
  this.list = opts.list || [];
  this.filteredList = opts.list || [];
  this.noResults = false;
  this.noResultsMessage = opts.message || 'No results...';
  this.atIndex = -1;

  this.value = opts.value || '';
  this.data_value = '';


  this.on('mount',function(){
    
    var base = this.root.querySelector('.base');

    tag.setup(base);

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
    tag.data_value = target.getAttribute('data-value').trim();
    tag.fire('set',{'text':tag.value, 'value':tag.data_value});
    tag.closeWindow();
  }.bind(this);

  this.handleText = function(e) {
    e.preventDefault();
    if ([13, 27, 38, 40].indexOf(e.keyCode) > -1) {
      tag.keys(e.keyCode)
    } else {

      tag.deactivate();
      var target = e.srcElement || e.originalTarget;

      if(target.value.length < 2) {
        tag.filteredList = tag.list || [];
        return;
      }
    
      tag.filteredList = tag.list.filter(function(c) {
        return c.text.match(RegExp(target.value,'i'));
      });

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
        tag.data_value = tag.filteredList[0].value || tag.filteredList[0].text
        tag.closeWindow();
        tag.root.querySelector('.base').blur();
        return;
        
      } else {
        
        tag.filteredList.forEach(function(item) {
          if(item.active) {
            tag.value = item.text;
            tag.data_value = item.value || item.text
            tag.fire('set',{'text':item.text, 'value':tag.data_value});
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
