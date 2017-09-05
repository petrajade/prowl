var numberOfPins = 75;

for (i = 0; i < numberOfPins; i++) {
  var randomDelayNum = Math.floor(Math.random() * 15000);
  setTimeout(makeDiv, randomDelayNum);
}

function makeDiv() {
    var flashes = ["flash1", "flash2", "flash3", "flash4"];

    var redBoxMinX = ($(document).width() / 2) - 250;
    var redBoxMaxX = ($(document).width() / 2) + 200;
    var redBoxMaxY = ($(document).height() / 2) + 100;

    var posX = Math.floor(Math.random() * $(document).width())
    var posY = Math.floor(Math.random() * (($(document).height() - $(document).height() / 2)) + $(document).height() / 2 + 100) - 100;

    if (posX >= redBoxMinX && posX <= redBoxMaxX && posY > redBoxMaxY) {
      posX = posX + 450;
    }

    var randomFlashNum = Math.floor(Math.random() * 4);
    var randomDelayNum = Math.floor(Math.random() * 10000);

    $newdiv = $('<div/>')
    $newdiv.css({
      'height': 100 + 'px',
      'width': 100 + 'px',
      'background-image': 'url(' + '_img/' + flashes[randomFlashNum] + '.png' + ')',
      'border-radius': 50 + '%',
      'opacity': 1,
      'position': 'absolute',
      'left': posX + 'px',
      'top': posY + 'px',
      'display': 'none',
      'z-index': -2
    }).appendTo('#primaryContainer').fadeIn(300).delay(0).fadeOut(500, function() {
      $(this).remove();
      setTimeout(makeDiv, randomDelayNum);
    });
}