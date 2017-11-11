var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);

var config = require('./config');

app.use(express.static('public'));

app.get('/', function(req, res){
  res.sendFile(__dirname + '/public/index.html');
});

http.listen(3000, function(){
	console.log('listening on *:3000');
});


var paddles = config.load();
var leftPaddleSocket = null;
var rightPaddleSocket = null;

io.on('connection', (socket) => {
	socket.on('disconnect', (reason) => {
		if (leftPaddleSocket === socket) {
			leftPaddleSocket = null;
			paddles.left.connected = 0;
			console.log('Left player disconnected');
			io.emit('enemy_disconnection', paddles.left);
		}
		else if (rightPaddleSocket === socket) {
			rightPaddleSocket = null;
			paddles.right.connected = 0;
			console.log('Right player disconnected');
			io.emit('enemy_disconnection', paddles.right);
		}
		else {
			console.log('A spectator disconnected');
		}
	});

	if (leftPaddleSocket === null) {
		leftPaddleSocket = socket;
		paddles.left.connected = 1;
		console.log('Left player connected.');
		socket.emit('setupPlayer', paddles.left);
		if (paddles.right.connected === 1) {
			socket.emit('setupEnemy', paddles.right);
		}
		io.emit('newPlayer', paddles.left);
	}
	else if (rightPaddleSocket === null) {
		rightPaddleSocket = socket;
		paddles.right.connected = 1;
		console.log('Right player connected.');
		socket.emit('setupPlayer', paddles.right);
		if (paddles.left.connected === 1) {
			socket.emit('setupEnemy', paddles.left);
		}
		io.emit('newPlayer', paddles.right);
	}
	else {
		console.log('Sorry, game is full. You are a spectator.');
	}
});