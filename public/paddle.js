function Paddle(id, x, y, length, thickness, col) {

	this.setup = function () {
		this.id = id;
		this.length = length;
		this.thickness = thickness;
		this.sprite = createSprite(x, y, this.thickness, this.length);
	}

	this.createSprites = function () {
		this.sprite = createSprite(x, y, this.thickness, this.length);
		this.sprite.shapeColor = color(col.r, col.g, col.b);
	}

	this.draw = function() {
		drawSprite(this.sprite);
	}
	
	this.setPosition = function(y) {
		this.sprite.position.y = y;
	}

	this.getID = function() {
		return this.id;
	}

	this.setup();
	this.createSprites();
}