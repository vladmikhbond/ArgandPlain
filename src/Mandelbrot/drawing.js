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
   ctx.moveTo(-canvasR, 0); 
   ctx.lineTo(canvasR, 0); 
   ctx.moveTo(0, -canvasR); 
   ctx.lineTo(0, canvasR); 
   ctx.stroke();   
}

function draw(expr) {
   
   const K  = canvasR / AREA.r;
   const d = 2 / K;
   const D = d * K;
    
   const ctx = canvas.getContext("2d");
   ctx.clearRect(0, 0, canvas.width, canvas.height);
   ctx.save();
   ctx.translate(canvasR, canvasR);
   ctx.scale(1, -1);
   
   let a = lexicalAnalisys(expr);
   let poland = toPoland(a);
   let levels = getLevels(poland, d);
   
   let i = 0;
   for (let x = AREA.x1; x < AREA.x2; x += d) {
      for (let y = AREA.y1; y < AREA.y2; y += d) {
         let color = 255 * levels[i++]/MAX_LEVEL; 
         ctx.fillStyle = `rgb(${color},127,127)`;
         let xx = (x - AREA.x) * K - D/2; 
         let yy = (y - AREA.y) * K - D/2;
         ctx.fillRect(xx, yy, D, D);    
      }
   }
   drawAxes(ctx);
   ctx.restore();
}



