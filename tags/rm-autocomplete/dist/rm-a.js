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
