var canvasWidth = 800;
var canvasHeight = 400;
var bgColor = 123;

var socket;

var paddle = null;

function setup() {
	createCanvas(canvasWidth, canvasHeight);
	socket = io.connect('http://localhost:3000');
	socket.on('color', changeColor);
	socket.on('setup', setupPaddle);
}

function draw() {
	if (paddle !== null) {
		paddle.draw();
	}
}

function mousePressed() {
	socket.emit('mouse', bgColor); 
}

function changeColor(newColor) {
  console.log('Received new color');
  bgColor = newColor;
}

function setupPaddle(newPaddle) {
	console.log(newPaddle);
	if (newPaddle.id === 0) {
		console.log('You are left paddle');
		paddle = new Paddle(newPaddle.x, newPaddle.y, newPaddle.length, newPaddle.thickness, newPaddle.color);
	}
	else {
		console.log('You are right paddle');	
		paddle = new Paddle(newPaddle.x, newPaddle.y, newPaddle.length, newPaddle.thickness, newPaddle.color);
	}
}