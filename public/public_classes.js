/*STATES CLASS: a snapshot of the state of a player after a 
 * certain number of inputs*/
var State = function (key, num) {
    this.key = key;
    this.inputNum = num;
    this.x = 0;
    this.y = 0;
    this.rotation = 0;
}
State.prototype.updateState = function (input) {
/*CLIENT SIDE PREDICTION
    if (this.inputNum == input.inputNum) 
        this.inputNum = input.inputNum + 1;
*/

    this.x += input.moveX;
    this.y += input.moveY;
}
/*INPUTS CLASS: inputs which are processed client side and server
* side in order to update state*/
var Input = function (key, num) {
    this.key = key;
    this.inputNum = num;
    this.type = '';
    this.moveX = 0;
    this.moveY = 0;
    this.rotation = 0;
    //this.firedRight = false;
    //this.firedLeft = true;
}
//PLAYER CLASS
var Player = function (playerName, shipName) {
    this.key = '';
    this.name = playerName;
    this.ship = new Ship(shipName);
    this.level = 1;
    this.xp = 0;
    this.gold = 0;
    this.kills = 0;
    this.states = [];
    this.inputs = [];
    this.lastAcked = 0; //for sliding window to keep track of moves
    this.nextInput = 1;
}

/*Updates player to reflect given state. Used to handle response from server*/
Player.prototype.updateState = function (state) {
    this.key = state.key;
    this.ship.sprite.position.x = state.x;
    this.ship.sprite.position.y = state.y;
    this.ship.sprite.rotation = state.rotation;
}
Player.prototype.genMove = function (destX, destY) {
    input = new Input(this.key, this.nextInput);
    state = new State(this.key, this.nextInput);
    this.nextInput += 1;

    //create input
    input.type = 'move';
    input.moveX = (this.speed * (destX - this.ship.sprite.position.x))/200; 
    input.moveY = (this.speed * (destY - this.ship.sprite.position.y))/200;
    input.rotation = Math.atan2(this.ship.sprite.position.y - destY, this.ship.sprite.position.x - destX) - .5*Math.PI;
    
/* TO-DO: CLIENT SIDE PREDICTION CODE  - REVISIT THIS  
    //create states
    state.x = this.ship.sprite.position.x + input.moveX;
    state.y = this.ship.sprite.position.y + input.moveY;
    state.rotation = input.rotation;

    //client side prediction
    this.ship.sprite.position.x = state.x;
    this.ship.sprite.position.y = state.y;
    this.ship.sprite.rotation = state.rotation;
    //console.log(state);
    this.inputs.push(input);
    this.states.push(state);*/
    return input;
}
/*
Player.prototype.processInputs = function () {
    this.inputs.
}*/
//INITIALIZE SHIP TEXTURES
var shipTexture = PIXI.Texture.fromImage('graphics/ship_size_1.png');

//SHIP CLASS
var Ship = function (shipName) {
    //initialize sprite
    this.name = shipName; 
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
    this.sprite.position.x += x;
    this.sprite.position.y += y;
    this.sprite.rotation = Math.atan2(this.sprite.position.y - destY, this.sprite.position.x - destX) - .5*Math.PI;
}




