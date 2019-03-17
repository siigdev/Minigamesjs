window.onload = function setup() {
  c = document.getElementById("Canvas");
  height = c.height;
  width = c.width;
  scale = 20;
  ctx = c.getContext("2d");

  snake = new Snake();
  fruit = new Fruit();
  fruit.spawn();
  setInterval(draw, 1000 / 15);
  document.addEventListener("keydown", controls);
};

function draw() {
  ctx.fillStyle = "#000";
  ctx.fillRect(0, 0, width, height);
  fruit.draw();
  snake.collision();
  snake.update();
  snake.draw();

  ctx.fillStyle = "white";
  ctx.font = "25px Arial";
  ctx.fillText(snake.point, width / 2, 25);
  if (snake.eat(fruit)) {
    fruit.spawn();
  }

}
function controls(key) {
  switch (key.key) {
    case "ArrowUp":
      snake.setspeed(0, -1);
      break;
    case "ArrowDown":
      snake.setspeed(0, 1);
      break;
    case "ArrowLeft":
      snake.setspeed(-1, 0);
      break;
    case "ArrowRight":
      snake.setspeed(1, 0);
      break;
  }
}
class Fruit {
  constructor() {
    this.x;
    this.y;
  }
  draw() {
    ctx.fillStyle = "red";
    ctx.fillRect(this.x, this.y, scale, scale);
  }
  spawn() {
    this.x = Math.floor((Math.random() * width) / scale + 0) * scale;
    this.y = Math.floor((Math.random() * height) / scale + 0) * scale;
  }
}
class Snake {
  constructor() {
    this.point = 0;
    this.x = width / 2;
    this.y = height / 2;
    this.xspeed = 0;
    this.yspeed = 0;
    this.tail = [];
  }
  update() {
    for (let i = 0; i < this.tail.length - 1; i++) {
      this.tail[i] = this.tail[i + 1];
    }
    this.tail[this.point - 1] = { x: this.x, y: this.y };
    this.x += this.xspeed;
    this.y += this.yspeed;
  }
  draw() {
    ctx.fillStyle = "lime";
    for (var i = 0; i < this.tail.length; i++) {
      ctx.fillRect(this.tail[i].x, this.tail[i].y, scale, scale);
    }
    ctx.fillRect(this.x, this.y, scale, scale);
  }
  eat() {
    if (this.x == fruit.x && this.y == fruit.y) {
      this.point++;
      return true;
    }
    return false;
  }
  collision() {
    if (this.x >= c.width || this.y >= c.height || this.y < 0 || this.x < 0) {
      this.reset();
    }
    for (let i = 0; i < this.tail.length; i++) {
      if (this.tail[i].x == this.x && this.tail[i].y == this.y) {
        this.reset();
      }
    }
  }
  reset() {
    this.x = width / 2;
    this.y = height / 2;
    this.xspeed = 0;
    this.yspeed = 0;
    this.point = 0;
    this.tail = [];
  }
  setspeed(x, y) {
    this.xspeed = x * scale;
    this.yspeed = y * scale;
  }
}
