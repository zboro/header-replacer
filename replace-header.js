module.exports = function(config, req, res) {
	var replaces = config["header-replacer"];
	(replaces || []).forEach(function(replace) {
		if (new RegExp(replace.urlPattern).test(req.url)) {
			if (replace.request) {
				req.headers[replace.header] = req.headers[replace.header].replace(new RegExp(replace.pattern), replace.replacement);
			}
			var oldwriteHead = res.writeHead;
			res.writeHead = function() {
				var headers = this.getHeader(replace.header);
				if (typeof headers == "string") {
					headers = [
						headers
					];
				}
				this.setHeader(replace.header, (headers || []).map(function(header) {
					return header.replace(new RegExp(replace.pattern), replace.replacement);
				}));
				oldwriteHead.apply(this, arguments);
			};

		}
	});
};
