class Controller {
	
	getEpisodes(request, response) {
        response.writeHead(204, {'Content-Type': 'application/json' });
		//response.write("No episodes.");
	}
}

module.exports = Controller;