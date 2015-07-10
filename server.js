var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);

//load static directory and serve up index.html
app.use(express.static('public'));
app.get('/', function(req, res) {
    res.sendFile('index.html', {'root': __dirname});
});

io.on('connection', function(socket) {
    //handles socket for individual connection
    console.log('new user connected!');
    socket.on('click', function(msg){
        console.log('message: ' + msg);
    });
    socket.on('disconnect', function(){
        console.log('user disconnected :(');
    });
});
  
http.listen(3000, function() {
    console.log('Server running at http://127.0.0.1:3000');
});
