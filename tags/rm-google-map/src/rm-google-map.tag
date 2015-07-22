<rm-google-map>

	<style scoped>
		.rm-google-map {
			margin: 0;
			padding: 0;
			width: 100%;
			height: 100%;
		}
		.rm-google-map img {
			max-width: inherit;
		}
	</style>

	<div class="rm-google-map"></div>

	var me = this;
	
	this.on('mount',function() {
		window.RiotModeMap = function() {
			me.buildMap();
		}
		me.loadScript();
	});

	buildMap() {
		me.buildOpts();
		var map = new google.maps.Map(me.root.querySelector('.rm-google-map'), me.mapOptions);
		
		if(opts.address) {
			var geocoder = new google.maps.Geocoder();
			geocoder.geocode({ 'address': opts.address }, function(results, status) {
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
			
			//TODO address window
			// var infoWindow = new google.maps.InfoWindow({
	        // 	content: opts.address,
	        // });
			// 
			// infoWindow.open(map);
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
	}
	
	buildOpts() {
		me.mapOptions = {
			center: opts.center || { lat: 35.1107, lng: -106.6100 },
			zoom: opts.zoom || 5,
			zoomControl: opts.zoomControl || true,
			mapTypeId: google.maps.MapTypeId[opts.mapType.toUpperCase()] || google.maps.MapTypeId.ROADMAP,
		};
	}

	loadScript() {
		if (!document.getElementById('gmap_script')) {
			var script = document.createElement('script');
			script.setAttribute('id', 'gmap_script');
			script.type = 'text/javascript';
			script.src = 'https://maps.googleapis.com/maps/api/js?sensor=false&callback=window.RiotModeMap';
			document.body.appendChild(script);
		}
	}

</rm-google-map>
