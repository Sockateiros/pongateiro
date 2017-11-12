function collisionBallPaddles(ball, paddles) {
	for (var i = 0; i < paddles.length; i++) {
		if (ball.position.x + ball.size*.5 > paddles[i].x - paddles[i].thickness*.5 &&
			ball.position.x - ball.size*.5 < paddles[i].x + paddles[i].thickness*.5 &&
			ball.position.y - ball.size*.5 < paddles[i].y + paddles[i].length*.5 &&
			ball.position.y + ball.size*.5 > paddles[i].y - paddles[i].length*.5) {
			
			// Vertical surface reflection
			ball.angle = Math.PI - ball.angle;
		}
	}
}

function collisionBallWalls(ball, screenWidth, screenHeight) {
	if (ball.position.x + ball.size*.5 > screenWidth || 
		ball.position.x - ball.size*.5 < 0 ) {

		// Vertical surface reflection
		ball.angle = Math.PI - ball.angle;		
	}
		
	if (ball.position.y - ball.size*.5 < 0 ||
		ball.position.y + ball.size*.5 > screenHeight) {

		// Horizontal surface reflection
		ball.angle *= -1;		
	}
}

module.exports = {

	collisionDetection:function(ball, paddles, screenWidth, screenHeight) {
		collisionBallPaddles(ball, paddles);
		collisionBallWalls(ball, screenWidth, screenHeight);
	},

	// DONT NEED TO RETURN BALL POSITION, <ball> OBJECT IS REFERENCED
	calcBallPosition: function (ball) {

		ball.position.x += Math.cos(ball.angle) * ball.speed;
		ball.position.y -= Math.sin(ball.angle) * ball.speed;

		return ball.position;
	}
};