// Initial Setup
const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d')

canvas.width = innerWidth
canvas.height = innerHeight

// Variables
const mouse = {
    x: innerWidth / 2,
    y: innerHeight / 2
}

const colors = ['#E37B40', '#46B29D', '#DE5B49', '#324D5C', '#F0CA4D'];
const GRAVITY = 1;
const FRICTION = 0.99;

// Event Listeners
addEventListener('mousemove', event => {
    mouse.x = event.clientX
    mouse.y = event.clientY
})

addEventListener('click', event => {
    init();
});

addEventListener('resize', () => {
    canvas.width = innerWidth
    canvas.height = innerHeight

    init()
})

// Utility Functions
function randomIntFromRange(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min)
}

function randomColor(colors) {
    return colors[Math.floor(Math.random() * colors.length)]
}

function distance(x1, y1, x2, y2) {
    const xDist = x2 - x1
    const yDist = y2 - y1

    return Math.sqrt(Math.pow(xDist, 2) + Math.pow(yDist, 2))
}

// balls
function Ball(x, y, dx, dy,radius, color) {
    this.x = x;
    this.y = y;
    this.dx = dx;
    this.dy = dy;
    this.radius = radius;
    this.color = color;
}

Ball.prototype.update = function() {
    if(this.y + this.radius + this.dy > canvas.height){
        this.dy = -this.dy * FRICTION;
    } else {
        this.dy += GRAVITY;
    }

    //Reverse the velocity on wall impact
    if(this.x + this.radius + this.dx > canvas.width || 
        this.x - this.radius < 0){
        this.dx = -this.dx;
    }

    this.x += this.dx;
    this.y += this.dy;
    this.draw();
}

Ball.prototype.draw = function() {
    c.beginPath();
    c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
    c.fillStyle = this.color;
    c.fill();
    c.closePath();
}

// Implementation
let balls;
function init() {

    balls = []
    
    for (let i = 0; i < 100; i++) {
        var radius = randomIntFromRange(10, 30);
        balls.push(
            new Ball(
                randomIntFromRange(radius, canvas.width - radius), 
                randomIntFromRange(0, canvas.height - radius), 
                randomIntFromRange(-2, 2), 
                randomIntFromRange(1, 2),
                radius, randomColor(colors)));
    }
}

// Animation Loop
function animate() {
    requestAnimationFrame(animate);
    c.clearRect(0, 0, canvas.width, canvas.height);

    balls.forEach(object => {
        object.update();
    });
}

init();
animate();
