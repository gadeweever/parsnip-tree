var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);

var Player = function (x, y) {
    this.key = 0;
    this.x = x;
    this.y = y;
    this.rotation = 0;
}

/*UTILITY FUNCTIONS*/
function findPlayer(key,playerList) {
    //finds player in playerList
    console.log('Called with key: ' + key);
    console.log('Current Players List:');
    console.log(players);
    for (i = 0; i < playerList.length; i++) {
        console.log('This player' + playerList[i]);
        if (playerList[i].key == key) {
            console.log('THIS ONE: \n');
            console.log(playerList[i]);
            return(i);
        }
    }
}

/*Sets up globals*/
var players = [];
var key = 0;

/*handle requests*/
app.use(express.static('public'));
app.get('/', function (req, res) {
    res.sendFile('index.html', {'root': __dirname});
});

/*handle single connection*/
io.on('connection', function (socket) {
    console.log('user connected');
    var thisPlayer = new Player(100,100);
    thisPlayer.key = key;
    console.log('EMItting YOURKEYIS');
    socket.emit('yourKeyIs', key);
    key += 1;
    players.push(thisPlayer);
    socket.on('input', function (msg) {
        console.log(msg);
        playerIndex = findPlayer(msg.key, players);
        player = players[playerIndex];
        player.x += msg.moveX;
        player.y += msg.moveY;
        player.rotation = msg.rotation;
        console.log(player);
        console.log(players);
    });
    socket.on('disconnect', function () {
        console.log('client disconnected');
        playerIndex = findPlayer(thisPlayer.key, players)
        players.splice(playerIndex, 1);
        io.sockets.emit('deletePlayer', thisPlayer.key);
    });
});

/*start server*/
http.listen(3000, function() {
    console.log('Server running at http://127.0.0.1:3000');
});

setInterval(function () {
    console.log('sending players: ');
    for (i=0; i < players.length; i++) {
        console.log(players[i].key);
    }
    io.sockets.emit('gameStateUpdate', players);
}, 50);