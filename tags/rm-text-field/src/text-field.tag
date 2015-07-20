<rm-text-field>

	<div id="wrap" class="mdl-textfield mdl-js-textfield textfield-demo">
		<textarea if="{ opts.type == 'multiple' && opts.type !='expanding'}" class="mdl-textfield__input" type="text" rows= "3" id="{id}" ></textarea>
		<input if="{ opts.type != 'multiple' && opts.type !='expanding'}" value="{value}" class="mdl-textfield__input" type="text" class="mdl-textfield__input" id>
	  	<label id="label" class="mdl-textfield__label" for="inp{_id}">{ opts.placeholder || 'Type...' }</label>
		<span if="{ opts.type == 'numeric' || opts.type == 'email' || opts.regex }" class="mdl-textfield__error">{ error }</span>
		<div if="{ opts.type == 'expanding' }" class="mdl-textfield__expandable-holder">
	    		<input class="mdl-textfield__input" type="text" id="{id}" />
	    		<label class="mdl-textfield__label" for="expandable">Expandable Input</label>
	  	</div>
	</div>

	/**
	* Text-field component for RiotJS v2.2
	*
	* @author evan-f
	*/
	var self = this;

	this.value = '';

	this.type = opts.type || 'text'; //default to text
	this.width = opts.width || '100px';
	this.floating = opts.floating || false;
	this.rows = parseInt(opts.rows) || 3;

	this.on('mount',function() {
	//Fix for ID not binding to this object riot 2.2.1 -e
	this[this.id] = this.root.querySelector('#'+self.id);

	this.wrap.style.width = this.width;
	if(this.floating) {
		this.wrap.classList.add('mdl-textfield--floating-label');
	}

	if(this.type === 'expanding') {
		this.wrap.classList.add('mdl-textfield--expandable');
		this.label.setAttribute('class','mdl-button mdl-js-button mdl-button--icon');
		this.label.innerHTML = '<i class="material-icons">search</i>';
	}

	this.handleRegex();
	});

	this.handleRegex = function() {
	 if(this.type === 'numeric') {
		// this[self.id].setAttribute('pattern','-?[0-9]*(\.[0-9]+)?');
		 this.error = opts.error || 'Input is not a number!';
		 this.update();
		 return;
	 }

	 if(this.type === 'email') {
	//	 this[self.id].setAttribute('pattern','^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$');
		 this.error = opts.error || 'Invalid email!';
		 this.update();
		 return;
	 }

	 if(opts.regex) {
		 this.error = opts.error || 'Input error!';
	//	 this[self.id].setAttribute('pattern',opts.regex);
		 this.update();
	 }
	}

</rm-text-field>
