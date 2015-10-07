riot.tag('rm-toggle', '<div class="wrap"> <label class="mdl-{ toggleType } mdl-js-{ toggleType } mdl-js-ripple-effect"> <input type="{ toggleType != \'switch\' ? toggleType : \'checkbox\' }" name="{ toggleName }" class="mdl-{ toggleType }__{ toggleType === \'radio\' ? \'button\' : \'input\' }" value="{ toggleValue }" onclick="{ toggle }" __checked="{ ischecked }"> <span if="{ toggleLabelText && toggleType !== \'icon-toggle\' }" class="mdl-{ toggleType }__label">{ toggleLabelText }</span> <i if="{ toggleType === \'icon-toggle\' }" class="mdl-icon-toggle__label material-icons">{ opts.icon }</i> </label> </div>', function(opts) {
    
    
    var me = this;
    
    this.mixin(RMeventMixin);
    this.toggleType = opts.type || 'checkbox';
    this.toggleValue = opts.value || '';
    this.toggleName = opts.name || '';
    this.toggleLabelText = opts['label-text'] || '';
    this.ischecked = this.opts.ischecked || false;

    this.mdl_timer = false;

    this.on('mount', function() {

      Object.observe(me.opts, function (changes) {
        if(changes[0].name == 'ischecked' && changes[0].type == "update" && me.ischecked != me.opts.ischecked){
          me.ischecked = me.opts.ischecked;
          me.checkToggle();
        }
      });
      
      var wrap = me.root.children[0].querySelector('label');
      componentHandler.upgradeElement(wrap);
      
    });

    this.checkToggle = function() {
      switch(me.toggleType) {
        case 'checkbox':
          me.ischecked ? me.root.querySelector('label').MaterialCheckbox.check() : me.root.querySelector('label').MaterialCheckbox.uncheck();
        break;
        case 'radio':
          me.ischecked ? me.root.querySelector('label').MaterialRadio.check() : me.root.querySelector('label').MaterialRadio.uncheck();
        break;
        case 'icon-toggle':
          me.ischecked ? me.root.querySelector('label').MaterialIconToggle.check() : me.root.querySelector('label').MaterialIconToggle.uncheck();
        break;
        case 'switch':
          me.ischecked ? me.root.querySelector('label').MaterialSwitch.on() : me.root.querySelector('label').MaterialSwitch.off();
        break;
      }
      me.update();
    }.bind(this);
    
    this.toggle = function(e) {

      me.opts.ischecked = me.ischecked;
      me.fire('toggle', e);

    }.bind(this);
    

});