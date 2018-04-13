var canvas = document.querySelector('canvas');
//Set canvas size to window
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

var c = canvas.getContext('2d');
// console.log(canvas);
// console.log(c);

c.fillRect(100, 100, 100, 100);

//Line
c.beginPath();
c.moveTo(50,300);
c.lineTo(300, 100);
c.stroke();

//Arc
c.arc(300, 300, 30, 0, Math.PI * 2, false);
c.stroke();


