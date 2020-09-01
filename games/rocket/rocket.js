//make sure our script is connected
console.log("rocket script starting")

//define the game piece component before using it in a function
var gamePiece

//invokes the start method to set up the game
//don't forget to call startGame at the bottom!
function startGame(){
    gameArea.start();
    //define our game piece with the component object constructor
    gamePiece = new component(30, 30, "red", 10, 120, false),
    obstacle = new component(10, 200, "green", 100, 120, false)
    console.log(gamePiece.x, obstacle.x)
}

//define our game area
var gameArea = {
    //select the rocket-canvas
    canvas : document.querySelector(".rocket-canvas"),
    start : function(){
        //set up our game area
        this.canvas.width = 480;
        this.canvas.height = 270;

        //hides the cursor in the game area
        this.canvas.style.cursor = "none";

        //makes the canvas a game area!
        this.context = this.canvas.getContext("2d");

        //tells us to update the game area every 20 milliseconds
        //it calls the updateGameArea function every 20 milliseconds
        this.interval = setInterval(updateGameArea, 20);

        //add event listener for keyboard arrow controls
        window.addEventListener("keydown", function (e) {
            //we add an array [] to the gameArea.keys so we can use multiple key codes(multiple arrows to go diagonally)
            gameArea.keys = (gameArea.keys || []);
            //e.keyCode gets the key code from the key that was pressed
            gameArea.keys[e.keyCode] = true;
        });
        window.addEventListener("keyup", function (e) {
            gameArea.keys[e.keyCode] = false;
        });

        //add a mouse event listener to make the mouse work as a controller
        //this does not work in conjunction with the arrow listeners, so choose which one to do
        // window.addEventListener("mousemove", function(e){
        //     gameArea.x = e.pageX;
        //     gameArea.y = e.pageY
        // })
    },

    //clears the game area using the clearRect method
    clear : function() {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height)
    },

    //tells the game to stop
    stop : function() {
        clearInterval(this.interval)
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
        //this clears the canvas
        ctx.fillRect(this.x, this.y, this.width, this.height)
    }

    //gives game piece new position
    this.newPos = function(){
        this.x += this.speedX;
        this.y += this.speedY
    }

    this.crashWith = function(otherobj){
        var myleft = this.x;
        var myright = this.x + (this.width);
        var mytop = this.y;
        var mybottom = this.y + (this.height);
        var otherleft = otherobj.x;
        var otherright = otherobj.x + (otherobj.width);
        var othertop = otherobj.y;
        var otherbottom = otherobj.y + (otherobj.height);
        var crash = true;
        if (
            (mybottom < othertop) ||
            (mytop > otherbottom) ||
            (myright < otherleft) ||
            (myleft > otherright)
        ){
            crash = false
        }
        return crash
    }
}

//this function will update our game area
function updateGameArea(){
    //if crashes with obstacle, end the game
    if (gamePiece.crashWith(obstacle)) {
        gameArea.stop();
        console.log(gamePiece)
    } else {
        //clear the game area so that we do not see the game piece in its last position
        gameArea.clear();
        obstacle.update();
        //move the position of gamePiece every time the game area updates (every 20 milliseconds)
        gamePiece.newPos();

        //this is for the mouse control. it will not work with the arrow controls too, so you must choose which one to use
        // if (gameArea.x && gameArea.y){
        //     gamePiece.x = gameArea.x;
        //     gamePiece.y = gameArea.y;
        // }

        gamePiece.update();
    }

    //gamePiece starts at a speed of 0
    gamePiece.speedX = 0;
    gamePiece.speedY = 0;

    //tell the game piece to move when the key is pressed (37 is the code for left arrow, 39 is the code for right arrow, etc)
    if (gameArea.keys && gameArea.keys[37]) {gamePiece.speedX = -1; }
    if (gameArea.keys && gameArea.keys[39]) {gamePiece.speedX = 1; }
    if (gameArea.keys && gameArea.keys[38]) {gamePiece.speedY = -1; }
    if (gameArea.keys && gameArea.keys[40]) {gamePiece.speedY = 1; }
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

//don't forget to call start game function!!
startGame();