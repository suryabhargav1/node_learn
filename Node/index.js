/*
* primary file for api
*/

//Dependencies
var http = require('http');
var url = require('url');
var StringDecoder = require('string_decoder').StringDecoder;

// server should respond to all requests
var server = http.createServer(function(req,res){

//pasing url
  var parseUrl = url.parse(req.url,true);

//get the path
  var path = parseUrl.pathname;
  var trimedPath = path.replace(/^\/+|\/+$/g,'');

//GEt the query string as an object
  var queryStringObject = parseUrl.query;


//get the http meothod
  var method = req.method.toLowerCase();

//Get the Header sent by user
  var headers = req.headers;

//Get the payloads, if any
var decoder = new StringDecoder('utf-8');
var buffer = '';
req.on('data',function(data){
  buffer += decoder.write(data);
});
req.on('end',function(){
  buffer += decoder.end();

  //send the response
    res.end('Hello world\n');
  //creating log
    console.log('Recived request with these payload: ',buffer);

})



});

//Start server and list to port 300
server.listen(3000,function(){
  console.log('I am listening in 3000');
});
