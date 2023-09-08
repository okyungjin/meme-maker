import { isTextSelected } from './src/text.js';

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
let isFilling = false;


// const onMouseMove = (event) => {
//   if (isPainting) {
//     ctx.lineTo(event.offsetX, event.offsetY);
//     ctx.stroke();
//     return;
//   }
//   ctx.moveTo(event.offsetX, event.offsetY);
// };

const curPos = {x: 0, y: 0};
const start = {x: 0, y: 0};
const offset = {x: canvas.offsetLeft, y: canvas.offsetTop};
let isElemSelected = false;
let isMouseDown = false;

let isDragging = false;
let offsetX = 0;
let offsetY = 0;

const text = {
  text: "텍스트",
  fontSize: 32,
  font: "32px nanumBold",
  fillStyle: "#ff0000",
  x: canvas.width / 2,
  y: canvas.height / 2,
  width: 0,
}

const startPainting = (e) => {
  e.preventDefault();
  e.stopPropagation();

  const winScrollTop = window.scrollY;

  start.x = parseInt(e.clientX - offset.x);
  start.y = parseInt(e.clientY - offset.y + winScrollTop);

  console.log(start, offset, winScrollTop);

  if( isTextSelected(start.x, start.y, text)){
    isElemSelected = true;
  }
  isMouseDown = true;

  // if (!isFilling) {
  //   isPainting = true;
  // }
};


// canvas.addEventListener("mouseup", function(e){
//   isMouseDown = false;
//   isElemSelected = false;
// });


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

canvas.addEventListener('mousemove', (e) => {
  e.preventDefault();

  const curPos = getCurrentPositionInCanvas(e);
  if (isTextSelected(curPos.x, curPos.y, text)) {
    canvas.style.cursor = 'move';
  } else {
    canvas.style.cursor = 'default';
  }

  if (isMouseDown && isElemSelected) {

    const dx = curPos.x - start.x, dy = curPos.y - start.y;

    start.x = curPos.x;
    start.y = curPos.y;

    text.x += Number(dx.toFixed(0));
    text.y += Number(dy.toFixed(0));

    drawText(start.x, start.y);
  }
});

// canvas.addEventListener('click', (e) => {
//   const winScrollTop = window.scrollY;
//
//   start.x = parseInt(e.clientX - offset.x);
//   start.y = parseInt(e.clientY - offset.y + winScrollTop);
//
//   if (isTextSelected(start.x, start.y, text)) {
//     console.log('this is text');
//     console.log(text.width, text.height);
//     ctx.strokeRect(text.x - text.width / 2, text.y - text.height, text.width, text.height);
//   } else {
//     ctx.save();
//     ctx.strokeStyle = 'transparent';
//     ctx.strokeRect(text.x - text.width / 2, text.y - text.height, text.width, text.height);
//     ctx.restore();
//   }
// });
// canvas.addEventListener('dblclick', (e) => {
//   const winScrollTop = window.scrollY;
//

//   if (isTextSelected(start.x, start.y, text)) {
//     const $input = document.createElement('input');
//     $input.type = 'text';
//     $input.value = text.text;
//     $input.style.position = 'fixed';
//     $input.style.font = text.font;
//     $input.style.color = text.fillStyle;
//     // $input.style.left = (start.x) + 'px';
//     // $input.style.top = (start.y) + 'px';
//     document.body.appendChild($input);
//   }
//   // if (isTextSelected())
// })

// canvas.addEventListener('mousemove', (e) => {
//   const winScrollTop = window.scrollY;
//
//   start.x = parseInt(e.clientX - offset.x);
//   start.y = parseInt(e.clientY - offset.y + winScrollTop);
//
//   console.log(1);
//
//   if (isTextSelected(start.x, start.y, text)) {
//     text.strokeStyle = 'red';
//     canvas.style.cursor = 'move';
//   } else {
//     canvas.style.cursor = 'default';
//   }
// })

canvas.addEventListener('mousedown', (e) => {
  isMouseDown = true;
  const curPos = getCurrentPositionInCanvas(e);
  start.x = curPos.x;
  start.y = curPos.y;

  if (isTextSelected(start.x, start.y, text)) {
    isElemSelected = true;
  } else {
    isElemSelected = false;
  }
});

// 드래그 종료
canvas.addEventListener("mouseup", function (e) {
  isMouseDown = false;

  start.x = parseInt(e.clientX - offset.x);
  start.y = parseInt(e.clientY - offset.y + window.scrollY);

  if (!isTextSelected(start.x, start.y, text)) {
    isElemSelected = false;
  }

  drawText(text.x, text.y);
});

// 캔버스를 벗어날 때 드래그 종료
canvas.addEventListener("mouseleave", function () {
  isMouseDown = false;
  isDragging = false;
  drawText(text.x, text.y);
});


/**
 * @param {MouseEvent} e
 * @return {{x: number, y: number}}
 */
function getCurrentPositionInCanvas(e) {
  return {
    x: e.clientX - canvas.offsetLeft,
    y: e.clientY - canvas.offsetTop + window.scrollY
  }
}


// 초기 텍스트 그리기
// drawText(text.x, text.y);


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
const onModeClick = (event) => {
  isFilling = !isFilling;

  const modeBtn = event.target.closest('#mode-btn');
  const brushIcon = modeBtn.querySelector('#brush-icon');
  const paintIcon = modeBtn.querySelector('#paint-icon');

  if (isFilling) {
    brushIcon.classList.add('hidden');
    paintIcon.classList.remove('hidden');
  } else {
    brushIcon.classList.remove('hidden');
    paintIcon.classList.add('hidden');
  }
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

// File
const fileInput = document.querySelector('#file');
const onFileChange = (event) => {
  const file = event.target.files[0];
  const url = URL.createObjectURL(file);
  const image = new Image();
  image.src = url;
  image.onload = () => {
    ctx.drawImage(image, 0, 0, CANVAS_SIZE.WIDTH, CANVAS_SIZE.HEIGHT);
    fileInput.value = null;
  };
};
fileInput.addEventListener('change', onFileChange);

// Text
const textBtn = document.querySelector('#text-btn');
const onTextBtnClick = (event) => {
  const DEFAULT_TEXT = 'Lorem ipsum ...';
  ctx.save();
  ctx.lineWidth = 1;
  ctx.font = '48px serif';
  ctx.fillStyle = lineColor.value;
  ctx.fillText(DEFAULT_TEXT, 100, 100);
  ctx.restore();
}
textBtn.addEventListener('click', (event) => {
  // onTextBtnClick(event);

  drawText(text.x, text.y);
});

let hasInput = false;

const draggable = ($target) => {
  let isPress = false,
    prevPosX = 0,
    prevPosY = 0;

  $target.onmousedown = start;
  $target.onmouseup = end;

  // 상위 영역
  window.onmousemove = move;

  function start(e) {
    console.log('onmousedown');
    prevPosX = e.clientX;
    prevPosY = e.clientY;

    isPress = true;
  }

  function move(e) {
    console.log('move');
    if (!isPress) return;

    const posX = prevPosX - e.clientX;
    const posY = prevPosY - e.clientY;

    prevPosX = e.clientX;
    prevPosY = e.clientY;

    $target.style.left = ($target.offsetLeft - posX) + "px";
    $target.style.top = ($target.offsetTop - posY) + "px";
  }

  function end() {
    console.log('end')
    isPress = false;
  }
}

// Save
const saveBtn = document.querySelector('#save-btn');
const onSaveClick = () => {
  const url = canvas.toDataURL();
  const a = document.createElement('a');
  a.href = url;
  a.download = 'myDrawing.png';
  a.click();
};
saveBtn.addEventListener('click', onSaveClick);

function drawText(x, y) {
  console.log(x, y);

  text.x = x;
  text.y = y;

  const GUIDE_LINE_PADDING = 4;
  const GUIDE_LINE_BOX_SIZE = 16;

  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = 'black';
  ctx.font = text.font;
  ctx.textAlign = "center";
  ctx.fillText(text.text, x, y);
  text.width = Number(ctx.measureText(text.text).width.toFixed(0));

  if (isMouseDown && isElemSelected) {
    ctx.save();
    ctx.lineWidth = 2;
    ctx.strokeStyle = 'rgba(0, 0, 0, 0.2)';

    // vertical guide line
    if (Math.abs(x - canvas.width / 2) <= 2) {
      ctx.beginPath();
      ctx.moveTo(canvas.width / 2, 0);
      ctx.lineTo(canvas.width / 2, canvas.height);
      ctx.stroke();
    }

    // horizontal guide line
    if (Math.abs(y - canvas.height / 2) <= 2) {
      ctx.beginPath();
      ctx.moveTo(0, y - text.fontSize / 2);
      ctx.lineTo(canvas.width, y - text.fontSize / 2);
      ctx.stroke();
    }
    ctx.restore();
  }

  if (isElemSelected) {
    ctx.save();
    ctx.strokeRect(x - text.width / 2 - GUIDE_LINE_PADDING, y - text.fontSize - GUIDE_LINE_PADDING / 2, text.width + GUIDE_LINE_PADDING * 2, text.fontSize + GUIDE_LINE_PADDING * 2);

    // leftTop
    ctx.fillRect(x - text.width / 2 - GUIDE_LINE_PADDING - GUIDE_LINE_BOX_SIZE / 2, y - text.fontSize - GUIDE_LINE_PADDING / 2 - GUIDE_LINE_BOX_SIZE / 2, GUIDE_LINE_BOX_SIZE, GUIDE_LINE_BOX_SIZE);

    // rightTop
    ctx.fillRect(x + text.width / 2 + GUIDE_LINE_PADDING - GUIDE_LINE_BOX_SIZE / 2, y - text.fontSize - GUIDE_LINE_PADDING / 2 - GUIDE_LINE_BOX_SIZE / 2, GUIDE_LINE_BOX_SIZE, GUIDE_LINE_BOX_SIZE);

    // leftBottom
    ctx.fillRect(x - text.width / 2 - GUIDE_LINE_PADDING - GUIDE_LINE_BOX_SIZE / 2, y + GUIDE_LINE_PADDING - GUIDE_LINE_BOX_SIZE / 2, GUIDE_LINE_BOX_SIZE, GUIDE_LINE_BOX_SIZE);

    // rightBottom
    ctx.fillRect(x + text.width / 2 + GUIDE_LINE_PADDING - GUIDE_LINE_BOX_SIZE / 2, y  + GUIDE_LINE_PADDING - GUIDE_LINE_BOX_SIZE / 2, GUIDE_LINE_BOX_SIZE, GUIDE_LINE_BOX_SIZE);

    ctx.restore();
  }
}
