window.onload = function setup() {
  c = document.getElementById("Canvas");
  height = c.height;
  width = c.width;
  ctx = c.getContext("2d");
  bird = new Bird();
  pipes = [];
  pipes.push(new Pipe());
  document.addEventListener("keyup", controls);
  setInterval(draw, 1000 / 15);
  setInterval(createpipe, 1500 / 1);
};
function draw() {
  ctx.fillStyle = "#7EC2CB";
  ctx.fillRect(0, 0, width, height);
  bird.update();
  bird.draw();

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
    this.top = Math.floor(Math.random() * height - 60 + 10);
    this.space = 100;
    this.width = 50;
    this.speed = 10;
  }
  draw() {
    ctx.fillStyle = "#fff";
    ctx.fillRect(this.x, 0, this.width, this.top);
    ctx.fillRect(this.x, this.top + this.space, this.width, height - this.top);
  }
  update() {
    this.x = this.x - this.speed;
  }
  collide(bird){
    if(this.top > bird.y || this.top+this.space < bird.y){
      if(this.x == bird.x){
      console.log("hit");
      console.log(bird.point);
      bird.point++;
    }
    }
  }
}
class Bird {
  constructor() {
    this.x = 50;
    this.y = height / 2;
    this.gravity = 5;
    this.velocity = 0;
    this.maxspeed = 25;
    this.uplift = 20;
    this.point = 0;
  }
  up() {
    if (this.velocity < 50) {
      this.velocity -= this.uplift;
    } else {
      this.velocity = this.uplift;
    }
  }
  draw() {
    ctx.fillStyle = "#fff";
    ctx.fillRect(this.x, this.y, 20, 20);
  }
  update() {
    this.velocity += this.gravity;
    this.y += this.velocity;
    if (this.y > height) {
      this.velocity = 0;
      this.y = height - 1;
    }
    if (this.y < 0) {
      this.velocity = 0;
      this.y = 0;
    }
  }
}