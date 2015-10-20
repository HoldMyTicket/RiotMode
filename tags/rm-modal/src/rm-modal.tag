<rm-modal>    
    
    <div class="modalMaster" show="{open}">
      <div class="overlay" onclick="{closeModal}"></div>
      <div class="modal">
        <button class="close-btn" onclick="{closeModal}">X</button>
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
            max-height: 50%;
            overflow-y: auto;
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
        .close-btn {
            background-color: black;
            color: white;
            border: none;
            outline: none;
            cursor: pointer;
            font-size: 15px;
            position: absolute;
            top: -10px;
            right: -7px;
            -webkit-border-radius: 10px;
            -moz-border-radius: 10px;
            -o-border-radius: 10px;
            border-radius: 10px;
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
    
</rm-modal>