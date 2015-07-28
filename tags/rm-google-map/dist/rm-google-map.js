riot.tag('rm-google-map', '<div class="wrapper"> <div if="{ infoWindow }" class="infoWindow"> <div class="card"> <div class="description"> <p class="title">Sunshine Theater</p> <span class="address">120 Central Ave SW, Albuquerque, NM 87102</span> </div> </div> </div> <div class="rm-google-map"></div> </div>', 'rm-google-map .wrapper, [riot-tag="rm-google-map"] .wrapper{ position:relative; height:100%; width:100%; } rm-google-map .infoWindow, [riot-tag="rm-google-map"] .infoWindow{ position:absolute; top:0px; left:0px; width:auto; height:auto; margin: 10px; padding: 1px; -webkit-box-shadow: rgba(0, 0, 0, 0.298039) 0px 1px 4px -1px; box-shadow: rgba(0, 0, 0, 0.298039) 0px 1px 4px -1px; border-radius: 2px; background-color: white; z-index:10; } rm-google-map .card, [riot-tag="rm-google-map"] .card{padding: 9px 4px 9px 11px;} rm-google-map .description, [riot-tag="rm-google-map"] .description{ width: 200px; display: inline-block; color: #5B5B5B; } rm-google-map .description .title, [riot-tag="rm-google-map"] .description .title{ overflow: hidden; white-space: nowrap; text-overflow: ellipsis; font-weight: 500; font-size: 14px; color: black; margin:0; } rm-google-map .description .address, [riot-tag="rm-google-map"] .description .address{ margin-top: 6px; font-size: 12px; } rm-google-map .rm-google-map, [riot-tag="rm-google-map"] .rm-google-map{ margin: 0; padding: 0; width: 100%; height: 100%; } rm-google-map .rm-google-map img, [riot-tag="rm-google-map"] .rm-google-map img{ max-width: inherit; }', function(opts) {

	var me = this;

	
	this.on('mount',function() {
		window.RiotModeMap = function() {
			me.buildMap();
		}
		me.loadScript();
	});

	this.buildMap = function() {
		me.buildOpts();
		var map = new google.maps.Map(me.root.querySelector('.rm-google-map'), me.mapOptions);
		
		if(opts.address) {
			
			var geocoder = new google.maps.Geocoder();
			
			if(Array.isArray(opts.address)) {
				opts.address.forEach(function(item) {
					me.address(map,geocoder,item);
				});
			} else {
				me.address(map,geocoder,opts,address);
			}






		}
		
		if(opts.markers.length > 0) {
			for (var i = 0; i < opts.markers.length; i++) {
				var location = opts.markers[i];
			    var myLatLng = new google.maps.LatLng(location[1], location[2]);
			    var marker = new google.maps.Marker({
			        position: myLatLng,
			        map: map,
			        icon: opts.icon || '',
			        title: location[0] || '',
			        zIndex: location[3] || 1
			    });
			}
		}
	}.bind(this);
	
	this.address = function(map, geo, location) {
		geo.geocode({ 'address': location }, function(results, status) {
			if (status == google.maps.GeocoderStatus.OK) {
				map.setCenter(results[0].geometry.location);
				var marker = new google.maps.Marker({
					map: map,
					position: results[0].geometry.location,
					icon: opts.icon || '',
					animation: google.maps.Animation.DROP
				});
			}
		});
	}.bind(this);
	
	this.buildOpts = function() {
		me.mapOptions = {
			center: opts.center || { lat: 35.1107, lng: -106.6100 },
			zoom: opts.zoom || 5,
			zoomControl: opts.zoomControl || false,
			panControl: false,
    		scaleControl: true,
			mapTypeId: google.maps.MapTypeId[opts.mapType.toUpperCase()] || google.maps.MapTypeId.ROADMAP,
		};
	}.bind(this);

	this.loadScript = function() {
		if (!document.getElementById('gmap_script')) {
			var script = document.createElement('script');
			script.setAttribute('id', 'gmap_script');
			script.type = 'text/javascript';
			script.src = 'https://maps.googleapis.com/maps/api/js?sensor=false&callback=window.RiotModeMap';
			document.body.appendChild(script);
		} else {
			me.buildMap();
		}
	}.bind(this);


});
