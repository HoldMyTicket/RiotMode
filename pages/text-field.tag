<page-text-field>
  <style>
  .item {
      display:inline-block;
      margin:10px;
  }
  </style>

  <h3>Text Field</h3>
  
  <div>

    <div>
      <p>Text</p>
      <rm-text-field name="text" width="150px"></rm-text-field>
      <rm-code snippet="./snippets/text-field-example-1.txt"></rm-code>
    </div>

    <div>
      <p>Numeric</p>
      <rm-text-field name="number" placeholder="Number..." type="numeric"></rm-text-field>
      <rm-code snippet="./snippets/text-field-example-2.txt"></rm-code>
    </div>

    <div>
      <p>Floating Label</p>
      <rm-text-field name="floating" floating="true"></rm-text-field>
      <rm-code snippet="./snippets/text-field-example-3.txt"></rm-code>
    </div>

    <div>
      <p>Regex Email</p>
      <rm-text-field name="email" type="email"></rm-text-field>
      <rm-code snippet="./snippets/text-field-example-4.txt"></rm-code>
    </div>

    <div>
      <p>Expanding</p>
      <rm-text-field name="expanding" width="200px" placeholder="Number..." type="expanding"></rm-text-field>
      <rm-code snippet="./snippets/text-field-example-5.txt"></rm-code>
    </div>

    <div class="item">
      <p>Text Area</p>
      <rm-text-field name="text-area" type="multiple" width="300px" rows="3"></rm-text-field>
      <rm-code snippet="./snippets/text-field-example-6.txt"></rm-code>
    </div>

  </div>
  
  <h5>ATTRIBUTES</h5>

  <h5 class="attribute">name</h5>
  <p>Name of the text field <span class="required">required</span></p>

  <h5 class="attribute">width</h5>
  <p>The width of the text field</p>

  <h5 class="attribute">placeholder</h5>
  <p>Placeholder of the text field</p>

  <h5 class="attribute">type</h5>
  <p>The type of the text field (text|numeric|email|expanding|multiple)</p>

  <h5 class="attribute">rows</h5>
  <p>The height of the textarea if type is multiple</p>

</page-text-field>

