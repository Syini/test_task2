const express = require("express");
const bodyParser = require("body-parser");

var https = require("https");
var username = 'Syini';

const app = express();
var body = '';
const urlencodedParser = bodyParser.urlencoded({extended: false});
app.get("/test", urlencodedParser, function (request, response) {

  response.sendFile(__dirname + "/test.html");
});
app.post("/check", urlencodedParser, async function (req, response) {
  console.log(req.body)
  var options = {
    host: 'api.github.com',
    path: '/users/' + req.body.userName + '/repos',
    method: 'GET',
    headers: {'user-agent': 'node.js'}
  };
  var request = await https.request(options, function(response){

    response.on("data", function(chunk){
      body += chunk.toString('utf8');
    });

    response.on("end", function(){
      console.log(JSON.parse(body));
      // var element = document.createElement("div")
      // element.innerText = `${JSON.parse(body)}`
    });
  });

  request.end();
  if(!req.body) return response.sendStatus(400);

  response.send(request.body);
});

app.get("/check", function(request, response){
});

app.listen(3000);