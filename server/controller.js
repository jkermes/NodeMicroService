class Controller {

	constructor(dal) {
		this.dal = dal;
		
		this.dal.set("test", {
			id: "test",
			title: "The Big Bang Theory",
        		season: 1,
        		episode: 1
		});
		
		this.dal.set("test2", {
			id: "test2",
			title: "The Big Bang Theory",
        		season: 1,
        		episode: 2
		});
	}
	
	getEpisodes(request, response) {
		if (this.dal.size() == 0) {
        		response.writeHead(204, {'Content-Type': 'application/json' });
		}
		else {
			response.writeHead(200, {'Content-Type': 'application/json' });
			response.write(JSON.stringify([...this.dal.getMap()]));
		}
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
            
            this.dal.set(id, episode);
            
            console.log(JSON.stringify([...this.dal.getMap()]));
            
        }.bind(this));
        
        //response.writeHead(201, {'Content-Type': 'application/json' });
		//response.write(JSON.stringify(this.dal.get(id)));
    }
}

module.exports = Controller;
