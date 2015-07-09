<rm-autocomplete>
	<div class="wrap">
		<input id="baseInput" type="{opts.type || 'text'}" name="autocomplete" placeholder="{opts.placeholder}" onkeyup="{handle}">
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
		this.choices = opts.choices;
		this.list = [];
		this.readonly = (opts.readonly ? true : false);
		
		this.on('mount', function() {
			this.initType();
			if(this.ajax) {
				this.choices = ['Apple','Orange','Banana'];
			}
		});
		
		this.initType = function() {
			if(opts.readonly) {
				document.getElementById('baseInput').readOnly = true;
				document.getElementById('list');
			}
		}
		
		this.expression = function(e) {
            return RegExp(e.target.value,'i');
        }
		
		this.handle = function(e) {

			if(e.target.value.length < this.min) {
                this.list = [];
                this.active = -1;
                return;
            }
			
			this.list = this.choices.filter(function(c) {
                return c.match(self.expression(e));
            });
			
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