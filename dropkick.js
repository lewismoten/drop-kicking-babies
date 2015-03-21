var canvas = document.getElementById("movie");
var context = canvas.getContext("2d");
var baby = document.createElement("img");
baby.onload = function() {
  context.drawImage(baby, 0, 0, 512 * baby.width / baby.height, 512);
}
baby.src = "http://upload.wikimedia.org/wikipedia/commons/2/26/Baby_in_an_infant_bodysuit.jpg";
