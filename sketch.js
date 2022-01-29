var PLAY = 1;
var END = 0;
var gameState = PLAY

var dog, dogImg
var bush, bushImg
var invisibleGround
var backgroundImg

score = 0;

function preload()
{
dogImg = loadImage("Dogrunning.gif")
bushImg= loadImage("grass.png")
backgroundImg = loadImage("Background.jpg")
}

function setup() {
	createCanvas(600, 200);

	dog = createSprite(50,180,20,50);
	dog.addImage(dogImg)
	dog.scale = 0.3

	invisibleGround = createSprite(200,190,400,10);
	invisibleGround.visible = false;

	bushGroup = new Group()

	score = 0;
}


function draw() {
  //dog.debug = true;
  background(backgroundImg);
  text("Score: "+ score, 500,50);
  if (gameState === PLAY){
	 	 score = score + Math.round(getFrameRate()/60);
  		spawnBushes();
  
		if(keyDown("space") && dog.y >= 159) {
		dog.velocityY = -12;
        }  

  		dog.velocityY = dog.velocityY + 0.8
 		dog.collide(invisibleGround);

  		 if(bushGroup.isTouching(dog)){
				gameState = END;
   		  }
   }  
	else if(gameState === END){
  		dog.velocityY = 0;
		dog.visible = false;
    	bushGroup.setVelocityXEach(0);

		bushGroup.setLifetimeEach(-1);
	}
drawSprites(); 
}

function spawnBushes() {
	if(frameCount % 60 === 0) {
	  var bush = createSprite(600,165,10,40);
	  //bush.debug = true;
	  bush.velocityX = -(6 + 3*score/100);
	  
	  //generate random obstacles
		 bush.addImage(bushImg);
	  
	  //assign scale and lifetime to the obstacle           
	  bush.scale = 0.1;
	  bush.lifetime = 300;
	  //add each obstacle to the group
	  bushGroup.add(bush);
	}
  }



