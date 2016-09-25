var canvas = document.getElementById("game-canvas");
var ctx = canvas.getContext("2d");
var FPS = 60
var bgImg = document.createElement("img");
bgImg.src = "images/map.png";
var eImg = document.createElement("img");
eImg.src = "images/slime.gif";
var towbtnImg = document.createElement("img");
towbtnImg.src = "images/tower-btn.png";
var towImg = document.createElement("img");
towImg.src = "images/tower.png";
var isBuilding = false
var cursor = {
  x:0,
  y:0
};
var tower = {x:0,y:0};
var enemy = {
  x:96,
  y:448,
  speedx:0,
  speedy:-64,
  move: function(){
    x += speed.x/FPS
    y += speed.y/FPS
  }  
};
function draw(){
  ctx.drawImage(bgImg,0,0);
  ctx.drawImage(eImg,enemy.x,enemy.y);
  ctx.drawImage(towImg,tower.x,tower.y);
  ctx.drawImage(towbtnImg,640-64,480-64,64,64);
  enemy.move()
  if(isBuilding == true){
    ctx.drawImage(towImg,cursor.x,cursor.y);
  }
}
setInterval(draw,1000/FPS);
$("#game-canvas").on("click",function(){
  if(cursor.x >= 640-64 && cursor.y >= 480-64){
    console.log("click");
    if(isBuilding == true){
      isBuilding = false ;
    }else{
      isBuilding = true;
    }
  }else{
    if(isBuilding == true){
      tower.x = cursor.x;
      tower.y = cursor.y;
    }
  }
});
$("#game-canvas").on("mousemove",function(event){
  cursor.x = event.offsetX - (event.offsetX % 32);
  cursor.y = event.offsetY - (event.offsetY % 32);
});

