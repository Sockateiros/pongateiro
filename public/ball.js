function Ball(x, y, size, col) {

	this.setup = function () {
		this.size = size;
		this.createSprites();
	}

	this.createSprites = function () {
		this.sprite = createSprite(x, y, this.size, this.size);
		this.sprite.shapeColor = color(col.r, col.g, col.b);
	}

	this.draw = function() {
		drawSprite(this.sprite);
	}
	
	this.setPosition = function(x, y) {
		this.sprite.position.x = x;
		this.sprite.position.y = y;
	}

	this.setup();
}