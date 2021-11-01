inputA.addEventListener('change', refresh);
inputB.addEventListener('change', refresh);
inputC.addEventListener('change', refresh);

range.addEventListener('change', function(e) {
    MAX = 2 ** (range.value | 0);
    K  = R / MAX;
    refresh();
});

// canvas mouse events ---------------------------------

let selectedInput = null;

canvas.addEventListener('mousedown', function(e) {
    for (let i = 0; i < EXPRS.length; i++) {
       if (EXPRS[i].isNear(...toModelCoord(e))) {
           selectedInput = [inputA, inputB, inputC][i];           
       }
    }
});

canvas.addEventListener('mousemove', function(e) {
    let [x,y] = toModelCoord(e);
    // set mouse pointer
    this.style.cursor = EXPRS.some(e => e.isNear(x, y)) ? 'pointer' : 'auto';

    if (selectedInput) {    
        let eqPos = selectedInput.value.indexOf('=');
        let rvalue = `${x.toFixed(2)} + ${y.toFixed(2)}i`;
        if (eqPos == -1)       
            selectedInput.value = rvalue;
        else 
            selectedInput.value = selectedInput.value.slice(0, eqPos + 1) + " " + rvalue;
        refresh();
    }
    
});

canvas.addEventListener('mouseup', function(e) {
    selectedInput = null;
});

// ---------------------- mandelbrot  ----------------------------
mandelbrotButton.addEventListener('click', function(e) {
    const n = EXPRS[1].value.abs() | 0;
    const d = EXPRS[2].value.abs();
    drawMandelbrot(n, d);
});

// ------------------------------------------------------


function refresh() {
    // creation
    EXPRS[0] = new Expression(inputA.value, inputA.style.borderColor);
    EXPRS[1] = new Expression(inputB.value, inputB.style.borderColor);
    EXPRS[2] = new Expression(inputC.value, inputC.style.borderColor);
    
    // mandelbrot fork
    if (isMandelbrot(EXPRS)) 
    {
        divM.style.display = "block";
        EXPRS.forEach(x => x.eval());
    } 
    else 
    {
        divM.style.display = "none";        
        for (let i = 0; i < EXPRS.length; i++) {
            // substitution      
            EXPRS[i].substitutionConst()
            for (let j = 0; j < i; j++) {
                EXPRS[i].substitution(EXPRS[j])
            }
            // evalution      
            EXPRS[i].eval();
        }
    }
    show();
    draw();
}

// Utils ------------------------------------
function toModelCoord(e) {
    return [ (e.offsetX - R) / K, -(e.offsetY - R) / K ];
}

function isMandelbrot(e) {
    return e[0].name && e[1].name && e[0].body.indexOf(e[0].name) > -1 ;        
}
