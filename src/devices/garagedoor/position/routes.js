var express = require('express');

var router = express.Router();

router.use(function timeLog(req, res, next) {
	console.log('Request Received: ', dateDisplayed(Date.now()));
	next();
});

router.get('/', function(req, res) {
	res.json({ message: 'Welcome to the garage-door position REST API' });
});

router.route('/position')
	.get(function(req, res) {
		res.json({ doorOpen: doorOpen });
	});

var gpio = require('pi-gpio');
var gpioPin = 13;
var doorOpen = false;

gpio.open(gpioPin, 'input', function(err) {
	setInterval(function() {
		gpio.read(gpioPin, function(err, value) {
			if (value === 1) doorOpen = true;
			else doorOpen = false;
		});
	}, 500);
});

process.on('SIGINT', function() {
	gpio.close(gpioPin);
	process.exit(0);
});

module.exports = router;

function dateDisplayed(timestamp) {
	var date = new Date(timestamp);
	return (date.getMonth() + 1 + '/' + date.getDate() + '/' + date.getFullYear() + ' ' + date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds());
}
