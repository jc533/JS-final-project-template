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
var isBuilding = false;;
var enemyPath = [{x: 96, y: 64},{x: 384, y: 64},{x: 384, y: 192},{x: 224, y: 192},{x: 224, y: 320},{x: 544, y: 320},{x:544,y:96}];
var cursor = {
  x:0,
  y:0
};
var tower = {x:0,y:0};
function Enemy()  {
  this.x = 96;
  this.y = 448;
  this.speed = 64;
  this.speedx = 0;
  this.speedy = -64;
  this.pathDes = 0;
  this.move = function(){
//     console.log(isCollided(enemyPath[this.pathDes].x,enemyPath[this.pathDes].y,this.x,this.y,this.speed/FPS,this.speed/FPS))
    if(isCollided(enemyPath[this.pathDes].x,enemyPath[this.pathDes].y,this.x,this.y,this.speed/FPS,this.speed/FPS) === true){
      this.x = enemyPath[this.pathDes].x;
      this.y = enemyPath[this.pathDes].y;
//       console.log(this.x,this.y);
      this.pathDes ++;
      if(this.x == enemyPath[this.pathDes].x){
        this.speedx = 0;
      }else if(this.x < enemyPath[this.pathDes].x){
        this.speedx = 64;
      }else if(this.x > enemyPath[this.pathDes].x){
        this.speedx = -64;
      }
      if(this.y == enemyPath[this.pathDes].y){
        this.speedy = 0;
      }else if(this.y < enemyPath[this.pathDes].y){
        this.speedy = 64;
      }else if(this.y > enemyPath[this.pathDes].y){
        this.speedy = -64;
      }
    }else{
      this.x += this.speedx/FPS;
      this.y += this.speedy/FPS;
    }
  }  
};
var enemy = new Enemy();
function isCollided(pathX,pathY,enemyX,enemyY,speedX,speedY){
  if(enemyX >= pathX - speedX && enemyX <= pathX + speedX){
    if(enemyY >= pathY - speedY && enemyY <= pathY + speedY){
      return true;
    }
  }
  return false;
}
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
$("body").on("keypress",function(event){
  console.log(event.keycode)
});
