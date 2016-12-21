let config = require('../config');
let net = require('net');

var queue = [];

let connection = net.connect(config.denon_port, config.denon_ip, function() {
	console.log('connected to denon.');

	setInterval(function() {
		var command = queue.shift();
		if (command)
			connection.write(command);
	}, 250);
});

let DenonConnection = {
	send: function(command) {
		queue.push(command + '\r');
	},

	response: function(callback) {
		connection.on('data', function(data) {
			let s = data.toString();

			if 		(s === 'PWON\r')
				callback({power: 'on'});
			else if (s === 'PWSTANDBY\r')
				callback({power: 'standby'});
			else if (s.startsWith('MVMAX'))
				callback({volMax: parseInt(s.split(' ')[1])});
			else if (s.startsWith('MV')) {
				let vol = s.substr(2);
				if (vol.length === 4)
					callback({vol: parseInt(vol)/10.0});
				else
					callback({vol: parseInt(vol)});
			}
			else
				console.log('*** Not handled ***:' + data);
		});
	}
}

module.exports = DenonConnection;