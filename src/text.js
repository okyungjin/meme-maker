/**
 * 텍스트 영역을 클릭했는지 판단하는 함수
 * @param {number } curPosX
 * @param {number} curPosY
 * @param text
 * @return {boolean}
 */
export const isTextSelected = (curPosX, curPosY, text) => {
  const { x: textPosX, y: textPosY, width: textWidth, fontSize: textHeight } = text;

  const minX = textPosX - textWidth / 2;
  const maxX = textPosX + textWidth / 2;
  const minY = textPosY - textHeight;
  const maxY = textPosY + textHeight;

  return (curPosX >= minX
    && curPosX <= maxX
    && curPosY >= minY
    && curPosY <= maxY);
}


/*Canvas 내 filltext 추가 함수*/
export const drawText = function(canvas, ctx, text){
  ctx.fillStyle = "white";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = text.fillStyle;
  ctx.font = text.font;
  ctx.textAlign = "center";
  ctx.fillText(text.text, text.x, text.y);
  text.width = Number(ctx.measureText(text.text).width.toFixed(0));
}
