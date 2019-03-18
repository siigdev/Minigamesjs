window.onload = function setup() {
    c = document.getElementById("Canvas");
    height = c.height;
    width = c.width;
    ctx = c.getContext("2d");
    keys = [];
  
    ship = new Ship();
    document.addEventListener("keydown", function(e) {keys[e.keyCode]=true});
    document.addEventListener("keyup", function(e) {keys[e.keyCode]=false});
    
    setInterval(draw, 1000 / 50);
    
}
function draw() {
  controls();
    ctx.save();
    ctx.fillStyle = "#222";
    ctx.fillRect(0, 0, width, height);
    ctx.restore();

    ctx.save();
    ship.update();
    ship.draw();
    ctx.restore();
}
function controls() {
  console.log()
    if (keys[38])
        ship.accelerate();
    // if (key.key == "ArrowDown")
    //     ship.decelerate();
    if (keys[37])
         ship.turn(1);
    if (keys[39])
         ship.turn(0);
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
        this.angle = 0;
        this.speed = 5;
    }
    draw() {
        ctx.translate(this.x,this.y);
        ctx.rotate((this.angle+90) * Math.PI/180);
        ctx.strokeStyle = "#fff";
        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.lineTo(10, 20);
        ctx.lineTo(0, 15);
        ctx.lineTo(0, 15);
        ctx.lineTo(-10, 20);
        ctx.closePath();
        ctx.stroke();
    }
    update() {
    }
    accelerate() {
      if (this.x < 0) {
        this.x = height;
      }
      if (this.y < 0) {
        this.y = width;
      }
      if (this.y > width){
        this.y = 0;
      }
      if (this.x > height){
        this.x = 0;
      }
      this.x += this.speed * Math.cos(this.angle * Math.PI / 180);
      this.y += this.speed * Math.sin(this.angle * Math.PI / 180);
    }
    turn(heading) {
      if(heading == 1) {
        this.angle = this.angle+10;
      }
      else if (heading == 0){
        this.angle = this.angle-10;
      }
    }
}

