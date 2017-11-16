module.exports = {
	loadBall: function () {
		var ball = {	position : {x: 400, y: 200},
						oldPosition : {x: 400, y: 200},
						angle : 0.9 * Math.PI,
						speed: 2000,
						size: 20,
						color: {r: 255, g: 255, b: 255}	
					};

		return ball;
	},
	
	loadPaddles: function () {

		var leftPaddle = {	id: 0,
							x: 25, y: 200,
							oldX:25, oldY: 200,
							length: 300, thickness: 50,
							color: {r: 255, g: 0, b: 0}, connected: 0,
							socketID: null
						};

		var rightPaddle = {	id: 1,
							x: 775, y: 200,
							oldX:775, oldY: 200,
							length: 300, thickness: 50,
							color: {r: 255, g: 0, b: 0}, connected: 0,
							socketID: null
						};

		return [leftPaddle, rightPaddle];
	}

};