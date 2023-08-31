const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');
canvas.width = 800;
canvas.height = 800;

ctx.rect(50, 50, 100, 100);
ctx.rect(150, 150, 100, 100);
ctx.rect(250, 250, 100, 100);
ctx.stroke();

ctx.strokeStyle = 'red';
setTimeout(() => {
  ctx.stroke();
}, 2000);

ctx.beginPath();
ctx.rect(450, 450, 100, 100);
ctx.rect(550, 550, 100, 100);
ctx.fillStyle = 'red';
ctx.fill();
