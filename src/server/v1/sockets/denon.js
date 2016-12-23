module.exports = function(ioServer, socket, denon) {

	socket.on('denon power', function() {
		denon.getPower();
	});

	socket.on('denon power on', function() {
		denon.powerOn();
	});

	socket.on('denon power standby', function() {
		denon.powerStandby();
	});

	socket.on('denon volume', function(data) {
		if ('vol' in data) denon.setVolume(data.vol);
		else denon.getVolume();
	});

	socket.on('denon volume up', function() {
		denon.volumeUp();
	});

	socket.on('denon volume down', function() {
		denon.volumeDown();
	});

	denon.connection.response(function(data) {
		ioServer.emit('denon', data);
	});
}