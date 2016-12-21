var net = require('net');

function DenonConnection() {
	var queue = [];

	var connection = net.connect(23, '192.168.1.243', function() {
		console.log('connected to denon.');

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

module.exports = DenonConnection;