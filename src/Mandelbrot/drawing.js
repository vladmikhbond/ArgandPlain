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
   for (let x = -R; x < R; x += K) {
       if (x) {
           ctx.strokeStyle =  "gray";
           ctx.setLineDash([5, 10]);
       } else {
           ctx.strokeStyle =  "black";
           ctx.setLineDash([]);
       }
       ctx.beginPath();
       ctx.moveTo(-R, x); 
       ctx.lineTo(R, x); 
       ctx.moveTo(x, -R); 
       ctx.lineTo(x, R); 
       ctx.stroke();   
   }
   ctx.setLineDash([]);
}

function drawM(n, d) {
    const D = d * K * 2;
    
   const ctx = canvas.getContext("2d");
   ctx.clearRect(0, 0, canvas.width, canvas.height);
   ctx.save();
   ctx.translate(canvas.width / 2, canvas.height / 2);
   ctx.scale(1, -1);
   
   drawAxes(ctx);
   
   for (let x = -2; x < 1; x += d) {
      for (let y = -1; y < 1; y += d) {
          let z = Complex.ZERO; 
          let c = new Complex(x, y);
          let i = 0;
          for (; i < n && z.abs() < 2; i++) {
              z = z.mul(z).add(c);
          }
          if (i == n) {
              ctx.fillStyle = `rgb(${i},255,255)`;
              ctx.fillRect(x * K - D/2, y * K - D/2, D, D);
          }
      }
 
   }
   ctx.restore();
}