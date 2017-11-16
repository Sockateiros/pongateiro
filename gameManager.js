// Let's determine which surface of the paddle the ball collided with
// Here we suppose the hit happened where the ball has a lower intersection area
function reflectBallOnPaddle(currentAngle, intersection) {
	var horizontalColisionArea = Math.min(Math.abs(intersection.right), 
		Math.abs(intersection.left));

	var verticalColisionArea = Math.min(Math.abs(intersection.top), 
		Math.abs(intersection.bottom));

	// Vertical surface reflection
	if (horizontalColisionArea <= verticalColisionArea) {
		return Math.PI - currentAngle;
	}

	// Horizontal surface reflection
	return currentAngle *= -1;
}

function collisionBallPaddles(ball, paddles) {
	for (var i = 0; i < paddles.length; i++) {

		var rBallIntersect = ball.position.x + ball.size*.5 - (paddles[i].x - paddles[i].thickness*.5);
		if (rBallIntersect <= 0) {
			continue;
		}
		var lBallIntersect = ball.position.x - ball.size*.5 - (paddles[i].x + paddles[i].thickness*.5);
		if (lBallIntersect >= 0) {
			continue;
		}
		var tBallIntersect = ball.position.y - ball.size*.5 - (paddles[i].y + paddles[i].length*.5);
		if (tBallIntersect >= 0) {
			continue;
		}
		var bBallIntersect = ball.position.y + ball.size*.5 - (paddles[i].y - paddles[i].length*.5);
		if (bBallIntersect <= 0) {
			continue;
		}
		
		paddles[i].y = paddles[i].oldY;
		ball.position = Object.assign({}, ball.oldPosition);

		// Arriving here means the ball collided with a paddle
		ball.angle = reflectBallOnPaddle(ball.angle, 
			{right: rBallIntersect,
			left: lBallIntersect,
			top: tBallIntersect,
			bottom: bBallIntersect
		});
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

	collisionBallPaddles:collisionBallPaddles,

	collisionDetection:function(ball, paddles, screenWidth, screenHeight) {
		collisionBallPaddles(ball, paddles);
		collisionBallWalls(ball, screenWidth, screenHeight);
	},

	// DONT NEED TO RETURN BALL POSITION, <ball> OBJECT IS REFERENCED
	calcBallPosition: function (ball) {

		ball.oldPosition = Object.assign({}, ball.position);

		ball.position.x = ball.oldPosition.x + Math.cos(ball.angle) * ball.speed;
		ball.position.y = ball.oldPosition.y - Math.sin(ball.angle) * ball.speed;

		return ball.position;
	}
};