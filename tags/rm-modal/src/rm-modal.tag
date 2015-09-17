<rm-modal>    
    
    <style scoped>
        .overlay {
            position: fixed;
            top: 0;
            right: 0;
            bottom: 0;
            left: 0;
            width: 100%;
            height: 100%;
            text-align: center;
            z-index: 10;
            background-color: rgba(0, 0, 0, 0.8);
        }
        
        .modal {
            max-width: 35%;
            position: absolute;
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
    </style>
    
    <button onclick="{ openModal }" class="{ opts['open-btn-class'] }"><i class="{ opts['open-btn-icon'] }"></i> { opts['open-btn-text'] }</button>
    <div class="overlay { opts['overlay-animation'] }" show="{ modalOpen }" onclick="{ closeModal }"></div>
    <div class="modal { opts['modal-animation'] }" show="{ modalOpen }">
        <div class="modal-content">
            <yield/>
            <button onclick="{ confirmBtn }" show="{ affirmativeBtn }" class="mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect mdl-button--accent affirmative-btn">Confirm</button>
            <button onclick="{ cancelBtn }" show="{ dismissiveBtn }" class="mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect mdl-button--accent dismissive-btn">Cancel</button>
        </div>
        <div class="clear"></div>
    </div>
    
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
    
    //load all opts if they are functionsa
    
    for(var i in opts){
        if(opts.hasOwnProperty(i)) {
            if(typeof opts[i] == 'function') {
                this[i] = opts[i];
            }
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