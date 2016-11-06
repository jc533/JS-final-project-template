var canvas = document.getElementById("game-canvas");
var ctx = canvas.getContext("2d");
ctx.font = "24px Arial";
ctx.fillStyle = "white";
var FPS = 60;
var hp = 100;
var money = 50
var score = 0
var enemies = [];
var towers = []
var keyp = {w:false,a:false,s:false,d:false,space:false};
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
function Tower(){
  this.x = 0;
  this.y = 0;
  this.hp = 96;
  this.shoot = function(id){
    attack(this.x,this.y,enemies[id].x,enemies[id].y,"yellow");
    enemies[id].hp -= this.damage;
  };
  this.fireRate = 1;
  this.readToShootTime = 1;
  this.damage = 10;
  this.range = 96;
  this.aimingEnemyId = null;
  this.searchEnemy = function(){
    this.readToShootTime -= 1/FPS;
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
  v:[0,0],
  shoot: function(id){
    attack(this.x,this.y,enemies[id].x,enemies[id].y,"blue");
    enemies[id].hp -= this.damage;
  },
  aimingEnemyId: null,
  damage: 2,
  range: 1000,
  searchEnemy: function(){
    this.aimingEnemyId = null;
    for(var i = 0;i<enemies.length;i++){
      var distance = Math.sqrt(
        Math.pow(this.x - enemies[i].x,2) + Math.pow(this.y - enemies[i].y,2)
      );
     if(distance <= this.range){
       this.aimingEnemyId = i;
       this.shoot(this.aimingEnemyId);
     }
       return;
    }
    }, 
  key:function(){
    if(keyp.w == true){
      this.v[1]= -64;
    }else if(keyp.s == true){
      this.v[1]= 64;
    }if(keyp.a == true){
      this.v[0]= -64;
    }else if(keyp.d == true){
      this.v[0]= 64;}
    if(keyp.space == true){
      console.log("attack")
      this.searchEnemy()
    }
  },
  move:function(){
    this.v = [0,0];
//     console.log(this.v)
    console.log("space "+keyp.space)
    this.key();
    this.x += this.v[0]/FPS;
    this.y += this.v[1]/FPS;
 }
};
function Enemy(){
  this.x = 96;
  this.y = 448;
  this.hp = 100; 
  this.speed = 64;
  this.speedx = 0;
  this.speedy = -64;
  this.damage  = 1;
  this.pathDes = 0;  
  this.shoot = function(id){
    attack(this.x,this.y,towers[id].x,towers[id].y,"red");
    towers[id].hp -= this.damage;
  };
  this.aimingEnemyId = null;
  this.range = 50;
  this.searchTower = function(){
    this.aimingEnemyId = null;
    for(var i = 0;i<towers.length;i++){
      var distance = Math.sqrt(
        Math.pow(this.x - towers[i].x,2) + Math.pow(this.y - towers[i].y,2)
      );
     if(distance <= this.range){
       this.aimingEnemyId = i;
       this.shoot(this.aimingEnemyId);
     }
       return;
    }
    };
  this.move = function(){
//     console.log(isCollided(enemyPath[this.pathDes].x,enemyPath[this.pathDes].y,this.x,this.y,this.speed/FPS,this.speed/FPS))
    if(isCollided(enemyPath[this.pathDes].x,enemyPath[this.pathDes].y,this.x,this.y,this.speed/FPS,this.speed/FPS) === true){
      this.x = enemyPath[this.pathDes].x;
      this.y = enemyPath[this.pathDes].y;
//       console.log(this.x,this.y);
      this.pathDes ++;
      if(this.pathDes == enemyPath.length){
        this.hp = 0;
        hp -= 10;
        money -= 5;
        score -= 10;
        return;
      }
      if(this.x == enemyPath[this.pathDes].x){
        this.speedx = 0;
      }else if(this.x < enemyPath[this.pathDes].x){
        this.speedx = this.speed;
      }else if(this.x > enemyPath[this.pathDes].x){
        this.speedx = this.speed * -1;
      }
      if(this.y == enemyPath[this.pathDes].y){
        this.speedy = 0;
      }else if(this.y < enemyPath[this.pathDes].y){
        this.speedy = this.speed;
      }else if(this.y > enemyPath[this.pathDes].y){
        this.speedy = this.speed * -1;
      }
    }else{
      this.x += this.speedx/FPS;
      this.y += this.speedy/FPS;
    }
  }  
};
// enemies.push(new Enemy());
function attack(x1,y1,x2,y2,color){
  ctx.beginPath();
  ctx.moveTo(x1,y1);
  ctx.lineTo(x2,y2);
  ctx.strokeStyle = color;
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
    var enemy = new Enemy()
    if(clock/400>1){
      enemy.hp += 10*clock/400
//       enemy.speed = 64*clock/400
      console.log(clock/80)
      enemy.speedy = enemy.speed*-1
    }
    enemies.push(enemy);
  }
  ctx.drawImage(bgImg,0,0);
  for(var i = 0;i<towers.length;i++){
    if(towers[i].hp<1){
      towers.splice(i,1);
    }else{
      ctx.drawImage(towImg,towers[i].x,towers[i].y);
      towers[i].searchEnemy()
    }
  }
  ctx.drawImage(towbtnImg,640-64,480-64,64,64);
  rukia.move();
  ctx.drawImage(rImg,rukia.x,rukia.y);
  for(var i = 0;i<enemies.length;i++){
    if(enemies[i].hp<1){
      enemies.splice(i,1); 
      score += 10
      money += 5
    }else{
      enemies[i].move();
      enemies[i].searchTower()
      ctx.drawImage(eImg,enemies[i].x,enemies[i].y);
    }
  }
  if(hp<1){
    ctx.font = "50px Arial";
    ctx.fillText("Gomeover",50,50);
    ctx.fillText("You got" + score,50,150);
    clearInterval(intervalId);
    return;
  }
  ctx.fillText("HP:"+hp,10,50);
  ctx.fillText("score:"+score,10,70);
  ctx.fillText("money:"+money,10,90);
  if(isBuilding == true){
    ctx.drawImage(towImg,cursor.x,cursor.y);
  }
  for(var i = 0;i<towers.length;i++){
    if(towers[i].aimingEnemyId != null){
      var id = towers[i].aimingEnemyId;
      ctx.drawImage(croImg,enemies[id].x,enemies[id].y);
  }
  }
}

var intervalId = setInterval(draw,1000/FPS);
$("#game-canvas").on("click",function(){
  if(cursor.x >= 640-64 && cursor.y >= 480-64){
//     console.log("click");
    if(isBuilding == true){
      isBuilding = false ;
    }else{
      isBuilding = true;
    }
  }else{
    if(isBuilding == true && money >= 10){
      var tower = new Tower()
      tower.x = cursor.x;
      tower.y = cursor.y;
      money -= 10;
      towers.push(tower);
    }
  }
});
$("#game-canvas").on("mousemove",function(event){
  cursor.x = event.offsetX - (event.offsetX % 32);
  cursor.y = event.offsetY - (event.offsetY % 32);
});

$("body").on("keydown",function(event){
  if(event.which == 87){
    keyp.w = true;
  }
  if(event.which == 65){
    keyp.a = true;
  }
  if(event.which == 83){
    keyp.s = true;
  }
  if(event.which == 68){
    keyp.d = true;
  }
  if(event.which == 32){
    keyp.space = true;
  }
  console.log(event.which+"down");
});
$("body").on("keyup",function(event){
  if(event.which == 87){
    keyp.w = false;
  }
  if(event.which == 65){
    keyp.a = false;
  }
  if(event.which == 83){
    keyp.s = false;
  }
  if(event.which == 68){
    keyp.d = false; 
  }
  if(event.which == 32){
    keyp.space = false;
  }
  console.log(event.which+"up");
});
