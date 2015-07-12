var renderer = PIXI.autoDetectRenderer(800, 600,{backgroundColor : 0x006994});
document.body.appendChild(renderer.view);

// create the root of the scene graph
var stage = new PIXI.Container();
//create socket
var socket = io();

player = new Player('Captain Smitty', 'SS Anne');


stage.addChild(player.ship.sprite);
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
    var stepInput = player.genMove(cursorX, cursorY);
    socket.emit('input', stepInput); 
}


// start animating

 
//test function for communication between client/server
$('body').click(function(){
    socket.emit('click', 'click lol');
    return false;
});
