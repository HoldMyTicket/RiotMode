<page-chart>
  <style>
  .chart-demo {
      width:600px;
      height:400px;
  }
  </style>

  <h5>Charts</h5>
  
  <div class="chart-demo" id="first"></div>
  <div class="chart-demo" id="second"></div>
  <div class="chart-demo" id="third"></div>
  
  
  <p>Options</p>
 
  <pre>
      //Title of the chartn
      Title:'Chart' \n
      \n
      //Type of graph, line | bar | pie\n
      type:'line'\n
      \n
      //Data for chart\n
      data:[]\n
      \n
      //Drag to zoom horizontally on line graphs only\n
      dragToZoom:'true'\n
  </pre>

  this.textInput = '';
  
  this.on('mount',function() {
      riot.mount('div#first', 'rm-chart',{
          title:"Line Chart Demo",
          type:"line",
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
          title:"Pie Chart",
          type:"pie",
          data:[
              ['Year', 'Sales', 'Expenses'],
              ['2004',  1000,      400],
              ['2005',  1170,      460],
              ['2006',  660,       1120],
              ['2007',  1030,      540]
          ]
      });
      riot.mount('div#third', 'rm-chart',{
          title:"Bar chart title",
          type:"bar",
          data:[
              ["Element", "Density", { role: "style" } ],
              ["Copper", 8.94, "#b87333"],
              ["Silver", 10.49, "silver"],
              ["Gold", 19.30, "gold"],
              ["Platinum", 21.45, "color: #e5e4e2"]
          ]
      });
  });
</page-chart>
