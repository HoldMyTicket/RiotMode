<rm-code>

  <pre><code class="{opts.type}">{code}</code></pre>

	<style scoped>

    pre code {
      margin: 0 0 30px 0;
    }

  </style>
  
  var me = this;
  
  this.code = 'Loading...';
  
  this.on('mount', function(){
    if(!opts.snippet)
      return;
    $.ajax(opts.snippet, {
      success: function(txt){
        me.code = txt;
        me.update();
        if(!hljs)
          return;
        $('pre code').each(function(i, block) {
          hljs.highlightBlock(block);
        });
    }});
  })
  
</rm-code>
