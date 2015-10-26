<page-toast>
    
    <style scoped>
        h6 {
          font-family: monaco;
          font-size: 13px;
          color: rgb(255, 66, 81);
        }
    </style>

	<h3>TOASTS</h3>
    <rm-toast 
        duration="2000" 
        id="sendEmailToast" 
        position="top-right">
    </rm-toast>
    
    <rm-toast 
        id="createDocumentToast" 
        position="bottom-right" 
        duration="3000" 
        text="Successfully created! You can view the document <a target='_blank' href='http://google.com'>here</a>">
    </rm-toast>
    
    <button onclick="{sendEmail}">Send Email</button>
    <button onclick="{createDocument}">Create Document</button>

    <h5>Basic Usage</h5>
    <pre>
      <code>
        &lt;rm-toast id=&quot;toast&quot;&gt&lt/rm-toast&gt;
      </code>
    </pre>

    <h5>More Usage</h5>
    <pre>
      <code>
        
        &lt;rm-toast id=&quot;toast&quot; duration=&quot;3000&quot; position=&quot;top-right&quot; text=&quot;TOAST&quot;&gt&lt/rm-toast&gt;
        
      </code>
    </pre>

    <h5>ATTRIBUTES</h5>

    <h6>duration</h6>
    <p>Give your toast a duration to be displayed</p>

    <h6>position</h6>
    <p>The position that the toast will be displayed</p>
    <ul>
        <li>top-left</li>
        <li>top-right</li>
        <li>bottom-left</li>
        <li>bottom-right</li>
    </ul>
    
    <h6>text</h6>
    <p>The text to be displyed in the toast</p>

    <hr />
		
	var me = this;
    
	this.on('mount',function(){

        $('pre code').each(function(i, block) {
            hljs.highlightBlock(block);
        });
          
	});
      
    createDocument(e) {
        me.createDocumentToast._tag.showToast();
    }
      
    sendEmail(e) {
        setTimeout(function() {
            me.sendEmailToast._tag.opts.text = 'Email Successfully Sent!';
            me.sendEmailToast._tag.showToast();
        }, 2000);
    }
      
</page-toast>