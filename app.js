var yandex = require('./makeb.js');

var express = require('express');
var app = express();

app.use('/gen' , express.static('outhtml'));
app.use(express.static('public'));

app.get('/', function (req, res, next) {
  res.sendFile('./public/index.html');
});

app.get('/search/:q', function (req, res, next) {
  yandex(req.params.q, function(dt){
    res.send(dt);
  });
});

app.get('/search/test/:q', function (req, res, next) {
  yandex(req.params.q, function(dt){
    res.send(dt);
  }, true);
});

app.listen( 8700, function () {
  console.log('Example app listening on port 8700!');
});


// app.get('/events', function (req, res) {
//   res.setHeader('Content-Type', 'text/event-stream')
//   res.setHeader('Cache-Control', 'no-cache')
//
//   // send a ping approx every 2 seconds
//   var timer = setInterval(function () {
//     res.write('<img src="https://robohash.org/'+(new Date()).getTime()+'" />')
//
//     // !!! this is the important part
//     res.flushHeaders()
//   }, 2000)
//
//   res.on('close', function () {
//     clearInterval(timer);
//   })
// })

//yandex('hi');
