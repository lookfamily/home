var net = require('net');

function TiVoConnection() {
	var queue = [];

	var connection = net.connect(31339, '192.168.1.39', function() {
		console.log('connected to tivo.');

		setInterval(function() {
			var command = queue.shift();
			if (command)
				connection.write(command);
		}, 500);
	});

	this.send = function(command) {
		queue.push(command + '\r');
	}

	this.response = function(callback) {
		connection.on('data', function(data) {
			callback(data.toString());
		});
	}
}

module.exports = TiVoConnection;