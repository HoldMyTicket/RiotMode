riot.tag('rm-modal', '<button onclick="{ createModal }" class="{ opts[\'open-btn-class\'] }"><i class="{ opts[\'open-btn-icon\'] }"></i> { opts[\'open-btn-text\'] }</button>', 'rm-modal .overlay { position: fixed; top: 0; right: 0; bottom: 0; left: 0; text-align: center; z-index: 10; background-color: rgba(0, 0, 0, 0.8); } rm-modal .modal { max-width: 35%; position: fixed; left: 33%; top: 20%; padding: 15px; background-color: #fff; z-index: 11; -webkit-border-radius: 5px; -moz-border-radius: 5px; -o-border-radius: 5px; border-radius: 5px; } rm-modal .affirmative-btn { float: left; } rm-modal .dismissive-btn { float: right; } rm-modal .clear { clear: both; } rm-modal .hidden { display: none; }', function(opts) {
    
    
    var me = this;
    
    this.mixin(RMeventMixin);
    this.affirmativeBtn = opts['confirm-btn'] == 'true' ? true : false;
    this.dismissiveBtn = opts['cancel-btn'] == 'true' ? true : false;
    this.modalOpen = false;

    for(var i in opts){
        if(opts.hasOwnProperty(i)) {
            if(typeof opts[i] == 'function') {
                this[i] = opts[i];
            }
        }
    }
    
    this.createModal = function() {
        var modalHtml = '<div class="overlay { opts[\'overlay-animation\'] }" show="{ '+this.modalOpen+' }" onclick="{ closeModal }"></div>';
        modalHtml += '<div class="modal { '+opts['modal-animation']+' }" show="{ '+this.modalOpen+' }">';
        modalHtml += '<div class="modal-content"><yield/>';
        modalHtml += '<button onclick="{ confirmBtn }" show="{ '+this.affirmativeBtn+' }" class="mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect mdl-button--accent affirmative-btn">Confirm</button>';
        modalHtml += '<button onclick="{ cancelBtn }" show="{ '+this.dismissiveBtn+' }" class="mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect mdl-button--accent dismissive-btn">Cancel</button>';
        modalHtml += '</div><div class="clear"></div></div>';
        
        if(document.getElementById('rm-modal')) {
            document.getElementById('rm-modal').innerHTML = modalHtml;
            this.openModal();
        } else {
            var modalWrapper = document.createElement('div');
            modalWrapper.setAttribute('id', 'rm-modal');
            modalWrapper.setAttribute('class', 'hidden');
            modalWrapper.innerHTML = modalHtml;
            document.querySelector('body').appendChild(modalWrapper);
            this.openModal();
        }
    }.bind(this);
    
    this.openModal = function(e) {
        this.modalOpen = true;
        this.fire('open', e);
    }.bind(this);
    
    this.closeModal = function(e) {
        this.modalOpen = false;
        this.fire('close', e);
    }.bind(this);
    
    this.confirmBtn = function(e) {
        opts.onconfirm();
    }.bind(this);
    
    this.cancelBtn = function(e) {
        opts.oncancel();
    }.bind(this);

});