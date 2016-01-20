var http = require("http");
var Router = require("./router");
var Controller = require("./controller");

function start(port) {
	var router = new Router();
	var controller = new Controller();

	router.get('/', function(request, response) {
		controller.getEpisodes(request, response);
	});

	http.createServer(function(request, response) {
		router.handle(request, response);
	}).listen(port);
}

exports.start = start;