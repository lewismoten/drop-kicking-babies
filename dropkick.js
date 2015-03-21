var canvas = document.getElementById("movie");
var context = canvas.getContext("2d");
var baby = document.createElement("img");
var football = document.createElement("img");

var babyOutline = [
  115,49,128,40,150,36,170,38,191,50,201,76,195,101,199,120,196,139,194,144,219,
  157,234,180,238,199,258,255,260,282,256,288,258,303,255,310,256,316,255,322,
  256,330,255,336,251,334,250,339,246,340,247,350,244,362,222,385,190,408,162,
  419,152,441,146,447,138,452,136,470,133,474,126,474,112,474,107,463,108,445,
  114,434,113,426,103,426,79,405,62,382,56,362,59,345,67,326,57,322,52,316,48,
  302,52,289,51,283,53,251,62,221,68,191,77,171,93,151,118,145,127,147,117,131,
  110,127,103,109,107,104,113,106,107,84,106,64
];

var footballOutline = [
  7,36,33,20,59,16,81,19,107,33,123,53,123,60,113,70,95,
  83,79,88,53,84,27,74,11,60,3,45
]

baby.onload = function() {
  var width = 341;
  var height = 512;
  drawClippedImage(context, baby, 0, 0, width, height, babyOutline);
}

football.onload = function() {
  var width = 125;
  var height = 100;
  drawClippedImage(context, football, 0, 0, width, height, footballOutline);
}

function drawClippedImage(context, image, x, y, width, height, clipCoordinates) {
  context.save();
  context.beginPath();
  var i = 0;
  context.moveTo(clipCoordinates[i++], clipCoordinates[i++]);
  while(i < clipCoordinates.length) {
    context.lineTo(clipCoordinates[i++], clipCoordinates[i++]);
  }
  context.lineTo(clipCoordinates[0], clipCoordinates[1]);
  context.closePath();
  context.clip();
  context.drawImage(image, x, y, width, height);
  context.restore();
}

baby.src = "http://upload.wikimedia.org/wikipedia/commons/2/26/Baby_in_an_infant_bodysuit.jpg";
football.src = "http://upload.wikimedia.org/wikipedia/commons/6/64/Football_signed_by_Gerald_R._Ford.jpg";
