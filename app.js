const lineWidth = document.querySelector('#line-width');
const lineColor = document.querySelector('#line-color');
const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');
canvas.width = 800;
canvas.height = 800;

ctx.lineWidth = 2;
let isPainting = false;

const onMouseMove = (event) => {
  if (isPainting) {
    ctx.lineTo(event.offsetX, event.offsetY);
    ctx.stroke();
    return;
  }
  ctx.moveTo(event.offsetX, event.offsetY);
};

const startPainting = () => {
  isPainting = true;
};

const cancelPainting = () => {
  ctx.beginPath();
  isPainting = false;
};

canvas.addEventListener('mousemove', onMouseMove);
canvas.addEventListener('mousedown', startPainting);
canvas.addEventListener('mouseup', cancelPainting);
canvas.addEventListener('mouseleave', cancelPainting);

const onLineWidthChange = (event) => {
  ctx.lineWidth = event.target.value;
};

const onLineColorChange = (event) => {
  ctx.strokeStyle = event.target.value;
};

const onColorOptionClick = (event) => {
  const { color } = event.target.dataset;
  ctx.strokeStyle = color;
  lineColor.value = color;
};

lineWidth.addEventListener('change', onLineWidthChange);
lineColor.addEventListener('change', onLineColorChange);

const colorOptions = document.querySelectorAll('.color-option');
colorOptions.forEach((colorOption) => {
  colorOption.addEventListener('click', onColorOptionClick);
});
