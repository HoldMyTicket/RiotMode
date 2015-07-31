<page-datepicker>
  <style>
  .datepicker-demo {
      display:inline-block;
      width:200px;
      margin:30px;
  }
  </style>

  <h5>Datepicker</h5>
  
  <div class="datepicker-demo">
      <rm-datepicker> </rm-datepicker>
  </div>
  
  <p>Options</p>
 
  <pre>
    <code class="json">
        Will fill in soon
    </code>
  </pre>

  this.textInput = '';
  
  this.on('mount',function() {
    $('pre code').each(function(i, block) {
      hljs.highlightBlock(block);
    });
    riot.mount('rm-datepicker');
  });
</page-datepicker>
