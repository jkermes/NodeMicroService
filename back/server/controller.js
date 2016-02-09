var url = require('url');

class Controller {

	constructor(dal) {
		this.dal = dal;
	}

	getEpisodes(request, response) {

		if (this.dal.size() == 0) {
			response.writeHead(204, {
				'Content-Type': 'application/json',
				'Access-Control-Allow-Origin': '*',
				'Access-Control-Allow-Headers': 'X-Requested-With'
			});
		}
		else {
			var data = JSON.stringify([...this.dal.getMap()]);
			response.writeHead(200, {
				'Content-Type': 'application/json',
				'Content-Length': data.length,
				'Access-Control-Allow-Origin': '*',
				'Access-Control-Allow-Headers': 'X-Requested-With'
			});
			response.write(data);
		}		

		response.end();
	}

	getEpisode(request, response) {
		var params = url.parse(request.url, true).query;
		var id = params.id;

		var episode = this.dal.get(id);

		if (null == episode) {
			response.writeHead(404, {
				'Content-Type': 'application/json',
				'Access-Control-Allow-Origin': '*',
				'Access-Control-Allow-Headers': 'X-Requested-With'
			});
		}
		else {
			var data = JSON.stringify(episode);
			response.writeHead(200, {
				'Content-Type': 'application/json', 'Content-Length': data.length,
				'Access-Control-Allow-Origin': '*',
				'Access-Control-Allow-Headers': 'X-Requested-With'
			});
			response.write(data);
		}		

		response.end();
	}

	addEpisode(request, response) {
		var uuid = require("node-uuid");
		var body =  '';
		var episode;

		var id = uuid.v1();

		request.on('data', function (data) {
			body += data;
		});

		request.on('end', function () {
			episode = JSON.parse(body);

			this.dal.set(id, {
				id: id,
				title: episode.title,
				season: episode.season,
				episode: episode.episode
			});

			var data = JSON.stringify(this.dal.get(id));
			response.writeHead(201, {
				'Content-Type': 'application/json', 'Content-Length': data.length,
				'Access-Control-Allow-Origin': '*',
				'Access-Control-Allow-Headers': 'X-Requested-With'
			});
			response.write(data);
			response.end();    
		}.bind(this));
	}
}

module.exports = Controller;
