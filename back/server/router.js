var url = require('url');

class Router {
	
	constructor() {
		this.gets = new Map();
		this.posts = new Map();		
	}
	
	get(path, callback) {
		this.gets.set(path, callback);
	}
	
	post(path, callback) {
		this.posts.set(path, callback);		
	}
	
	handle(request, response) {
		var pathname = url.parse(request.url).pathname;
        
		switch (request.method) {
			case 'GET':
				if (this.gets.has(pathname)) {					
                    this.gets.get(pathname)(request, response);
				}
				else {
                    response = this.setHead(response, 404);
                    response.end();
				}
			break;
			case 'POST':
				if (this.posts.has(pathname)) {
                    this.posts.get(pathname)(request, response);					
				}
				else {
                    response = this.setHead(response, 404);
                    response.end();
				}
			break;
			default:
				response = this.setHead(response, 405);
				response.end();
			break;		
		}
   	}
	
	setHead(response, statusCode) {
		response.writeHead(statusCode, {'Content-Type': 'application/json' });
		
		return response;
	}
}

module.exports = Router;