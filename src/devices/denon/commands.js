function Denon(connection) {
	this.connection = connection;
}

Denon.prototype.getPower = function() {
	console.log('denon getPower');
	
	this.connection.send('PW?');
};

Denon.prototype.powerOn = function() {
	console.log('denon powerOn');
	
	this.connection.send('PWON');
};

Denon.prototype.powerStandby = function() {
	console.log('denon powerStandby');
	
	this.connection.send('PWSTANDBY');
};

Denon.prototype.getVolume = function() {
	console.log('denon getVolume');
	
	this.connection.send('MV?');
};

Denon.prototype.setVolume = function(val) {
	console.log('denon setVolume');
	
	if (val < 10) val = '0' + val.toString();
	this.connection.send('MV' + val.toString());
};

Denon.prototype.volumeUp = function() {
	console.log('denon volumeUp');
	
	this.connection.send('MVUP');
};

Denon.prototype.volumeDown = function() {
	console.log('denon volumeDown');
	
	this.connection.send('MVDOWN');
};

Denon.prototype.getMute = function() {
	console.log('denon getMute');

	this.connection.send('MU?');
}

Denon.prototype.mute = function() {
	console.log('denon mute');

	this.connection.send('MUON');
}

Denon.prototype.unmute = function() {
	console.log('denon unmute');

	this.connection.send('MUOFF');
}

Denon.prototype.getInputSource = function() {
	console.log('denon getInputSource');

	this.connection.send('SI?');	
}

Denon.prototype.setInputSource = function(input) {
	console.log('denon setInputSource');

	this.connection.send('SI'+input);	
}

module.exports = Denon;