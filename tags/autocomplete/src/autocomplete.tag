<rm-autocomplete>
	<div class="wrap">
		<input onclick="{ updateSelect }" id="baseInput" type="text" name="autocomplete" placeholder="{ opts.placeholder }" data-value="{ baseInputValue }" value="{ baseInputText }">
		<div id="list" show={open}>
			<input show={selectBox} onkeyup="{ handleText }" id="selectInput" type="text" name="autocomplete" placeholder="{ opts['filter-placeholder'] || 'Filter' }"
			value="{ selectInputText }">
			<ul show={ list.length }>
				<li onclick="{ parent.choose }" each={ item, i in list } data-value="{ item.value || ''}">{item.text}</li>
			</ul>
		</div>
	</div>
	<script>
		var self = this;
		
		this.mixin(ajaxMixin);
		this.ajax = opts.ajax || false;
		this.min = opts.min || 2;
		this.choices = opts.choices || [];
		this.list = [];
		this.selectBox = (opts.type === "select" ? true : false);
		this.open = false;
		
		this.on('mount', function() {
			self.initType();
			if(self.ajax) {
				//DO ajax here?
			}
		});
		
		this.initType = function() {
			var input = document.getElementById('baseInput');
			if(self.selectBox) {
				input.readOnly = true;
			} else {
				input.onkeyup = function(e) {
					var clean = self.handleText(e);
					if(!clean) 
						self.open = false;
				}
			}
		}
				
		this.updateSelect = function(e) {
			self.list = self.choices;
			self.open = !self.open;
			
			//Reset input
			if(self.open == false)
				self.selectInputText = '';
			
			self.update();
		}
				
		this.handleText = function(e) {
			var target = e.srcElement || e.originalTarget;
			
			if(target.value.length < self.min) {
				if(!self.selectBox)
					self.list = [];
				else
					self.list = self.choices;
				self.update();
                return false;
            }
			
			self.list = self.choices.filter(function(c) {
                return c.text.match(RegExp(target.value,'i'));
            });
			
			//Safety open
			self.open = true;
			self.update();
			
			if ([13, 27, 38, 40].indexOf(e.keyCode) > -1) {
				e.preventDefault();

				if (e.keyCode == 38) {
					
				} else if (e.keyCode == 13) {
					
				} else if (e.keyCode == 40) {
					
				} else if (e.keyCode == 13) {
					
				}
			}
			return true;
		}
		
		this.choose = function(e) {
			var target = e.srcElement || e.originalTarget;
			var value = target.getAttribute('data-value') || target.innerHTML;
			
			self.baseInputText = target.innerHTML;
			self.baseInputValue = value;
			self.updateSelect();
		}
	</script>
</rm-autocomplete>