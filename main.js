var bgImg = document.createElement("img");
bgImg.src = "images/map.png";
var eImg = document.createElement("img");
eImg.src = "images/rukia.gif";
var towbtnImg = document.createElement("img");
towbtnImg.src = "images/tower-btn.png";
var towImg = document.createElement("img");
towImg.src = "images/tower.png";
var isBuilding = false
var canvas = document.getElementById("game-canvas");
var ctx = canvas.getContext("2d");
var cursor = {
  x:0,
  y:0
};
var tower = {x:0,y:0};
var ememy = {
  x:10,
  y:10,
  v:[1,1]
};
function draw(){
  ctx.drawImage(bgImg,0,0);
  ctx.drawImage(eImg,ememy.x,ememy.y);
  ctx.drawImage(towImg,tower.x,tower.y);
  ctx.drawImage(towbtnImg,640-64,480-64,64,64);
  if(isBuilding == true){
    ctx.drawImage(towImg,cursor.x,cursor.y);
  }
}
setInterval(draw,16);
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
$("body").on("keypress",key);
function key(event){
  // console.log(event.which)
  if(event.which === 119){
    ememy.y -= ememy.v[1];
    // ememy.v[1] *= 0.8;
    // ememy.v[1] += 1.1;
  }
  if(event.which === 115){
    ememy.y += ememy.v[1];
    // ememy.v[1] *= 0.8;
    // ememy.v[1] += 1.1;
  }
  if(event.which === 100){
    ememy.x += ememy.v[0];
    // ememy.v[0] *= 0.8;
    // ememy.v[0] += 1.1;
  }
  if(event.which === 97){
    ememy.x -= ememy.v[0];
    // ememy.v[0] *= 0.8;
    // ememy.v[0] += 1.1;
  }
}
