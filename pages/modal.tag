<page-modal>
  
  <h3>Modal</h3>

  <rm-modal 
  open-btn-text="Open Modal" 
  open-btn-class="mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect mdl-button--accent">
    <h4>Are you sure you want to?</h4>
    <p>Maecenas at interdum sem. Suspendisse potenti. Vestibulum ac nisi sit amet erat molestie tristique. Nullam dignissim condimentum odio vitae congue.</p>
    <button onclick="{ this.parent.customcallback }" class="mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect mdl-button--accent affirmative-btn">Yes!</button>
  </rm-modal>
  
  <br /><br />

  <rm-code snippet="./snippets/modal-example-1.txt"></rm-code>

  <hr />
  
  <rm-modal 
    open-btn-text="Open Modal 2" 
    open-btn-class="mdl-button mdl-js-button mdl-js-ripple-effect">
      <h4>Are you sure you want to?</h4>
      <p>Maecenas at interdum sem. Suspendisse potenti. Vestibulum ac nisi sit amet erat molestie tristique. Nullam dignissim condimentum odio vitae congue.</p>
      <p>Maecenas at interdum sem. Suspendisse potenti. Vestibulum ac nisi sit amet erat molestie tristique. Nullam dignissim condimentum odio vitae congue.</p>
      <button onclick="{ this.parent.customcallback2 }" class="mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect mdl-button--accent affirmative-btn">Yes!</button>
  </rm-modal>

  <rm-code snippet="./snippets/modal-example-2.txt"></rm-code>
    
  <br />
    
    <rm-modal 
    open-btn-text="Open Modal 3" 
    open-btn-class="mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect mdl-button--accent">
        <h4>Hells no I dont want to!</h4>
        <p>Maecenas at interdum sem. Suspendisse potenti. Vestibulum ac nisi sit amet erat molestie tristique. Nullam dignissim condimentum odio vitae congue.</p>
        <p>Maecenas at interdum sem. Suspendisse potenti. Vestibulum ac nisi sit amet erat molestie tristique. Nullam dignissim condimentum odio vitae congue.</p>
        <button onclick="{ this.parent.customcallback3 }" class="mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect mdl-button--accent affirmative-btn">Yes!</button>
    </rm-modal>
    
    <br /><br />
    
    <rm-code snippet="./snippets/modal-example-3.txt"></rm-code>
    
    <hr />
    
    <rm-modal 
    open-btn-text="Open Modal 4" 
    open-btn-class="mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect mdl-button--accent">
        <h4>Hells no I dont want to!</h4>
        <p>Maecenas at interdum sem. Suspendisse potenti. Vestibulum ac nisi sit amet erat molestie tristique. Nullam dignissim condimentum odio vitae congue.</p>
        <p>Maecenas at interdum sem. Suspendisse potenti. Vestibulum ac nisi sit amet erat molestie tristique. Nullam dignissim condimentum odio vitae congue.</p>
    </rm-modal>
    
    <br /><br />
    
    <rm-code snippet="./snippets/modal-example-4.txt"></rm-code>
    
    <hr />
    
    <rm-modal 
    open-btn-text="HAVE A PROMO CODE?" 
    open-btn-class="btn btn-sm btn-outline btn-noline btn-black btn-round" 
    open-btn-icon="fi fi-price-tag" 
    id="promo_code_modal" 
    class="promo-code-modal">
          
          <h1>Promo Code</h1>
          
          <input id="promo_code_input" class="width-50" type="text" name="promo_code" placeholder="Enter your promo code...">
          <button id="submit_promo_code_btn" onclick="{submit_promo}" class="btn btn-red btn-outline btn-smaller">SUBMIT</button>
          
          <div class='error_msg'>
            <div hide="{show_error}">
              <p class="fine">Enter <strong>Coupon Codes</strong> at the end of checkout (not here)</p>
            </div>
            <div show="{show_error}">
              <p class="fine">{error_msg}</p>
            </div>
          </div>
        
          <div class="error" id="promo_code_response_area"></div>
          
    </rm-modal>
    
    <br /><br />
    
    <rm-code snippet="./snippets/modal-example-5.txt"></rm-code>
      
    <hr />

    <rm-modal 
      id="noButtonModal">
        
      <h4>Hells no I dont want to!</h4>
      <p>Maecenas at interdum sem. Suspendisse potenti. Vestibulum ac nisi sit amet erat molestie tristique. Nullam dignissim condimentum odio vitae congue.</p>
      <p>Maecenas at interdum sem. Suspendisse potenti. Vestibulum ac nisi sit amet erat molestie tristique. Nullam dignissim condimentum odio vitae congue.</p>
    </rm-modal>
    
    <br />
        
    <a href="javascript:void(0)" onclick="{noButtonModalLoad}">OPEN MODAL WITHOUT BUTTON</a>
    
    <br />
    
    <rm-code snippet="./snippets/modal-example-6.txt"></rm-code>
    
    <hr />
    
    <h5>ATTRIBUTES</h5>

    <h5 class="attribute">open-btn-text</h5>
    <p>The text to be displayed in the modal button</p>

    <h5 class="attribute">open-btn-class</h5>
    <p>The class to used on the modal button</p>
    
    <h5 class="attribute">open-btn-icon</h5>
    <p>The icon to be used in the modal button</p>

    <hr />

    <h5>EVENTS</h5>

    <h5 class="attribute">toggle</h5>
    <p>When your toggle switch was manually toggled this will be fired</p>
		
    <style scoped>
        h6 {
          font-family: monaco;
          font-size: 13px;
          color: rgb(255, 66, 81);
        }
    </style>

	  var me = this;
    
	  this.on('mount',function(){

          
	  });
      
      customcallback(e) {
          alert('custom callback');
      }
      
      customcallback2(e) {
          alert('custom callback two');
      }
      
      customcallback3(e) {
          alert('custom callback three');
      }
      
      confirmBtn(e) {
          alert('confirm');
      } 
      
      cancelBtn(e) {
          alert('cancel');
      }
      
      noButtonModalLoad(e){
          console.log(me.noButtonModal._tag);
          me.noButtonModal._tag.openModal()
      }
      
</page-modal>