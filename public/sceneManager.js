var socket;

var player = null;
var enemy = null;
var ball = null;

var canvasWidth = 800;
var canvasHeight = 400;


function onEnemyDisconnection() {
	console.log('onEnemyDisconnection called');
	enemy = null;
}

function setupPlayer(_player) {
	console.log('setupPlayer called');
	player = new Paddle(_player.id, _player.x, _player.y, _player.length, _player.thickness, _player.color);
}

function setupBall(_ball) {
	console.log('setupBall called');
	ball = new Ball(_ball.position.x, _ball.position.y, _ball.size, _ball.color);
}

function setupEnemy(_player) {
	console.log('setupEnemy called');
	enemy = new Paddle(_player.id, _player.x, _player.y, _player.length, _player.thickness, _player.color);
}

function onNewPlayer(_player) {
	console.log('onNewPlayer called');
	if (_player.id === player.id) {
		return;
	}
	enemy = new Paddle(_player.id, _player.x, _player.y, _player.length, _player.thickness, _player.color);	
}

function getPaddlesPosition() {

	// Update player position
	if (player === null) {
		return;
	}

	var newPosition = constrain(mouseY, 0, canvasHeight);

	socket.emit('cMsg_UpdatePosition', player.getID(), newPosition);
}

// To-do: Loop through all players
function updatePlayerPosition(playerID, newPos) {
	if (player.getID() === playerID) {
		player.setPosition(newPos);
	}
	else if (enemy.getID() === playerID) {
		enemy.setPosition(newPos);
	}
}

function updateBallPosition(x, y) {
	if (ball !== null) {
		ball.setPosition(x, y);
	}
}

function setup() {
	createCanvas(canvasWidth, canvasHeight);
	socket = io.connect('http://10.8.11.59:3000');
	socket.on('sMsg_SetupPlayer', setupPlayer);
	socket.on('sMsg_SetupBall', setupBall);
	socket.on('sMsg_SetupEnemy', setupEnemy);
	socket.on('sMsg_NewPlayer', onNewPlayer);
	socket.on('sMsg_EnemyDisconnection', onEnemyDisconnection);
	socket.on('sMsg_EnemyMoved', updatePlayerPosition);
	socket.on('sMsg_BallPosition', updateBallPosition);
}

function draw() {
	
	background(0);
	
	// Asks the server for ball position
	socket.emit('cMsg_BallPosition');

	getPaddlesPosition();

	if (player !== null) {
		player.draw();
	}
	if (enemy !== null) {
		enemy.draw();
	}
	if (ball !== null) {
		ball.draw();
	}
}