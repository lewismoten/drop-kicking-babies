var canvas = document.getElementById("movie");
var button = document.getElementById("dropkick");
var context = canvas.getContext("2d");
var kicker = null;
var kickee = null;
var kicking = null;
var kickerImage = document.createElement("img");
var kickeeImage = document.createElement("img");
var lastDrawnTimeStamp = 0;
var balls = [];

$(document).ready(function(){
  kickerImage.onload = drawKicker;
  window.requestAnimationFrame(drawFrame);
});

function drawKicker() {
  if(kicker == null) {
    return;
  }
  var width = kicker.image.width;
  var height = kicker.image.height;
  var body = kicker.body;
  var foot = body.kicker;

  drawClippedImage(kickerImage, 0, 0, width, height, body.outline);

  if(balls.filter(function(frame) {
    var kick = kicker.drop.kick;
    return frame.between(kick.start, kick.end);
    }).length == 0) {
    drawClippedImage(kickerImage, -1, -1, width, height, foot.outline);
  }
  else {
    var pivot = foot.pivot;
    context.translate(pivot.x, pivot.y)
    context.rotate(-pivot.rotate);

    drawClippedImage(kickerImage,
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

function drawClippedImage(image, x, y, width, height, clipCoordinates) {
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

  if(canDraw(timeStamp)) {
    lastDrawnTimeStamp = timeStamp;

    context.clearRect(0, 0, canvas.width, canvas.height);
    drawKicker();

    if(balls.indexOf(kicker.drop.kick.start) != -1) {
      new Audio(kickee.sound.url).play();
    }

    for(var i = 0; i < balls.length; i++)
    {
      var frame = balls[i]++;
      drawKickee(frame);
      frame++;
      if(frame >= kicker.drop.path.length) {
        balls.splice(i--, 1);
      }
    }
  }

  window.requestAnimationFrame(drawFrame);
}

function canDraw(timeStamp) {
  return kicker != null
    && kickee != null
    && timeStamp - lastDrawnTimeStamp > 50;
}
function drawKickee(frame) {
  if(kicker == null || kickee == null) return;
  if(frame >= kicker.drop.path.length) return;
  var pos = kicker.drop.path[frame];
  drawClippedImage(kickeeImage, pos.x, pos.y, kickee.image.width, kickee.image.height, kickee.outline);
}

Number.prototype.between = function(a, b) {
   var min = Math.min.apply(Math, [a,b]);
   var max = Math.max.apply(Math, [a, b]);
   return this >= min && this <= max;
};
