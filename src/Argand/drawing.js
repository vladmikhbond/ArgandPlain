function show() {
   const ids = ["resA", "resB", "resC"];
   for (let i = 0; i < ids.length; i++) {

        let res = document.getElementById(ids[i]);
        if (EXPRS[i] && EXPRS[i].value) {
           let z = EXPRS[i].value; 
           let re = z.re.toFixed(2);
           let im = z.im.toFixed(2);
           let amp = z.abs().toFixed(2);
           let phi = (z.arg()*180/Math.PI).toFixed(0);
           res.innerHTML = `<span style="width: 100px; display: inline-block;">${re} + ${im}i</span>${amp}e<sup>${phi}i</sup>`;
        } else { 
            res.innerHTML = "n/a";
        }
   }
}

function draw() {
   const ctx = canvas.getContext("2d");
   ctx.clearRect(0, 0, canvas.width, canvas.height); 
   drawAxes(ctx);

   ctx.lineWidth = 2;
   ctx.lineCap = 'round';
   for (let expr of EXPRS) {
       drawExpression(expr, ctx);
   }
   drawSumOrMult(ctx);
}  

function drawExpression(expr, ctx) {
    if (expr && expr.value) {
        let [x0, y0] = toCanvasCoord(0, 0);
        let [x, y] = toCanvasCoord(expr.value.re, expr.value.im);
        ctx.strokeStyle = expr.color;           
        ctx.beginPath(); 
        ctx.moveTo(x0, y0); 
        ctx.lineTo(x, y);
        ctx.arc(x, y, 2, 0, 2 * Math.PI); 
        ctx.stroke();
    }
}

function drawSumOrMult(ctx) {
   let [c1, c2, c3] = EXPRS.map(e => e.value);
   if (!(c1 && c2 && c3))
       return;
    let [x1, y1] =  toCanvasCoord(c1.re, c1.im);
    let [x2, y2] =  toCanvasCoord(c2.re, c2.im);
    let [x3, y3] =  toCanvasCoord(c3.re, c3.im);
    let [x0, y0] =  toCanvasCoord(0, 0);    
    let [xOne, yOne] =  toCanvasCoord(1, 0);

   ctx.fillStyle = "rgba(170, 51, 51, .25)";
   if (c3.equals(c1.add(c2))) {
       ctx.beginPath(); 
       ctx.moveTo(x0, y0); 
       ctx.lineTo(x1, y1);
       ctx.lineTo(x3, y3);
       ctx.lineTo(x2, y2);
       ctx.fill();
   } else if (c3.equals(c1.mul(c2))) {
       ctx.beginPath(); 
       ctx.moveTo(x0, y0); 
       ctx.lineTo(xOne, yOne);
       ctx.lineTo(x1, y1);
       ctx.fill();
       ctx.beginPath(); 
       ctx.moveTo(x0, y0); 
       ctx.lineTo(x2, y2);
       ctx.lineTo(x3, y3);
       ctx.fill();
   }
}

