//INITIALIZE SHIP TEXTURES

var shipTexture = PIXI.Texture.fromImage('graphics/ship_size_1.png');

//SHIP CLASS

var Ship = function () {
    //initialize sprite
    this.sprite = new PIXI.Sprite(shipTexture);
    this.sprite.anchor.x = 0.5;
    this.sprite.anchor.y = 0.5;
    this.sprite.position.x = 200;
    this.sprite.position.y = 150;

    //initialize other attributes
    this.player = '';
    this.health = 10;
    this.maxHealth = 10;
    this.size = 1;
    this.level = 1;
    this.xp = 0;
    this.rightTimer = 0;
    this.leftTimer = 0;
    this.speed = 3;
    this.angle = (Math.PI/2);
    this.wheat = 0;
    this.ore = 0;
    this.sheep = 0;
    this.wood = 0;
};

Ship.prototype.move = function (destX, destY) {
    var x = (this.speed * (destX - this.sprite.position.x))/200;
    var y = (this.speed * (destY - this.sprite.position.y))/200;
    this.sprite.position.x = this.sprite.position.x + x;
    this.sprite.position.y = this.sprite.position.y + y;
    this.sprite.rotation = Math.atan2(this.sprite.position.y - destY, this.sprite.position.x - destX) - .5*Math.PI;
}




