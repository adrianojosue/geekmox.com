var express = require('express');
var server = express();

server.use(express.static(__dirname + '/public'));

server.get('*', function(req,res){
  res.sendFile('/public/index.html', {root:__dirname});
});

server.listen(8080, function(err){
  if(err){
    console.log('express server: error');
  }else{
    console.log('express server: listening on port 8080');
  }
});
