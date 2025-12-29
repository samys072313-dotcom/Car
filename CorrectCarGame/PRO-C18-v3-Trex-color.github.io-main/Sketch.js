var PLAY=1;
var END=0;
var car;
var road, blocksGroup;
var conesGroup;
var road2;
var bg;
var block;
var spawnCones;
var spawnBlocks;
var spawnOver;
var gameState = PLAY;
var over;
function preload(){
    SUNimg=loadImage("car.jpeg");
    roadimg=loadImage("road - Copy.jpeg");
    road2img=loadImage("road - Copy.jpeg");
    blockimg=loadImage("block.jpeg");
    coneimg=loadImage("cone.jpeg");
    bgimg=loadImage("cargbg.webp");
    leftimg=loadImage("left.png");
    rightimg=loadImage("right.png");
    overimg=loadImage("gameOver.png");
}
function setup(){
    createCanvas(windowWidth,windowHeight);
     bg=createSprite(800,500,1200,1200);
     road=createSprite(790,450,100,height+1000);

   road2=createSprite(796.4,1230,100,height+1000);
    car=createSprite(780,625,20,20);
    over = createSprite(800, 300, 50, 50);
   car.addImage("img", SUNimg);
    road.addImage("img", roadimg);
    over.addImage("img", overimg);
    over.scale=2;
    road.x=width/2
   road2.addImage("img", road2img);
    bg.addImage("img", bgimg);
    wallInv=createSprite(350,25,5,height+1000);
    wall2Inv=createSprite(1220,25,5,height+1000);
    left=createSprite(140,630,10,10);
    right=createSprite(1430,630,10,10);
    left.addImage("img", leftimg);
    right.addImage("img", rightimg);
    left.scale=0.6;
    right.scale=0.6;
    car.scale=1;
    road.scale=5.2;
   road2.scale=5.2;
    bg.scale=0.8;
car.depth=road2.depth;
    blocksGroup = new Group();
    conesGroup = new Group();
     
}
function draw(){
    background("gray");
    road2.depth=road.depth;
   road2.depth=road.depth+1;
   car.depth=conesGroup.depth;
   car.depth=conesGroup.depth+1;
   car.setCollider("circle", 0, 0, 40);
  // road2.velocityY=7;
    if (gameState===PLAY){
        car.collide(wallInv);
        car.collide(wall2Inv);
        over.visible=false;
        wallInv.depth=road2.depth;
        wallInv.depth=road2.depth+2;
        wall2Inv.depth=road2.depth;
        wall2Inv.depth=road2.depth+2;
        road.velocityY=7;
        if (road.y>200){
    road.y=road.width/2;
    }
    if (keyDown("left")){
    car.x=car.x-150;
    }
    if (keyDown("right")){
    car.x=car.x+120;
    }
    spawnBlocks();
    spawnCones();
    if (blocksGroup.isTouching(car)){
        gameState = END;
    }
    if (conesGroup.isTouching(car)){
        gameState = END;
    }    
    }
    else if (gameState===END){
        over.visible=true;
        road.velocityY=0;
        road2.velocityY=0;
        car.velocityX=0;
        blocksGroup.setVelocityYEach(0);
        conesGroup.setVelocityYEach(0);
        if (keyDown("space")){
        reset();
    }
    }
     drawSprites();
}
function spawnBlocks(){
    if (frameCount%150 == 0){
     var block = createSprite(0, 50, 20, 20);
    block.x=random(550,1000);
    block.addImage("img",blockimg);
    block.scale=0.75;
   block.velocityY=7;
  // block.depth=road.depth+1;
  block.depth=road2.depth;
    road.depth=+1;
     block.lifetime = 300;

        blocksGroup.add(block);
    }
}
function spawnCones(){
    if (frameCount%220 == 0){
     var cone = createSprite(0, -50, 20, 20);
    cone.x=random(550,1000);
    cone.addImage("img", coneimg);
    cone.scale=0.5;
   cone.velocityY=7;
  cone.depth=road2.depth;
    road.depth+1;
     cone.lifetime = 300;

       conesGroup.add(cone);
    }
}
function reset(){
    blocksGroup.destroyEach();
    conesGroup.destroyEach();
    gameState = PLAY;
}