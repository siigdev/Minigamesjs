window.onload = function setup() {
  c = document.getElementById("Canvas");
  height = c.height;
  gameheight = c.height-100;
  width = c.width;
  ctx = c.getContext("2d");
  bird = new Bird();
  pipes = [];
  pipes.push(new Pipe());
  document.addEventListener("keyup", controls);
  background = new Image();
  background.src = "data/background.png";
  backgroundbottom = new Image();
  backgroundbottom.src = "data/backgroundbottom.png";
  setInterval(draw, 1000 / 15);
  setInterval(createpipe, 1500 / 1);
};
function draw() {
  ctx.drawImage(this.background, 0, 0, 400, 500);
  ctx.drawImage(backgroundbottom, 0, 500, 400, 100);
  bird.update();
  bird.draw();
  ctx.font = "30px Arial";
  ctx.textAlign = "center"; 
  ctx.fillStyle = "#fff";
  ctx.fillText("Points: " + bird.point, width/2, 50);


  for (var i = pipes.length-1; i > 0; i--) {
    pipes[i].update();
    pipes[i].draw();
    pipes[i].collide(bird);
    if (pipes[i].x+pipes[i].width < 0){
        pipes.shift();
    }
  }
}
function createpipe(){
    pipes.push(new Pipe());
}
function controls(key) {
  switch (key.code) {
    case "Space":
      bird.up();
      break;
    case "Escape":
      console.log(key);
  }
}
class Pipe {
  constructor() {
    this.x = width;
    this.space = 100;
    this.width = 50;
    this.speed = 10;
    this.top = Math.floor((Math.random() * gameheight), 100);
    this.bottom = gameheight-this.top-this.space;

  }
  draw() {
    ctx.fillStyle = "#fff";
    ctx.fillRect(this.x, 0, this.width, this.top);
    ctx.fillRect(this.x, this.top + this.space, this.width, this.bottom);
  }
  update() {
    this.x = this.x - this.speed;
  }
  collide(bird){
    if(this.top > bird.y || this.top+this.space < bird.y){
      if(this.x == bird.x){
        bird.point++;
      }
    }
  }
}
class Bird {
  constructor() {
    this.x = 50;
    this.y = height / 2;
    this.gravity = 3;
    this.velocity = 0;
    this.maxspeed = 25;
    this.uplift = 15;
    this.point = 0;
    this.image = new Image();
    this.image.src = "data/bird.png";
  }
  up() {
    if (this.velocity < 50) {
      this.velocity -= this.uplift;
    } else {
      this.velocity = this.uplift;
    }
  }
  draw() {
    ctx.drawImage(this.image, this.x, this.y, 50, 50);
  }
  update() {
    this.velocity += this.gravity;
    this.y += this.velocity;
    if (this.y > gameheight) {
      this.velocity = 0;
      this.y = gameheight - 1;
    }
    if (this.y < 0) {
      this.velocity = 0;
      this.y = 0;
    }
  }
}