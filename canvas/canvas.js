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

    this.draw = function() {
        console.log('New circle', this.x, this.y);
        c.beginPath();
        c.arc(x, y, radius, 0, Math.PI * 2, false);
        c.closePath();
        c.stroke();
    }

    this.update = function(){
        if(x + radius > innerWidth || x - radius < 0){
            dx = -dx;
        }
        if(y + radius > innerHeight || y - radius < 0){
            dy = -dy;
        }
    
        x += dx;
        y += dy;
    }
}

var x = Math.random() * innerWidth;
var y = Math.random() * innerHeight;
var dx = (Math.random() - 0.5) * 8;
var dy = (Math.random() - 0.5) * 8;
var radius = 20;

function animate() {
    requestAnimationFrame(animate);
    var circle = new Circle(x, y, radius, dx, dy);
}

animate();