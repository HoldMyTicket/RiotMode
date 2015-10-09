<rm-autocomplete>
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

  <div class="wrap noselect{opts.noborder ? ' noborder' : ''}">
    
    <input 
      type="text"
      name="{opts.name}"
      class="mdl-textfield__input base { border : select }"
      autocomplete="off"
      placeholder="{ opts.placeholder || 'Type...' }"
      onkeyup="{ handleText }"
      value="{ value }">

    <div show={ open } class="list-container">
      <ul class="list">
        <li show={ select && !noFilter } class="filter">
          <input
            type="text"
            class="filter-input"
            placeholder="Filter"
            onkeyup="{ handleText }"
            autocomplete="off">
        </li>
        <li class="list-row" show={ noResults && value.length > 1}>
          { noResultsMessage }
        </li>
        <li class="list-row item{ item.active ? ' active' : ''}" onclick="{ parent.pick }" each="{ item, i in filteredList }" onclick="{ parent.select }" data-value="{ item.value || item.text }">
          { item.text }<span class="accent">{ item.accent }</span>
        </li>
      </ul>
    </div>
    
  </div>

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

    //Handle any focus or click outside of this element to close it
    document.addEventListener('click', tag.globalClose);
    document.addEventListener('focus', tag.globalClose, true);
    
  });

  this.on('unmount', function () {
    document.removeEventListener('click', tag.globalClose);
    document.removeEventListener('focus', tag.globalClose, true);
  });

  //Normal setup logic
  setup(input) {
    
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
    
  }

  error(input, message) {
    input.readOnly = true;
    input.classList.add('err');
    input.value = message;
    tag.closeWindow();
  }

  openWindow(e) {
    
    if(tag.open)
      return;

    tag.open = true;
    tag.update();

    //If selectbox want to focus filter
    if(tag.select)
      tag.root.querySelector('.filter-input').select();
      
  }

  closeWindow(e) {
    tag.atIndex = -1;
    tag.open = false;
    tag.update();
  }

  globalClose(e) {
    if (e != undefined && tag.root.contains(e.target)) {
      return;
    }
    tag.closeWindow();
  }

  pick(e) {
    var target = e.srcElement || e.originalTarget;
    tag.value = target.innerHTML.replace(/<(?:.|\n)*?>/gm, '').trim();
    tag.fire('change',{'value':tag.value});
    tag.closeWindow();
  }

  handleText(e) {

    if ([13, 27, 38, 40].indexOf(e.keyCode) > -1) {
      e.preventDefault();
      tag.keys(e.keyCode)
    } else {

      tag.deactivate();

      var target = e.srcElement || e.originalTarget;

      if(target.value.length < 2) {
        tag.filteredList = tag.list;
        return;
      }

      //Ajax on the fly
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
    
  }

  keys(val) {
    
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
    
  }

  activate() {

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
    
  }

  deactivate() {
    tag.filteredList.forEach(function(item) {
      item.active = false;
    });
  }

</rm-autocomplete>
