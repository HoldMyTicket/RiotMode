<rm-modal>    
    
    <style scoped>
        .overlay {
            position: fixed;
            top: 0;
            right: 0;
            bottom: 0;
            left: 0;
            text-align: center;
            z-index: 10;
            background-color: rgba(0, 0, 0, 0.8);
        }
        
        .modal {
            max-width: 35%;
            position: fixed;
            left: 33%;
            top: 20%;
            padding: 15px;
            background-color: #fff;
            z-index: 11;
            -webkit-border-radius: 5px;
            -moz-border-radius: 5px;
            -o-border-radius: 5px;
            border-radius: 5px;
        }
        
        .affirmative-btn {
            float: left;
        }
        
        .dismissive-btn {
            float: right;
        }
        
        .clear {
            clear: both;
        }
        
        .hidden {
            display: none;
        }
    </style>
    
    <button onclick="{ createModal }" class="{ opts['open-btn-class'] }"><i class="{ opts['open-btn-icon'] }"></i> { opts['open-btn-text'] }</button>
    
    /**
     * Modal component for RiotJS v2.2
     * 
     * @author joseph-perez
     */
    var me = this;
    
    this.mixin(RMeventMixin);
    this.affirmativeBtn = opts['confirm-btn'] == 'true' ? true : false;
    this.dismissiveBtn = opts['cancel-btn'] == 'true' ? true : false;
    this.modalOpen = false;
    
    //load all opts if they are functions
    for(var i in opts){
        if(opts.hasOwnProperty(i)) {
            if(typeof opts[i] == 'function') {
                this[i] = opts[i];
            }
        }
    }
    
    createModal() {
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
    }
    
    openModal(e) {
        this.modalOpen = true;
        this.fire('open', e);
    }
    
    closeModal(e) {
        this.modalOpen = false;
        this.fire('close', e);
    }
    
    confirmBtn(e) {
        opts.onconfirm();
    }
    
    cancelBtn(e) {
        opts.oncancel();
    }
</rm-modal>