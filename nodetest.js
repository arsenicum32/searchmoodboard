var express = require('express');
var app = express();

app.use('/gen' , express.static('outhtml'));
app.use(express.static('public'));

app.get('/', function (req, res, next) {
  res.sendFile('./public/index.html');
});


app.listen( 16000, function () {
  console.log('Example app listening on port 8700!');
});
