<rm-router>

	<div style="display:none;" id="options">
		<yield/>
	</div>
	<div id="base"></div>
	/**
	* Router component for RiotJS v2.2
	*
	* @author evan-f
	*/

	var me = this;
	this.routes = opts.routes || false;
	this.mountedTag = false;
	this.mixin(RMeventMixin);

	this.on('mount', function() {
		me.initialize();

		riot.route.parser(function(path) {
			return me.parseUrl(path);
		});
		riot.route.start();
		riot.route.exec(function(url) {
			me.load(url || me.parseUrl('/'));
		});
		riot.route(function(url) {
			me.load(url);
		});
	});

	this.on('unmount', function() {
		riot.route.stop();
	});

	initialize() {
		if(me.options.innerHTML.trim() != '') {
			var sections = me.options.querySelectorAll('section');
			var routes = [];
			for (i = 0; i < sections.length; ++i) {
  				var route = sections[i].getAttribute('route');
				var path = sections[i].getAttribute('src');

				if(!path || !route) {

				}
				routes.push({'route':route, 'path':path});
			}
			me.routes = routes;
		} else {
			console.log("RiotMode: rm-router has no options!");
		}
	}

	parseUrl(path, mode) {
		//TODO look through this

		//Just hash by default, may update for pushstate
		mode = 'hash';
		var url = {
		    isHashPath: mode === 'hash'
		};

		if (typeof URL === 'function') {
		    // browsers that support `new URL()`
		    var nativeUrl = new URL(location);
		    url.path = nativeUrl.pathname;
		    url.hash = nativeUrl.hash;
		    url.search = nativeUrl.search;
		} else {
		    // IE
		    var anchor = document.createElement('a');
		    anchor.href = location;
		    url.path = anchor.pathname;
		    if (url.path.charAt(0) !== '/') {
		        url.path = '/' + url.path;
		    }
		    url.hash = anchor.hash;
		    url.search = anchor.search;
		}

		if (mode !== 'pushstate') {
		    // auto or hash

		    // check for a hash path
		    if (url.hash.substring(0, 2) === '#/') {
		        // hash path
		        url.isHashPath = true;
		        url.path = url.hash.substring(1);
		    } else if (url.hash.substring(0, 3) === '#!/') {
		        // hashbang path
		        url.isHashPath = true;
		        url.path = url.hash.substring(2);
		    } else if (url.isHashPath) {
		        // still use the hash if mode="hash"
		        if (url.hash.length === 0) {
		            url.path = '/';
		        } else {
		            url.path = url.hash.substring(1);
		        }
		    }

		    if (url.isHashPath) {
		        url.hash = '';

		        // hash paths might have an additional hash in the hash path for scrolling to a specific part of the page #/hash/path#elementId
		        var secondHashIndex = url.path.indexOf('#');
		        if (secondHashIndex !== -1) {
		            url.hash = url.path.substring(secondHashIndex);
		            url.path = url.path.substring(0, secondHashIndex);
		        }

		        // hash paths get the search from the hash if it exists
		        var searchIndex = url.path.indexOf('?');
		        if (searchIndex !== -1) {
		            url.search = url.path.substring(searchIndex);
		            url.path = url.path.substring(0, searchIndex);
		        }
		    }
		}

		return url;
	}

	load(url) {
		
		var found = false;
		for (i = 0; i < me.routes.length; ++i) {
			found = me.compare(url.path, me.routes[i].route);
			if(found) {
			    if(me.mountedTag)
			    	me.mountedTag.unmount(true);

				
			    riot.compile(me.routes[i].path, function() {
			    	me.fire('load');
					var fileName = me.routes[i].path.split('/').pop().replace(/\.[^/.]+$/, "");
			    	me.mountedTag = riot.mount(me.base, 'page-'+fileName)[0];
				return;
			}
		}
	}

	compare(base, match) {
		if(base === match) {
			return true;
		}
		return false;
	}

	error() {
		//Something bad happened
	}

</rm-router>
