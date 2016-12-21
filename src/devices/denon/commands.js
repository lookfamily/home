let denonConnection = require('./connection');

let Denon = {
	connection: denonConnection,

	getPower: function() {
		this.connection.send('PW?');
	},

	powerOn: function() {		
		this.connection.send('PWON');
	},

	powerStandby: function() {
		this.connection.send('PWSTANDBY');
	},

	getVolume: function() {		
		this.connection.send('MV?');
	},

	setVolume: function(vol) {
		var lessThanTen = false;
		if (Math.floor(vol) !== vol) {
			lessThanTen = true;
			vol *= 10;
		}
		if (lessThanTen || vol < 10) vol = '0' + vol.toString();
		this.connection.send('MV' + vol.toString());
	},

	volumeUp: function() {		
		this.connection.send('MVUP');
	},

	volumeDown: function() {
		this.connection.send('MVDOWN');
	},

	getMute: function() {
		this.connection.send('MU?');
	},

	mute: function() {
		this.connection.send('MUON');
	},

	unmute: function() {
		this.connection.send('MUOFF');
	},

	getInputSource: function() {
		this.connection.send('SI?');	
	},

	setInputSource: function(input) {
		this.connection.send('SI'+input);	
	}
};

module.exports = Denon;