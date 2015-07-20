<rm-router>

	<div id="base">

	</div>

	/**
	* Router component for RiotJS v2.2
	*
	* @author evan-f
	*/
	var mountedTag = false;
	riot.route.exec(function(route) {
	  handleRoute(route || 'home');
	})
	riot.route(function(route) {
	  handleRoute(route);
	})

	function handleRoute(route) {
	    var page = 'page-'+route;
	    if(mountedTag)
	      mountedTag.unmount(true);
	    riot.compile('pages/' + page + '.html', function() {
	      mountedTag = riot.mount('#pagewrap', page)[0];
	      $('#pagewrap').attr('riot-tag',page);
	    });
	}

</rm-router>
