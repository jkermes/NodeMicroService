class Dal {
	
	constructor() {
		this.map = new Map();
	}

	get(key) {
		if (this.map.has(key)) {
			return this.map.get(key);
		}
	}

	set(key, value) {
		this.map.set(key, value);
	}

	size() {
		return this.map.size;
	}

	getMap() {
		return this.map;
	}
}

module.exports = Dal;
