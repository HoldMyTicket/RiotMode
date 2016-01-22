riot.tag2('rm-router', '<div style="display:none;" id="options"> <yield></yield> </div> <div id="base"></div>', '', '', function(opts) {


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

	this.initialize = function() {
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
	}.bind(this)

	this.parseUrl = function(path, mode) {

		mode = 'hash';
		var url = {
		    isHashPath: mode === 'hash'
		};

		if (typeof URL === 'function') {

		    var nativeUrl = new URL(location);
		    url.path = nativeUrl.pathname;
		    url.hash = nativeUrl.hash;
		    url.search = nativeUrl.search;
		} else {

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

		    if (url.hash.substring(0, 2) === '#/') {

		        url.isHashPath = true;
		        url.path = url.hash.substring(1);
		    } else if (url.hash.substring(0, 3) === '#!/') {

		        url.isHashPath = true;
		        url.path = url.hash.substring(2);
		    } else if (url.isHashPath) {

		        if (url.hash.length === 0) {
		            url.path = '/';
		        } else {
		            url.path = url.hash.substring(1);
		        }
		    }

		    if (url.isHashPath) {
		        url.hash = '';

		        var secondHashIndex = url.path.indexOf('#');
		        if (secondHashIndex !== -1) {
		            url.hash = url.path.substring(secondHashIndex);
		            url.path = url.path.substring(0, secondHashIndex);
		        }

		        var searchIndex = url.path.indexOf('?');
		        if (searchIndex !== -1) {
		            url.search = url.path.substring(searchIndex);
		            url.path = url.path.substring(0, searchIndex);
		        }
		    }
		}

		return url;
	}.bind(this)

	this.load = function(url) {

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

			    });
				return;
			}
		}
	}.bind(this)

	this.compare = function(base, match) {
		if(base === match) {
			return true;
		}
		return false;
	}.bind(this)

	this.error = function() {

	}.bind(this)

});
