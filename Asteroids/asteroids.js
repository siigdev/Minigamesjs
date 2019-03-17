window.onload = function setup() {
    c = document.getElementById("Canvas");
    height = c.height;
    width = c.width;
    ctx = c.getContext("2d");
  
    ship = new Ship();
    setInterval(draw, 1000 / 15);
}
function draw() {
    ctx.fillStyle = "#222";
    ctx.fillRect(0, 0, width, height);
    ship.update();
    ship.draw();
}
function controls(key) {
    switch (key.key) {
      case "ArrowUp":
        ship.accelerate();
        break;
      case "ArrowDown":
        snake.decelerate();
        break;
      case "ArrowLeft":
        snake.turn(left);
        break;
      case "ArrowRight":
        snake.turn(right);
        break;
    }
  }

class Asteroid {
    constructor() {
        this.x = 10;
        this.y = 10;

    }
    draw() {

    }
    update() {

    }

}

class Ship {
    constructor() {
        this.x = width/2;
        this.y = height/2;
        this.maxspeed;
        this.acceleration;
        this.heading = 30;
    }
    draw() {
        ctx.save();
        ctx.rotate(this.heading*Math.PI/180);
        ctx.strokeStyle = "#fff";
        ctx.beginPath();
        ctx.moveTo(this.x, this.y);
        ctx.lineTo(this.x+10, this.y+20);
        ctx.lineTo(this.x, this.y+15);
        ctx.lineTo(this.x, this.y+15);
        ctx.lineTo(this.x-10, this.y+20);
        ctx.closePath();
        ctx.stroke();
        ctx.restore();
    }
    update() {
        this.x ++;
        this.y ++;
    }
}

