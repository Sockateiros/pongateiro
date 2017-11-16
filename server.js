var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);

var config = require('./config');
var gameManager = require('./gameManager');

app.use(express.static('public'));

app.get('/', function(req, res){
  res.sendFile(__dirname + '/public/index.html');
});

http.listen(3000, function(){
	console.log('listening on *:3000');
});

var paddles = config.loadPaddles();
var ball = config.loadBall();

var prevTs = new Date().getTime();

// Handle player disconnections
function onPlayerDisconnected(_socketID) {

	// Check which player disconnected
	for (var i = 0; i < paddles.length; i++) {
		if (paddles[i].socketID === _socketID) {
			
			// Restore that paddle's data
			paddles[i].socketID = null;
			paddles[i].connected = 0;

			// Inform the other players
			io.emit('sMsg_EnemyDisconnection');

			console.log('Player disconnected');
			return;
		}
	}
	// If none of the players disconnected, it must have been a spectator
	console.log('Spectator disconnected');
}

// Send data about all other players to the new player
// <playerIdx> represents the index in the <paddles> array 
//   corresponding to the new player
function setupEnemies(_socket, playerIdx) {
	for (var j = 0; j < paddles.length; j++) {
		if (j !== playerIdx && paddles[j].connected === 1) {
			_socket.emit('sMsg_SetupEnemy', paddles[j]);
		}
	} 
}

// Handle player connections
function onPlayerConnected(_socket) {

	console.log("Ball speed" + ball.speed);
	// Check which player connected
	for (var i = 0; i < paddles.length; i++){
		if (paddles[i].socketID === null) {
			paddles[i].socketID = _socket.id;
			paddles[i].connected = 1;

			console.log('Player connected');
			// Send data to the new player about itself and the ball
			_socket.emit('sMsg_SetupPlayer', paddles[i]);
			_socket.emit('sMsg_SetupBall', ball);
			
			setupEnemies(_socket, i);

			// Send the new player's data to all other players
			io.emit('sMsg_NewPlayer', paddles[i]);

			return;
		}
	}
	console.log('Spectator connected');
}

function updatePosition(paddleID, newPos) {
	if (paddles[paddleID]!== null) {
		paddles[paddleID].oldY = paddles[paddleID].y;
		paddles[paddleID].y = newPos;
	}
	gameManager.collisionBallPaddles(ball, paddles);

	io.emit('sMsg_EnemyMoved', paddleID, paddles[paddleID].y);
}

io.on('connection', (socket) => {
	
	onPlayerConnected(socket);

	// Send ball position to the player that asked for it
	socket.on('cMsg_BallPosition', () => {
		gameManager.collisionDetection(ball, paddles, 800, 400);
		

		var newTs = new Date().getTime();
		var deltaT = (newTs - prevTs) * .001; // Time in seconds
		prevTs = newTs;
		ball.position = gameManager.calcBallPosition(ball, deltaT);
		
		socket.emit('sMsg_BallPosition', ball.position.x, ball.position.y);
	});

	socket.on('cMsg_UpdatePosition', updatePosition);

	socket.on('disconnect', (reason) => {
		onPlayerDisconnected(socket.id);
	});
});