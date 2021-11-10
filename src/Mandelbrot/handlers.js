inputA.addEventListener('change', refresh);
inputB.addEventListener('change', refresh);
inputC.addEventListener('change', refresh);

canvas.addEventListener('contextmenu', event => event.preventDefault());

// local globals
const quolityStep = 2;
let levelsMap = null;
let hasTarget = false;

canvas.addEventListener('mousedown', function(e) {         
    hasTarget = true;
    drawCursor(e);
});

canvas.addEventListener('mousemove', function(e) {
    showCurrents(e);
    if (hasTarget) {
        imageToCanvas();
        drawCursor(e);
    }
});
 
canvas.addEventListener('mouseup', function(e) {
    if (hasTarget) { 
        enlarge(e);
    }
}); 

function showCurrents(event) {
    let [x, y] = [event.offsetX, event.offsetY];
    [x, y] = toModelCoord(x, y);
    resA.innerHTML = `C = ${x.toFixed(8)} + ${y.toFixed(8)}i`;

    let expr = EXPRS[0].body; 
    let a = lexicalAnalisys(expr);
    let poland = toPoland(a);
    let ML = MAX_LEVEL * 10;
    let level = getDeepLevel(x, y, poland, ML);
    let eq = level == ML ? ">" : "=";    
    resB.innerHTML = `Level ${eq} ${level}`;
}

function enlarge(event) {
    if (AREA.r / ENLAG > 1e-14) {
        let [x, y] = [event.offsetX, event.offsetY];
        [x, y] = toModelCoord(x, y);
        AREA.x = x; 
        AREA.y = y; 
        AREA.r /= ENLAG;   
        refresh();            
        hasTarget = false;
    } else {
        alert("LIMIT");
    }   

}

function refresh() 
{   
    EXPRS[0] = new Expression(inputA.value, inputA.style.borderColor);
    EXPRS[1] = new Expression(inputB.value, inputB.style.borderColor);
    EXPRS[2] = new Expression(inputC.value, inputC.style.borderColor);
    EXPRS.forEach(x => x.eval());
    
    const expr = EXPRS[0].body;
    MAX_LEVEL = EXPRS[1].value.abs() | 0;
    ENLAG = EXPRS[2].value.abs();

    let t = new Date().getTime();
    levelsMap = getLevels(expr, quolityStep);
    draw(levelsMap, quolityStep);
    
    t = (new Date().getTime() - t) / 1000;
    resC.innerHTML = `T = ${t}"  Scale = ${AREA.pow2}`;
}

canvas.addEventListener('touchstart', function(ev) {
    console.log(111111111111)
});
