var socket;

var leftPaddle = null;
var rightPaddle = null;

function setup() {
	createCanvas(800, 400);
	socket = io.connect('http://localhost:3000');
	socket.on('player_connection', getPlayers);
	socket.on('player_disconnection', onPlayerDisconnection);
}

function draw() {
	if (leftPaddle !== null) {
		leftPaddle.draw();
	}
	if (rightPaddle !== null) {
		rightPaddle.draw();
	}
}

function onPlayerDisconnection(player) {
	if (player.id === 0) {
		console.log('Left player disconnected');
		leftPaddle = null;
	}
	else if (player.id === 1) {
		console.log('Right player disconnected');
		rightPaddle = null;
	}
	else {
		console.log('Spectator disconnected');
	}
	
}

// This will retrieve all info about 
// each connected player
function getPlayers(players) {
	console.log(players);
	if (players.left.connected === 0 && leftPaddle === null) {
		console.log('Left player connected');
		leftPaddle = new Paddle(players.left.x, players.left.y, players.left.length, 
			players.left.thickness, players.left.color);
	}
	else if (players.right.connected === 0 && rightPaddle === null) {
		console.log('Right player connected');
		rightPaddle = new Paddle(players.right.x, players.right.y, players.right.length,
			players.right.thickness, players.right.color);
	}
	else {
		console.log('Spectator connected');
	}
}

function setupPaddle(newPaddle) {
	console.log(newPaddle);
	if (newPaddle.id === 0) {
		console.log('You are left paddle');
		leftPaddle = new Paddle(newPaddle.x, newPaddle.y, newPaddle.length, newPaddle.thickness, newPaddle.color);
	}
	else {
		console.log('You are right paddle');	
		rightPaddle = new Paddle(newPaddle.x, newPaddle.y, newPaddle.length, newPaddle.thickness, newPaddle.color);
	}

	// Get the other player info if already connected the server

}