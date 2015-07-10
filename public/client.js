//SHIP.js
function generateShip() {
    ship = {
        'name' : 'SS M80',
        'speed' : 10
    };
    return ship;
}

shipObj = generateShip();

//poor boys move ship function lol
function moveShip(speed, destX, destY) {
   var x = (speed * (destX - ship.position.x))/500;
   var y = (speed * (destY - ship.position.y))/500;
//   alert('updating x: ' + x);
//   alert('updating y: ' + y);
   ship.position.x = ship.position.x + x;
   ship.position.y = ship.position.y + y;
}

//Mathy stuff?

var renderer = PIXI.autoDetectRenderer(800, 600,{backgroundColor : 0x1099bb});
document.body.appendChild(renderer.view);

// create the root of the scene graph
var stage = new PIXI.Container();

// create a texture from an image path
var texture = PIXI.Texture.fromImage('graphics/ship_size_1.png');

// create a new Sprite using the texture
var ship = new PIXI.Sprite(texture);

// center the sprite's anchor point
ship.anchor.x = 0.5;
ship.anchor.y = 0.5;

// move the sprite to the center of the screen
ship.position.x = 200;
ship.position.y = 150;

stage.addChild(ship);
animate();
function animate() {
    requestAnimationFrame(animate);
    renderer.render(stage);
}

//MOUSE CONTROL STUFF
var cursorX, cursorY;
document.onmousemove = function(e) {
    cursorX = e.pageX;
    cursorY = e.pageY;
}
setInterval('clientUpdateLoop()', 100);
function clientUpdateLoop() {
    moveShip(shipObj['speed'], cursorX, cursorY);
    ship.rotation = Math.atan2(ship.position.y - cursorY, ship.position.x - cursorX) - .5*Math.PI;
}


// start animating

var socket = io();
 
//test function for communication between client/server
$('body').click(function(){
    socket.emit('click', 'click lol');
    ship.position.y += 10;
    return false;
});
