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

	this.mapOptions = opts.map ||  {
		center: { lat: 53.806, lng: -1.535 },
		zoom: 5
	};;
	this.on('mount',function() {
		window.RiotModeMap = function() {
			var map = new google.maps.Map(me.root.querySelector('.rm-google-map'), me.mapOptions);
		}
		me.loadScript();
	});

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
