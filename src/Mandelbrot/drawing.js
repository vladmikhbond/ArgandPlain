function drawAxes(ctx) {
   ctx.lineWidth = 0.5;
   ctx.strokeStyle =  "black";
   let [x0, y0] = toCanvasCoord(0, 0);
   ctx.beginPath();
   //
   ctx.moveTo(0, y0); 
   ctx.lineTo(2 * CANVAS_R, y0); 
   //
   ctx.moveTo(x0, 0); 
   ctx.lineTo(x0, 2 * CANVAS_R); 
   //
   ctx.stroke();   
}

function draw(levels, quol) {
   const ctx = canvas.getContext("2d");
   ctx.clearRect(0, 0, canvas.width, canvas.height);
   let i = 0;
   //  Math.min(...levels) - call stack overflow!
   let mil = levels.reduce((a, x) => x < a ? x : a);
   let mal = MAX_LEVEL - mil;
   for (let x = 0; x < 2 * CANVAS_R; x += quol) {
      for (let y = 0; y < 2 * CANVAS_R; y += quol) {
         let color = 255 * (levels[i++] - mil )/mal; 
         ctx.fillStyle = `rgb(${color},${color},${255 - color})`;        
         ctx.fillRect(x, 2 * CANVAS_R - y - quol, quol, quol);    
      }
   }
   drawAxes(ctx);
   pixelsFromCanvas(ctx);
}

function drawCursor(event) {
   const ctx = canvas.getContext("2d");
   ctx.strokeStyle = "black";
   let r = CANVAS_R / ENLAG;
   ctx.strokeRect(event.offsetX - r, event.offsetY - r, 2 * r, 2 * r);    
}

var canvasImageData;

function pixelsFromCanvas(ctx) {
   canvasImageData = ctx.createImageData(canvas.width, canvas.height);
   canvasImageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
}

function pixelsToCanvas() {
   const ctx = canvas.getContext("2d");
   ctx.putImageData(canvasImageData, 0, 0);
}


