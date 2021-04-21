
var fairy,fairyImg;
var coin,coinImg;
var coin2,coin2Img;
var star,starImg;
var meteor,meteorImg;
var backgroungImg,sky;
var score=0;
var obstacleGroup,coingroup,stargroup,coin2group;
var gamestate="START";

function preload(){
  backgroundImg=loadImage("sky.jpg");
  fairyImg=loadImage("tinkerbell.png");
  coinImg=loadImage("coin.png");
  starImg=loadImage("star.jpg");
  meteorImg=loadImage("meteor.jpg");
  coin2Img=loadImage("coin.png");
}

function setup(){
  //creating canvas
  createCanvas(650,350);
  
 
  fairy = createSprite(150,200,10,70);
  fairy.addImage(fairyImg);
  fairy.scale=0.3;
  fairy.debug=false;
  fairy.setCollider("circle",40,-10,50);
  
  
  sky = createSprite(300,300,600,600);
  sky.addImage(backgroundImg);
  sky.velocityX=-(2+score/2);
  

  fairy.depth=sky.depth;
  fairy.depth=fairy.depth+1;
 
  //creating groups
  obstacleGroup =new Group();
  coingroup=new Group();
  stargroup=new Group();
  coin2group=new Group();
}
function draw(){
  //setting the backgroun color
  background("blue");
  if(gamestate==="START"){
    fill("black");
    textSize(60);
    text("Press R to start",140,200);
    if(keyDown("R")){
      gamestate="PLAY";
    }
  }
  else if(gamestate==="PLAY"){
    
 //calling functions
  points();
  meteors();

    //making sky reset
  if (sky.x<500){
    sky.x=sky.width/2
  }
  
  //making fairy move
  if (keyDown("up_arrow")){
    
    fairy.y=fairy.y-4;
  }
  
   if (keyDown("down_arrow")){
    fairy.y=fairy.y+4;
  }
   if(coingroup.isTouching(fairy)){
    coingroup.destroyEach();
    score=score+2;
  }
   if(coin2group.isTouching(fairy)){
    coin2group.destroyEach();
    score=score+2;
  }
    if(stargroup.isTouching(fairy)){
    stargroup.destroyEach();
    score=score+5;
  }
   if(obstacleGroup.isTouching(fairy)){
     gamestate="END";
  }
      
  drawSprites();
  }else if(gamestate==="END"){
    textSize(50);
    fill("blue");
    text("You lost!Fairy Died!RIP",130,180);
    textSize(45);
    fill("red");
    text("Press V to replay",150,220);
    if(keyDown("v")){
      gamestate="PLAY";
      score=0
    }
  }
  
  //printing score
  textSize(20);
  fill("blue");
  text("score:"+score,560,30);
}
 
function points(){
   if (frameCount%350===0){
     coin = createSprite(650,200,10,70);
     coin.addImage(coinImg);
     coin.scale=0.1;
     coin.velocityX=-(2+score/10);
     coin.y=Math.round(random(50,300))
     coingroup.add(coin);
   }
  if (frameCount%300===0){
     coin2 = createSprite(650,200,10,70);
     coin2.addImage(coin2Img);
     coin2.scale=0.1;
     coin2.velocityX=-(2+score/10);
     coin2.y=Math.round(random(50,300))
     coin2group.add(coin2);
   }
  if(frameCount%400===0){
    star = createSprite(650,100,10,70);
    star.addImage(starImg);
    star.scale=0.2;
    star.velocityX=-(2+score/10);
    star.y=Math.round(random(50,300))
    stargroup.add(star);
  }
}


function meteors(){
  if(frameCount%600===0){
  meteor=createSprite(650,100,10,70);
  meteor.addImage(meteorImg);
  meteor.scale=0.2;
  meteor.velocityX=-(4+score/100);
  obstacleGroup.add(meteor);
  }
}