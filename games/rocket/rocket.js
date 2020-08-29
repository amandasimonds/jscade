//make sure our script is connected
console.log("rocket script starting")

//define the game piece component before using it in a function
var gamePiece

//invokes the start method to set up the game
function startGame(){
    gameArea.start();
    //define our game piece with the component object constructor
    gamePiece = new component(30, 30, "red", 10, 120)
}

//define our game area
var gameArea = {
    //select the rocket-canvas
    canvas : document.querySelector(".rocket-canvas"),
    start : function(){
        //set up our game area
        this.canvas.width = 480;
        this.canvas.height = 270;
        this.context = this.canvas.getContext("2d");
        //tells us to update the game area every 20 milliseconds
        //it calls the updateGameArea function every 20 milliseconds
        this.interval = setInterval(updateGameArea, 20)
    },
    //clears the game area using the clearRect method
    clear : function() {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height)
    }
}

//this is the constructor for the component object
function component(width, height, color, x, y) {
    this.width = width;
    this.height = height;
    this.speedX = 0;
    this.speedY = 0;
    this.x = x;
    this.y = y;
    //update the game piece with however you want it to look
    this.update = function(){
        //first define the context for the canvas, so we can use the canvas methods like fillStyle and fillRect
        ctx = gameArea.context;
        //define color
        ctx.fillStyle = color;
        //use the canvas method to create a rectangle with the x position, y position, width, and height that you put in your component
        ctx.fillRect(this.x, this.y, this.width, this.height)
    }
    //gives game piece new position
    this.newPos = function(){
        this.x += this.speedX;
        this.y += this.speedY
    }
}

//this function will update our game area
function updateGameArea(){
    gameArea.clear();
    //move the position of gamePiece every time the game area updates (every 20 milliseconds)
    gamePiece.newPos();
    gamePiece.update();
}

function moveUp(){
    gamePiece.speedY -= 1;
}

function moveDown(){
    gamePiece.speedY += 1;
}

function moveLeft() {
    gamePiece.speedX -= 1;
}

function moveRight() {
    gamePiece.speedX += 1;
}

function stopMove() {
    gamePiece.speedX = 0;
    gamePiece.speedY = 0;
}

startGame()