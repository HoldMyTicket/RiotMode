riot.tag('rm-toggle', '<div class="wrap"> <label class="mdl-{ toggleClass } mdl-js-{ toggleClass } mdl-js-ripple-effect" for="{ makeId }"> <input type="{ toggleType }" id="{ makeId }" name="{ toggleName }" class="mdl-{ toggleClass }__{ toggleType === \'radio\' ? \'button\' : \'input\' }" value="{ toggleValue }" onclick="{ toggle }" __checked="{ opts.checked }"> <span if="{ toggleLabelText && toggleClass !== \'icon-toggle\' }" class="mdl-{ toggleClass }__label">{ toggleLabelText }</span> <i if="{ toggleClass === \'icon-toggle\' }" class="mdl-icon-toggle__label material-icons">{ opts.icon }</i> </label> </div>', function(opts) {
    
    
    var me = this;
    
    this.mixin(eventMixin);
    this.toggleType = '';
    this.toggleClass = '';
    this.toggleValue = opts.value || '';
    this.toggleName = opts.name || '';
    this.toggleLabelText = opts['label-text'] || '';
    
    this.on('mount', function() {
        me.initType(opts.type);
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
    
    this.toggle = function(e) {
        opts.checked = !opts.checked;
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