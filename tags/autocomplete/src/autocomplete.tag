<rm-autocomplete>

	<div class="wrap">
		<input class="mdl-textfield__input { border : selectBox } base" onclick="{ selectBox ? updateSelect : null }" id="baseInput" type="text" name="autocomplete" placeholder="{ opts.placeholder }" data-value="{ baseInputValue }" value="{ baseInputText }">
		<div class="list" show={open}>
			<input class="filter" onkeyup="{ handleText }" id="selectInput" type="text" name="autocomplete"
							placeholder="{ opts['filter-placeholder'] || 'Filter' }" value="{ selectInputText }">	
							
			<div class="table-wrap">
				<table class="mdl-data-table mdl-js-data-table">
					<tbody>
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
		this.choices = opts.choices || [];
		this.height = parseInt(opts.height) || 5; //Length of dropdown
		this.list = [];
		this.min = opts.min || 2;
		this.selectBox = (opts.type === "select" ? true : false);
		this.open = false;
		
		this.on('mount', function() {
			self.initType();
			if(self.ajax === 'initial') {
				//DO ajax here?
				this.ajaxGet('http://localhost:12/tags/autocomplete/demo/demo.json',function(res) {
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
			height:500px;
			overflow-x:hidden;
			overflow-y:auto;}
		
		table {
			border:none !important;
			width:100%; }
		
			table tbody {
				height:400px;
				overflow: scroll; }
		
			table td { border:1px solid rgba(0,0,0,.12); }
			table td::first-child {}
			
			table tr {border: none;}
		 
		textarea:focus, input:focus { outline: 0; }
		
		.wrap { 
			width:200px; }
	</style>
</rm-autocomplete>