const canvas = document.getElementById("jsCanvas");
const CANVAS_SIZE = 700;
const INTIAL_COLOR = "#2c2c2c";

canvas.height = CANVAS_SIZE;
canvas.width = CANVAS_SIZE ;

const ctx = canvas.getContext('2d');
ctx.fillStyle = 'white';
ctx.fillRect (0,0,CANVAS_SIZE,CANVAS_SIZE);
ctx.lineWidth = 2.5;
ctx.strokeStyle = INTIAL_COLOR;
ctx.fillStyle = INTIAL_COLOR;

let painting = false;

const colors = document.getElementsByClassName("jsColor")
Array.from(colors).forEach(color => color.addEventListener('click',changeColor))

const range = document.getElementById("jsRange");

let filling = false;
const mode = document.getElementById("jsMode");

const saveButton = document.getElementById("jsSave");

function stopPainting(){
    painting = false;
}

function startPainting(){
    painting = true;
}

function mouseMoveOn(event){
    x = event.offsetX;
    y = event.offsetY;
    if(!painting){
        ctx.beginPath();
        ctx.moveTo(x,y);
    }else{
        ctx.lineTo(x,y);
        ctx.stroke();
    }
}

function mouseDown(event){
    painting = true;
}

function changeColor(event){
    const color = event.target.style.backgroundColor;
    ctx.strokeStyle = color;
    ctx.fillStyle = color;
}

function changeRange(event){

    ctx.lineWidth = event.target.value;
}

function changeMode(){
    if(filling === true ){
        filling = false;
        mode.innerText = "Fill";
    }else{
        filling = true;
        mode.innerText = "Paint";
    }
}

function handleMode(){
    if(filling){
        ctx.fillRect(0,0,CANVAS_SIZE,CANVAS_SIZE);
    }
}

function Save(){
    const image = canvas.toDataURL();
    const link = document.createElement('a');
    link.href = image;
    link.download = "PaintJS [Export]";
    link.click();
}

function handleCM(event){
   event.preventDefault();
}

if(range){
    range.addEventListener('input', changeRange);
}

if(mode){
    mode.addEventListener('click' , changeMode)
}

if(canvas){
    canvas.addEventListener("mousemove", mouseMoveOn);
    canvas.addEventListener("mousedown", mouseDown);
    canvas.addEventListener("mouseup", stopPainting);
    canvas.addEventListener("mouseleave", stopPainting);
    canvas.addEventListener("click", handleMode);
    canvas.addEventListener("contextmenu", handleCM);
}

if(saveButton){
    saveButton.addEventListener('click', Save);
}


