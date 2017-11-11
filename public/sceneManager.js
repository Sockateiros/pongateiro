var socket;

var player = null;
var enemy = null;

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
	if (player !== null) {
		var newPosition = constrain(mouseY, 0, canvasHeight);
		player.setPosition(newPosition);
		socket.emit('cMsg_UpdatePosition', player.getID(), newPosition);
	}
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

function setup() {
	createCanvas(canvasWidth, canvasHeight);
	socket = io.connect('http://localhost:3000');
	socket.on('sMsg_SetupPlayer', setupPlayer);
	socket.on('sMsg_SetupEnemy', setupEnemy);
	socket.on('sMsg_NewPlayer', onNewPlayer);
	socket.on('sMsg_EnemyDisconnection', onEnemyDisconnection);
	socket.on('sMsg_EnemyMoved', updatePlayerPosition);
}

function draw() {
	
	background(255);
	
	getPaddlesPosition();

	if (player !== null) {
		player.draw();
	}
	if (enemy !== null) {
		enemy.draw();
	}
}