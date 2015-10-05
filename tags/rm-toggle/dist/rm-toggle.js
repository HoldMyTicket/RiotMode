riot.tag('rm-toggle', '<div class="wrap"> <label class="mdl-{ toggleClass } mdl-js-{ toggleClass } mdl-js-ripple-effect" for="{ makeId }"> <input type="{ toggleType }" id="{ makeId }" name="{ toggleName }" class="mdl-{ toggleClass }__{ toggleType === \'radio\' ? \'button\' : \'input\' }" value="{ toggleValue }" onclick="{ toggle }" __checked="{ opts.checked }"> <span if="{ toggleLabelText && toggleClass !== \'icon-toggle\' }" class="mdl-{ toggleClass }__label">{ toggleLabelText }</span> <i if="{ toggleClass === \'icon-toggle\' }" class="mdl-icon-toggle__label material-icons">{ opts.icon }</i> </label> </div>', function(opts) {
    
    
    var me = this;
    
    this.mixin(RMeventMixin);
    this.toggleType = '';
    this.toggleClass = '';
    this.toggleValue = opts.value || '';
    this.toggleName = opts.name || '';
    this.toggleLabelText = opts['label-text'] || '';
    
    this.on('update', function() {
        me.initType(opts.type);
    });
    
    this.on('mount', function() {
        var wrap = me.root.children[0].querySelector('label');
        
        componentHandler.upgradeElement(wrap); //call to load materialdesign on el
        me.checkToggle(opts.type);
        me.update();
    });
    
    this.initType = function(toggleType) {
        switch(toggleType) {
            case 'checkbox':
                me.toggleType = 'checkbox';
                me.toggleClass = 'checkbox';
                break;
            case 'radio':
                me.toggleType = 'radio';
                me.toggleClass = 'radio';
                break;
            case 'icon-toggle':
                me.toggleType = 'checkbox';
                me.toggleClass = 'icon-toggle';
                break;
            case 'switch':
                me.toggleType = 'checkbox';
                me.toggleClass = 'switch';
                break;
            default:
                me.toggleType = 'checkbox';
                me.toggleClass = 'checkbox';
        }
    }.bind(this);
    
    this.checkToggle = function(toggleType) {
        switch(toggleType) {
            case 'checkbox':
                me.root.checked ? me.root.querySelector('label').MaterialCheckbox.check() : me.root.querySelector('label').MaterialCheckbox.uncheck();
                break;
            case 'radio':
                me.root.checked ? me.root.querySelector('label').MaterialRadio.check() : me.root.querySelector('label').MaterialRadio.uncheck();
                break;
            case 'icon-toggle':
                me.root.checked ? me.root.querySelector('label').MaterialIconToggle.check() : me.root.querySelector('label').MaterialIconToggle.uncheck();
                break;
            case 'switch':
                me.root.checked ? me.root.querySelector('label').MaterialSwitch.on() : me.root.querySelector('label').MaterialSwitch.off();
                break;
            default:
                me.root.checked ? me.root.querySelector('label').MaterialCheckbox.check() : me.root.querySelector('label').MaterialCheckbox.uncheck();
        }
    }.bind(this);
    
    this.toggle = function(e) {
        me.root.checked = !me.root.checked;
        this.fire('toggle', e);
    }.bind(this);
    
    this.makeId = function(e) {
        var id = '';
        var possibleChoices = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    
        for(var i = 0; i < 5; i++) {
            id += possibleChoices.charAt(Math.floor(Math.random() * possibleChoices.length));
        }
        
        return id;
    }.bind(this);

});