// init project
var express = require("express");
var bodyParser = require("body-parser");
var app = express();
var url = String(process.env.HOSTNAME).split("-");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const users = [];

// This route processes GET requests to "/"`
app.get("/", function (req, res) {
  res.send(
    "<h1>REST API</h1><p>Puedes usar este endpoint para recibir un listado de usuarios https://" +
      url[2] +
      ".sse.codesandbox.io/users<i></p>"
  );
  console.log("Received GET");
});

// A route for POST requests sent to `/update`
app.post("/user", function (req, res) {
  if (!req.body.username || !req.body.avatar) {
    console.log("Received incomplete POST: " + JSON.stringify(req.body));
    return res.status(404).send("missing parameter(s)");
  } else {
    users.push(req.body);
    return res.send(req.body);
  }
});

// A GET request handler for `/update`
app.get("/users", function (req, res) {
  console.log("Received GET: " + JSON.stringify(req.body));
  if (req.query.username) {
    const user = users.find((u) => u.username === req.query.username);
    if (!user) res.status(404).send("user not found");
    else return res.send(user);
  } else {
    return res.send(users);
  }
});

// Listen on port 8080
var listener = app.listen(8080, function () {
  console.log("Listening on port " + listener.address().port);
});
