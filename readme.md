# header-replacer

Plugin for url-replace, that performs user defined replaces in request or response headers.

TODO document config

	"header-replacer" : [{
		"urlPattern": ".*",
		"request" : false,
		"response" : true,
		"header" : "Set-Cookie",
		"pattern": "mycookie",
		"replacement": "newcookie"
	}],
