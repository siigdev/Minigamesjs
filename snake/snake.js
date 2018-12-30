window.onload = function setup() {
  c = document.getElementById("snakeCanvas");
  height = c.height;
  width = c.width;
  scale = 10;
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
  ctx.fillStyle = "white";
  ctx.font = "25px Arial";
  ctx.fillText(snake.point, width / 2, 25);
  if (snake.eat(fruit)) {
    fruit.spawn();
  }
  fruit.draw();
  snake.update();
  snake.draw();
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
    ctx.fillRect(this.x, this.y, 10, 10);
  }
  spawn() {
    this.x = Math.floor((Math.random() * width) / scale + 0) * scale;
    this.y = Math.floor((Math.random() * height) / scale + 0) * scale;
  }
}

class Snake {
  constructor() {
    this.x = 1 * scale;
    this.y = 1 * scale;
    this.xspeed = 0;
    this.yspeed = 0;
    this.tail = [];
    this.point = 0;
  }
  update() {
    if (this.x > c.width || this.y > c.height || this.y < 0 || this.x < 0) {
        this.tail = [];
        this.point = 0;
      }
    this.x += this.xspeed;
    this.y += this.yspeed;
  }
  draw() {
    ctx.fillStyle = "lime";
    ctx.fillRect(this.x, this.y, scale, scale);
  }
  eat() {
    if (this.x == fruit.x && this.y == fruit.y) {
      this.point++;
      return true;
    }
    return false;
  }
  dead() {
    
  }
  setspeed(x, y) {
    this.xspeed = x * scale;
    this.yspeed = y * scale;
  }
}
