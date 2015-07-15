<rm-autocomplete>

	<div class="wrap">
		<input class="mdl-textfield__input { border : selectBox } base" 
		       id="baseInput" 
			   type="text" 
			   name="{ opts.name || autocomplete }" 
			   placeholder="{ opts.placeholder }" 
			   data-value="{ baseInputValue }"
			   value="{ baseInputText }"
			   onclick="{ baseFocus }"
			   onfocus="{ baseFocus }" 
			   onkeyup="{ handleText }">
		<div class="list" show={open}>
			<input show={selectBox} 
			       id="filter"
				   class="filter" 
				   onkeyup="{ handleText }" 
				   id="selectInput" 
				   type="text" 
				   name="autocomplete"
				   placeholder="{ opts['filter-placeholder'] || 'Filter' }">			
			<div id="table" class="table-wrap">
				<table class="mdl-data-table mdl-js-data-table">
					<tbody>
						<tr show={noResults}><td class="mdl-data-table__cell--non-numeric mute">Nothing Found...</td></tr>
						<tr onclick="{ parent.choose }" each={ item, i in list } data-value="{ item.value || ''}">
							<td class="mdl-data-table__cell--non-numeric {active:item.active}">{item.text}</td>
						</tr>
					</tbody>
				</table>
			</div>
		</div>
	</div>
	
	<script>
		/**
		 * Autocomplete component for RiotJS v2.2
		 * 
		 * @author evan-f
		 */
		var self = this;
		
		this.mixin(ajaxMixin);
		this.ajax = opts.ajax || false;
		this.choices = opts.choices || [];
		this.dropdown = opts.dropdown || false;
		this.height = opts.height || '500px'; 
		this.list = [];
		this.selectBox = (opts.type === "select" ? true : false);
		this.url = opts.url || false;
		this.open = false;
		this.noResults = false;
		this.atIndex = -1;
		
		this.on('mount', function() {
			self.init();
			document.addEventListener('click', self.closeChoices);
			document.addEventListener('focus', self.closeChoices, true);
		});
		
		this.on('unmount', function () {
			document.removeEventListener('click', self.closeDropdown);
			document.removeEventListener('focus', self.closeDropdown, true);
		});
		
		this.init = function() {
			var input = self.baseInput;
			self.table.style.maxHeight = self.height;
			
			if(self.selectBox) {
				input.readOnly = true;
			}
			
			if(self.ajax) {
				self.ajaxGet(self.url, function(res) {
					var json = JSON.parse(res);
					self.choices = json.choices;
					self.list = json.choices;
					self.update();
				});
			} else {
				self.list = self.choices;
			}
			
			input.onfocus = function() {
				self.baseFocus();
			}
		}
				
		this.baseFocus = function() {
			if(self.list.length > 0) {
				self.openChoices();
			}
		}
				
		this.handleText = function(e) {
			var target = e.srcElement || e.originalTarget;
			
			self.list = self.choices.filter(function(c) {
                return c.text.match(RegExp(target.value,'i'));
            });
			
			self.noResults = false;
			if(self.list.length < 1) 
				self.noResults = true;
			
			if ([13, 27, 38, 40].indexOf(e.keyCode) > -1) {
				e.preventDefault();
				
				if (e.keyCode == 27) {
					self.closeChoices();
				} else if (e.keyCode == 13) {
					if(self.list.length == 1) {
						self.assign(self.list[0].text,self.list[0].value);
						return;			
					} else {
						self.list.forEach(function(item) {
							if(item.active)
								self.assign(item.text,item.value);
						});
					}
				} else if (e.keyCode == 38) {
					if(self.atIndex <= 0)
						return;

					self.atIndex--;
					self.activate();
				} else if (e.keyCode == 40) {
					if(self.atIndex + 1 >= self.list.length)
						return;
					
					self.atIndex++;
					self.activate();
				}
			}
			self.update();
			return true;
		}
		
		this.openChoices = function() {
			self.open = true;
			if(self.ajax === 'flow') {
				self.ajaxGet(self.url, function(res) {
					var json = JSON.parse(res);
					self.choices = json.choices;
					self.list = json.choices;
					self.update();
				});
			} else {
				self.update();
			}
		}
		
		this.closeChoices = function(e) {	
			if (e != undefined && self.root.contains(e.target)) {
				return;
			}
			self.open = false;
			self.atIndex = -1;
			self.deactivate();
			self.update();
		}
		
		this.activate = function() {
			var index = self.atIndex;
			if(typeof self.list[index] === 'undefined') {
				return;
			}
						
			self.deactivate();
			self.list[index].active = true;
			self.update();
			
			var active = document.querySelector('.active');
			var table = this.table;
			
			var diff = active.getBoundingClientRect().top - table.getBoundingClientRect().top;
			var max = parseInt(table.style.maxHeight);
			
			if(diff >= max || diff < 0) {
				active.scrollIntoView();
			}
		}
		
		this.deactivate = function () {
			self.list.forEach(function(item) {
				item.active = false;
			});
		}
		
		this.choose = function(e) {
			var target = e.srcElement || e.originalTarget;
			var value = target.getAttribute('data-value') || target.innerHTML;
			
			self.assign(target.innerHTML,value);
		}
		
		this.assign = function(text, val) {
			if(self.selectBox)  {
				this.filter.value = '';		
			}
			self.baseInputText = text;
			self.baseInputValue = val;
			self.open = false;
			self.atIndex = -1;
			self.deactivate();
			self.update();
		}
	</script>
	
	<style scoped>
		.active { background:rgb(215,215,215); }
		
		.base { height:40px; }
		
		.border {
			border:1px solid rgba(0,0,0,.12);
			box-sizing:border-box;
			padding-left:5px; }
			.border:-moz-placeholder { color: rgb(96, 108, 113); /* Firefox 18- */ }
			.border:-ms-input-placeholder { color: rgb(96, 108, 113); }
			.border::-webkit-input-placeholder { color: rgb(96, 108, 113); }
			.border::-moz-placeholder { color: rgb(96, 108, 113); /* Firefox 19+ */ }
		
		.filter {
			background:none;
			border:1px solid rgba(0,0,0,.12);
			border-top:none;

			box-sizing:border-box;
			color: rgb(85, 85, 85);
			padding:5px;
			font-size:16px;
			height:30px;
			width:100%; }
		
		.list {
			position:absolute;
			width: inherit;
			box-shadow: rgb(68, 68, 68) 0px 2px 10px -4px;}
		
		.search-row { height:auto !important; }
		
			.search-row td {
				border-top:none;
				height:25px;
				padding:5px !important; }
		
		.table-wrap {
			height:auto;
			overflow-x:hidden;
			overflow-y:auto;}
		
		table {
			width:100%; }
			
			table tr {
				width:100%;}
			
		textarea:focus, input:focus { outline: 0; }
		
		.wrap { 
			width:200px; }
	</style>
</rm-autocomplete>