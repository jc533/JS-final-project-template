var bgImg = document.createElement("img");
bgImg.src = "images/map.png";
var eImg = document.createElement("img");
eImg.src = "images/rukia.gif";
var canvas = document.getElementById("game-canvas");
var ctx = canvas.getContext("2d");
var ememy = {
  x:10,
  y:10
};
function draw(){
  ctx.drawImage(bgImg,0,0);
  ctx.drawImage(eImg,ememy.x,ememy.y);
}
setTimeout(draw,1000);
for(var i = 1;i<90;i++){
  ememy.x += Math.random()*100
  ememy.y += Math.random()*100
}
