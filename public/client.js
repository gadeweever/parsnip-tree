var renderer = PIXI.autoDetectRenderer(800, 600,{backgroundColor : 0x1099bb});
document.body.appendChild(renderer.view);

// create the root of the scene graph
var stage = new PIXI.Container();

ship = new Ship();

stage.addChild(ship.sprite);
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
    ship.move(cursorX, cursorY);
}


// start animating

var socket = io();
 
//test function for communication between client/server
$('body').click(function(){
    socket.emit('click', 'click lol');
    ship.position.y += 10;
    return false;
});
