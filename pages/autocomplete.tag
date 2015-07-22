<page-autocomplete>
  <style scoped>
  .item {
      display:inline-block;
      margin:10px;
  }
  </style>

  <h5>Autocomplete / Select Menu</h5>
  <div class="item">
      <rm-autocomplete
                       name="text-input"
                       url="/tags/rm-autocomplete/demo/demo.json"
                       placeholder="">
      </rm-autocomplete>
  </div>
  
  this.on('mount',function() {
    riot.mount('rm-autocomplete');
    console.log(this.tags);
  });
</page-autocomplete>
