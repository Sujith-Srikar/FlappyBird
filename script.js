let g = 4.5,pvx = -1.8;
let vs = 0,js = -16;
let time = 1 / 10 ;

let sky = {
  width: window.innerWidth,
  height: window.innerHeight,
};

let pipeGap = sky.height / 5.5 , gameOver=false ,c=0;

let bird = {
  img: document.getElementById("bird"),
  birdY: 150 / 2,
  birdX: 75,
  birdHeight: 15,
  birdWidth: 15,
};

let pipeArray = [];
let pipe = {
  pipeWidth: 64,
  pipeHeight: 100,
  pipeY: 0,
  pipeX: 400,
  passed: false
};
let topPipeImg, bottomPipeImg;

window.addEventListener("keydown", (e) => {
  if (e.key == "ArrowUp") {
    vs = js;
  }
});

window.addEventListener("click", () => {
  vs = js;
  if(gameOver)
  {
    bird.birdY =150/2;
    c=0;
    pipeArray=[];
    gameOver=false;
  }
});

const canvas = document.getElementById("sky");
const ctx = canvas.getContext("2d");

function loop() {
  vs += time * g;
  bird.birdY += vs ;
  ctx.drawImage(
    bird.img,
    bird.birdX,
    bird.birdY,
    bird.birdHeight,
    bird.birdWidth
  );

  topPipeImg = new Image();
  topPipeImg.src = "./images/upper pipe.png";

  bottomPipeImg = new Image();
  bottomPipeImg.src = "./images/lower pipe.png";
  setInterval(placePipes, 1500);
  requestAnimationFrame(update);
}

function update() {
  requestAnimationFrame(update);
  if(gameOver)
  {
    return;
  }
  ctx.clearRect(0, 0, sky.width, sky.height);
   vs += time * g;
   bird.birdY = Math.max(bird.birdY+vs * time,0);
  ctx.drawImage(bird.img, bird.birdX, bird.birdY, bird.birdHeight, bird.birdWidth);
  if(bird.birdY >sky.height)
  {
    ctx.fillStyle = "black";
    ctx.font = "15px Comic Sans MS";
    ctx.fillText("Game Over", 10, 33);
    gameOver=true;
  }
  for(let i=0 ; i<pipeArray.length ; i++)
  {
    let temp = pipeArray[i];
    temp.x += pvx;
    ctx.drawImage(temp.img , temp.x ,temp.y ,temp.width ,temp.height);
    if(!temp.passed && bird.birdX > temp.x+temp.width)
    {
      c+=0.5;
      temp.passed=true;
    }
    if(collide(bird,temp))
    {
      ctx.fillStyle = "black";
      ctx.font = "15px Comic Sans MS";
      ctx.fillText("Game Over", 10, 33);
      gameOver=true;
    }
  }
  ctx.fillStyle ="black";
  ctx.font = "15px Comic Sans MS";
  ctx.fillText("Score:",10,20);
  ctx.fillText(c.toString(),60,20);
}

function placePipes()
{
    if(gameOver)
    {
      return;
    }
    let randowPipeY = Math.floor(pipe.pipeY - pipe.pipeHeight/4 - Math.random()*(pipe.pipeHeight/2));
    let topPipe = {
        x : pipe.pipeX , y :randowPipeY , width : pipe.pipeWidth , height : pipe.pipeHeight ,img : topPipeImg, passed : pipe.passed
    }
    pipeArray.push(topPipe);

    let bottomPipe = {
      x: pipe.pipeX, y: randowPipeY + pipeGap, width: pipe.pipeWidth, height: pipe.pipeHeight, img: bottomPipeImg, passed: pipe.passed,
    };
    pipeArray.push(bottomPipe);
}

function collide(a, b) {
  return (
    a.birdX < (b.x + b.width) - b.height / 5.5 &&
    (a.birdX + a.birdWidth) - b.height / 5.5 > b.x &&
    a.birdY < (b.y + b.height) - b.width / 5.5 &&
    (a.birdY + a.birdHeight) - b.width / 5.5 > b.y
  );
}

window.onload = loop();