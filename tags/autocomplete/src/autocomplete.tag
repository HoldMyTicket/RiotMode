<rm-autocomplete>

	<div class="wrap">
		<input class="mdl-textfield__input { border : selectBox } base" 
		       id="baseInput" 
			   type="text" 
			   name="{ opts.name || autocomplete }" 
			   placeholder="{ opts.placeholder }" 
			   data-value="{ baseInputValue }"
			   onfocus="{ baseFocus }" 
			   value="{ baseInputText }">
		<div class="list" show={open}>
			<input show={selectBox} 
			       class="filter" 
				   onkeyup="{ handleText }" 
				   id="selectInput" 
				   type="text" 
				   name="autocomplete"
				   placeholder="{ opts['filter-placeholder'] || 'Filter' }" 
				   onfocus="{  }"
				   value="{ selectInputText }">			
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
			} else {
				input.onkeyup = function(e) {
					var clean = self.handleText(e);
					if(!clean) 
						self.open = false;
				}
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
				//TODO can also deactive before regex
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
						// TODO update this action
						document.querySelectorAll('td')[1].click();
						return;			
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
				console.log(self.atIndex);
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
					self.update();
				});
			} else {
				self.update();
			}
		}
		
		this.closeChoices = function(e) {
			if (!self.root.contains(e.target)) {
				self.open = false;
				self.atIndex = -1;
				self.deactivate();
				self.update();
			}
		}
		
		this.activate = function() {
			var index = self.atIndex;
			if(typeof self.list[index] === 'undefined') {
				return;
			}
			self.deactivate();
			self.list[index].active = true;
			self.update();
		}
		
		this.deactivate = function () {
			self.list.forEach(function(item) {
				item.active = false;
			});
		}
		
		this.choose = function(e) {
			var target = e.srcElement || e.originalTarget;
			var value = target.getAttribute('data-value') || target.innerHTML;
			
			self.baseInputText = target.innerHTML;
			self.baseInputValue = value;
			self.open = false;
			self.atIndex = -1;
			self.deactivate();
			self.update();
		}
	</script>
	
	<style scoped>
		.active { background:rgb(176,176,176); }
		
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