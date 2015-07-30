<page-markdown>
  <style>
 
  </style>

  <h5>Markdown</h5>
  
  <p>Here is some markdown rendered with our tag.</p>

  <pre>
      <rm-markdown> </rm-markdown>
  </pre>
  
  <p>Options</p>
 
  <pre>
      //Markdown string can be placed here\n
      content:''\n
      \n
  </pre>

  this.mixin(ajaxMixin);
  this.on('mount',function() {
    this.ajaxGet('/tags/rm-markdown/demo/test.md',function(data) {
        riot.mount('rm-markdown',{content:data});
    });
  });
</page-markdown>
