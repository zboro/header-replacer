module.exports = function(config, req, res) {
	var replaces = config["header-replacer"];
	(replaces || []).forEach(function(replace) {
		if (new RegExp(replace.urlPattern).test(req.url)) {
			if (replace.request) {
				req.headers[replace.header] = req.headers[replace.header].replace(new RegExp(replace.pattern), replace.replacement);
			}
			var oldwriteHead = res.writeHead;
			res.writeHead = function() {
				var header = this.getHeader(replace.header);
				header = header ? header[0] : "";
				this.setHeader(replace.header, header.replace(new RegExp(replace.pattern), replace.replacement));
				oldwriteHead.apply(this, arguments);
			};

		}
	});
};
