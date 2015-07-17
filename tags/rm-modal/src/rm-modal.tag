<rm-modal>
    <div class="wrap">
        <div class="overlay { show: opts.visible }">
            <div class="modal">
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
        var self = this;
        
        this.mixin(eventMixin);
        
        openModal(e) {
            this.fire('openModal', e);
        }
        
        closeModal(e) {
            this.fire('closeModal', e);
        }
    </script>
    
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
            width: 300px;
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
    </style>
</rm-modal>