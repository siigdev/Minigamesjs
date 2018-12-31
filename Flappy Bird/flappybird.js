window.onload = function setup() {
  c = document.getElementById("Canvas");
  height = c.height;
  width = c.width;
  ctx = c.getContext("2d");
  bird = new Bird();
  document.addEventListener("keydown", controls);
  setInterval(draw, 1000 / 15);
};
function draw() {
  ctx.fillStyle = "#7EC2CB";
  ctx.fillRect(0, 0, width, height);
  bird.update();
  bird.draw();
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
