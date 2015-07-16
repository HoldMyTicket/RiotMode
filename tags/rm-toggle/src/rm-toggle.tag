<rm-toggle>
    <div class="wrap">
        <label class="mdl-{ toggleClass } mdl-js-{ toggleClass } mdl-js-ripple-effect" for="{ makeId }">
                
            <input 
                type="{ toggleType }"
                id="{ makeId }" 
                name="{ toggleName }" 
                class="mdl-{ toggleClass }__{ toggleType === 'radio' ? 'button' : 'input' }" 
                value="{ toggleValue }" 
                onclick="{ toggle }" 
                checked="{ opts.checked }" />
                
            <span 
                if="{ toggleLabelText && toggleClass !== 'icon-toggle' }" 
                class="mdl-{ toggleClass }__label">{ toggleLabelText }</span>
                
            <i 
                if="{ toggleClass === 'icon-toggle' }" 
                class="mdl-icon-toggle__label material-icons">{ opts.icon }</i>
                
        </label>

    </div>
    
    <script>
        /**
         * Toggle component for RiotJS v2.2
         * 
         * @author joseph-p
         */
        var self = this;
        
        this.mixin(eventMixin);
        this.toggleType = '';
        this.toggleClass = '';
        this.toggleValue = opts.value || '';
        this.toggleName = opts.name || '';
        this.toggleLabelText = opts['label-text'] || '';
        
        initType(toggleType) {
            switch(toggleType) {
                case 'checkbox':
                    self.toggleType = 'checkbox';
                    self.toggleClass = 'checkbox';
                    break;
                case 'radio':
                    self.toggleType = 'radio';
                    self.toggleClass = 'radio';
                    break;
                case 'icon-toggle':
                    self.toggleType = 'checkbox';
                    self.toggleClass = 'icon-toggle';
                    break;
                case 'switch':
                    self.toggleType = 'checkbox';
                    self.toggleClass = 'switch';
                    break;
                default:
                    self.toggleType = 'checkbox';
                    self.toggleClass = 'checkbox';
            }
        }
        
        toggle(e) {
            opts.checked = !opts.checked;
            this.fire('toggle', e);
        }
        
        makeId(e) {
            var id = '';
            var possibleChoices = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
        
            for(var i = 0; i < 5; i++) {
                id += possibleChoices.charAt(Math.floor(Math.random() * possibleChoices.length));
            }
            
            return id;
        }
        
        this.initType(opts.type);
    </script>
</rm-toggle>