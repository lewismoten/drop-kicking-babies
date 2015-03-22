var canvas = document.getElementById("movie");
var button = document.getElementById("dropkick");
var context = canvas.getContext("2d");
var kicker = null;
var kickee = null;
var kickerImage = document.createElement("img");
var kickeeImage = document.createElement("img");
var lastDrawnTimeStamp = 0;
var kicking = null;

var balls = [];

var dropPath = [
  {x:212,y:5},
  {x:209,y:53},
  {x:209,y:103},
  {x:209,y:131},
  {x:208,y:172},
  {x:206,y:219},
  {x:209,y:269},
  {x:206,y:323},
  {x:208,y:375},
  {x:286,y:317},
  {x:358,y:286},
  {x:424,y:280},
  {x:474,y:283},
  {x:508,y:290}
  ];

button.onclick = function() {
  balls.push(0);
}

function init() {
  kickerImage.onload = drawKicker;
  $.getJSON("baby.json", function(data) {
    kicker = data;
    kickerImage.src = kicker.image.url;
  });
  $.getJSON("football.json", function(data) {
    kickee = data;
    kickeeImage.src = kickee.image.url;
    kicking = new Audio(kickee.sound.url); // pre-load
  });
  window.requestAnimationFrame(drawFrame);
}

function drawKicker() {
  if(kicker == null) {
    return;
  }
  var width = kicker.image.width;
  var height = kicker.image.height;
  var body = kicker.body;
  var foot = body.kicker;

  drawClippedImage(context, kickerImage, 0, 0, width, height, body.outline);

  if(balls.filter(function(el) { return el >= 8 && el <= 10}).length == 0) {
    drawClippedImage(context, kickerImage, -1, -1, width, height, foot.outline);
  }
  else {
    var pivot = foot.pivot;
    context.translate(pivot.x, pivot.y)
    context.rotate(-pivot.rotate);

    drawClippedImage(context, kickerImage,
      pivot.width,
      pivot.height,
      width,
      height,
      foot.outline);

    context.rotate(pivot.rotate);
    context.translate(
      -pivot.x,
      -pivot.y);
  }
}

function offset(pos, x, y) {
  return {
    x: pos.x + x,
    y: pos.y + y
  };
}

function drawClippedImage(context, image, x, y, width, height, clipCoordinates) {
  context.save();
  context.beginPath();
  for(var i = 0; i < clipCoordinates.length; i++) {
    var pos = offset(clipCoordinates[i], x, y);
    if(i == 0) context.moveTo(pos.x, pos.y);
    context.lineTo(pos.x, pos.y);
  }
  context.closePath();
  context.clip();
  context.drawImage(image, x, y, width, height);
  context.restore();
}

function drawFrame(timeStamp) {

  if(timeStamp - lastDrawnTimeStamp > 50) {
    lastDrawnTimeStamp = timeStamp;

    context.clearRect(0, 0, canvas.width, canvas.height);
    drawKicker();

    if(balls.indexOf(8) != -1) {
      new Audio(kickee.sound.url).play();
    }

    for(var i = 0; i < balls.length; i++)
    {
      var frame = balls[i]++;
      drawKickee(frame);
      frame++;
      if(frame >= dropPath.length) {
        balls.splice(i--, 1);
      }
    }
  }

  window.requestAnimationFrame(drawFrame);
}

function drawKickee(frame) {
  if(frame >= dropPath.length) return;
  if(kickee == null) return;
  var pos = dropPath[frame];
  drawClippedImage(context, kickeeImage, pos.x, pos.y, kickee.image.width, kickee.image.height, kickee.outline);
}

init();
