<page-text-field>
  <style>
  .item {
      display:inline-block;
      margin:10px;
  }
  </style>

  <h3>Text Field</h3>
  
  <div>
      <div class="item">
          <p>Text</p>
          <rm-text-field name="text" width="150px"></rm-text-field>
      </div>

      <div class="item">
          <p>Numeric</p>
          <rm-text-field name="number" placeholder="Number..." type="numeric"></rm-text-field>
      </div>

      <div class="item">
          <p>Floating Label</p>
          <rm-text-field name="floating" floating="true"></rm-text-field>
      </div>

      <div class="item">
          <p>Regex Email</p>
          <rm-text-field name="email" type="email"></rm-text-field>
      </div>

      <div class="item">
          <p>Expanding</p>
          <rm-text-field name="expanding" width="200px" placeholder="Number..." type="expanding"></rm-text-field>
      </div>

      <br>

      <div class="item">
          <p>Text Area</p>
          <rm-text-field name="text-area" type="multiple" width="300px" rows="3"></rm-text-field>
      </div>
  </div>
  
  <p>Options</p>
 
  <pre>
    <code class="json">
      //Markdown string can be placed here\n
      content:''\n
      \n
    </code>
  </pre>

  this.on('mount',function() {
    $('pre code').each(function(i, block) {
      hljs.highlightBlock(block);
    });
    riot.mount('text-field');
  });
</page-text-field>

