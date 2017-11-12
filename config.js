module.exports = {
	loadBall: function () {
		var ball = {	position : {x: 400, y: 200},
						angle : 0.9 * Math.PI,
						speed: 2,
						size: 20,
						color: {r: 255, g: 255, b: 255}	
					};

		return ball;
	},
	
	loadPaddles: function () {

		var leftPaddle = {	id: 0,
							x: 20, y: 200,
							length: 100, thickness: 20,
							color: {r: 255, g: 0, b: 0}, connected: 0,
							socketID: null
						};

		var rightPaddle = {	id: 1,
							x: 780, y: 200,
							length: 100, thickness: 20,
							color: {r: 255, g: 0, b: 0}, connected: 0,
							socketID: null
						};

		return [leftPaddle, rightPaddle];
	}

};