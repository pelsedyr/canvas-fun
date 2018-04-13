var canvas = document.querySelector('canvas');
//Set canvas size to window
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

var c = canvas.getContext('2d');
// console.log(canvas);
// console.log(c);

// c.fillRect(100, 100, 100, 100);

// //Line
// c.beginPath();
// c.moveTo(50,300);
// c.lineTo(300, 100);
// c.stroke();

// //Arc
// c.arc(300, 300, 30, 0, Math.PI * 2, false);
// c.stroke();

function getRandCoord(dir){
    switch(dir){
        case 'x':
            return Math.floor((Math.random() * innerWidth) + 1);
            break;
        case 'y':
            return Math.floor((Math.random() * innerHeight) + 1);
            break;
        default: return 1;
    }
}

console.log(getRandCoord('x'));
console.log(getRandCoord('y'));

function Circle(x, y, r, dx, dy){
    this.x = x;
    this.y = y;
    this.radius = r;
    this.dx = dx;
    this.dy = dy;

    this.draw = function() {
        c.beginPath();
        c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
        c.closePath();
        c.stroke();
        c.fill();
    }

    this.update = function(){
        if(this.x + this.radius > innerWidth || 
            this.x - this.radius < 0){
            this.dx = -this.dx;
        }
        if(this.y + this.radius > innerHeight || 
            this.y - this.radius < 0){
            this.dy = -this.dy;
        }
    
        this.x += this.dx;
        this.y += this.dy;

        this.draw();
    }
}

var x = Math.random() * innerWidth;
var y = Math.random() * innerHeight;
var dx = (Math.random() - 0.5) * 8;
var dy = (Math.random() - 0.5) * 8;
var radius = 20;

var circle1 = new Circle(x, y, radius, dx, dy);

function animate() {
    requestAnimationFrame(animate);
    
    c.clearRect(0,0, innerWidth, innerHeight);
    
    circle1.update();    

}

animate();