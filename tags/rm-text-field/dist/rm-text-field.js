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
