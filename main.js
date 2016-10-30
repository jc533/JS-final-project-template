var canvas = document.getElementById("game-canvas");
var ctx = canvas.getContext("2d");
ctx.font = "24px Arial";
ctx.fillStyle = "white";
var FPS = 60;
var hp = 100;
var enemies = [];
var keyp = {w:false,a:false,s:false,d:false};
var clock = 0;
var bgImg = document.createElement("img");
bgImg.src = "images/map.png";
var croImg = document.createElement("img");
croImg.src = "images/crosshair.png";
var eImg = document.createElement("img");
eImg.src = "images/slime.gif";
var towbtnImg = document.createElement("img");
towbtnImg.src = "images/tower-btn.png";
var towImg = document.createElement("img");
towImg.src = "images/tower.png";
var rImg = document.createElement("img");
rImg.src = "images/rukia.gif";
var isBuilding = false;;
var enemyPath = [{x: 96, y: 64},{x: 384, y: 64},{x: 384, y: 192},{x: 224, y: 192},{x: 224, y: 320},{x: 544, y: 320},{x:544,y:96}];
var cursor = {x:0,y:0};
var tower = {
  x:0,
  y:0,
  shoot:function(id){
    attack(this.x,this.y,enemies[id].x,enemies[id].y);
    enemies[id].hp -= this.damage;
  },
  fireRate: 1,
  readToShootTime: 1,
  damage: 50,
  range:96,
  aimingEnemyId:null,
  searchEnemy:function(){
    this.readToShootTime -=1/FPS;
    this.aimingEnemyId = null;
    for(var i = 0;i<enemies.length;i++){
      var distance = Math.sqrt(
        Math.pow(this.x - enemies[i].x,2) + Math.pow(this.y - enemies[i].y,2)
      );
     if(distance <= this.range){
       this.aimingEnemyId = i;
       if(this.readToShootTime <= 0){
         this.shoot(this.aimingEnemyId);
         this.readToShootTime = this.fireRate
       }
       return;
     } 
    }
  }
};
var rukia = {
  x:0,
  y:0,
  v:[0,0]
  move:function(keyp){
    this.v[0,0]
    if(keyp.w){
      this.v[1]= -64;}
    if(keyp.s){
      this.v[1]= 64;}
    if(keyp.a){
      this.v[0]= -64;}
    if(keyp.d){
      this.v[0]= 64;}
 }
};
function Enemy()  {
  this.x = 96;
  this.y = 448;
  this.hp = 100 
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
// enemies.push(new Enemy());
function attack(x1,y1,x2,y2){
  ctx.beginPath();
  ctx.moveTo(x1,y1);
  ctx.lineTo(x2,y2);
  ctx.strokeStyle = "red";
  ctx.lineWidth = 3;
  ctx.stroke();
}
function isCollided(pathX,pathY,enemyX,enemyY,speedX,speedY){
  if(enemyX >= pathX - speedX && enemyX <= pathX + speedX){
    if(enemyY >= pathY - speedY && enemyY <= pathY + speedY){
      return true;
    }
  }
  return false;
}
function draw(){
  clock++
  if(clock%80 == 0){
    enemies.push(new Enemy());
  }
  ctx.drawImage(bgImg,0,0);
  ctx.drawImage(towImg,tower.x,tower.y);
  tower.searchEnemy()
  ctx.drawImage(towbtnImg,640-64,480-64,64,64);
  rukia.move(keyp);
  ctx.drawImage(rImg,rukia.x,rukia.y);
  ctx.fillText("HP:"+hp,10,50);
  for(var i = 0;i<enemies.length;i++){
    if(enemies[i].hp<1){
      enemies.splice(i,1);    
    }else{
    enemies[i].move();
    ctx.drawImage(eImg,enemies[i].x,enemies[i].y);
    }
  }
  if(isBuilding == true){
    ctx.drawImage(towImg,cursor.x,cursor.y);
  }
  if(tower.aimingEnemyId != null){
    var id = tower.aimingEnemyId;
    ctx.drawImage(croImg,enemies[id].x,enemies[id].y);
  }
}
setInterval(draw,1000/FPS);
$("#game-canvas").on("click",function(){
  if(cursor.x >= 640-64 && cursor.y >= 480-64){
//     console.log("click");
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
$("body").on("keydown",function(event){
  if(event.which == 119){
    keyp.w = true;
  }
  if(event.which == 97){
    keyp.a = true;
  }
  if(event.which == 115){
    keyp.s = true;
  }
  if(event.which == 100){
    keyp.d = true;
  }
//   console.log(event.which)
});
$("body").on("keyup",function(event){
  if(event.which == 119){
    keyp.w = false;
  }
  if(event.which == 97){
    keyp.a = false;
  }
  if(event.which == 115){
    keyp.s = false;
  }
  if(event.which == 100){
    keyp.d = false;
  }
//   console.log(event.which)
});
