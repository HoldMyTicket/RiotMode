<rm-toggle>
    
    <div class="wrap">
      
        <label class="mdl-{ toggleType } mdl-js-{ toggleType } mdl-js-ripple-effect" for="{ makeId }">
                
            <input 
                type="{ toggleType }"
                id="{ makeId }" 
                name="{ toggleName }" 
                class="mdl-{ toggleType }__{ toggleType === 'radio' ? 'button' : 'input' }" 
                value="{ toggleValue }" 
                onclick="{ toggle }" 
                checked={ ischecked } />
                
            <span 
                if="{ toggleLabelText && toggleType !== 'icon-toggle' }" 
                class="mdl-{ toggleType }__label">{ toggleLabelText }</span>
                
            <i 
                if="{ toggleType === 'icon-toggle' }" 
                class="mdl-icon-toggle__label material-icons">{ opts.icon }</i>
                
        </label>

    </div>
    
    /**
     * Toggle component for RiotJS v2.2
     * 
     * @author joseph-perez
     */
    var me = this;
    
    this.mixin(RMeventMixin);
    this.toggleType = opts.type || 'checkbox';
    this.toggleValue = opts.value || '';
    this.toggleName = opts.name || '';
    this.toggleLabelText = opts['label-text'] || '';
    this.ischecked = this.opts.ischecked || false;

    this.mdl_timer = false;

    this.on('off', function(){
      console.log('off')
      me.ischecked = false;
      me.opts.ischecked = false;
      me.checkToggle();
    });
    this.on('on', function(){
      console.log('on')
      me.ischecked = true;
      me.opts.ischecked = true;
      me.checkToggle();
    });

    this.on('mount', function() {
      
      me.root.querySelector('label').addEventListener('mdl-componentupgraded', function(e) {
        clearTimeout(me.mdl_timer);
        me.mdl_timer = setTimeout(function(){
          me.checkToggle();
        },300);
      });

    });

    checkToggle() {
      switch(me.toggleType) {
        case 'checkbox':
          // me.ischecked ? me.root.querySelector('label').MaterialCheckbox.check() : me.root.querySelector('label').MaterialCheckbox.uncheck();
        break;
        case 'radio':
          me.ischecked ? me.root.querySelector('label').MaterialRadio.check() : me.root.querySelector('label').MaterialRadio.uncheck();
        break;
        case 'icon-toggle':
          me.ischecked ? me.root.querySelector('label').MaterialIconToggle.check() : me.root.querySelector('label').MaterialIconToggle.uncheck();
        break;
        case 'switch':
        // console.log(me.root.querySelector('label').MaterialSwitch)
          me.ischecked ? me.root.querySelector('label').MaterialSwitch.on() : me.root.querySelector('label').MaterialSwitch.off();
        break;
      }
      me.update();
    }
    
    toggle(e) {

      me.ischecked = !me.ischecked;
      me.opts.ischecked = me.ischecked;
      me.checkToggle();
      me.fire('toggle', e);

    }
    
    makeId(e) {
      var id = '';
      var possibleChoices = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
      for(var i = 0; i < 5; i++) {
          id += possibleChoices.charAt(Math.floor(Math.random() * possibleChoices.length));
      }
      return id;
    }
    
</rm-toggle>