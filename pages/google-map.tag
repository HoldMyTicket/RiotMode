<page-google-map>
  <style>
  .google-map-demo {
      display:inline-block;
      width:700px;
      height:500px;
      margin:30px;
  }
  </style>

  <h5>Google Map</h5>
  
  <div class="google-map-demo">
      <rm-google-map> </rm-google-map>
  </div>
  
  <p>Options</p>
 
  <pre>
    <code class="json">
        Will fill in soon
    </code>
  </pre>
  
  this.on('mount',function() {
      $('pre code').each(function(i, block) {
        hljs.highlightBlock(block);
      });    
      riot.mount('rm-google-map', {
          zoom: 5,
          center: { lat: 35.1107, lng: -106.6100},    
          zoomControl: false,
          mapType: 'terrain', //roadmap satellite hybrid terrain
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
</page-google-map>
