
canvas.addEventListener('mousemove', function(e) {
   let [x,y] = toModelCoord(e);
   const expr = EXPRS[0].body; 
   let a = lexicalAnalisys(expr);
   let poland = toPoland(a);
   let level = mandelbrotLevel(x, y, 1000, poland);
   resA.innerHTML = level.toString();
});


// END canvas mouse events ---------------------------------

mandelbrotButton.addEventListener('click', function(e) {
    refresh();
    const expr = EXPRS[0].body;
    const n = EXPRS[1].value.abs() | 0;
    const d = EXPRS[2].value.abs();

    let time1 = new Date().getTime();
    drawM(expr, n, d);
    let time2 = new Date().getTime();
    console.log((time2 - time1) / 1000);
});



function refresh() {
    // creation
    EXPRS[0] = new Expression(inputA.value, inputA.style.borderColor);
    EXPRS[1] = new Expression(inputB.value, inputB.style.borderColor);
    EXPRS[2] = new Expression(inputC.value, inputC.style.borderColor);
    
    EXPRS.forEach(x => x.eval());

}

// Utils ------------------------------------
function toModelCoord(e) {
    return [ (e.offsetX - R) / K, -(e.offsetY - R) / K ];
}
