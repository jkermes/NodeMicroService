var http = require("http");
var Router = require("./router");
var Controller = require("./controller");
var Dal = require("./dal");

function start(port) {
	var router = new Router();
	var controller = new Controller(new Dal());

	router.get('/episode', function(request, response) {
		controller.getEpisode(request, response);
	});

	router.get('/', function(request, response) {
		controller.getEpisodes(request, response);
	});

	router.post('/', function(request, response) {
		controller.addEpisode(request, response);
	});

	http.createServer(function(request, response) {
		router.handle(request, response);
	}).listen(port);
}

exports.start = start;
