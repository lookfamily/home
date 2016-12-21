let express         = require('express'),
	bodyParser      = require('body-parser'),
	http			= require('http'),
	logger          = require('morgan'),
	_               = require('lodash'),
	path            = require('path'),
	fs              = require('fs'),
	io				= require('socket.io'),
	denon			= require('../../devices/denon');

let app = express();
module.exports.app = app;

//log stream for morgan logger
let accessLogStream = fs.createWriteStream(__dirname + '/access.log', {flags: 'a'});

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

let ioServer = io(server);
ioServer.on('connection', function(socket){
	console.log('User connected.');

	require('./socket/denon')(ioServer, socket, denon);

	// socket.on('user', function(msg) {
	// 	socket.user = msg.username;
	// 	console.log('User connected: ' + socket.user);
	// });

	// socket.on('room', function(msg) {
	// 	console.log(socket.user + ' wants to join: ' + msg.room);
	// 	if (socket.room) socket.leave(socket.room);
	// 	socket.room = msg.room;
	// 	socket.join(msg.room);
	// });

	// socket.on('msg', function(msg){
	// 	console.log(socket.user + '(' + msg.room + '): ' + msg.text);
	// 	msg = _.extend(msg, { username: socket.user });
	// 	ioServer.sockets.in(socket.room).emit('msg', msg);
	// 	//ioServer.emit('msg', msg);
	// });

	socket.on('disconnect', function(){
		console.log('User disconnected');
	});
});