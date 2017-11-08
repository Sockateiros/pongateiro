var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.use(express.static('public'));

var example = require('./example');

app.get('/', function(req, res){
  res.sendFile(__dirname + '/public/index.html');
});

var leftPaddle = null;
var rightPaddle = null;

io.on('connection', function(socket) {
	socket.on('mouse', changeColor);

	if (leftPaddle === null) {
		leftPaddle = socket;
		socket.emit('paddleID', 0);
	}
	else {
		rightPaddle = socket;
		socket.emit('paddleID', 1);
	}

});

http.listen(3000, function(){
	console.log('listening on *:3000');
	example.foo();
});

var color = 123;

function changeColor(color) {
	console.log('A mouse was clicked');

	if (color == 123) {
		color = 0;
	}
	else {
		color = 123;
	}

	io.emit('color', color);
}