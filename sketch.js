var PLAY = 1;
var END = 0;
var gameState = PLAY;

var trex, trex_running, trex_collided;
var ground, invisibleGround, groundImage;

var cloudsGroup, cloudImage;
//var bqqsGroup, obstacle2;
var obstaclesGroup, obstacle1, obstacle2, obstacle3, obstacle4, obstacle5, obstacle6;

var score=0;

var gameOver, restart;



function preload(){
  trex_running =   loadAnimation("trex1.png","trex3.png","trex4.png");
  trex_collided = loadAnimation("trex_collided.png");
  
  groundImage = loadImage("ground2.png");
  
  cloudImage = loadImage("cloud.png");
  
  obstacle1 = loadImage("obstacle1.png");
  obstacle2 = loadImage("obstacle2.png");
  obstacle3 = loadImage("obstacle3.png");
  obstacle4 = loadImage("obstacle4.png");
  obstacle5 = loadImage("obstacle5.png");
  obstacle6 = loadImage("obstacle6.png");
  
  gameOverImg = loadImage("gameOver.png");
  restartImg = loadImage("restart.png");

 
}

function setup() {
  createCanvas(1700, 300);
  
  trex = createSprite(50,180,20,50);
  
  trex.addAnimation("running", trex_running);
  trex.addAnimation("collided", trex_collided);
  trex.scale = 0.5;
  
  ground = createSprite(200,180,400,20);
  ground.addImage("ground",groundImage);
  ground.x = ground.width /2;
  ground.velocityX = -(6 + 3*score/100);
  
  gameOver = createSprite(300,100);
  gameOver.addImage(gameOverImg);
  
  restart = createSprite(300,140);
  restart.addImage(restartImg);
  
  gameOver.scale = 0.5;
  restart.scale = 0.2;

  gameOver.visible = false;
  restart.visible = false;
  
  invisibleGround = createSprite(200,190,400,10);
  invisibleGround.visible = false;
  
  cloudsGroup = new Group();
  obstaclesGroup = new Group();
  //bqqsGroup = new Group();

  trex.setCollider("rectangle",0,0,trex.width,trex.height);
  trex.debug = true
  
  score = 0;
}

function draw() {
  //trex.debug = true;
  background("pink");
  
  fill("blue");
  textFont("Brush Script MT")
  textSize(50);
  text("Score:   "+ score, 500,50);
  
  /*fill("gold");
  textFont("Brush Script MT")*/
  
  if (gameState===PLAY){
    score = score + Math.round(getFrameRate()/60);
    ground.velocityX = -(5 + 4*score/100);
  
    if(keyDown("space") && trex.y >= 159) {
      trex.velocityY = -13;
    }
      
       if (keyDown("DOWN_ARROW")) {
         trex.scale = 0.3;
       } else {
         trex.scale = 0.5;
       }
      
    
    trex.velocityY = trex.velocityY + 0.8
  
    if (ground.x < 0){
      ground.x = ground.width/2;
    }
  
    trex.collide(invisibleGround);
    spawnClouds();
    spawnObstacles();
    //spawnQqqs();
  
    if(obstaclesGroup.isTouching(trex)){
        gameState = END;
    }
  }
  else if (gameState === END) {
    gameOver.visible = true;
    restart.visible = true;
    
    //set velcity of each game object to 0
    ground.velocityX = 0;
    trex.velocityY = 0;
    obstaclesGroup.setVelocityXEach(0);
    cloudsGroup.setVelocityXEach(0);
    //bqqsGroup.setVelocityXEach(0);
    
    //change the trex animation
    trex.changeAnimation("collided",trex_collided);
    
    //set lifetime of the game objects so that they are never destroyed
    obstaclesGroup.setLifetimeEach(-1);
    cloudsGroup.setLifetimeEach(-1);
   // bqqsGroup.setLifetimeEach(-1);
    
    if(mousePressedOver(restart)) {
      reset();
    }
  }
  
  
  drawSprites();
}

function spawnClouds() {
  //write code here to spawn the clouds
  if (frameCount % 60 === 0) {
    var cloud = createSprite(600,120,40,10);
    cloud.y = Math.round(random(70,100));
    cloud.addImage(cloudImage);
    cloud.scale = 0.18;
    cloud.velocityX = -3;
    
     //assign lifetime to the variable
    cloud.lifetime = 200;
    
    //adjust the depth
    cloud.depth = trex.depth;
    trex.depth = trex.depth + 1;
    
    //add each cloud to the group
    cloudsGroup.add(cloud);
  }
}

 /* function spawnQqqs() {
    if (frameCount % 90 === 0) {
      var Qqq = createSprite(600,165,10,40);
     /* Qqq.y = Math.round(random(1,5));
      Qqq.addImage(obstacle2);*/
      var randw = Math.round(random(1,8));
 /*   switch(randw) {
      case 1: Qqq.addImage(obstacle2);
              break;
      default: break;
   }
     
      Qqq.scale = 0.2;
      Qqq.velocityX = -(6 + 3*score/98);
      
       //assign lifetime to the variable
      Qqq.lifetime = 200;

      bqqsGroup.add(Qqq);
      
    







  }
  
  } */

function spawnObstacles() {
  if(frameCount % 60 === 0) {
    var obstacle = createSprite(600,165,10,40);
    //obstacle.debug = true;
    obstacle.velocityX = -(6 + 3*score/100);
    
    //generate random obstacles
    var rand = Math.round(random(1,5));
    switch(rand) {
      case 1: obstacle.addImage(obstacle1);
              obstacle.scale = 0.3;
              break;
      case 2: obstacle.addImage(obstacle2);
              obstacle.scale = 0.3;
              break;
      case 3: obstacle.addImage(obstacle3);
             obstacle.scale = 0.3;
              break;
      case 4: obstacle.addImage(obstacle4);
              obstacle.scale = 0.135;
              break;
      case 5: obstacle.addImage(obstacle5);
              obstacle.scale = 0.135;
              break;
      case 6: obstacle.addImage(obstacle6);
              obstacle.scale = 0.130;
              break;
      default: break;
   }
    
    //assign scale and lifetime to the obstacle 
    //obstacle2.scale = 0.3;          
  
 //   obstacle.scale = 0.3;
   
    obstacle.lifetime = 300;
    //add each obstacle to the group
    obstaclesGroup.add(obstacle);
  }
}

function reset(){
  gameState = PLAY;
  gameOver.visible = false;
  restart.visible = false;
  
  obstaclesGroup.destroyEach();
  cloudsGroup.destroyEach();
  //QqqsGroup.destroyEach();
  
  trex.changeAnimation("running",trex_running);
  
 
  
  score = 0;
  
}