function show() {
   const ids = ["resA", "resB", "resC"];
   for (let i = 0; i < ids.length; i++) {
       document.getElementById(ids[i]).innerHTML = 
          EXPRS[i] && EXPRS[i].value ? EXPRS[i].value.round(2).toString() : "";
   }
}

function draw() {
   const ctx = canvas.getContext("2d");
   ctx.clearRect(0, 0, canvas.width, canvas.height);
   ctx.save();
   ctx.translate(canvas.width / 2, canvas.height / 2);
   ctx.scale(1, -1);

   drawAxes(ctx);

   ctx.lineWidth = 2;
   ctx.lineCap = 'round';
   for (let e of EXPRS) {
       drawExpression(e, ctx)
   }
   drawSumOrMult(ctx);
   ctx.restore();
}  

function drawExpression(e, ctx) {
    if (e && e.value) {
        ctx.strokeStyle = e.color;           
        ctx.beginPath(); 
        ctx.moveTo(0, 0); 
        let x = e.value.re * K, y = e.value.im * K;
        ctx.lineTo(x, y);
        ctx.arc(x, y, 2, 0, 2 * Math.PI); 
        ctx.stroke();
    }
}

function drawSumOrMult(ctx) {
   let [c0, c1, c2] = EXPRS.map(e => e.value);
   if (!(c0 && c1 && c2))
       return;
   let x0 = c0.re * K, y0 = c0.im * K;
   let x1 = c1.re * K, y1 = c1.im * K;
   let x2 = c2.re * K, y2 = c2.im * K;
   ctx.fillStyle = "rgba(170, 51, 51, .25)";
   if (c2.equals(c0.add(c1))) {
       ctx.beginPath(); 
       ctx.moveTo(0, 0); 
       ctx.lineTo(x0, y0);
       ctx.lineTo(x2, y2);
       ctx.lineTo(x1, y1);
       ctx.fill()
   } else if (c2.equals(c0.mul(c1))) {
       ctx.beginPath(); 
       ctx.moveTo(0, 0); 
       ctx.lineTo(K, 0);
       ctx.lineTo(x0, y0);
       ctx.fill();
       ctx.beginPath(); 
       ctx.moveTo(0, 0); 
       ctx.lineTo(x1, y1);
       ctx.lineTo(x2, y2);
       ctx.fill();
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
