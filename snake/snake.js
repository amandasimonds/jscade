const canvas = document.querySelector(".canvas");

//get the context of the canvas so we can draw on it
const ctx = canvas.getContext("2d");

//load images
//make a new image object
let imageName = new Image();
//location of image
imageName.src = "path/img.png";

//load audio files
//make a new audio file object
let audioName = new Audio();
//location of audio
audioName.src = "path/audio.png"
//play method
audioName.play();

//DRAW IMAGES
// imagename, x position, y position, width, height
ctx.drawImage(imageName, 40, 50, 25, 25);

//DRAW RECTANGLE
ctx.fillStyle = "red";
//(x position, y position, width, height)
ctx.fillRect (100, 300, 30, 30)

//Create the UNIT (Each Box on the canvas)
let box = 32
ctx.fillStyle = "black";
ctx.fillRect(5*box,)

//Tell the program to draw the box
function draw(){
    ctx.drawImage(ground, 0,0);
    for (let i = 0; i < snake.length; i++){
        ctx.
    }
}