class Dal {
	
	constructor() {
		this.map = new Map();
	}

	get(key) {
		if (this.map.has(key)) {
			return this.map.get(key);
		}

		return null;
	}

	set(key, value) {
		this.map.set(key, value);
	}

	size() {
		return this.map.size;
	}

	getMap() {
		return this.map.values();
	}
}

module.exports = Dal;
