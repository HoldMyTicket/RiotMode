<rm-modal>    
    
    <style scoped>
        .overlay {
            position: absolute;
            top: 0;
            right: 0;
            bottom: 0;
            left: 0;
            width: 100%;
            height: 100%;
            text-align: center;
            z-index: 1000;
            background-color: rgba(0, 0, 0, 0.8);
        }
        
        .overlay.fade-in {
            -webkit-animation: fadeIn .25s linear;
            -moz-animation: fadeIn .25s linear;
            -o-animation: fadeIn .25s linear;
            animation: fadeIn .25s linear;
        }
        
        .modal.scale-up {
            -webkit-animation: scaleUp .30s linear;
            -moz-animation: scaleUp .30s linear;
            -o-animation: scaleUp .30s linear;
            animation: scaleUp .30s linear;
        }
        
        .overlay.fade-out {
            -webkit-animation: fadeIn .25s reverse;
            -moz-animation: fadeIn .25s reverse;
            -o-animation: fadeIn .25s reverse;
            animation: fadeIn .25s reverse;
        }
        
        .modal.scale-down {
            -webkit-animation: scaleUp .30s reverse;
            -moz-animation: scaleUp .30s reverse;
            -o-animation: scaleUp .30s reverse;
            animation: scaleUp .30s reverse;
        }
        
        .modal {
            width: 25%;
            margin: 100px auto;
            background-color: #fff;
            border: 1px solid #000;
            padding: 15px;
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
        
        /* animation for modal */
        @keyframes fadeIn {
            0% { opacity: 0; }
            100% { opacity: 1; }
        }
        
        @keyframes scaleUp {
            0% {
                -webkit-transform: scale(0);
                -moz-transform: scale(0);
                -o-transform: scale(0);
                transform: scale(0);
            }
            50% {
                -webkit-transform: scale(0.5);
                -moz-transform: scale(0.5);
                -o-transform: scale(0.5);
                transform: scale(0.5);
            }
            100% {
                -webkit-transform: scale(1);
                -moz-transform: scale(1);
                -o-transform: scale(1);
                transform: scale(1);
            }
        }
    </style>
    
    <div class="wrap" show="{ opts.opened }">
        <div class="overlay fade-in" onclick="{ closeModal }">
            <div class="modal scale-up">
                <div class="modal-content">
                    <yield/>
                </div>
                <div class="clear"></div>
            </div>
        </div>
    </div>
    
    /**
     * Modal component for RiotJS v2.2
     * 
     * @author joseph-p
     */
    var me = this;
    
    this.mixin(eventMixin);
    
    openedModal(e) {
        this.fire('opened', e);
    }
    
    closeModal(e) {
        this.fire('closed', e);
    }
</rm-modal>