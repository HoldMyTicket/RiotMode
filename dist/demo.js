riot.tag2('page-autocomplete', '<h3>Autocomplete / Select Menu</h3><p>Autocomplete menu with a remote JSON dataset.</p><div class="autocomplete-demo"><rm-autocomplete name="text-input" height="400px" url="/tags/rm-autocomplete/demo/demo.json" placeholder="Enter text here"></rm-autocomplete></div><div><rm-code type="html" snippet="./snippets/autocomplete-example-1.txt"></rm-code></div><div><hr></div><p>Static select menu</p><div class="autocomplete-demo"><rm-autocomplete type="select" name="text-input" height="400px" items="{locations}" placeholder="Select a location"></rm-autocomplete></div><div><rm-code type="html" snippet="./snippets/autocomplete-example-2.txt"></rm-code></div><hr><h5>ATTRIBUTES</h5><h5 class="attribute">name</h5><p>Name of the select menu <span class="required">required</span></p><h5 class="attribute">type</h5><p>The type of the menu, either autocomplete or select</p><h5 class="attribute">height</h5><p>Maximum height of the menu</p><h5 class="attribute">items</h5><p>The array to show in the list</p><h5 class="attribute">url</h5><p>The remote list for autocomplete menu</p><h5 class="attribute">placeholder</h5><p>The placeholder to show when the filter is empty</p><h5 class="attribute">filter</h5><p>The current text in the filter</p><hr><h5>EVENTS</h5>', '.autocomplete-demo { display: inline-block; width: 200px; margin: 30px; }', '', function(opts) {


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
});

riot.tag2('page-chart', '<h3>Charts</h3><div class="chart-demo" id="first"></div><div class="chart-demo" id="second"></div><div class="chart-demo" id="third"></div><div class="chart-demo" id="fourth"></div><div class="chart-demo" id="fifth"></div><p style="margin-top:25px;">Options</p><pre>\n    <code class="json">\n      //Type of graph, line | bar | pie | area | spark\\n\n      type:\'line\'\\n\n      \\n\n      //Options specific to a chart.\\n\n      //Found at https://developers.google.com/chart/interactive/docs/\\n\n      options:\\{\\}\\n\n      \\n\n      //Data for chart\\n\n      data:[]\\n\n      \\n\n      //Drag to zoom horizontally on line graphs only\\n\n      dragToZoom:\'true\'\\n\n    </code>\n  </pre>', '.chart-demo { width:600px; height:400px; }', '', function(opts) {

  this.textInput = '';

  this.on('mount',function() {
      $('pre code').each(function(i, block) {
        hljs.highlightBlock(block);
      });

      riot.mount('div#first', 'rm-chart',{
          type:"line",
          options: {
              title:"Line Chart Demo",
          },
          dragToZoom:'true',
          data:[
            ['X','Dogs','Cats'],
            [0, 0, 0],    [1, 10, 5],   [2, 23, 15],  [3, 17, 9],   [4, 18, 10],  [5, 9, 5],
            [6, 11, 3],   [7, 27, 19],  [8, 33, 25],  [9, 40, 32],  [10, 32, 24], [11, 35, 27],
            [12, 30, 22], [13, 40, 32], [14, 42, 34], [15, 47, 39], [16, 44, 36], [17, 48, 40],
            [18, 52, 44], [19, 54, 46], [20, 42, 34], [21, 55, 47], [22, 56, 48], [23, 57, 49],
            [24, 60, 52], [25, 50, 42], [26, 52, 44], [27, 51, 43], [28, 49, 41], [29, 53, 45],
            [30, 55, 47], [31, 60, 52], [32, 61, 53], [33, 59, 51], [34, 62, 54], [35, 65, 57],
            [36, 62, 54], [37, 58, 50], [38, 55, 47], [39, 61, 53], [40, 64, 56], [41, 65, 57],
            [42, 63, 55], [43, 66, 58], [44, 67, 59], [45, 69, 61], [46, 69, 61], [47, 70, 62],
            [48, 72, 64], [49, 68, 60], [50, 66, 58], [51, 65, 57], [52, 67, 59], [53, 70, 62],
            [54, 71, 63], [55, 72, 64], [56, 73, 65], [57, 75, 67], [58, 70, 62], [59, 68, 60],
            [60, 64, 56], [61, 60, 52], [62, 65, 57], [63, 67, 59], [64, 68, 60], [65, 69, 61],
            [66, 70, 62], [67, 72, 64], [68, 75, 67], [69, 80, 72]
          ]
      });
      riot.mount('div#second', 'rm-chart',{
          type:"pie",
          options: {
              title:"Pie Chart",
          },
          data:[
              ['Year', 'Sales', 'Expenses'],
              ['2004',  1000,      400],
              ['2005',  1170,      460],
              ['2006',  660,       1120],
              ['2007',  1030,      540]
          ]
      });
      riot.mount('div#third', 'rm-chart',{
          type:"bar",
          options: {
              title:"Bar chart title",
          },
          data:[
              ["Element", "Density", { role: "style" } ],
              ["Copper", 8.94, "#b87333"],
              ["Silver", 10.49, "silver"],
              ["Gold", 19.30, "gold"],
              ["Platinum", 21.45, "color: #e5e4e2"]
          ]
      });
      riot.mount('div#fourth', 'rm-chart',{
          type:"area",
          options: {
              title:"Area chart",
          },
          data:[
              ['Year', 'Sales', 'Expenses'],
              ['2013',  1000,      400],
              ['2014',  1170,      460],
              ['2015',  660,       1120],
              ['2016',  1030,      540]
            ]
      });
      riot.mount('div#fifth', 'rm-chart',{
          type:"spark",
          options: {
            title:"Spark line",
          },
          data:[
             ['Revenue', 'Licenses'],
             [435, 132],
             [438, 131],
             [512, 137],
             [460, 142],
             [491, 140],
             [487, 139],
             [552, 147],
             [511, 146],
             [505, 151],
             [509, 149]
            ]
      });
  });
});

riot.tag2('page-code', '<h3>Code</h3><p>The code embedding component uses the highlightjs library for code highlighting. Just include it in your libraries and it will work.</p><hr><p> Simple javascript example </p><rm-code type="javascript" snippet="./snippets/code-ex-1.txt"></rm-code><rm-code type="html" snippet="./snippets/code-example-1.txt"></rm-code><hr><p> HTML layout </p><rm-code type="html" snippet="./snippets/code-ex-2.txt"></rm-code><rm-code type="html" snippet="./snippets/code-example-2.txt"></rm-code><hr><p> Bash code </p><rm-code type="bash" snippet="./snippets/code-ex-3.txt"></rm-code><rm-code type="html" snippet="./snippets/code-example-3.txt"></rm-code><hr><h5>ATTRIBUTES</h5><h5 class="attribute">snippet</h5><p>The URL to request the snippet of code to display.</p><h5 class="attribute">type</h5><p>Type of code to highlight with highlightjs</p>', '', '', function(opts) {
});
riot.tag2('page-contribute', '<h3>Want to contribute?</h3><p>Fork our repository and submit a pull request, you can find it <a href="https://github.com/HoldMyTicket/RiotMode">here</a>', '', '', function(opts) {
});
riot.tag2('page-datepicker', '<h3>Datepicker</h3><div class="datepicker-demo"><rm-datepicker></rm-datepicker></div><rm-code type="html" snippet="./snippets/datepicker-example-1.txt"></rm-code><hr><h5>ATTRIBUTES</h5><h5 class="attribute">name</h5><p>Name of the select menu <span class="required">required</span></p><h5 class="attribute">format</h5><p>Date format that is selected, using moment date formatting. Defaults to MMM Do YYYY</p><h5 class="attribute">value</h5><p>The selected value of the attribute</p><hr>', '.datepicker-demo { display:inline-block; width:200px; margin:30px; }', '', function(opts) {

  this.textInput = '';

  this.on('mount',function() {
    $('pre code').each(function(i, block) {
      hljs.highlightBlock(block);
    });
    riot.mount('rm-datepicker');
  });
});

riot.tag2('page-google-map', '<h3>Google Map</h3><div class="google-map-demo"><rm-google-map></rm-google-map></div><br><rm-code snippet="./snippets/google-map-example-1.txt" type="html"></rm-code>', 'page-google-map .google-map-demo,[riot-tag="page-google-map"] .google-map-demo,[data-is="page-google-map"] .google-map-demo{ display:block; width:700px; height:500px; }', '', function(opts) {


  this.on('mount',function() {
    riot.mount('rm-google-map', {
      zoom: 5,
      center: { lat: 35.1107, lng: -106.6100},
      zoomControl: false,
      mapType: 'terrain',
      icon: '/tags/rm-google-map/demo/star.png',
      markers: [
          ['Place 1', 29.1107, -108.6100, 4],
          ['Place 2', 32.1107, -106.6100, 5],
          ['Place 3', 35.11079, -116.6100, 3],
          ['Place 4', 35.1107, -101.6100, 2],
          ['Place 5', 35.1107, -106.6100, 1]
      ],
      address: ['120 Central Ave SW, Albuquerque, NM 87102','6200 Montano Plaza Driver, Albuquerque, NM 87120'],
    });
  });
});

riot.tag2('page-home', '<h3>What is RiotMode?</h3><p> RiotMode is a simple group of components built for Riot.js. They are a work in progress, but feel free to submit pull requests..... </p><h5>Why?</h5><p> Why not? We like Riot and thought it would be nice for a simple component library for others too. </p><rm-code type="html" nofilter="true" snippet="./snippets/home.txt"></rm-code>', '', '', function(opts) {
});

riot.tag2('page-install', '<h3>Install</h3><p>You will need to include the RiotMode library and Riot into your project.</p><rm-code type="bash" snippet="./snippets/install-bower.txt"></rm-code><p>Embed the libraries</p><rm-code type="html" snippet="./snippets/install-embed.txt"></rm-code><p>Now you can mount the component in your views.</p><rm-code type="html" snippet="./snippets/install-mount.txt"></rm-code>', '.option { margin:0; margin-top:20px; color: #6ab344; } pre { margin: 0; }', '', function(opts) {
});
riot.tag2('page-markdown', '<h3>Markdown</h3><p>Here is some markdown rendered with our tag.</p><div id="markdown"></div><rm-code snippet="./snippets/markdown-example.txt" type="html"></rm-code><rm-code snippet="./snippets/markdown-sample.md" type="markdown"></rm-code>', '', '', function(opts) {

  var me = this;

  this.on('mount',function() {

    $.ajax('./snippets/markdown-sample.md', {
      success: function(markdown){
        riot.mount('#markdown', 'rm-markdown', {content: markdown})
      }
    })

  });

});
riot.tag2('page-modal', '<h3>Modal</h3><rm-modal open-btn-text="Open Modal" open-btn-class="mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect mdl-button--accent"><h4>Are you sure you want to?</h4><p>Maecenas at interdum sem. Suspendisse potenti. Vestibulum ac nisi sit amet erat molestie tristique. Nullam dignissim condimentum odio vitae congue.</p><button onclick="{this.parent.customcallback}" class="mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect mdl-button--accent affirmative-btn">Yes!</button></rm-modal><br><br><rm-code snippet="./snippets/modal-example-1.txt"></rm-code><hr><rm-modal open-btn-text="Open Modal 2" open-btn-class="mdl-button mdl-js-button mdl-js-ripple-effect"><h4>Are you sure you want to?</h4><p>Maecenas at interdum sem. Suspendisse potenti. Vestibulum ac nisi sit amet erat molestie tristique. Nullam dignissim condimentum odio vitae congue.</p><p>Maecenas at interdum sem. Suspendisse potenti. Vestibulum ac nisi sit amet erat molestie tristique. Nullam dignissim condimentum odio vitae congue.</p><button onclick="{this.parent.customcallback2}" class="mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect mdl-button--accent affirmative-btn">Yes!</button></rm-modal><rm-code snippet="./snippets/modal-example-2.txt"></rm-code><br><rm-modal open-btn-text="Open Modal 3" open-btn-class="mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect mdl-button--accent"><h4>Hells no I dont want to!</h4><p>Maecenas at interdum sem. Suspendisse potenti. Vestibulum ac nisi sit amet erat molestie tristique. Nullam dignissim condimentum odio vitae congue.</p><p>Maecenas at interdum sem. Suspendisse potenti. Vestibulum ac nisi sit amet erat molestie tristique. Nullam dignissim condimentum odio vitae congue.</p><button onclick="{this.parent.customcallback3}" class="mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect mdl-button--accent affirmative-btn">Yes!</button></rm-modal><br><br><rm-code snippet="./snippets/modal-example-3.txt"></rm-code><hr><rm-modal open-btn-text="Open Modal 4" open-btn-class="mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect mdl-button--accent"><h4>Hells no I dont want to!</h4><p>Maecenas at interdum sem. Suspendisse potenti. Vestibulum ac nisi sit amet erat molestie tristique. Nullam dignissim condimentum odio vitae congue.</p><p>Maecenas at interdum sem. Suspendisse potenti. Vestibulum ac nisi sit amet erat molestie tristique. Nullam dignissim condimentum odio vitae congue.</p></rm-modal><br><br><rm-code snippet="./snippets/modal-example-4.txt"></rm-code><hr><rm-modal open-btn-text="HAVE A PROMO CODE?" open-btn-class="btn btn-sm btn-outline btn-noline btn-black btn-round" open-btn-icon="fi fi-price-tag" id="promo_code_modal" class="promo-code-modal"><h1>Promo Code</h1><input id="promo_code_input" class="width-50" type="text" name="promo_code" placeholder="Enter your promo code..."><button id="submit_promo_code_btn" onclick="{submit_promo}" class="btn btn-red btn-outline btn-smaller">SUBMIT</button><div class="error_msg"><div hide="{show_error}"><p class="fine">Enter <strong>Coupon Codes</strong> at the end of checkout (not here)</p></div><div show="{show_error}"><p class="fine">{error_msg}</p></div></div><div class="error" id="promo_code_response_area"></div></rm-modal><br><br><rm-code snippet="./snippets/modal-example-5.txt"></rm-code><hr><rm-modal id="noButtonModal"><h4>Hells no I dont want to!</h4><p>Maecenas at interdum sem. Suspendisse potenti. Vestibulum ac nisi sit amet erat molestie tristique. Nullam dignissim condimentum odio vitae congue.</p><p>Maecenas at interdum sem. Suspendisse potenti. Vestibulum ac nisi sit amet erat molestie tristique. Nullam dignissim condimentum odio vitae congue.</p></rm-modal><br><a href="javascript:void(0)" onclick="{noButtonModalLoad}">OPEN MODAL WITHOUT BUTTON</a><br><rm-code snippet="./snippets/modal-example-6.txt"></rm-code><hr><h5>ATTRIBUTES</h5><h5 class="attribute">open-btn-text</h5><p>The text to be displayed in the modal button</p><h5 class="attribute">open-btn-class</h5><p>The class to used on the modal button</p><h5 class="attribute">open-btn-icon</h5><p>The icon to be used in the modal button</p><hr><h5>EVENTS</h5><h5 class="attribute">toggle</h5><p>When your toggle switch was manually toggled this will be fired</p>', 'page-modal h6,[riot-tag="page-modal"] h6,[data-is="page-modal"] h6{ font-family: monaco; font-size: 13px; color: rgb(255, 66, 81); }', '', function(opts) {


	  var me = this;

	  this.on('mount',function(){

	  });

      this.customcallback = function(e) {
          alert('custom callback');
      }.bind(this)

      this.customcallback2 = function(e) {
          alert('custom callback two');
      }.bind(this)

      this.customcallback3 = function(e) {
          alert('custom callback three');
      }.bind(this)

      this.confirmBtn = function(e) {
          alert('confirm');
      }.bind(this)

      this.cancelBtn = function(e) {
          alert('cancel');
      }.bind(this)

      this.noButtonModalLoad = function(e){
          console.log(me.noButtonModal._tag);
          me.noButtonModal._tag.openModal()
      }.bind(this)

});
riot.tag2('page-table', '<h3>Tables</h3><h4>Default Table</h4><rm-table class="styled-table"></rm-table><rm-code snippet="./snippets/table-example-1.txt" type="html"></rm-code><h4>Striped Table</h4><rm-table class="styled-table" type="awesometable-striped"></rm-table><rm-code snippet="./snippets/table-example-2.txt" type="html"></rm-code><h4>Condensed Table</h4><rm-table class="styled-table" type="awesometable-condensed"></rm-table><rm-code snippet="./snippets/table-example-3.txt" type="html"></rm-code><h4>Bordered Table</h4><rm-table class="styled-table" type="awesometable-bordered"></rm-table><rm-code snippet="./snippets/table-example-4.txt" type="html"></rm-code><h4>Hover/Condensed Table</h4><rm-table class="styled-table" type="awesometable-hover awesometable-condensed"></rm-table><rm-code snippet="./snippets/table-example-5.txt" type="html"></rm-code><h4>Calculated Table</h4><rm-table class="calculated-table"></rm-table><rm-code snippet="./snippets/table-example-6.txt" type="html"></rm-code><h4>Averaged Table</h4><rm-table class="averaged-table"></rm-table><rm-code snippet="./snippets/table-example-7.txt" type="html"></rm-code><h4>Sorted Table</h4><rm-table class="sorted-table"></rm-table><rm-code snippet="./snippets/table-example-8.txt" type="html"></rm-code>', '', '', function(opts) {

    this.on('mount', function() {

      riot.mount('rm-table.styled-table', {
          tableHeaders: ['Name', 'Age', 'Gender', 'Occupation', 'Favorite Color'],
          tableContent: [
              ['James Bond', '80', 'M', 'Confidential', 'Blue'],
              ['Bruce Wayne', '40', 'M', 'Billionare', 'Black'],
              ['Batman', 'Unknown', 'Unknown', 'Unknown', 'Black'],
          ]
      });

      riot.mount('rm-table.calculated-table', {
          tableHeaders: ['Date', 'Tickets', 'Cash', 'Credit', 'Check'],
          tableContent: [
              ['4/14/2015', '12', '$25.12', '$42', '$0'],
              ['4/13/2015', '10', '$22.15', '$42', '$0'],
              ['4/12/2015', '8', '$20.50', '$42', '$0']
          ],
          tableFooter: ['Total', '{{total1}}', '{{total2}}', '{{total3}}', '{{total4}}']
      });

      riot.mount('rm-table.averaged-table', {
          tableHeaders: ['Date', 'Tickets', 'Cash', 'Credit', 'Check'],
          tableContent: [
              ['4/14/2015', '8', '$22.12', '$42', '$0'],
              ['4/13/2015', '4', '$25.15', '$22', '$0'],
              ['4/12/2015', '5', '$22.12', '$42', '$0']
          ],
          tableFooter: ['Average', '{{average1}}', '{{average2}}', '{{average3}}', '{{average4}}']
      });

      riot.mount('rm-table.sorted-table', {
          sortTable: true,
          tableHeaders: ['Date', 'Name', 'Tickets', 'Cash', 'Credit', 'Check'],
          tableContent: [
              ['4/14/2015', 'James Bond', '8', '$25.12', '$42', '$0'],
              ['4/13/2015', 'Bruce Wayne', '5', '$22.15', '$22', '$0'],
              ['4/12/2015', 'Batman', '4', '$20.50', '$42', '$0']
          ]
      });

    });
});
riot.tag2('page-text-field', '<h3>Text Field</h3><div><div><p>Text</p><rm-text-field name="text" width="150px"></rm-text-field><rm-code snippet="./snippets/text-field-example-1.txt"></rm-code></div><div><p>Numeric</p><rm-text-field name="number" placeholder="Number..." type="numeric"></rm-text-field><rm-code snippet="./snippets/text-field-example-2.txt"></rm-code></div><div><p>Floating Label</p><rm-text-field name="floating" floating="true"></rm-text-field><rm-code snippet="./snippets/text-field-example-3.txt"></rm-code></div><div><p>Regex Email</p><rm-text-field name="email" type="email"></rm-text-field><rm-code snippet="./snippets/text-field-example-4.txt"></rm-code></div><div><p>Expanding</p><rm-text-field name="expanding" width="200px" placeholder="Number..." type="expanding"></rm-text-field><rm-code snippet="./snippets/text-field-example-5.txt"></rm-code></div><div class="item"><p>Text Area</p><rm-text-field name="text-area" type="multiple" width="300px" rows="3"></rm-text-field><rm-code snippet="./snippets/text-field-example-6.txt"></rm-code></div></div><h5>ATTRIBUTES</h5><h5 class="attribute">name</h5><p>Name of the text field <span class="required">required</span></p><h5 class="attribute">width</h5><p>The width of the text field</p><h5 class="attribute">placeholder</h5><p>Placeholder of the text field</p><h5 class="attribute">type</h5><p>The type of the text field (text|numeric|email|expanding|multiple)</p><h5 class="attribute">rows</h5><p>The height of the textarea if type is multiple</p>', '.item { display:inline-block; margin:10px; }', '', function(opts) {
});


riot.tag2('page-toast', '<h3>TOASTS</h3><rm-toast duration="2000" id="sendEmailToast" position="top-right"></rm-toast><button onclick="{sendEmail}" class="mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect mdl-button--accent">Send Email</button><br><br><rm-code snippet="./snippets/toast-example-1.txt"></rm-code><hr><rm-toast id="createDocumentToast" position="bottom-right" duration="3000" text="Successfully created! You can view the document <a target=\'_blank\' href=\'http://google.com\'>here</a>."></rm-toast><button onclick="{createDocument}" class="mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect mdl-button--accent">Create Document</button><br><br><rm-code snippet="./snippets/toast-example-2.txt"></rm-code><hr><h5>ATTRIBUTES</h5><h5 class="attribute">duration</h5><p>Give your toast a duration to be displayed</p><h5 class="attribute">position</h5><p>The position that the toast will be displayed</p><ul><li>top-left</li><li>top-right</li><li>bottom-left</li><li>bottom-right</li></ul>', '', '', function(opts) {

  var me = this;

  this.createDocument = function(e) {
    me.createDocumentToast._tag.showToast();
  }.bind(this)

  this.sendEmail = function(e) {
    setTimeout(function() {
      me.sendEmailToast._tag.opts.text = 'Email Successfully Sent!';
      me.sendEmailToast._tag.showToast();
    }, 500);
  }.bind(this)

});
riot.tag2('page-toggle', '<h3>Toggle</h3><h5>Checkbox Toggles</h5><rm-toggle type="checkbox" label-text="Checkbox Off" ontoggle="{myToggle}"></rm-toggle><br><br><rm-code snippet="./snippets/toggle-example-1.txt"></rm-code><hr><rm-toggle type="checkbox" label-text="Checkbox On" ontoggle="{myToggle}" ischecked="{on_switch}"></rm-toggle><br><br><rm-code snippet="./snippets/toggle-example-2.txt"></rm-code><hr><br><h5>Radio Toggles</h5><rm-toggle type="radio" name="group1" label-text="Radio 1" ontoggle="{myToggle}"></rm-toggle><rm-toggle type="radio" name="group1" label-text="Radio 2" ontoggle="{myToggle}"></rm-toggle><rm-toggle type="radio" name="group1" label-text="Radio 3" ontoggle="{myToggle}"></rm-toggle><br><br><rm-code snippet="./snippets/toggle-example-3.txt"></rm-code><hr><h5>Toggle Switches</h5><p> Several states with delays </p><rm-toggle type="switch" label-text="No State" ontoggle="{myToggle}"></rm-toggle><rm-toggle type="switch" label-text="Off State" ontoggle="{myToggle}" ischecked="{off_switch}"></rm-toggle><rm-toggle type="switch" label-text="On State" ontoggle="{myToggle}" ischecked="true"></rm-toggle><br><br><rm-code snippet="./snippets/toggle-example-4.txt"></rm-code><hr><h5>Delayed Toggle Switches</h5><rm-toggle id="delayed_on_switch" type="switch" label-text="Delayed On" ontoggle="{myToggle}" ischecked="{delayed_on_switch}"></rm-toggle><rm-toggle id="delayed_off_switch" type="switch" label-text="Delayed Off" ontoggle="{myToggle}" ischecked="{delayed_off_switch}"></rm-toggle><br><br><rm-code snippet="./snippets/toggle-example-5.txt"></rm-code><hr><h5>ATTRIBUTES</h5><h5 class="attribute">type</h5><ul><li>checkbox - Standard checkbox toggle switch</li><li>radio - Radio group toggles</li><li>switch - Toggle switch, on or off</li></ul><h5 class="attribute">toggle-icon</h5><p>An icon that can be toggled on and off</p><h5 class="attribute">label-text</h5><p>Give your toggle a label description</p><h5 class="attribute">ischecked</h5><p>Setup your state of your toggle on mount</p><hr><h5>EVENTS</h5><h5 class="attribute">toggle</h5><p>When your toggle switch was manually toggled this will be fired</p>', 'page-toggle .hidden-message,[riot-tag="page-toggle"] .hidden-message,[data-is="page-toggle"] .hidden-message{ color: red; } page-toggle h6,[riot-tag="page-toggle"] h6,[data-is="page-toggle"] h6{ font-family: monaco; font-size: 13px; color: rgb(255, 66, 81); }', '', function(opts) {

		var me = this;

		this.show = false;

		this.off_switch = false;
		this.on_switch = true;
		this.delayed_check = false;

    this.delayed_on_switch = false;
    this.delayed_off_switch = true;

		this.on('mount',function(){
			setTimeout(function(){
				me.delayed_on_switch = true;
				me.delayed_off_switch = false;
				me.update()
			},2000);
		})

		this.myToggle = function(e) {
			me.update();
		}.bind(this)

});
