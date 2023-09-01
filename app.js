const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');
canvas.width = 800;
canvas.height = 800;

ctx.fillRect(170, 200, 15, 100);
ctx.fillRect(310, 200, 15, 100);
ctx.fillRect(220, 200, 60, 200);

ctx.arc(250, 100, 50, 0, 2 * Math.PI);
ctx.fill();

ctx.beginPath();
ctx.fillStyle = 'white';
ctx.arc(270, 80, 5, 0, 2 * Math.PI);
ctx.arc(230, 80, 5, 0, 2 * Math.PI);
ctx.fill();
