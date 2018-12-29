window.onload=function(){
    c = document.getElementById("snakeCanvas");
    ctx = c.getContext("2d");
    ctx.fillStyle = "black";
    ctx.fillRect(0,0,c.width,c.height);

    scale = 20;
    rows = c.height/scale;
    cols = c.width/scale;

    snake = new Snake();
    //food = new Food();
    window.addEventListener("keydown", snake.controls);

    setInterval(snakeGame,1000/15);
}

function snakeGame(){
    snake.update();
    snake.draw();
    //food.draw();
}

class Snake{
    constructor(){
        this.x = 0;
        this.y = 0;
        this.newx = scale * 1;
        this.newy = 0;
        this.tail = [];
        this.points = 0;
    }

    draw(){
        ctx.fillStyle = "green";
        ctx.fillRect(this.x, this.y, scale, scale);
    }
    update(){
        this.x += this.newx;
        this.y += this.newy;
        console.log(this.newy);
        
    }
    controls(key){
        switch (key.key){
            case "ArrowUp":
                this.newx = 0;
                this.newy = -scale;
                console.log(this.newy);
                break;
            case "ArrowDown":
                this.newx = 0;
                this.newy = +scale;
                break;
            case "ArrowLeft":
                this.newx = -scale;
                this.newy = 0;
                break;
            case "ArrowRight":
                this.newx = +scale;
                this.newy = 0;
                break;
        }
    }

    
}