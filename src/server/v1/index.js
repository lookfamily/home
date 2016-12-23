let express         = require('express'),
	bodyParser      = require('body-parser'),
	http			= require('http'),
	logger          = require('morgan'),
	_               = require('lodash'),
	path            = require('path'),
	fs              = require('fs'),
	socket_io		= require('socket.io'),
	denon			= require('../../devices/denon');

let app = express();
module.exports.app = app;

// serve static pages
app.use(express.static(path.join(__dirname, '../../../public')));

// morgan logger
app.use(logger('combined'));

app.use(bodyParser.json({}));
app.use(bodyParser.urlencoded({ extended: true }));

let server = http.Server(app);
server.listen(8080, () => {
	console.log('Example app listening on ' + server.address().port);
});

let io = socket_io(server);
io.on('connection', function(socket){
	console.log('User connected.');

	require('./sockets/denon')(io, socket, denon);

	socket.on('disconnect', function(){
		console.log('User disconnected');
	});
});