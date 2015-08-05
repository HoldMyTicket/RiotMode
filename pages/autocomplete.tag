<page-autocomplete>
  <style>
  .autocomplete-demo {
      display:inline-block;
      width:200px;
      margin:30px;
  }
  </style>

  <h3>Autocomplete / Select Menu</h3>
  
  <div class="autocomplete-demo">
      <rm-autocomplete
                       name="text-input"
                       height='400px'
                       url="/tags/rm-autocomplete/demo/demo.json"
                       placeholder="Enter text here">
      </rm-autocomplete>
  </div>
  
  <div class="autocomplete-demo">
      <rm-autocomplete
                       type="select"
                       name="text-input"
                       height='400px'
                       items="{ locations }"
                       placeholder="Select a country">
      </rm-autocomplete>
  </div>
  
  <p>Options</p>
 
  <pre>
    <code class="json">
        //Normal name attribute, required\n
        name:'input1' \n
        \n
        //Set type to select box versus text input\n
        type:'select'\n
        \n
        //Set the max-height of the dropdown\n
        height:'190px'\n
        \n
        //Search list\n
        list:[]\n
        \n
        //ajax url blah blah\n
        url="/tags/rm-autocomplete/demo/demo.json"\n
        \n
        //Respective placeholder text\n
        placeholder="Country Selection"\n
        filter-placeholder="Filter"\n
    </code>
  </pre>

  this.textInput = '';
  
  this.locations = [
      {"text":"Albuequerque, NM","value":"Albuquerque, NM","accent":"2.5 miles"},
      {"text":"Santa Fe, NM","value":"Santa Fe, NM","accent":"45 miles"},
      {"text":"Taos, NM","value":"Taos, NM"}
    ];
  
  this.on('mount',function() {
    $('pre code').each(function(i, block) {
      hljs.highlightBlock(block);
    });
    riot.mount('rm-autcomplete');
  });
</page-autocomplete>
