<rm-modal>

    <div class="modalMaster" show="{open}">
      <div show="{open}" class="overlay" onclick="{closeModalIfNotObtrusive}"></div>
      <div class="modal">
        <button hide="{opts.obtrusive}" class="close-btn" onclick="{closeModalIfNotObtrusive}">X</button>
        <div class="modal-content"><yield/></div>
        <div class="clear"></div>
      </div>
    </div>

    <button hide="{hide_btn}" onclick="{ openModal }" class="{ opts['openBtnClass'] }"><i class="{ opts['openBtnIcon'] }"></i> { opts['openBtnText'] }</button>

    <style scoped>
        .modalMaster {
          position: fixed;
          top: 0;
          right: 0;
          bottom: 0;
          left: 0;
          z-index: 100;
          overflow: auto;
        }
        .overlay {
          position: absolute;
          top: 0;
          right: 0;
          bottom: 0;
          left: 0;
          text-align: center;
          z-index: 100;
          background-color: rgba(0, 0, 0, 0.8);
        }
        .modal {
          position: absolute;
          left: 50%;
          padding: 15px;
          background-color: #fff;
          z-index: 102;
          margin-bottom: 50px;
          margin: 50px 0;
          -webkit-border-radius: 5px;
          -moz-border-radius: 5px;
          -o-border-radius: 5px;
          border-radius: 5px;
        }
        .close-btn {
          background-color: black;
          color: white;
          font-weight: 200;
          width: 30px;
          height: 30px;
          border: 2px solid white;
          outline: none;
          cursor: pointer;
          font-size: 15px;
          position: absolute;
          top: -10px;
          right: -10px;
          
          -webkit-border-radius: 15px;
          -moz-border-radius: 15px;
          -o-border-radius: 15px;
          border-radius: 15px;
          
          -webkit-box-shadow: 0 0 5px 0 rgba(0,0,0,0.75);
          -moz-box-shadow: 0 0 5px 0 rgba(0,0,0,0.75);
          box-shadow: 0 0 5px 0 rgba(0,0,0,0.75);
          
          -webkit-transition: background-color 0.3s, color 0.3s;
          -moz-transition: background-color 0.3s, color 0.3s;
          -o-transition: background-color 0.3s, color 0.3s;
          transition: background-color 0.3s, color 0.3s;
        }
        .close-btn:hover {
          background-color: white;
          color: black; 
        }

        .clear {
          clear: both;
        }

        .hidden {
          display: none;
        }
        
        @media only screen and (max-width: 767px) {
          .modal {
            max-width: 100%;
            width: 100% !important;
            margin-left: 0 !important;
            left: 0;
          }
          
          .modal .modal-content img {
            display: block;
            margin: 0 auto;
          }
          
          .close-btn {
            right: 0;
          }
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
    this.modalWidth = opts.width || false;
    this.modalHeight = opts.height || false;

    this.on('mount',function(){
      if(!me.opts['openBtnText'])
        me.hide_btn = true;
      me.update();
    })

    openModal(e) {
      this.open = true;
      this.update();
      this.calcModal();
      if(typeof RiotControl != 'undefined'){
        RiotControl.trigger('modalopened', e);
      }
      document.addEventListener('keyup', me.modalKeyUp);
      this.fire('open', e);
    }

    // checks for obtrusive to close first
    closeModalIfNotObtrusive(e){
      if(!opts.obtrusive)
        this.closeModal();
    }

    closeModal(e) {
      this.open = false;
      this.update();
      this.resetModal();
      if(typeof RiotControl != 'undefined'){
        RiotControl.trigger('modalclosed', e);
      }
      document.removeEventListener('keyup', me.modalKeyUp);
      this.fire('close', e);
    }

    modalKeyUp(e) {
      if(e.keyCode == 27 && !opts.obtrusive) {
        this.closeModal();
      }
    }

    calcModal() {
      var modal = this.root.querySelector('.modal');
      var overlay = this.root.querySelector('.overlay');
      var modalMasterHeight = this.root.querySelector('.modalMaster').scrollHeight.toString();
      var modalWidth = this.modalWidth || modal.clientWidth.toString();
      var modalLeft = '-'+(modalWidth / 2).toString();

      overlay.setAttribute('style','height: '+modalMasterHeight+'px;');
      overlay.style.height = modalMasterHeight+'px';

      modal.setAttribute('style','width: '+modalWidth+'px; '+'margin-left: '+modalLeft+'px;'+(this.modalHeight ? ' height: '+this.modalHeight+'px;' : ''));
      modal.style.width = modalWidth+'px';
      if(this.modalHeight) {
        modal.style.height = this.modalHeight+'px';
      }
      modal.style.marginLeft = modalLeft+'px';
    }

    resetModal() {
      var modal = this.root.querySelector('.modal');
      var overlay = this.root.querySelector('.overlay');

      modal.setAttribute('style','width: auto;');
      modal.style.width = 'auto';

      overlay.setAttribute('style','height: auto');
      overlay.style.height = 'auto';
    }

</rm-modal>
