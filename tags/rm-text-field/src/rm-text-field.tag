<rm-text-field>

	<div id="wrap" class="mdl-textfield mdl-js-textfield">
        <textarea if="{ opts.type == 'multiple' && opts.type !='expanding'}" name="{name}" class="mdl-textfield__input" type="text" rows="{rows}" id="text_{id}" ></textarea>
        <input if="{ opts.type != 'multiple' && opts.type !='expanding'}" name="{name}" class="mdl-textfield__input" type="text" id="text_{_id}" />
        <label class="mdl-textfield__label" for="text_{_id}">{ opts.placeholder || 'Type...' }</label>
        <span if="{ opts.type == 'numeric' || opts.type == 'email' || opts.regex }" class="mdl-textfield__error">{ error }</span>
		<div if="{ opts.type == 'expanding' }" class="mdl-textfield__expandable-holder">
	    		<input name="{name}" class="mdl-textfield__input" type="text" id="text_{_id}" />
	    		<label class="mdl-textfield__label" for="text_{id}">Expandable Input</label>
	  	</div>
	</div>

	/**
	* Text-field component for RiotJS v2.2
	*
	* @author evan-f
	*/
	var tag = this;

    this.value = '';
    this.type = opts.type || 'text';
    this.width = opts.width || '100px';
    this.floating = opts.floating || false;
    this.rows = parseInt(opts.rows) || 2;
    this.regex = opts.regex || false;
    this.error = opts.error || "Input error!";
	this.name = opts.name || false;

    this.on('mount',function() {
		tag.wrap.style.width = tag.width;

		if(!tag.name) {
			tag.wrap.innerHTML = "<span style='color:red;'>Set name attribute!</span>";
			return;
		}

        if(tag.floating) {
    		tag.wrap.classList.add('mdl-textfield--floating-label');
    	}

		if(tag.type === 'expanding') {
			var label = tag.root.querySelector('label');
			tag.wrap.classList.add('mdl-textfield--expandable');
			label.setAttribute('class','mdl-button mdl-js-button mdl-button--icon');
			label.innerHTML = '<i class="material-icons">search</i>';
		}

        tag.assignRegex();
    });

    assignRegex() {
        var input = tag.root.querySelector('input');

        if(tag.type === 'numeric') {
            input.setAttribute('pattern','-?[0-9]*(\.[0-9]+)?');
            tag.error = 'Input is not a number!';
            tag.update();
            return;
        }

        if(tag.type === 'email') {
       	    input.setAttribute('pattern','^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$');
            tag.error = opts.error || 'Invalid email!';
            tag.update();
            return;
        }

        if(tag.regex) {
            input.setAttribute('pattern',opts.regex);
		    tag.update();
        }
    }

</rm-text-field>
