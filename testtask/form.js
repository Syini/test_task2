const express = require("express");
const bodyParser = require("body-parser");

var https = require("https");
var username = 'jquery';

const app = express();
var body = '';
const urlencodedParser = bodyParser.urlencoded({extended: false});
app.get("/test", urlencodedParser, function (request, response) {

  response.sendFile(__dirname + "/test.html");
});
app.post("/test", urlencodedParser, async function (req, response) {
  var options = {
    host: 'api.github.com',
    path: '/users/' + username + '/repos',
    method: 'GET',
    headers: {'user-agent': 'node.js'}
  };
  var request = await https.request(options, function(response){

    response.on("data", function(chunk){
      body += chunk.toString('utf8');
    });

    response.on("end", function(){
      console.log("Body: ", body);
    });
  });

  request.end();
  if(!req.body) return response.sendStatus(400);
  console.log(request.body);
  response.send(request.body);
});

app.get("/", function(request, response){
  response.send("Главная страница");
});

app.listen(3000);