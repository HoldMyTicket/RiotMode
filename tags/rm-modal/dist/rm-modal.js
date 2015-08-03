riot.tag('rm-modal', '<div class="wrap"> <div class="overlay" show="{ opts.opened }" onclick="{ closeModal }"></div> <div class="modal" show="{ opts.opened }"> <div class="modal-content"> <yield></yield> </div> <div class="clear"></div> </div> </div>', 'rm-modal .overlay, [riot-tag="rm-modal"] .overlay{ position: absolute; top: 0; right: 0; bottom: 0; left: 0; width: 100%; height: 100%; text-align: center; z-index: 10; background-color: rgba(0, 0, 0, 0.8); } rm-modal .overlay.fade-in-overlay, [riot-tag="rm-modal"] .overlay.fade-in-overlay{ -webkit-animation: fadeIn .25s linear; -moz-animation: fadeIn .25s linear; -o-animation: fadeIn .25s linear; animation: fadeIn .25s linear; } rm-modal .modal.scale-up-modal, [riot-tag="rm-modal"] .modal.scale-up-modal{ -webkit-animation: scaleUp .30s linear; -moz-animation: scaleUp .30s linear; -o-animation: scaleUp .30s linear; animation: scaleUp .30s linear; } rm-modal .overlay.fade-out-overlay, [riot-tag="rm-modal"] .overlay.fade-out-overlay{ -webkit-animation: fadeIn .25s reverse; -moz-animation: fadeIn .25s reverse; -o-animation: fadeIn .25s reverse; animation: fadeIn .25s reverse; } rm-modal .modal.scale-down-modal, [riot-tag="rm-modal"] .modal.scale-down-modal{ -webkit-animation: scaleUp .30s reverse; -moz-animation: scaleUp .30s reverse; -o-animation: scaleUp .30s reverse; animation: scaleUp .30s reverse; } rm-modal .modal, [riot-tag="rm-modal"] .modal{ max-width: 35%; background-color: #fff; border: 1px solid #000; padding: 15px; position: fixed; left: 31%; z-index: 11; text-align: center; -webkit-border-radius: 5px; -moz-border-radius: 5px; -o-border-radius: 5px; border-radius: 5px; } rm-modal .affirmative-btn, [riot-tag="rm-modal"] .affirmative-btn{ float: left; } rm-modal .dismissive-btn, [riot-tag="rm-modal"] .dismissive-btn{ float: right; } rm-modal .clear, [riot-tag="rm-modal"] .clear{ clear: both; } @keyframes fadeIn{ 0%{ opacity: 0; } 100%{ opacity: 1; } } @keyframes scaleUp{ 0%{ -webkit-transform: scale(0); -moz-transform: scale(0); -o-transform: scale(0); transform: scale(0); } 50%{ -webkit-transform: scale(0.5); -moz-transform: scale(0.5); -o-transform: scale(0.5); transform: scale(0.5); } 100%{ -webkit-transform: scale(1); -moz-transform: scale(1); -o-transform: scale(1); transform: scale(1); } }', function(opts) {
    
    
    var me = this;
    
    this.mixin(RMeventMixin);
    
    this.openModal = function(e) {
        this.fire('opened', e);
    }.bind(this);
    
    this.closeModal = function(e) {
        opts.onclose();
        this.fire('closed', e);
    }.bind(this);

});