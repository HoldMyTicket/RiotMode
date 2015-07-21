<rm-google-map>

	<style scoped>
		.rg-google-map {
			margin: 0;
			padding: 0;
			width: 100%;
			height: 100%;
		}
		.rg-google-map img {
			max-width: inherit;
		}
	</style>

	<div class="rm-google-map"></div>

	<script>
		var RMGM = riot.observable();
		RMGM.initialize = function() {
			_RMGM.trigger('buildMap')
		}
	</script>

	var me = this;

	this.mapOptions = opts.map ||  {
		center: { lat: 53.806, lng: -1.535 },
		zoom: 5
	};;
	this.on('mount',function() {
		me.loadScript();
		console.log(window);
	});

	// _RMGM.on('buildMap', function () {
	// 	console.log("build");
	// 	var map = new google.maps.Map(me.root.querySelector('.rm-google-map'), me.mapOptions);
	// });

	loadScript() {
		console.log('load');
		if (!document.getElementById('gmap_script')) {
			var script = document.createElement('script');
			script.setAttribute('id', 'gmap_script');
			script.type = 'text/javascript';
			script.src = 'https://maps.googleapis.com/maps/api/js?sensor=false&callback=RMGM.initialize';
			document.body.appendChild(script);
		}
	}

</rm-google-map>
