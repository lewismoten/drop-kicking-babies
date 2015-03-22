var canvas = document.getElementById("movie");
var button = document.getElementById("dropkick");
var context = canvas.getContext("2d");
var baby = document.createElement("img");
var football = document.createElement("img");
var lastDrawnTimeStamp = 0;
var kickSound = "http://soundbible.com/grab.php?id=1120&type=mp3";

var balls = [];

var babyOutline = [
  178,361,184,352,245,339,255,334,258,318,257,307,259,285,262,279,257,250,240,
  208,239,189,220,159,194,140,200,127,198,97,204,73,191,48,164,36,125,40,110,
  55,107,79,112,103,106,108,112,129,119,131,128,148,96,149,75,173,70,192,52,
  253,49,287,46,302,57,321,66,330,55,355,61,380,85,412,110,427,114,429,106,453,
  112,473,133,476,138,470,141,450,119,433,128,418,137,409,120,374,139,380,
  164,374
  ];

var footOutline = [
  178,361,182,352,206,349,244,334,248,345,243,365,223,387,198,406,171,416,
  163,424,154,442,139,451,129,444,117,431,129,419,141,405
]
var footballOutline = [
  7,36,33,20,59,16,81,19,107,33,123,53,123,60,113,70,95,
  83,79,88,53,84,27,74,11,60,3,45
  ];

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
  new Audio(kickSound);
  baby.src = "http://upload.wikimedia.org/wikipedia/commons/2/26/Baby_in_an_infant_bodysuit.jpg";
  football.src = "http://upload.wikimedia.org/wikipedia/commons/6/64/Football_signed_by_Gerald_R._Ford.jpg";
  window.requestAnimationFrame(drawFrame);
}

baby.onload = function() {
  drawBaby();
}

function drawBaby() {
  var width = 341;
  var height = 512;
  drawClippedImage(context, baby, 0, 0, width, height, babyOutline);
  if(balls.filter(function(el) { return el >= 8 && el <= 10}).length == 0) {
    drawClippedImage(context, baby, -1, -1, width, height, footOutline);
  }
  else {
    var center = {x: 200, y: 438, r: 1.5};

    context.translate(center.x, center.y)
    context.rotate(-center.r);
    drawClippedImage(context, baby, -117, -334, width, height, footOutline);
    context.rotate(center.r);
    context.translate(-center.x, -center.y);
  }
}

function drawClippedImage(context, image, x, y, width, height, clipCoordinates) {
  context.save();
  context.beginPath();
  var i = 0;
  context.moveTo(clipCoordinates[i++] + x, clipCoordinates[i++] + y);
  while(i < clipCoordinates.length) {
    context.lineTo(clipCoordinates[i++] + x, clipCoordinates[i++] + y);
  }
  context.lineTo(clipCoordinates[0] + x, clipCoordinates[1] + y);
  context.closePath();
  context.clip();
  context.drawImage(image, x, y, width, height);
  context.restore();
}

function drawFrame(timeStamp) {

  if(timeStamp - lastDrawnTimeStamp > 50) {
    lastDrawnTimeStamp = timeStamp;

    context.clearRect(0, 0, canvas.width, canvas.height);
    drawBaby();

    if(balls.indexOf(8) != -1) {
      var sound = new Audio(kickSound);
      sound.play();
    }

    for(var i = 0; i < balls.length; i++)
    {
      var frame = balls[i]++;
      drawBall(frame);
      frame++;
      if(frame >= dropPath.length) {
        balls.splice(i--, 1);
      }
    }
  }

  window.requestAnimationFrame(drawFrame);
}

function drawBall(frame) {
  if(frame >= dropPath.length) return;
  var width = 125;
  var height = 100;
  var pos = dropPath[frame];
  drawClippedImage(context, football, pos.x, pos.y, width, height, footballOutline);
}

init();
