var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.use(express.static('public'));

app.get('/', function(req, res){
  res.sendFile(__dirname + '/public/index.html');
});

////////////

var gameManager = require('./gameManager');
var p5 = require('./public/libraries/p5.min');
// var p5_dom = require('./public/addons/libraries/p5.dom.min');
// var p5_sound = require('./public/addons/libraries/p5.sound.min');
// var p5_play = require('./public/addons/libraries/p5.play');

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
// var paddleColor = p5.color(255, 0, 0);

var leftPaddle = {	id: leftPaddleID,
					x: leftPaddleX, y: leftPaddleY,
					length: paddleLength, thickness: paddleThickness,
					color: paddleColor
				};

var rightPaddle = {	id: rightPaddleID,
					x: rightPaddleX, y: rightPaddleY,
					length: paddleLength, thickness: paddleThickness,
					color: paddleColor
				};

io.on('connection', function(socket) {
	socket.on('mouse', emitNewColor);

	if (leftPaddleSocket === null) {
		leftPaddleSocket = socket;
		socket.emit('setup', leftPaddle);
		console.log(leftPaddle);
	}
	else {
		rightPaddleSocket = socket;
		socket.emit('setup', rightPaddle);
		console.log(rightPaddle);
	}

});

http.listen(3000, function(){
	console.log('listening on *:3000');
});

function emitNewColor(color) {
	console.log('A mouse was clicked');
	var newColor = gameManager.changeColor(color);
	io.emit('color', newColor);
}