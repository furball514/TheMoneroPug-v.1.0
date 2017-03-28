$(document).ready(function() {

  var currency = 'usd';

  $('.round').click(function() {
    $('.full').toggle();
  });

  $.getJSON('https://api.cryptonator.com/api/ticker/xmr-usd', function(data) {
    var price = data.ticker.price;
    var volume = data.ticker.volume;
    var change = data.ticker.change;
    var i = price.indexOf('.');
    var j = volume.indexOf('.');
    var fullPrice = price.substr(i + 3, price.length);
    var fullVolume = volume.substr(j + 3, volume.length);
    var roundedPrice = price.replace(fullPrice, '');
    var roundedVolume = volume.replace(fullVolume, '');
    $('#price').html(roundedPrice + '<span class="full">' + fullPrice + '</span>' + '&nbsp;' + currency.toUpperCase());
    $('#volume').html(roundedVolume + '<span class="full">' + fullVolume + '</span>' + '&nbsp;' + currency.toUpperCase());
    $('#change').html(change);
    if (change.charAt(0) === '-') {
      $('p').html('BOOHOO!');
    } else if (change.charAt(0) === '+') {
      $('p').html('We\'re going to the moon!');
    } else {
      $('p').html('');
    }
    $('h6').text(data.timestamp);
    //console.log(data.timestamp);
    /*$.getJSON('http://www.convert-unix-time.com/api?timestamp='+ data.timestamp,function(time){
      //console.log(time);
    });*/
  });

  $('button').click(function() {
    if (currency === 'usd') {
      currency = 'btc';
    } else if (currency === 'btc') {
      currency = 'usd';
    }
    $.getJSON('https://api.cryptonator.com/api/ticker/xmr-' + currency, function(data) {
      var price = data.ticker.price;
      var volume = data.ticker.volume;
      var change = data.ticker.change;
      var i = price.indexOf('.');
      var j = volume.indexOf('.');
      var fullPrice = price.substr(i + 3, price.length);
      var fullVolume = volume.substr(j + 3, volume.length);
      var roundedPrice = price.replace(fullPrice, '');
      var roundedVolume = volume.replace(fullVolume, '');
      $('#price').html(roundedPrice + '<span class="full">' + fullPrice + '</span>' + '&nbsp;' + currency.toUpperCase());
      $('#volume').html(roundedVolume + '<span class="full">' + fullVolume + '</span>' + '&nbsp;' + currency.toUpperCase());
      $('#change').html(change);
    });
  });
 //------------------------------------------------------
  var id = 753252;

  function btcTalk() {
    $.ajax({
      url: 'http://bitcointalkapi.appspot.com/v1/topics/' + id + '?pageId=latest',
      dataType: 'json',
      success: function(data) {
        console.log(data);
      },
      error: function(data) {
        console.log('error');
        $('section').text('BitcoinTalk API failed,showing r/xmrtrader instead.');
        setTimeout(rxmrtrader, 1000);
      }
    });
  }

  function rxmr() {
    $.getJSON('http://www.reddit.com/r/monero/new.json?sort=new', function(data) {
      $('section').append('r/Monero:&nbsp;' + '<a href="' + data.data.children[0].data.url + '" target="_blank">' + data.data.children[0].data.title + '</a>' + '<br>' + data.data.children[0].data.selftext);
      //console.log(data);
    });
  }

  function rxmrtrader() {
    $.getJSON('http://www.reddit.com/r/xmrtrader/new.json?sort=new', function(data) {
      //console.log(data);
      $('section').append('r/xmrtrader:&nbsp;' + '<a href="' + data.data.children[1].data.url + '" target="_blank">' + data.data.children[1].data.title + '</a>' + '<br>' + data.data.children[1].data.selftext);
    });
  }

  function stacknews() {
    $.getJSON('https://api.stackexchange.com/2.2/questions?site=monero.stackexchange&key=pBB66N00y6UB2taxSwd0mg((', function(data) {
      $('section').append('monero.stackexchange:&nbsp;' + '<a href="' + data.items[0].link + '" target="_blank">' + data.items[0].title + '</a>' + '<br>');
      //console.log(data);
    });
  }

  var setting;
  switch (setting) {
    case 'btc':
      btcTalk();
      break;
    case 'rxmr':
      rxmr();
      break;
    case 'rxmrtrader':
      rxmrtrader();
      break;
    case 'stack':
      stacknews();
      break;
  }
});