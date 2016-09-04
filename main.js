var bgImg = document.createElement("img");
bgImg.src = "images/map.png";
var ememy = document.createElement("img");
ememy.src = "images/rukia.gif";
var canvas = document.getElementById("game-canvas");
var ctx = canvas.getContext("2d");
function draw(){
  ctx.drawImage(bgImg,0,0);
}
function draw2(){
  ctx.drawImage(ememy,Math.random()*10,Math.random()*10);
}
setTimeout(draw,1000);
setTimeout(draw2,1000);
