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
setInterval(draw,10);
$("body").on("keypress",key);
function key(event){
  console.log(event.which)
  if(event.which === 119){
    ememy.y -= 50
  }
  if(event.which === 115){
    ememy.y += 5
  }
  if(event.which === 100){
    ememy.x += 5
  }
  if(event.which === 97){
    ememy.x -= 5
  }
}
