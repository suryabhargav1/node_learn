/*
*
*File for Hello World API
*/
var http = require('http');
var url = require('url');
var StringDecoder = require('string_decoder').StringDecoder;

var server = http.createServer(function(req,res){
  var parseUrl = url.parse(req.url,true);
  var path = parseUrl.pathname;
  var trimmedPath = path.replace(/^\/+|\/+$/g,'');

  var decoder = new StringDecoder("utf-8");
  var buffer = ' ';
  req.on('data', function(data){
    buffer += decoder.write(data);
  });
  req.on('end', function(){
    buffer += decoder.end();
    var endMessage = {};
    endMessage.key = trimmedPath === "hello" ? 'Hello World' : 'sorry only /hello works for now';
    endMessage = JSON.stringify(endMessage);
    res.setHeader('Content-Type', 'application/json');
    res.end(endMessage);
  });
  console.log('Trimmed path is '+trimmedPath);

});
server.listen(5000,function(){
  console.log("listening at 5000");
});
