const express = require("express");
const bodyParser = require('body-parser');
const fs = require('fs');
const http = require('http');
const https = require('https');

// const privateKey  = fs.readFileSync('sslcert/server.key', 'utf8');
// const certificate = fs.readFileSync('sslcert/server.crt', 'utf8');

// const credentials = {key: privateKey, cert: certificate};

const app = express();

app.use(bodyParser.json());

app.all("/*", function(req, res) {
  res.send({
    featId: req.body.feature,
    registered: true,
    expDate: "2030-01-01",
    key: req.body.key
  });
});

const httpServer = http.createServer(app);
// const httpsServer = https.createServer(credentials, app);

httpServer.listen(8080);
// httpsServer.listen(8443);
