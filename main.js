var bgImg = document.createElement("img");
bgImg.src = "images/map.png";
var eImg = document.createElement("img");
eImg.src = "images/rukia.gif";
var tImg = document.createElement("img");
tImg.src = "images/tower-btn.png";
var canvas = document.getElementById("game-canvas");
var ctx = canvas.getContext("2d");
var ememy = {
  x:10,
  y:10
};

function draw(){
  ctx.drawImage(bgImg,0,0);
  ctx.drawImage(eImg,ememy.x,ememy.y);
  ctx.drawImage(tImg,640-64,480-64,64,64);
}
setInterval(draw,16);
$("body").on("keypress",key);
function key(event){
  console.log(event.which)
  if(event.which === 119){
    ememy.y -= 0.1
  }
  if(event.which === 115){
    ememy.y += 0.1
  }
  if(event.which === 100){
    ememy.x += 0.1
  }
  if(event.which === 97){
    ememy.x -= 0.1
  }
}
