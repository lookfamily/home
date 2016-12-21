// var DenonConnection = require('./devices/denon/connection')
// var Denon = require('./devices/denon/commands');

// var my_denon = new Denon(new DenonConnection());

// // my_denon.getPower();
// my_denon.powerOn();
// // my_denon.powerStandby();

// my_denon.connection.response(function(data) {
// 	console.log(data);
// });

var TiVoConnection = require('./devices/tivo/connection')
var TiVo = require('./devices/tivo/commands');

var my_tivo = new TiVo(new TiVoConnection());

my_tivo.teleport('LIVETV');
// setInterval(function() {
// 	my_tivo.teleport('TIVO');
// }, 5000)

// my_tivo.connection.response(function(data) {
// 	console.log(data);
// });

// var GarageDoor = require('./devices/garagedoor/commands');

// var my_garagedoor = new GarageDoor();

// my_garagedoor.trigger();