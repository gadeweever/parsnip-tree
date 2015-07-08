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

// start animating
animate();
function animate() {
    requestAnimationFrame(animate);
    renderer.render(stage);
}

var socket = io();
 
//test function for communication between client/server
$('body').click(function(){
    socket.emit('click', 'click lol');
    ship.position.y += 10;
    return false;
});