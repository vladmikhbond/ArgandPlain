function drawAxes(ctx) {
   ctx.lineWidth = 0.5;
   ctx.strokeStyle =  "black";
   let [x0, y0] = toCanvasCoord(0, 0);
   ctx.beginPath();
     // x-axis
   ctx.moveTo(0, y0); 
   ctx.lineTo(2 * CANVAS_R, y0); 
   // y-axis
   ctx.moveTo(x0, 0); 
   ctx.lineTo(x0, 2 * CANVAS_R); 
   // letters
   ctx.font = "15px serif";
   ctx.fillStyle = "gray";
   ctx.fillText("Re", 2 * CANVAS_R - 25, y0 - 5);
   ctx.fillText("Im", CANVAS_R + 5, 0 + 20);
   
   ctx.stroke();   

    // unit circle
    ctx.beginPath();
    ctx.setLineDash([5, 10]);
    ctx.arc(x0, y0, AREA.unit, 0, 2 * Math.PI); 
    ctx.stroke(); 
    ctx.setLineDash([]);
 
}

