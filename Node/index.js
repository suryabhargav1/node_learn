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

    //chose the handler this req should goto if not found use not notFound
    var choosenHandler = typeof(router[trimedPath]) !== 'undefined' ? router[trimedPath] : handlers.notFound ;

    //conruct data object to send to handler
    var data = {
      'trimedPath' : trimedPath,
      'queryStringObject' : queryStringObject,
      'method' : method,
      'headers' : headers,
      'payload' : buffer
    }

    //route this requests specified in the router
    choosenHandler(data,function(statusCode,payload){
      //use the status code called back by handler, default to 200
      statusCode = typeof(statusCode) == 'number' ? statusCode : 200;

      //use the pay load called back by the handler, or default to empty
      payload = typeof(payload) == 'object' ? payload :{};

      // Convert pay load to string
      var payloadString = JSON.stringify(payload);

      //return reaponse
      res.setHeader('Content-Type', 'application/json');
      res.writeHead(statusCode);
      res.end(payloadString);

      //creating log
        console.log('Returning this response',statusCode,payloadString);
    });


  })
});

//Start server and list to port 300
server.listen(3000,function(){
  console.log('I am listening in 3000');
});

//Define the handlers
var handlers = {};

//sample handlers
handlers.sample = function(data,callback){
  //call back a http status code and Payload(object)
  callback(406,{'name' : 'sample handler'});
};

//not found folder
handlers.notFound = function(data,callback){
  callback(404);
};

//Defineing a req router
var router = {
  'sample' : handlers.sample
}
