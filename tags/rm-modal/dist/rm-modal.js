riot.tag('rm-modal', '<div class="modalMaster" show="{open}"> <div class="overlay" onclick="{closeModal}"></div> <div class="modal"> <div class="modal-content"><yield></yield></div> <div class="clear"></div> </div> </div> <button hide="{hide_btn}" onclick="{ openModal }" class="{ opts[\'open-btn-class\'] }"><i class="{ opts[\'open-btn-icon\'] }"></i> { opts[\'open-btn-text\'] }</button>', 'rm-modal .modalMaster { position: fixed; top: 0; right: 0; bottom: 0; left: 0; z-index: 100; } rm-modal .overlay { position: fixed; top: 0; right: 0; bottom: 0; left: 0; text-align: center; z-index: 101; background-color: rgba(0, 0, 0, 0.8); } rm-modal .modal { max-width: 35%; position: fixed; left: 33%; top: 20%; padding: 15px; background-color: #fff; z-index: 102; -webkit-border-radius: 5px; -moz-border-radius: 5px; -o-border-radius: 5px; border-radius: 5px; } rm-modal .affirmative-btn { float: left; } rm-modal .dismissive-btn { float: right; } rm-modal .clear { clear: both; } rm-modal .hidden { display: none; }', function(opts) {
    
    
    
    
    var me = this;
    
    this.mixin(RMeventMixin);
    this.affirmativeBtn = opts['confirm-btn'] == 'true' ? true : false;
    this.dismissiveBtn = opts['cancel-btn'] == 'true' ? true : false;
    this.open = false;
    this.hide_btn = false;
    
    this.openModal = function(e) {
      this.open = true;
      this.update();
      if(typeof RiotControl != 'undefined'){
        RiotControl.trigger('modalopened');
      }
      if(!this.opts['open-btn-text'])
        this.hide_btn = true;
      this.fire('open', e);
    }.bind(this);
    
    this.closeModal = function(e) {
      this.open = false;
      this.update();
      if(typeof RiotControl != 'undefined'){
        RiotControl.trigger('modalclosed');
      }
      this.fire('close', e);
    }.bind(this);
    
    this.confirmBtn = function(e) {
      opts.onconfirm();
    }.bind(this);
    
    this.cancelBtn = function(e) {
      opts.oncancel();
    }.bind(this);
    

});