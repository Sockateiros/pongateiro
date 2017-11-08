var canvasWidth = 800;
var canvasHeight = 400;
var bgColor = 123;

var socket;

function setup() {
	createCanvas(canvasWidth, canvasHeight);
	socket = io.connect('http://localhost:3000');
	socket.on('color', changeColor);
	socket.on('paddleID', paddleIDToString);
}

function draw() {
	fill(bgColor);
	rect(25, 25, canvasWidth, canvasHeight);
}

function mousePressed() {
	socket.emit('mouse', bgColor); 
}

function changeColor(newColor) {
  console.log('Received new color');
  bgColor = newColor;
}

function paddleIDToString(id) {
	if (id === 0) {
		console.log('You are left paddle');
	}
	else {
		console.log('You are right paddle');	
	}
}