module.exports = {
	loadBall: function () {
		var ball = {	position : {x: 400, y: 200},
						oldPosition : {x: 400, y: 200},
						angle : 0.9 * Math.PI,
						speed: 10,
						size: 20,
						color: {r: 255, g: 255, b: 255}	
					};

		return ball;
	},
	
	loadPaddles: function () {

		var leftPaddle = {	id: 0,
							x: 5, y: 200,
							oldX:5, oldY: 200,
							length: 100, thickness: 30,
							color: {r: 255, g: 0, b: 0}, connected: 0,
							socketID: null
						};

		var rightPaddle = {	id: 1,
							x: 795, y: 200,
							oldX:795, oldY: 200,
							length: 100, thickness: 30,
							color: {r: 255, g: 0, b: 0}, connected: 0,
							socketID: null
						};

		return [leftPaddle, rightPaddle];
	}

};