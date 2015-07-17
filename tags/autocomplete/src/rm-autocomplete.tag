<rm-autocomplete>
    <style scoped>
        .active { background:rgb(215,215,215); }
        .base {height:40px;padding-left:5px;}
		.border {
            heght:40px;
            padding-left:5px;
			border:1px solid rgba(0,0,0,.12);
			box-sizing:border-box;
			padding-left:5px; }
		.border:-moz-placeholder { color: rgb(169,169,169); /* Firefox 18- */ }
		.border:-ms-input-placeholder { color: rgb(169,169,169); }
		.border::-webkit-input-placeholder { color: rgb(169,169,169); }
		.border::-moz-placeholder { color: rgb(169,169,169); /* Firefox 19+ */ }
        .err {border: 1px dashed red; color: rgb(169,169,169);}
		.filter {padding:0;}
        .filter:hover {background:none;}
        .filter-input {
			background:none;
            border:none;
			box-sizing:border-box;
			color: rgb(85, 85, 85);
			padding:5px;
			font-size:16px;
			height:30px;
			width:100%; }
		.list {
			position:absolute;
            left:0; right:0;
			border: 1px solid rgba(0, 0, 0, 0.117647);
            border-top:none;
			box-shadow: rgb(68, 68, 68) 0px 2px 10px -4px;}
        ul { list-style-type: none; padding:0; maring:0; -webkit-margin-before: 0; -webkit-margin-after: 0;}
        ul li {
            padding:15px;
            border-bottom: 1px solid rgba(0, 0, 0, 0.117647);
        }
        ul li:hover { background: rgb(240, 240, 240); }
		textarea:focus, input:focus { outline: 0; }
        .wrap { position: relative; }
	</style>

    <div class="wrap">
        <input class="mdl-textfield__input base { border : select }"
               placeholder="{ opts.placeholder || 'Type...' }">

        <div show={ open } class="list">
            <ul>
                <li show={ select } class="filter">
                    <input class="filter-input"
                       placeholder="Filter">
                </li>
    			<li each="{ item, i in filteredList }" onclick="{ parent.select }" class="item { active: item.active }">
                    { item.text }
                </li>
    		</ul>
        </div>
    <div>

    var tag = this;

    this.open = false;
    this.select = opts.type === "select" ? true : false;

    //Fill both lists for now
    this.list = opts.list || [];
    this.filteredList = opts.list || [];

    this.on('mount',function(){
        var base = this.root.querySelector('.base');

        if(opts.name)
            tag.setup(base);
        else
            tag.error(base,'No name attribute');

    });

    //Normal setup logic
    setup(input) {
        if(tag.select)
            input.readOnly = true;

        input.onkeyup = function(e) {
            tag.handleText(e);
        };
        input.onblur  = function(e) {
            tag.closeWindow();
        };
        input.onfocus = function(e) {
            tag.openWindow();
        };
        input.onclick = function(e) {};
    }

    error(input, message) {
        input.readOnly = true;
        input.classList.add('err');
        input.value = message;
        tag.closeWindow();
    }


    openWindow(e) {
        tag.open = true;
        tag.update();
    }

    closeWindow(e) {
        tag.open = false;
        tag.update();
    }

    handleText(e) {
		var target = e.srcElement || e.originalTarget;
        tag.filteredList = tag.list.filter(function(c) {
            return c.text.match(RegExp(target.value,'i'));
        });
        tag.update();
    }

</rm-autocomplete>
