function showM() {
   const ids = ["resA", "resB", "resC"];
   for (let i = 0; i < ids.length; i++) {
        let res = document.getElementById(ids[i]);
        if (EXPRS[i] && EXPRS[i].value) {
           let z = EXPRS[i].value; //.round(2).toString();
              
           res.innerHTML = `${z.re.toFixed(2)} + ${z.im.toFixed(2)}i &nbsp;&nbsp;&nbsp;       
                            |z| = ${z.abs().toFixed(2)}  fi = ${(z.arg()*180/Math.PI).toFixed(0)}gr`;
        } else { 
            res.innerHTML = "n/a";
        }
   }
}


function drawAxes(ctx) {
   ctx.lineWidth = 0.5;
   ctx.strokeStyle =  "black";

   ctx.beginPath();
   // Ox
   ctx.moveTo(0, canvasR); 
   ctx.lineTo(2*canvasR, canvasR); 
   // Oy
   ctx.moveTo(canvasR, 0); 
   ctx.lineTo(canvasR, 2 * canvasR); 
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
         ctx.fillStyle = `rgb(${color},127,127)`;        
         ctx.fillRect(x - q, 2 * canvasR - y - q, quol, quol);    
      }
   }
   drawAxes(ctx);
}

function drawCursor(event) {
   const ctx = canvas.getContext("2d");
   let r = canvasR / ENLAG;
   ctx.strokeStyle = "gray";
   ctx.strokeRect(event.offsetX - r, event.offsetY - r, 2 * r, 2 * r);    
}




// запасной вариант рисования
function draw111(levels, quol) {
   
   const K  = canvasR / AREA.r;
   const d = quol / K;

    
   const ctx = canvas.getContext("2d");
   ctx.clearRect(0, 0, canvas.width, canvas.height);
   ctx.save();
   ctx.translate(canvasR, canvasR);
   ctx.scale(1, -1);
   
   let i = 0;
   let q = quol / 2;
   for (let x = AREA.x1; x < AREA.x2; x += d) {
      for (let y = AREA.y1; y < AREA.y2; y += d) {
         let color = 255 * levels[i++]/MAX_LEVEL; 
         ctx.fillStyle = `rgb(${color},127,127)`;
         let xx = (x - AREA.x) * K - q; 
         let yy = (y - AREA.y) * K - q;
         ctx.fillRect(xx, yy, quol, quol);    
      }
   }
   drawAxes(ctx);
   ctx.restore();
}


