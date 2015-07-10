var io = require('socket.io');
var renderer = PIXI.autoDetectRenderer(800, 600,{backgroundColor : 0x1099bb});
document.body.appendChild(renderer.view);
var socket = io();
$('body').click(function(){
    socket.emit('click', 'click lol');
    return false;
});
