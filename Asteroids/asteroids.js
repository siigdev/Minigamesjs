window.onload = function setup() {
    c = document.getElementById("Canvas");
    height = c.height;
    width = c.width;
    ctx = c.getContext("2d");
    keys = [];
    asteroids = [];
  
    ship = new Ship();
    for (i=0; i<10; i++){
      asteroids.push(new Asteroid());
    }
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
    ship.draw();
    ctx.restore();

    
    for (i=0; i < asteroids.length; i++){
      ctx.save();
      asteroids[i].draw();
      asteroids[i].update();
      ctx.restore();
    }
}
function controls() {
  console.log()
    if (keys[38]){
        ship.accelerate();
      }
    // if (key.key == "ArrowDown")
    //     ship.decelerate();
    if (keys[37]){
         ship.turn(0);
        }
    if (keys[39]){
         ship.turn(1);
        }
    if (keys[32]){
      ship.fire();
      console.log("FIRING");
    }
    
}

class Asteroid {
    constructor() {
        this.x = Math.floor((Math.random()*width)+0);
        this.y = Math.floor((Math.random()*height)+0);
        this.r = Math.floor((Math.random()*50)+5);
        this.edges = Math.floor((Math.random()*15)+8)
        this.angle = Math.floor((Math.random()*360)+0);
        this.speed = 0.75
        this.a = (Math.PI * 2)/this.edges;
        this.offset = [];
        for (var i=0; i<this.edges; i++){
          this.offset.push(Math.floor((Math.random()*15)-3));
        }
    }
    draw() {

      ctx.translate(this.x,this.y);
      ctx.strokeStyle = "#fff";
      ctx.moveTo(this.r,0);
      ctx.beginPath();
      
      for (var i=0; i < this.edges; i++){
        ctx.lineTo((this.r+this.offset[i])*Math.cos(this.a*i),(this.r+this.offset[i])*Math.sin(this.a*i));
      }
      ctx.closePath();
      ctx.stroke();

    }
    update() {
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
    fire() {
    }
}
class Bullet {
  constructor() {
    this.x;
    this.y;
    this.speed;
  }
  draw() {

  }
}
