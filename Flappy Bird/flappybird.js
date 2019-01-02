window.onload = function setup() {
  c = document.getElementById("Canvas");
  height = c.height;
  width = c.width;
  ctx = c.getContext("2d");
  bird = new Bird();
  pipe = new Pipe();
  document.addEventListener("keyup", controls);
  setInterval(draw, 1000 / 15);
};
function draw() {
  ctx.fillStyle = "#7EC2CB";
  ctx.fillRect(0, 0, width, height);
  bird.update();
  bird.draw();
  pipe.update();
  pipe.draw();
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
    constructor(){
        this.x = width;
        this.top = Math.floor((Math.random() * height-50) + 50);
        this.width = 50;
        this.speed = 10;
    }
    draw(){
        ctx.fillStyle = "#fff";
        ctx.fillRect(this.x, 0, this.width, this.top);
        ctx.fillRect(this.x, this.top+50, this.width, height-this.top);
    }
    update(){
        this.x = this.x-this.speed;
    }

}
class Bird {
  constructor() {
    this.x = 50;
    this.y = height / 2;
    this.gravity = 10;
    this.velocity = 0;
    this.maxspeed = 15;
    this.uplift = 30;
    this.point = 0;
  }
  up() {
      if(this.velocity < 50){
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
