var cheerio = require('cheerio');
var request = require('request');
var google = require('google');
var chance = require('chance').Chance();
var fs = require('fs');

// google.resultsPerPage = 10;
// var nextCounter = 0;


// google('что-нибудь', function (err, res){
//   if (err){
//      addel(err.toString('utf-8'));
//   }else{
//     for (var i = 0; i < res.links.length; ++i) {
//       var link = res.links[i];
//       elreq(link.href);
//       //console.log(link.title + ' - ' + link.href)
//       //console.log(link.description + "\n")
//     }
//
//     if (nextCounter < 4) {
//       nextCounter += 1
//       if (res.next) res.next()
//     }
//   }
// });

// process.argv.forEach(function (val, index, array) {
//   console.log(val);
// });

var querystring = 'https://yandex.ru/search/xml?user=zombiehot&key=03.79693390:7b9d07a2ea90192104f6aebe3c6726a6';

function yandex(query , callback){
  var output = chance.string() + '_' + query;
  request( querystring +'&query='+query, function(err, res, body){
    if(err){console.log(err);}
    else{
      $ = cheerio.load(body);
      $('url').each(function(i){
        if($(this).html()){
          elreq( $(this).html() , output );
          addsite( $(this).html() );
          savequery( query );
        }
      })
      if(callback) callback( output );
    }
  })
}

// var sites = process.argv.splice(2, process.argv.length);
//
// var filename = chance.string();
// for ( var n in sites){
//   yandex( sites[n] , filename + '_' + sites[n] );
// }

function elreq(url , randomname){
  request(url, function(err, res, body){
    if(err){console.log(err);}
    else{
      $ = cheerio.load(body);
      var can = true;
      //console.log(body);
      $('*').each(function(i){
        if(Math.random()>0.9 && can && $(this).html() ){
          addel( $(this).html(),  ( randomname || chance.string() ) );
          can = false;
        }
      })
    }
  })
}

function addel(el, name){
  var stream = fs.createWriteStream( './outhtml/'+ name +'.html', {'flags': 'a'});
  stream.write(el);
  stream.end('');
}

function addsite( url ){
  var stream = fs.createWriteStream( './sites.txt', {'flags': 'a'});
  stream.end(url+"\n");
}

function savequery( url ){
  var stream = fs.createWriteStream( './queries.txt', {'flags': 'a'});
  stream.end(url+"\n");
}

module.exports  =  yandex ;
