<page-autocomplete>

  <style>
  .autocomplete-demo {
    display: inline-block;
    width: 200px;
    margin: 30px;
  }
  </style>

  <h3>Autocomplete / Select Menu</h3>
  
  <p>Autocomplete menu with a remote JSON dataset.</p>
  
  <div class="autocomplete-demo">
    <rm-autocomplete
      name="text-input"
      height="400px"
      url="/tags/rm-autocomplete/demo/demo.json"
      placeholder="Enter text here">
    </rm-autocomplete>
  </div>
  
  <div>
    <rm-code type="html" snippet="./snippets/autocomplete-example-1.txt"></rm-code>
  </div>

  <div>
    <hr />
  </div>

  <p>Static select menu</p>
  
  <div class="autocomplete-demo">
    <rm-autocomplete
      type="select"
      name="text-input"
      height="400px"
      items="{locations}"
      placeholder="Select a location">
    </rm-autocomplete>
  </div>

  <div>
    <rm-code type="html" snippet="./snippets/autocomplete-example-2.txt"></rm-code>
  </div>

  <hr />

  <h5>ATTRIBUTES</h5>

  <h5 class="attribute">name</h5>
  <p>Name of the select menu <span class="required">required</span></p>

  <h5 class="attribute">type</h5>
  <p>The type of the menu, either autocomplete or select</p>

  <h5 class="attribute">height</h5>
  <p>Maximum height of the menu</p>

  <h5 class="attribute">items</h5>
  <p>The array to show in the list</p>

  <h5 class="attribute">url</h5>
  <p>The remote list for autocomplete menu</p>

  <h5 class="attribute">placeholder</h5>
  <p>The placeholder to show when the filter is empty</p>

  <h5 class="attribute">filter</h5>
  <p>The current text in the filter</p>

  <hr />

  <h5>EVENTS</h5>

  <!--<h5 class="attribute">toggle</h5>
  <p>When your toggle switch was manually toggled this will be fired</p>-->

  this.textInput = '';
  
  this.locations = [
      {"text":"Albuequerque, NM","value":"Albuquerque, NM","accent":"2.5 miles"},
      {"text":"Denver, CO","value":"Denver, CO","accent":"222.5 miles"},
      {"text":"Honolulu, HI","value":"Honolulu, HI","accent":"1335 miles"},
      {"text":"Santa Fe, NM","value":"Santa Fe, NM","accent":"45 miles"},
      {"text":"Taos, NM","value":"Taos, NM","accent":"145 miles"}
    ];
  
  this.on('mount',function() {

  });
</page-autocomplete>
