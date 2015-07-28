<page-autocomplete>
  <style>
  .autocomplete-demo {
      display:inline-block;
      width:200px;
      margin:30px;
  }
  </style>

  <h5>Autocomplete / Select Menu</h5>
  
  <div class="autocomplete-demo">
      <rm-autocomplete
                       name="text-input"
                       height='400px';
                       url="/tags/rm-autocomplete/demo/demo.json"
                       placeholder="Enter text here">
      </rm-autocomplete>
  </div>
  
  <div class="autocomplete-demo">
      <rm-autocomplete
                       name="text-input"
                       height='400px';
                       url="/tags/rm-autocomplete/demo/demo.json"
                       placeholder="Enter text here"
                       type="select">
      </rm-autocomplete>
  </div>
  
  <p>Options</p>
 
  <pre>
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
  </pre>

  this.textInput = '';
  
  this.on('mount',function() {
    riot.mount('rm-autcomplete');
    riot.mount('rg-datepicker');
  });
</page-autocomplete>
