<page-datepicker>
  <style>
  .datepicker-demo {
      display:inline-block;
      width:200px;
      margin:30px;
  }
  </style>

  <h3>Datepicker</h3>
  
  <div class="datepicker-demo">
    <rm-datepicker></rm-datepicker>
  </div>

  <rm-code type="html" snippet="./snippets/datepicker-example-1.txt"></rm-code>
    
  <hr />

  <h5>ATTRIBUTES</h5>

  <h5 class="attribute">name</h5>
  <p>Name of the select menu <span class="required">required</span></p>
  <h5 class="attribute">format</h5>
  <p>Date format that is selected, using moment date formatting. Defaults to MMM Do YYYY</p>
  <h5 class="attribute">value</h5>
  <p>The selected value of the attribute</p>

  <hr />

  this.textInput = '';
  
  this.on('mount',function() {
    $('pre code').each(function(i, block) {
      hljs.highlightBlock(block);
    });
    riot.mount('rm-datepicker');
  });
</page-datepicker>
