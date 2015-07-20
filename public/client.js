/*Basic Classes*/
var shipTexture = PIXI.Texture.fromImage('graphics/ship_size_1.png');

var Player = function () {
	this.key = -1;
	this.speed = 3;
	this.sprite = new PIXI.Sprite(shipTexture);
}

Player.prototype.genMove = function (destX, destY) {
    //create input
    var input = new Input();
    input.key = this.key
    input.moveX = (this.speed * (destX - this.sprite.position.x))/200; 
    input.moveY = (this.speed * (destY - this.sprite.position.y))/200;
    input.rotation = Math.atan2(this.sprite.position.y - destY, this.sprite.position.x - destX) - .5*Math.PI;
    
    return input;
}
var Input = function (x, y) {
	this.key = 0;
	this.moveX = 0;
	this.moveY = 0;
	this.rotation = 0;
}

/*Initialize globals*/
var players = new Array();
var socket = io();
var thisPlayer = new Player('Captain Smitty', 'SS Anne');

/*PIXI SHTUFF: initializes stage and starts animation loop*/
var renderer = PIXI.autoDetectRenderer(800, 600,{backgroundColor : 0x006994});
document.body.appendChild(renderer.view);
var stage = new PIXI.Container();
animate();
function animate() {
    requestAnimationFrame(animate);
    renderer.render(stage);
}

/*SERVER EVENTS: How to respond to the server*/

/*When player receives okay from server, initialize.*/
socket.on('yourKeyIs', function (key) {
	console.log('YourKeyIs | key = ' + key);
	thisPlayer.key = key;
	thisPlayer.sprite.anchor.x = 0.5;
	thisPlayer.sprite.anchor.y = 0.5;
	stage.addChild(thisPlayer.sprite);
	console.log('YourKeyIs | After creation - thisPlayer = ');
	console.log(thisPlayer);
	players[thisPlayer.key] = thisPlayer;
	console.log('YourKeyIs | After push - players =');
	console.log(players);
});

/*When authoritative game state arrives, update local gamestate*/
socket.on('gameStateUpdate', function (gameState) {
	//Make sure atleast this player has been added to players
	if (players.length > 0) {
		console.log('gameStateUpdate | On enter players = ');
		console.log(players);
		for (i = 0; i < gameState.length; i++) {
			if (gameState[i].key in players) {
				//update existing player
				players[gameState[i].key].sprite.position.x = gameState[i].x;
				players[gameState[i].key].sprite.position.y = gameState[i].y;
				players[gameState[i].key].sprite.rotation = gameState[i].rotation;
			} else {
				//create/add player to stage and locallist
				var newPlayer = new Player();
				newPlayer.key = gameState[i].key;
				newPlayer.sprite.anchor.x = 0.5;
				newPlayer.sprite.anchor.y = 0.5;
				stage.addChild(newPlayer.sprite);
				newPlayer.sprite.position.x = gameState[i].x;
				newPlayer.sprite.position.y = gameState[i].y;
				newPlayer.sprite.rotation = gameState[i].rotation;
				players[newPlayer.key] = newPlayer;
			}
		}
	}
});

/*When a player quits, delete them from the game*/
socket.on('deletePlayer', function (key) {
	//deletes a player from clients game when the player disconnects
	stage.removeChild(players[key].sprite);
	delete players[key];
});

/*CLIENT EVENTS: How to respond to local events*/
var cursorX, cursorY;
document.onmousemove = function(e) {
    cursorX = e.pageX;
    cursorY = e.pageY;
}

setInterval('clientUpdateLoop()', 100);
function clientUpdateLoop() {
    var stepInput = thisPlayer.genMove(cursorX, cursorY);
    socket.emit('input', stepInput); 
}