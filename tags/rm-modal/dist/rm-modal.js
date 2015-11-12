riot.tag('rm-modal', '<div class="modalMaster" show="{open}"> <div show="{open}" class="overlay" onclick="{closeModal}"></div> <div class="modal"> <button class="close-btn" onclick="{closeModal}">X</button> <div class="modal-content"><yield></yield></div> <div class="clear"></div> </div> </div> <button hide="{hide_btn}" onclick="{ openModal }" class="{ opts[\'open-btn-class\'] }"><i class="{ opts[\'open-btn-icon\'] }"></i> { opts[\'open-btn-text\'] }</button>', 'rm-modal .modalMaster, [riot-tag="rm-modal"] .modalMaster{ position: fixed; top: 0; right: 0; bottom: 0; left: 0; z-index: 100; overflow: auto; } rm-modal .overlay, [riot-tag="rm-modal"] .overlay{ position: absolute; top: 0; right: 0; bottom: 0; left: 0; text-align: center; z-index: 100; background-color: rgba(0, 0, 0, 0.8); } rm-modal .modal, [riot-tag="rm-modal"] .modal{ max-width: 35%; position: absolute; left: 50%; padding: 15px; background-color: #fff; z-index: 102; margin-bottom: 50px; margin: 50px 0; -webkit-border-radius: 5px; -moz-border-radius: 5px; -o-border-radius: 5px; border-radius: 5px; } rm-modal .close-btn, [riot-tag="rm-modal"] .close-btn{ background-color: black; color: white; font-weight: 200; width: 30px; height: 30px; border: 2px solid white; outline: none; cursor: pointer; font-size: 15px; position: absolute; top: -10px; right: -10px; -webkit-border-radius: 15px; -moz-border-radius: 15px; -o-border-radius: 15px; border-radius: 15px; -webkit-box-shadow: 0 0 5px 0 rgba(0,0,0,0.75); -moz-box-shadow: 0 0 5px 0 rgba(0,0,0,0.75); box-shadow: 0 0 5px 0 rgba(0,0,0,0.75); } rm-modal .close-btn:hover, [riot-tag="rm-modal"] .close-btn:hover{ background-color: white; color: black; -webkit-transition: all 0.3s ease-in-out; -moz-transition: all 0.3s ease-in-out; -o-transition: all 0.3s ease-in-out; transition: all 0.3s ease-in-out; } rm-modal .clear, [riot-tag="rm-modal"] .clear{ clear: both; } rm-modal .hidden, [riot-tag="rm-modal"] .hidden{ display: none; }', function(opts) {
    
    
    
    
    var me = this;
    
    this.mixin(RMeventMixin);
    this.open = false;
    this.hide_btn = false;

    this.on('mount',function(){
      if(!this.opts['open-btn-text'])
        this.hide_btn = true;
      this.update();
    })
    
    this.openModal = function(e) {
      this.open = true;
      this.update();
      this.calcModal();
      if(typeof RiotControl != 'undefined'){
        RiotControl.trigger('modalopened', e);
      }
      this.fire('open', e);
    }.bind(this);
    
    this.closeModal = function(e) {
      this.open = false;
      this.update();
      if(typeof RiotControl != 'undefined'){
        RiotControl.trigger('modalclosed', e);
      }
      this.fire('close', e);
    }.bind(this);
    
    this.calcModal = function() {
      var modal = this.root.querySelector('.modal');
      var overlay = this.root.querySelector('.overlay');
      var modalMasterHeight = (this.root.querySelector('.modalMaster').scrollHeight + 1).toString();
      var modalWidth = modal.clientWidth.toString();
      var modalLeft = '-'+(modalWidth / 2).toString();
      
      overlay.style.height = modalMasterHeight+'px';
      
      modal.setAttribute('style','width: '+modalWidth+'px; '+'margin-left: '+modalLeft+'px;');
      modal.style.width = modalWidth+'px';
      modal.style.marginLeft = modalLeft+'px';
    }.bind(this);
    

});