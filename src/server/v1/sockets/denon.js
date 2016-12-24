module.exports = function(ioServer, socket, denon) {

	socket.on('denon power', function(data) {
		if ('power' in data
			&& typeof data.power === 'string') {
			switch (data.power) {
				case 'on':
					denon.powerOn();
					break;
				case 'standby':
					denon.powerStandby();
					break;
			}
		}
		else denon.getPower();
	});

	socket.on('denon volume', function(data) {
		if ('vol' in data) {
			switch (data.vol) {
				case 'up':
					denon.volumeUp();
					break;
				case 'down':
					denon.volumeDown();
					break;
				default:
					if (typeof data.vol === 'number') {
						denon.setVolume(data.vol);
					}
					break;
			}
		}
		else denon.getVolume();
	});

	socket.on('denon mute', function(data) {
		if ('mute' in data
			&& typeof data.mute === 'boolean') {
			
			if (data.mute)
				denon.mute();
			else
				denon.unmute();

		}
		else denon.getMute();
	});

	socket.on('denon source', function(data) {
		if ('source' in data
			&& typeof data.source === 'string') {

			denon.setInputSource(data.source.toUpperCase());

		}
		else denon.getInputSource();
	});

	denon.connection.response(function(data) {
		ioServer.emit('denon', data);
	});
}