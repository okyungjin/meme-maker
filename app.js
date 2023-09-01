const lineWidth = document.querySelector('#line-width');
const lineColor = document.querySelector('#line-color');
const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');

const CANVAS_SIZE = Object.freeze({
  WIDTH: 800,
  HEIGHT: 800,
});

canvas.width = CANVAS_SIZE.WIDTH;
canvas.height = CANVAS_SIZE.HEIGHT;

ctx.lineWidth = 2;
let isPainting = false;
let isFilling = true;

const onMouseMove = (event) => {
  if (isPainting) {
    ctx.lineTo(event.offsetX, event.offsetY);
    ctx.stroke();
    return;
  }
  ctx.moveTo(event.offsetX, event.offsetY);
};

const startPainting = () => {
  if (!isFilling) {
    isPainting = true;
  }
};

const cancelPainting = () => {
  ctx.beginPath();
  isPainting = false;
};

const onCanvasClick = () => {
  if (isFilling) {
    ctx.fillStyle = lineColor.value;
    ctx.fillRect(0, 0, CANVAS_SIZE.WIDTH, CANVAS_SIZE.HEIGHT);
  }
}

canvas.addEventListener('mousemove', onMouseMove);
canvas.addEventListener('mousedown', startPainting);
canvas.addEventListener('mouseup', cancelPainting);
canvas.addEventListener('mouseleave', cancelPainting);
canvas.addEventListener('click', onCanvasClick);

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

const modeBtn = document.querySelector('#mode-btn');
const onModeClick = () => {
  isFilling = !isFilling;
  modeBtn.innerText = isFilling ? 'Fill' : 'Draw';
};
modeBtn.addEventListener('click', onModeClick);

// Destroy
const destroyBtn = document.querySelector('#destroy-btn');
const onDestroyClick = () => {
  ctx.fillStyle = 'white';
  ctx.fillRect(0, 0, CANVAS_SIZE.WIDTH, CANVAS_SIZE.HEIGHT);
};
destroyBtn.addEventListener('click', onDestroyClick);

// Eraser
const eraserBtn = document.querySelector('#eraser-btn');
const onEraserClick = () => {
  ctx.strokeStyle = 'white';
  isFilling = false;
};
eraserBtn.addEventListener('click', onEraserClick);
