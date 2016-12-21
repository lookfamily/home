function TiVo(connection) {
	this.connection = connection;
}


// Sends a code corresponding to a button on
// a TiVo remote control. It is processed
// as a button press and guaranteed to be
// processed.
TiVo.prototype.sendIRCODE = function(code) {
	console.log('tivo sendIRCODE');

	const IR_CODES = [
		'UP', 'DOWN', 'LEFT', 'RIGHT',
		'SELECT', 'INFO', 'EXIT',
		'THUMBSUP', 'THUMBSDOWN',
		'CHANNELUP', 'CHANNELDOWN',
		'MUTE', 'VOLUMEUP', 'VOLUMEDOWN',
		'CC_ON', 'CC_OFF',
		'OPTIONS',
		'PLAY', 'FORWARD', 'REVERSE',
		'PAUSE', 'SLOW', 'REPLAY',
		'ADVANCE', 'RECORD',
		'NUM0', 'NUM1', 'NUM2', 'NUM3',
		'NUM4', 'NUM5', 'NUM6', 'NUM7',
		'NUM8', 'NUM9', 'ENTER', 'CLEAR'
	];
}

TiVo.prototype.teleport = function(loc) {
	console.log('tivo teleport');

	const TELEPORT_LOCS = [
		'TIVO',
		'LIVETV',
		'GUIDE',
		'NOWPLAYING'
	];

	loc = loc.toUpperCase();
	if (TELEPORT_LOCS.indexOf(loc) > 0)
		this.connection.send('TELEPORT ' + loc);
	else
		console.error('NOT A VALID TELEPORT: ' 
			+ loc + ' @ ' + new Date().toString());
}

module.exports = TiVo;