window.onload = function setup() {
    c = document.getElementById("Canvas");
    height = c.height;
    width = c.width;
    ctx = c.getContext("2d");
  
    Ship = new Ship();
    setInterval(draw, 1000 / 15);
}
function draw() {
    ctx.fillStyle = "#222";
    ctx.fillRect(0, 0, width, height);
}

class Asteroid {
    constructor() {
        this.x;
        this.y;
        this.maxspeed;
        this.acceleration;
    }
    draw() {

    }

}

class Ship {
    constructor() {
        this.x;
        this.y;
    }
    draw() {

    }

}

