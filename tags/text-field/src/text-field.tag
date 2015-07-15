<rm-text-field>
	<div id="wrap" class="mdl-textfield mdl-js-textfield textfield-demo">
		<textarea if="{ opts.type == 'multiple' && opts.type !='expanding'}" class="mdl-textfield__input" type="text" rows= "3" id="{id}" ></textarea>
		<input if="{ opts.type != 'multiple' && opts.type !='expanding'}" class="mdl-textfield__input" type="text" class="mdl-textfield__input" type="text" id="{id}" />
    	<label id="label" class="mdl-textfield__label" for="{id}">{ opts.placeholder || 'Type...' }</label>
		<span if="{ opts.type == 'numeric' }"" class="mdl-textfield__error">{ error }</span>
		<div if="{ opts.type == 'expanding' }" class="mdl-textfield__expandable-holder">
      		<input class="mdl-textfield__input" type="text" id="{id}" />
      		<label class="mdl-textfield__label" for="expandable">Expandable Input</label>
    	</div>
	</div>
	<script>
		/**
		 * Text-field component for RiotJS v2.2
		 * 
		 * @author evan-f
		 */
		 var self = this;
		 
		 this.type = opts.type || 'text'; //default to text
		 this.width = opts.width || '100px';
		 this.floating = opts.floating || false;
		 this.rows = parseInt(opts.rows) || 3;
		 this.id = this.type + '-rm-text-field';
		 
		 this.on('mount',function() {
			//Fix for ID not binding to this object riot 2.2.1 -e
			this[self.id] = this.root.querySelector('#'+self.id);
			
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
				 this[self.id].setAttribute('pattern','-?[0-9]*(\.[0-9]+)?');
				 this.error = 'Input is not a numberee!';
				 this.update();
				 return;
			 }
			 
			 if(opts.regex) {
				 this.error = opts.error || 'Input error!';
				 this[self.id].setAttribute('pattern',opts.regex);
				 this.update();
			 }
		 }
		 
		 
	</script>
	<style scoped>
	</style>
</rm-text-field>