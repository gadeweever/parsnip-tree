var http = require('http');

http.createServer(function (req, res) {
  
  res.writeHead(200, {'Content-Type': 'text/html'});
  res.end('<canvas width=\"100%\" height=\"100%\" style=\"border:1px solid #000000;\"></canvas>\n');

}).listen(3000, '127.0.0.1');

console.log('Server running at http://127.0.0.1:3000/');