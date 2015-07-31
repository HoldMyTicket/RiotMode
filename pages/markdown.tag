<page-markdown>
  <style>
 
  </style>

  <h3>Markdown</h3>
  
  <p>Here is some markdown rendered with our tag.</p>

  <pre>
      <rm-markdown> </rm-markdown>
  </pre>
  
  <p>Options</p>
 
  <pre>
    <code class="json">
      //Markdown string can be placed here\n
      content:''\n
      \n
    </code>
  </pre>

  this.mixin(RMajaxMixin);
  this.on('mount',function() {
    $('pre code').each(function(i, block) {
      hljs.highlightBlock(block);
    });
    this.ajaxGet('/tags/rm-markdown/demo/test.md',function(data) {
        riot.mount('rm-markdown',{content:data});
    });
  });
</page-markdown>
