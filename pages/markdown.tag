<page-markdown>
  <style>
 
  </style>

  <h3>Markdown</h3>
  
  <p>Here is some markdown rendered with our tag.</p>

  <div id="markdown"></div>
  
  <rm-code snippet="./snippets/markdown-example.txt" type="html"></rm-code>
  <rm-code snippet="./snippets/markdown-sample.md" type="markdown"></rm-code>
  
  var me = this;

  this.on('mount',function() {

    $.ajax('./snippets/markdown-sample.md', {
      success: function(markdown){
        riot.mount('#markdown', 'rm-markdown', {content: markdown})
      }
    })

  });

</page-markdown>