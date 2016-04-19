<page-toast>

  <h3>TOASTS</h3>

  <rm-toast 
      duration="2000" 
      id="sendEmailToast" 
      position="top-right">
  </rm-toast>
  <button onclick="{sendEmail}" class="mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect mdl-button--accent">Send Email</button>

  <br /><br />
  
  <rm-code snippet="./snippets/toast-example-1.txt"></rm-code>
  
  <hr />
  
  <rm-toast 
      id="createDocumentToast" 
      position="bottom-right" 
      duration="3000" 
      text="Successfully created! You can view the document <a target='_blank' href='http://google.com'>here</a>.">
  </rm-toast>
  <button onclick="{createDocument}" class="mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect mdl-button--accent">Create Document</button>
  
  <br /><br />
  
  <rm-code snippet="./snippets/toast-example-2.txt"></rm-code>

  <hr />

  <h5>ATTRIBUTES</h5>

  <h5 class="attribute">duration</h5>
  <p>Give your toast a duration to be displayed</p>

  <h5 class="attribute">position</h5>
  <p>The position that the toast will be displayed</p>
  <ul>
      <li>top-left</li>
      <li>top-right</li>
      <li>bottom-left</li>
      <li>bottom-right</li>
  </ul>

  var me = this;
      
  createDocument(e) {
    me.createDocumentToast._tag.showToast();
  }

  sendEmail(e) {
    setTimeout(function() {
      me.sendEmailToast._tag.opts.text = 'Email Successfully Sent!';
      me.sendEmailToast._tag.showToast();
    }, 500);
  }
      
</page-toast>