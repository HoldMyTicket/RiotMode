<rm-modal>    
    
    <div class="modalMaster" show="{open}">
      <div class="overlay" onclick="{closeModal}"></div>
      <div class="modal">
        <div class="modal-content"><yield/></div>
        <div class="clear"></div>
      </div>
    </div>

    <button hide="{hide_btn}" onclick="{ openModal }" class="{ opts['open-btn-class'] }"><i class="{ opts['open-btn-icon'] }"></i> { opts['open-btn-text'] }</button>
    
    <style scoped>
        .modalMaster {
            position: fixed;
            top: 0;
            right: 0;
            bottom: 0;
            left: 0;
            z-index: 100;
        }
        .overlay {
            position: fixed;
            top: 0;
            right: 0;
            bottom: 0;
            left: 0;
            text-align: center;
            z-index: 101;
            background-color: rgba(0, 0, 0, 0.8);
        }
        .modal {
            max-width: 35%;
            position: fixed;
            left: 33%;
            top: 20%;
            padding: 15px;
            background-color: #fff;
            z-index: 102;
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
    
    
    
    /**
     * Modal component for RiotJS v2.2
     * 
     * @author joseph-perez
     * @author wes
     */
    var me = this;
    
    this.mixin(RMeventMixin);
    this.affirmativeBtn = opts['confirm-btn'] == 'true' ? true : false;
    this.dismissiveBtn = opts['cancel-btn'] == 'true' ? true : false;
    this.open = false;
    this.hide_btn = false;

    this.on('mount',function(){
      if(!this.opts['open-btn-text'])
        this.hide_btn = true;
      this.update();
    })
    
    openModal(e) {
      this.open = true;
      this.update();
      if(typeof RiotControl != 'undefined'){
        RiotControl.trigger('modalopened');
      }
      this.fire('open', e);
    }
    
    closeModal(e) {
      this.open = false;
      this.update();
      if(typeof RiotControl != 'undefined'){
        RiotControl.trigger('modalclosed');
      }
      this.fire('close', e);
    }
    
    confirmBtn(e) {
      opts.onconfirm();
    }
    
    cancelBtn(e) {
      opts.oncancel();
    }
    
</rm-modal>