<rm-modal>    
    
    <style scoped>
        .overlay {
            visibility: hidden;
            position: absolute;
            left: 0px;
            top: 0px;
            width: 100%;
            height: 100%;
            text-align: center;
            z-index: 1000;
            background-color: rgba(0, 0, 0, 0.8);
        }
        
        .overlay.show {
            visibility: visible;
        }
        
        .modal {
            width: 25%;
            height: 18%;
            margin: 100px auto;
            background-color: #fff;
            border: 1px solid #000;
            padding: 15px;
        }
        
        .modal-content {
            position: relative;
        }
        
        .affirmative-btn {
            position: absolute;
            left: 0;
        }
        
        .dismissive-btn {
            position: absolute;
            right: 0;
        }
        
        .close-btn {
            float: right;
            cursor: pointer;
        }
    </style>
    
    <div class="wrap" show="{ opts.opened }">
        <div class="overlay">
            <div class="modal">
                <i class="material-icons close-btn" onclick="{ closeModal }">close</i>
                <div class="modal-content">
                    <yield/>
                </div>
            </div>
        </div>
    </div>
    
    <script>
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
    </script>
</rm-modal>