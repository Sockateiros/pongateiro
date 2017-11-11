module.exports = {
	load: function () {
		// Config (To add json later)
		var leftPaddleID = 0;
		var leftPaddleX = 50;
		var leftPaddleY = 200;
		var rightPaddleID = 1;
		var rightPaddleX = 500;
		var rightPaddleY = 200;
		var paddleLength = 200;
		var paddleThickness = 30;
		var paddleColor = {r: 255, g: 0, b: 0};

		var leftPaddle = {	id: leftPaddleID,
							x: leftPaddleX, y: leftPaddleY,
							length: paddleLength, thickness: paddleThickness,
							color: paddleColor, connected: 0,
							socketID: null
						};

		var rightPaddle = {	id: rightPaddleID,
							x: rightPaddleX, y: rightPaddleY,
							length: paddleLength, thickness: paddleThickness,
							color: paddleColor, connected: 0,
							socketID: null
						};

		//var paddles = {left: leftPaddle, right: rightPaddle};

		return [leftPaddle, rightPaddle];
	}

};