var balloon,balloonImage1,balloonImage2;
// create database and position variable here
var database;
var position;

function preload(){
    bg =loadImage("cityImage.png");
    balloonImage1=loadAnimation("hotairballoon1.png");
    balloonImage2=loadAnimation("hotairballoon1.png","hotairballoon1.png",
    "hotairballoon1.png","hotairballoon2.png","hotairballoon2.png",
    "hotairballoon2.png","hotairballoon3.png","hotairballoon3.png","hotairballoon3.png");
    
 
}

function setup(){
    createCanvas(1500,700);
    database = firebase.database()

    balloon = createSprite(250,250,10,10);
    balloon.addAnimation("hotAirBalloon",balloonImage1);
    balloon.scale=0.5
    var balloonPosition = database.ref('Balloon/Position');
    balloonPosition.on("value",readPosition,showError);
    textSize(20); 
}

function draw(){
  background(bg);

  if(keyDown(LEFT_ARROW)){
    balloon.addAnimation("hotAirBalloon",balloonImage2);
    //write code to move air balloon in left direction
    changePosition(-1,0);
  }
  else if(keyDown(RIGHT_ARROW)){
    balloon.addAnimation("hotAirBalloon",balloonImage2);
    //write code to move air balloon in right direction
    changePosition(1,0);
  }
  else if(keyDown(UP_ARROW)){
    balloon.addAnimation("hotAirBalloon",balloonImage2);
    //write code to move air balloon in up direction
    changePosition(0,-1);
  }
  else if(keyDown(DOWN_ARROW)){
    balloon.addAnimation("hotAirBalloon",balloonImage2);
    //write code to move air balloon in down direction
    changePosition(0,+1);
  }

  drawSprites();
  fill(0);
  stroke("white");
  textSize(25);
  text("**Use arrow keys to move Hot Air Balloon!**",40,40);

}


function changePosition(x,y){
    database.ref('Balloon/Position').set({
        'x': position.x + x,
        'y': position.y + y
    })
}

function readPosition(data){
    position = data.val();
    console.log(position)
    balloon.x = position.x;
    balloon.y = position.y;
}

function showError(){
    console.log("data not found")
}