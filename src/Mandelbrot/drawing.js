

function draw(levelMap, quol) {
   const ctx = canvas.getContext("2d");
   ctx.clearRect(0, 0, canvas.width, canvas.height);
   let i = 0;
   //  Math.min(...levels) - call stack overflow!
   let mil = levelMap.reduce((a, x) => x < a ? x : a);
   let mal = MAX_LEVEL - mil;
   for (let x = 0; x < 2 * CANVAS_R; x += quol) {
      for (let y = 0; y < 2 * CANVAS_R; y += quol) {
         let color = 255 * (levelMap[i++] - mil )/mal; 
         ctx.fillStyle = `rgb(${color},${color},${255 - color})`;        
         ctx.fillRect(x, 2 * CANVAS_R - y - quol, quol, quol);    
      }
   }
   drawAxes(ctx);
   imageFromCanvas(ctx);
}

function drawTargetCursor(x, y) {
   const ctx = canvas.getContext("2d");
   ctx.strokeStyle = "black";
   let r = CANVAS_R / ENLAG;
   ctx.strokeRect(x - r, y - r, 2 * r, 2 * r);    
}

//----------pixel image suite -----------------------------

var canvasImageData;

function imageFromCanvas(ctx) {
   canvasImageData = ctx.createImageData(canvas.width, canvas.height);
   canvasImageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
}

function imageToCanvas() {
   const ctx = canvas.getContext("2d");
   ctx.putImageData(canvasImageData, 0, 0);
}


