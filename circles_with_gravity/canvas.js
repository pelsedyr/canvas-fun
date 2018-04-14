var canvas = document.querySelector('canvas');
//Set canvas size to window
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

var c = canvas.getContext('2d');

function randomHex(){
    return `#${(Math.random()*0xFFFFFF<<0).toString(16)}`;
}

randomColorPalette = () => {
    var colors = ['#004072', '#0078A5', '#8FC5CD', '#00A2C6', '#00667F'];
    return colors[Math.floor(Math.random() * colors.length)];
}

var _mouse = {
    move: {
        isActive: false,
        x: null,
        y: null
    },
    down: {
        isActive: false,
        x: null,
        y: null
    },
    up: {
        x: null,
        y: null
    }
}

const MAX_RADIUS = 40;
const MIN_RADIUS = 2;

window.addEventListener('mousemove', m => {
    // console.log("Mouse move", _mouse.move.x, _mouse.move.y);
    _mouse.move.isActive = true;
    _mouse.move.x = m.x;
    _mouse.move.y = m.y;
});

window.addEventListener('mouseout', m => {
    _mouse.move.isActive = false;
    _mouse.move.x = null;
    _mouse.move.y = null;
});

window.addEventListener('mousedown', m => {
    _mouse.down.isActive = true;
    _mouse.down.x = m.x;
    _mouse.down.y = m.y;
});

window.addEventListener('mouseup', m => {
    _mouse.move.isActive = false;
    _mouse.down.isActive = false;
    _mouse.up.x = m.x;
    _mouse.up.y = m.y;
});

//Resize canvas according to the window size
window.addEventListener('resize', event => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    init();
});

function CircleText(x, y, r, dx, dy){
    this.x = x;
    this.y = y;
    this.r = r;
    this.dx = dx;
    this.dy = dy;

    this.draw = function(){
        c.font = '10px Arial';
        c.fillStyle='black';
        c.fillText(`${this.x.toFixed(0)} | ${this.y.toFixed(0)}`, this.x - this.r - 10, this.y - this.r - 10);
        c.fillText(`${this.dx.toFixed(0)} | ${this.dy.toFixed(0)}`, this.x - this.r, this.y - this.r);
    }

}

function Circle(x, y, r, dx, dy){
    this.x = x;
    this.y = y;
    this.r = r;
    this.dx = dx;
    this.dy = dy;
    this.minRadius = r;
    var hex = randomColorPalette();    
    
    this.draw = function() {
        c.strokeStyle = hex;
        c.fillStyle = hex;
        c.beginPath();
        c.arc(this.x, this.y, this.r, 0, Math.PI * 2, false);
        c.stroke();
        c.fill();
        c.closePath();
        // console.log(dx);
        // new CircleText(this.x, this.y, this.r,this.dx, this.dy).draw();
    }

    this.update = function(){

        if (this.x + this.r > innerWidth || 
            this.x - this.r < 0){
            this.dx = -this.dx;
        }
        
        if (this.y + this.r > innerHeight || 
            this.y - this.r < 0){
            this.dy = -this.dy;
        }
          
        //Current position
        this.x += this.dx;
        this.y += this.dy;

        //Interact with mouse

        if (_mouse.move.x - this.x < 50 && _mouse.move.x - this.x > -50 &&
            _mouse.move.y - this.y < 50 && _mouse.move.y -this.y > -50){
                if(this.r < MAX_RADIUS){
                    this.r += 1;
                }
        } else if (this.r > this.minRadius){
            this.r -= 1;
        }

        this.draw();
    }
}

var circles = [];
init = () => {
    circles = [];
    for (var i = 0; i < 200; i++){
        var r = Math.floor((Math.random() * 10) + 1);
        var x = Math.random() * (innerWidth - r * 2) + r;
        var y = Math.random() * (innerHeight - r * 2) + r;
        var dx = (Math.random() - 0.5) * 2;
        var dy = (Math.random() - 0.5) * 2;

        circles.push(new Circle(x, y, r, dx, dy));
    }
}

function animate() {
    requestAnimationFrame(animate);
    
    c.clearRect(0,0, innerWidth, innerHeight);
    // circle1.update();
    circles.forEach(circle => {
        circle.update();
    })
}

init();
animate();