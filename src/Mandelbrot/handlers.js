inputA.addEventListener('change', refresh);
inputB.addEventListener('change', refresh);
inputC.addEventListener('change', refresh);

canvas.addEventListener('contextmenu', event => event.preventDefault());

const step = 2;
let levels = null;

let flag = false;

canvas.addEventListener('mousedown', function(e) {    
    if  (e.button == 2) {        
        flag = true;
        draw(levels, step);
        drawCursor(e);
    }  
});

canvas.addEventListener('mousemove', function(e) {
    let [x,y] = toModelCoord(e);
    resA.innerHTML = `C = ${x.toFixed(5)} + ${y.toFixed(5)}i`;

    let expr = EXPRS[0].body; 
    let a = lexicalAnalisys(expr);
    let poland = toPoland(a);
    let ML = MAX_LEVEL * 10;
    let level = getDeepLevel(x, y, poland, ML);
    let eq = level == ML ? ">" : "=";    
    resB.innerHTML = `Level ${eq} ${level}`;
    // rectangle around cursor
    if (flag) {
        draw(levels, step);
        drawCursor(e);
    }
});
 
canvas.addEventListener('mouseup', function(e) {
    if  (flag && e.button == 2) {    // 2 - right button
        let [x,y] = toModelCoord(e);
        AREA.x = x; 
        AREA.y = y; 
        AREA.r /= ENLAG;
        refresh();
        flag = false;
    }
}); 



function refresh() {
   
    EXPRS[0] = new Expression(inputA.value, inputA.style.borderColor);
    EXPRS[1] = new Expression(inputB.value, inputB.style.borderColor);
    EXPRS[2] = new Expression(inputC.value, inputC.style.borderColor);
    EXPRS.forEach(x => x.eval());
    
    const expr = EXPRS[0].body;
    MAX_LEVEL = EXPRS[1].value.abs() | 0;
    ENLAG = EXPRS[2].value.abs();


    let t = new Date().getTime();

    levels = getLevels(expr, step);
    draw(levels, step);
    
    resC.innerHTML = (new Date().getTime() - t) / 1000 + "sec";
}

// Utils ------------------------------------
function toModelCoord(e) {
    const K  = canvasR / AREA.r;
    return [ e.offsetX/K + AREA.x1, (2 * canvasR - e.offsetY)/K + AREA.y1 ];
}
