<page-table>
    <style>
    </style>
    
    <h3>Tables</h3>
    
    <h4>Default Table</h4>
    <rm-table class="styled-table"></rm-table>
    
    <rm-code snippet="./snippets/table-example-1.txt" type="html"></rm-code>
    
    <h4>Striped Table</h4>
    <rm-table class="styled-table" type="awesometable-striped"></rm-table>
    
    <rm-code snippet="./snippets/table-example-2.txt" type="html"></rm-code>
    
    <h4>Condensed Table</h4>
    <rm-table class="styled-table" type="awesometable-condensed"></rm-table>
    
    <rm-code snippet="./snippets/table-example-3.txt" type="html"></rm-code>
    
    <h4>Bordered Table</h4>
    <rm-table class="styled-table" type="awesometable-bordered"></rm-table>
    
    <rm-code snippet="./snippets/table-example-4.txt" type="html"></rm-code>
    
    <h4>Hover/Condensed Table</h4>
    <rm-table class="styled-table" type="awesometable-hover awesometable-condensed"></rm-table>
    
    <rm-code snippet="./snippets/table-example-5.txt" type="html"></rm-code>
    
    <h4>Calculated Table</h4>
    <rm-table class="calculated-table"></rm-table>
    
    <rm-code snippet="./snippets/table-example-6.txt" type="html"></rm-code>
    
    <h4>Averaged Table</h4>
    <rm-table class="averaged-table"></rm-table>

    <rm-code snippet="./snippets/table-example-7.txt" type="html"></rm-code>
    
    <h4>Sorted Table</h4>
    <rm-table class="sorted-table"></rm-table>

    <rm-code snippet="./snippets/table-example-8.txt" type="html"></rm-code>
    
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
</page-table>