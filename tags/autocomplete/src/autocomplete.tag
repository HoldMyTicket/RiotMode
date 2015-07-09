<rm-autocomplete>
	<div class="wrap">
		<input id="baseInput" type="{opts.type || 'text'}" name="autocomplete" placeholder="{opts.placeholder}">
		<div id="list">
			<ul show={ list.length }>
				<li each={item, i in list }>{item}</li>
			</ul>
		</div>
	</div>
	<script>
		var self = this;
		
		this.mixin(ajaxMixin);
		this.ajax = opts.ajax || false;
		this.min = opts.min || 2;
		this.choices = opts.choices || ['Apple','Orange','Banana'];
		this.list = [];
		this.readonly = (opts.readonly ? true : false);
		
		this.on('mount', function() {
			initType();
			if(self.ajax) {
				//DO ajax here?
			}
			
			self.choices = ['Apple','Orange','Banana'];
		});
		
		function initType() {
			var input = document.getElementById('baseInput');
			var list = document.getElementById('list');
			
			if(opts.readonly) {
				input.readOnly = true;
				input.onclick = function(e) {
					console.log(e);
				}
				
			} else {
				input.onkeyup = function(e) {
					handleText(e);
				}
			}
		}
				
		function handleText(e) {
			
			if(e.target.value.length < self.min) {
                self.list = [];
                self.active = -1;
                return;
            }
			
			self.list = self.choices.filter(function(c) {
                return c.match(RegExp(e.target.value,'i'));
            });
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
	</script>
</rm-autocomplete>