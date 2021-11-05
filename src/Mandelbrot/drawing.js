// function showM() {
//    const ids = ["resA", "resB", "resC"];
//    for (let i = 0; i < ids.length; i++) {
//         let res = document.getElementById(ids[i]);
//         if (EXPRS[i] && EXPRS[i].value) {
//            let z = EXPRS[i].value; //.round(2).toString();
              
//            res.innerHTML = `${z.re.toFixed(2)} + ${z.im.toFixed(2)}i &nbsp;&nbsp;&nbsp;       
//                             |z| = ${z.abs().toFixed(2)}  fi = ${(z.arg()*180/Math.PI).toFixed(0)}gr`;
//         } else { 
//             res.innerHTML = "n/a";
//         }
//    }
// }


function drawAxes(ctx) {
   ctx.lineWidth = 0.5;
   ctx.strokeStyle =  "black";
   let [x0, y0] = toCanvasCoord(0, 0);
   ctx.beginPath();
   //
   ctx.moveTo(0, y0); 
   ctx.lineTo(2 * canvasR, y0); 
   //
   ctx.moveTo(x0, 0); 
   ctx.lineTo(x0, 2 * canvasR); 
   //
   ctx.stroke();   
}

function draw(levels, quol) {
   const ctx = canvas.getContext("2d");
   ctx.clearRect(0, 0, canvas.width, canvas.height);
   let i = 0;
   let q = quol / 2;
   for (let x = 0; x < 2 * canvasR; x += quol) {
      for (let y = 0; y < 2 * canvasR; y += quol) {
         let color = 255 * levels[i++]/MAX_LEVEL; 
         ctx.fillStyle = `rgb(${color},${color},${255 - color})`;        
         ctx.fillRect(x - q, 2 * canvasR - y - q, quol, quol);    
      }
   }
   drawAxes(ctx);
}

function drawCursor(event) {
   const ctx = canvas.getContext("2d");
   ctx.strokeStyle = "black";
   let r = canvasR / ENLAG;
   ctx.strokeRect(event.offsetX - r, event.offsetY - r, 2 * r, 2 * r);    
}





