var socket;

var player = null;
var enemy = null;

function setup() {
	createCanvas(800, 400);
	socket = io.connect('http://localhost:3000');
	socket.on('setupPlayer', setupPlayer);
	socket.on('setupEnemy', setupEnemy);
	socket.on('newPlayer', onNewPlayer);
	socket.on('enemy_disconnection', onEnemyDisconnection);
}

function draw() {
	
	background(255);
	
	if (player !== null) {
		player.draw();
	}
	if (enemy !== null) {
		enemy.draw();
	}
}

function onEnemyDisconnection(paddle) {
	console.log('onEnemyDisconnection called');
	enemy = null;
}

function setupPlayer(paddle) {
	console.log('setupPlayer called');
	player = new Paddle(paddle.id, paddle.x, paddle.y, paddle.length, paddle.thickness, paddle.color);
}

function setupEnemy(paddle) {
	console.log('setupEnemy called');
	enemy = new Paddle(paddle.id, paddle.x, paddle.y, paddle.length, paddle.thickness, paddle.color);
}

function onNewPlayer(paddle) {
	console.log('onNewPlayer called');
	if (paddle.id === player.id) {
		return;
	}
	enemy = new Paddle(paddle.id, paddle.x, paddle.y, paddle.length, paddle.thickness, paddle.color);	
}