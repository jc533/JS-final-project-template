var bgImg = document.createElement("img");
bgImg.src = "images/map.png";
var ememy = document.createElement("img");
ememy.src = "images/rukia.gif";
var canvas = document.getElementById("game-canvas");
var ctx = canvas.getContext("2d");
function draw(){
  ctx.drawImage(bgImg,0,0);
  ctx.drawImage(ememy,Math.random()*500,Math.random()*100);
}
setTimeout(draw,1000);
