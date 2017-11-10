var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.use(express.static('public'));

app.get('/', function(req, res){
  res.sendFile(__dirname + '/public/index.html');
});

http.listen(3000, function(){
	console.log('listening on *:3000');
});


//-----------------------------

var leftPaddleSocket = null;
var rightPaddleSocket = null;

// Config (To add json later)
var leftPaddleID = 0;
var leftPaddleX = 50;
var leftPaddleY = 200;
var rightPaddleID = 1;
var rightPaddleX = 500;
var rightPaddleY = 200;
var paddleLength = 200;
var paddleThickness = 30;
var paddleColor = {r: 255, g: 0, b: 0};

var leftPaddle = {	id: leftPaddleID,
					x: leftPaddleX, y: leftPaddleY,
					length: paddleLength, thickness: paddleThickness,
					color: paddleColor, connected: 0
				};

var rightPaddle = {	id: rightPaddleID,
					x: rightPaddleX, y: rightPaddleY,
					length: paddleLength, thickness: paddleThickness,
					color: paddleColor, connected: 0
				};

var paddles = {left: leftPaddle, right: rightPaddle}

io.on('connection', (socket) => {
	socket.on('disconnect', (reason) => {
		if (leftPaddleSocket === socket) {
			leftPaddleSocket = null;
			leftPaddle.connected = 0;
			console.log('Left player disconnected');
			io.emit('player_disconnection', leftPaddle);
		}
		else if (rightPaddleSocket === socket) {
			rightPaddleSocket = null;
			rightPaddle.connected = 0;
			console.log('Right player disconnected');
			io.emit('player_disconnection', rightPaddle);
		}
		else {
			console.log('A spectator disconnected');
		}
	});

	// // If a player refreshes the browser (Not working... but close?)
	//if (socket === leftPaddleSocket || socket === rightPaddleSocket) {
	//	return;
	//}

	if (leftPaddleSocket === null) {
		leftPaddleSocket = socket;
		leftPaddle.connected = 1;
		console.log('Left player connected.');
	}
	else if (rightPaddleSocket === null) {
		rightPaddleSocket = socket;
		rightPaddle.connected = 1;
		console.log('Right player connected.');
	}
	else {
		console.log('Sorry, game is full. You are a spectator.');
	}

	io.emit('player_connection', paddles);
});