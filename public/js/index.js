document.body.addEventListener('keypress', function(e) {
  var p = document.getElementsByTagName('p')[0],
      vl = document.getElementsByTagName('input')[0].value,
      yet = true;
  if (e.keyCode == 13 && vl && yet) {
    var xhr = new XMLHttpRequest();
    p.innerHTML = 'loading...';
    xhr.open('GET', '/search/'+ vl , false);
    xhr.send();
    if (xhr.status != 200) {
      // обработать ошибку
      p.innerHTML = xhr.status + ': ' + xhr.statusText ; // пример вывода: 404: Not Found
    } else {
      // вывести результат
      yet = false;
      p.innerHTML = '<a href="/gen/'+xhr.responseText+'.html">'+xhr.responseText+'</a>';
      // setTimeout(function(){
      //    window.location.href = '/gen/'+xhr.responseText+'.html';
      // }, 2200);
    }
  }
}, false)
