function Paddle(x, y, length, thickness, color) {

	this.setup = function () {
		this.length = length;
		this.thickness = thickness;
		this.sprite = createSprite(x, y, this.thickness, this.length);
	}

	this.createSprites = function () {
		this.sprite = createSprite(x, y, this.thickness, this.length);
		this.sprite.shapeColor = color(color);
	}

	this.draw = function() {
		drawSprite(this.sprite);
	}
	
	this.setup();
	this.createSprites();
}