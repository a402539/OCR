(function() {
	var scripts = deps;

	function getSrcUrl() {
		var scripts = document.getElementsByTagName('script');
		for (var i = 0; i < scripts.length; i++) {
			var src = scripts[i].src;
			if (src) {
				var res = src.match(/^(.*)textExtract-src\.js$/);
				if (res) {
					return res[1] + '../src/';
				}
			}
		}
	}

	var path = getSrcUrl();
    for (var i = 0; i < deps.length; i++) {
		document.writeln("<script src='" + path + deps[i] + "'></script>");
	}
})();