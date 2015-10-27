<rm-a>

  <div class="wrap">

    <input 
      type="text"
      name="{opts.name}"
      class="base_input"
      autocomplete="off"
      placeholder="{placeholder}"
      onkeyup="{handleText}"
      value="{value}">

    <div show="{open}" class="list_container">
      <ul class="list">         
        <li class="list_row" show={ noResults && value.length > 1}>
          { noResultsMessage }
        </li>
        <li class="list_row item{ item.active ? ' active' : ''}" onclick="{ parent.pick }" each="{ item, i in filteredList }" onclick="{ parent.select }" data-value="{ item.value || item.text }">
          { item.text }
        </li>
      </ul>
    </div>
  </div>
  
  <style scoped>
    * {
      box-sizing: border-box;
    }
    .active {
      background:rgb(215,215,215);
    }
    .base {
      height:40px;
      padding-left:5px;
      margin-bottom:0px;
      width:100%;
    }
    .base_input {
      border: none;
      border-bottom: 1px solid rgba(0,0,0,.12);
      display: block;
      font-size: 16px;
      margin: 0;
      padding: 4px 0;
      width: 100%;
      background: 0 0;
      text-align: left;
      color: inherit; 
    }
    .base_input:focus { outline: 0; }
    .list_container {
      position:absolute;
      left:0;
      right:0;
      background:#fff;
      height:auto;
      overflow-x:hidden;
      overflow-y:auto;
      border: 1px solid rgba(0, 0, 0, 0.117647);
      border-top:none;
      box-shadow: rgb(68, 68, 68) 0px 2px 10px -4px;
      z-index: 3;
    }
    .noselect {
      -webkit-touch-callout: none;
      -webkit-user-select: none;
      -khtml-user-select: none;
      -moz-user-select: none;
      -ms-user-select: none;
      user-select: none;
    }
    .list {
      list-style-type: none;
      padding:0;
      margin:0;
      -webkit-margin-before: 0;
      -webkit-margin-after: 0;
    }
    .list .list_row {
      position:relative;
      display: block;
      padding:5px 15px;
      margin:0px;
      overflow:auto;
      border-bottom: 1px solid rgba(0, 0, 0, 0.117647);
    }
    .list .list_row .accent {
      position:absolute;
      top:0;
      right:0;
      padding:5px;
      font-size:12px;
      font-style:italic;
      color:rgb(169,169,169);
      -webkit-font-smoothing: antialiased;
      -moz-osx-font-smoothing: grayscale;
    }
    .list .list_row:last-child {
      border-bottom:none;
    }
    .list .list_row:hover {
      background: rgb(240, 240, 240);
      cursor: pointer;
    }
    textarea:focus, input:focus {
      outline: 0;
    }
    .wrap {
      position: relative;
    }
  </style>
   
  var me = this;

  this.mixin(RMajaxMixin);
  this.mixin(RMeventMixin);

  this.open = false;
  this.select = opts.type === "select" ? true : false;
  this.maxHeight = opts.height || '520px';
  this.parameter = opts.parameter || false;
  this.placeholder = opts.placeholder || '';
  this.value = '';
  
  this.url = opts.url || false;
  if(this.url !== false)
    this.ajax = true;
  this.list = opts.list || [];
  this.filteredList = opts.list || [];
  
  this.noResults = false;
  this.noResultsMessage = opts.message || 'No results...';
  this.atIndex = -1;
  
  this.on('mount',function(){
    
    if(this.ajax) {
      this.ajaxGet(this.url, function(res) {
        var json = JSON.parse(res);
        me.list = json;
        me.filteredList = json;
        me.update();
      });
    }
    
    this.root.querySelector('.list').style.maxHeight = this.maxHeight;

    //Handle any focus or click outside of this element to close it
    document.addEventListener('click', me.globalClose);
    document.addEventListener('focus', me.globalClose, true);
    
  });

  this.on('unmount', function () {
    document.removeEventListener('click', me.globalClose);
    document.removeEventListener('focus', me.globalClose, true);
  });
  
  pick(e) {
    var target = e.srcElement || e.originalTarget;
    this.root.querySelector('.base_input').value = target.innerHTML.replace(/<(?:.|\n)*?>/gm, '').trim();
    this.fire('change',{'value':me.value});
    this.closeWindow();
  }
  
  handleText(e) {
    e.preventDefault();
    if ([13, 27, 38, 40].indexOf(e.keyCode) > -1) {
      this.keys(e.keyCode)
    } else {
      var target = e.srcElement || e.originalTarget;
      this.getList(target.value);
    }
  }
  
  keys(val) {
    if (val == 27) {
      this.closeWindow();
    } else if (val == 13) {
      
      if(this.filteredList.length == 1) {
        this.value = this.filteredList[0].text;
        this.fire('change',{'value':me.value});
        this.closeWindow();
        this.root.querySelector('.base_input').blur();
        return;
      } else {
        this.filteredList.forEach(function(item) {
          if(item.active) {
            me.value = item.text;
            me.fire('change',{'value':me.value});
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
  }
  
  getList(value) {
    
    if(value.length < 3) {
      this.filteredList = [];
      this.open = false;
      this.update();
      return; 
    }
      
    //Gonna return ajax list
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
  }
  
  activate() {

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
    
  }

  deactivate() {
    this.filteredList.forEach(function(item) {
      item.active = false;
    });
  }
  
  openWindow(e) {
    if(this.open)
      return;
    this.open = true;
    this.update();      
  }

  closeWindow(e) {
    this.open = false;
    this.atIndex = -1;
    this.update();
  }

  globalClose(e) {
    if (e != undefined && this.root.contains(e.target)) {
      return;
    }
    this.closeWindow();
  }
 
</rm-a>
