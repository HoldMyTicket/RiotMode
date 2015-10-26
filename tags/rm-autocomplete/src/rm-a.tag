<rm-a>

  <div class="wrap">

    <input 
      type="text"
      name="{opts.name}"
      class="base_input"
      autocomplete="off"
      placeholder="{ }"
      onkeyup="{ handleText }">

    <div show={ open } class="list_container">
      <ul class="list">         
        <li class="list-row" show={ noResults && value.length > 1}>
          { noResultsMessage }
        </li>
        <li class="list-row item{ item.active ? ' active' : ''}" onclick="{ parent.pick }" each="{ item, i in filteredList }" onclick="{ parent.select }" data-value="{ item.value || item.text }">
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
    .noborder .border { border: 0; }
    .border {
      
      height:35px;
      padding-left:5px;
      border:1px solid rgba(0,0,0,.12);
      box-sizing:border-box;
    }
    .border:-moz-placeholder { color: rgb(169,169,169); /* Firefox 18- */ }
    .border:-ms-input-placeholder { color: rgb(169,169,169); }
    .border::-webkit-input-placeholder { color: rgb(169,169,169); }
    .border::-moz-placeholder { color: rgb(169,169,169); /* Firefox 19+ */ }
    .err {border: 1px dashed red; color: rgb(169,169,169);}
    .filter {padding:0;margin:0px;}
    .filter:hover {background:none;}
    .filter-input {
      background:none;
      border:none;
      border-bottom:1px solid rgba(0, 0, 0, 0.117647);
      box-sizing:border-box;
      color: rgb(85, 85, 85);
      padding:5px;
      font-size:16px;
      height:35px;
      margin:0px;
      width:100%;
    }
    .list-container {
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
    .list .list-row {
      position:relative;
      display: block;
      padding:5px 15px;
      margin:0px;
      overflow:auto;
      border-bottom: 1px solid rgba(0, 0, 0, 0.117647);
    }
    .list .list-row .accent {
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
    .list .list-row:last-child {
      border-bottom:none;
    }
    .list .list-row:hover {
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

    //Handle any focus or click outside of this element to close it
    document.addEventListener('click', me.globalClose);
    document.addEventListener('focus', me.globalClose, true);
    
  });

  this.on('unmount', function () {
    document.removeEventListener('click', me.globalClose);
    document.removeEventListener('focus', me.globalClose, true);
  });
  
  handleText(e) {
    //Important keys
    if ([13, 27, 38, 40].indexOf(e.keyCode) > -1) {
      e.preventDefault();
      this.keys(e.keyCode)
    } else {
      var target = e.srcElement || e.originalTarget;
      this.getList(target.value);
    }
  }
  
  keys() {
    
  }
  
  getList(value) {
    if(value.length < 2)
      return;
      
    //Gonna return ajax list
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
  }
  
  openWindow(e) {
    if(this.open)
      return;
    this.open = true;
    this.update();      
  }

  closeWindow(e) {
    this.open = false;
    this.update();
  }

  globalClose(e) {
    if (e != undefined && this.root.contains(e.target)) {
      return;
    }
    this.closeWindow();
  }
 
</rm-a>
