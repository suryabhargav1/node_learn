/*
* Primary file for the API
*
*
*/

//Dependencies
var http = require('http');
var url = require('url');
var StringDecoder = require('string_decoder').StringDecoder;

//The server should respomd to all requests with a string
var server = http.createServer(function (req, res) {

    //get the url and parse
    var parsedUrl = url.parse(req.url, true);

    //Get the path
    var path = parsedUrl.pathname;
    var trimedPath = path.replace(/^\/+|\/+$/g, '');

    //getting query string as an object
    var queryStringObject = parsedUrl.query;

    //get the HTTP method
    var method = req.method.toLowerCase();

    // get the headers as an object
    var headers = req.headers;

    //geting payload, if any
    var decoder = new StringDecoder('utf-8');
    var buffer = '';
    req.on('data', function (data) {
        buffer += decoder.write(data);
    });
    req.on('end', function () {
        buffer += decoder.end();

        // Choose the Handler this request to go to if one is not found got not found handler
        var chosenHandler = typeof(router[trimedPath]) !== 'undefined' ? router[trimedPath]: handlers.notFound;

        //construct the data object to send to handler
        var data = {
            "trimedPath" : trimedPath,
            "queryStringObject": queryStringObject,
            "method": method,
            "headers" : headers,
            "payload": buffer
        }

        //Route the request to the Handler specifed in the router
        chosenHandler(data,function(statusCode,payload){
            //Use tha status code handler, or default to 200
            statusCode = typeof(statusCode) == "number"? statusCode : 200;


            // Use the payload callback by the hander, or default to empty object
            payload = typeof(payload) == 'object'? payload:{};

            //Convert the pay load to a string
            var payloadString = JSON.stringify(payload);

            //Return the response
            res.writeHead(statusCode);
            res.end(payloadString);

            //Log the Request path
            console.log("Returning the Response: ",statusCode,payloadString);

        });
    });

})

// Start the server, and have it listen on port 3000
server.listen(3001, function () {
    console.log('This server is listening on 3000');
})

//Define Handelers
var handlers = {}

//Sample Handler
handlers.sample = function(data,callback){
    //Call back a Http status code and a payload object
    callback(406,{'name':"sample handeler"})
};

//Not found Handler
handlers.notFound = function(data,callback){
    callback(404);
};

//Defining a Request router
var router = {
    'sample' : handlers.sample
}