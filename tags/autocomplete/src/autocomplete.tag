<rm-autocomplete>

	<div class="wrap">
		<input class="mdl-textfield__input { border : selectBox } base" onclick="{ selectBox ? updateSelect : null }" id="baseInput" type="text" name="autocomplete" placeholder="{ opts.placeholder }" data-value="{ baseInputValue }" value="{ baseInputText }">
		<div class="list" show={open}>
			<input show={selectBox} class="filter" onkeyup="{ capture }" id="selectInput" type="text" name="autocomplete"
							placeholder="{ opts['filter-placeholder'] || 'Filter' }" value="{ selectInputText }">	
							
			<div id="table" class="table-wrap">
				<table class="mdl-data-table mdl-js-data-table">
					<tbody>
						<tr show={noResults}><td class="mdl-data-table__cell--non-numeric mute">Nothing Found...</td></tr>
						<tr onclick="{ parent.choose }" each={ item, i in list } data-value="{ item.value || ''}">
							<td class="mdl-data-table__cell--non-numeric">{item.text}</td>
						</tr>
					</tbody>
				</table>
			</div>
		</div>
	</div>
	
	<script>
		/**
		 * Autocomplete component for RiotJS v1.0
		 * 
		 * @author evan-f
		 */
		var self = this;
		
		this.mixin(ajaxMixin);
		this.ajax = opts.ajax || false; //Grab choice with ajax or not
		this.ajaxTimeout = parseInt(opts.timeout) || 1000;
		this.choices = opts.choices || [];
		this.height = opts.height || '500px'; //Length of dropdown
		this.list = [];
		this.selectBox = (opts.type === "select" ? true : false);
		this.url = opts.url || false;
		this.open = false;
		this.noResults = false;
		
		this.on('mount', function() {
			self.initType();
			
			//Setup height on the table
			document.getElementById('table').style.maxHeight = self.height;
			
			if(self.ajax) {
				self.ajaxGet(self.url, function(res) {
					var json = JSON.parse(res);
					self.choices = json.choices;
				});
			}
		});
		
		this.initType = function() {
			var input = document.getElementById('baseInput');
			if(self.selectBox) {
				input.readOnly = true;
			} else {
				input.onkeyup = function(e) {
					var clean = self.capture(e);
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
			
		this.ajaxReady = true;
			
		this.capture = function(e) {
			if(self.ajax === 'flow') {
				if(self.ajaxReady) {
					self.ajaxReady = false;
					self.ajaxGet(self.url, function(res) {
						var json = JSON.parse(res);
						self.choices = json.choices;
						self.handleText(e);
						setTimeout(function() {
							self.ajaxReady = true;
						},self.ajaxTimeout);
					});
				} else {
					self.handleText(e);
				}
			} else {
				self.handleText(e);
			}
		}
				
		this.handleText = function(e) {
			var target = e.srcElement || e.originalTarget;
			
			if(target.value.length == 0) {
				self.open = false;
				self.update();
				return true;
			}
			
			self.list = self.choices.filter(function(c) {
                return c.text.match(RegExp(target.value,'i'));
            });
			
			self.noResults = false;
			if(self.list.length < 1) 
				self.noResults = true;
			
			//Safety open
			self.open = true;
			self.update();
			
			if ([13, 27, 38, 40].indexOf(e.keyCode) > -1) {
				e.preventDefault();

				if (e.keyCode == 27) {
					self.open = false;
				} else if (e.keyCode == 13) {
					if(self.list.length == 1) {
						document.querySelectorAll('td')[1].click();				
					}
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
	
	<style scoped>
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