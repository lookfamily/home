function GarageDoor() {
	this._http = require('http');
}

GarageDoor.prototype.trigger = function() {
	console.log('garage-door trigger');

	this._http.get('http://ethanpi.local:8080/trigger');
}

module.exports = GarageDoor;