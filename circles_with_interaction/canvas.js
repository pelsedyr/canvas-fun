var canvas = document.querySelector('canvas');
//Set canvas size to window
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

var c = canvas.getContext('2d');

function randomHex(){
    return `#${(Math.random()*0xFFFFFF<<0).toString(16)}`;
}

var _mouse = {
    move: {
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

window.addEventListener('mousemove', m => {
    if(_mouse.down.isActive){
        console.log('mousemove', m);
        _mouse.move.x = m.x;
        _mouse.move.y = m.y;
    }
});

window.addEventListener('mousedown', m => {
    console.log('mousedown', m);
    _mouse.down.isActive = true;
    _mouse.down.x = m.x;
    _mouse.down.y = m.y;
});

window.addEventListener('mouseup', m => {
    console.log('mouseup', m);
    _mouse.down.isActive = false;    
    _mouse.up.x = m.x;
    _mouse.up.y = m.y;
});

function Circle(x, y, r, dx, dy){
    this.x = x;
    this.y = y;
    this.radius = r;
    this.dx = dx;
    this.dy = dy;
    var hex = randomHex();    
    
    this.draw = function() {
        c.strokeStyle = hex;
        c.fillStyle = hex;
        c.beginPath();
        c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
        c.closePath();
        c.stroke();
        c.fill();
    }

    this.update = function(){

        if (this.x + this.radius > innerWidth || 
            this.x - this.radius < 0){
            this.dx = -this.dx;
        }
        
        if (this.y + this.radius > innerHeight || 
            this.y - this.radius < 0){
            this.dy = -this.dy;
        }
    
        //Current position
        this.x += this.dx;
        this.y += this.dy;

        //Interact with mouse
        // if(_mouse.x - this.x < 50){
        //     this.x = _mouse.x;
        //     this.y = _mouse.y;
        // }

        this.draw();
    }
}

var circles = [];
for (var i = 0; i < 100; i++){

    var x = Math.random() * innerWidth;
    var y = Math.random() * innerHeight;
    var radius = Math.floor((Math.random() * 30) + 1);
    var dx = (Math.random() - 0.5) * 7;
    var dy = (Math.random() - 0.5) * 7;

    circles.push(new Circle(x, y, radius, dx, dy));
}


function animate() {
    requestAnimationFrame(animate);
    
    c.clearRect(0,0, innerWidth, innerHeight);
    // circle1.update();
    circles.forEach(circle => {
        circle.update();
    })
}

animate();