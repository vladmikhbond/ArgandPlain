


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

// END canvas mouse events ---------------------------------

mandelbrotButton.addEventListener('click', function(e) {
    const n = EXPRS[1].value.abs() | 0;
    const d = EXPRS[2].value.abs();
    drawM(n, d);
});



function refresh() {
    // creation
    EXPRS[0] = new Expression(inputA.value, inputA.style.borderColor);
    EXPRS[1] = new Expression(inputB.value, inputB.style.borderColor);
    EXPRS[2] = new Expression(inputC.value, inputC.style.borderColor);
    
    EXPRS.forEach(x => x.eval());

    drawM();
}

// Utils ------------------------------------
function toModelCoord(e) {
    return [ (e.offsetX - R) / K, -(e.offsetY - R) / K ];
}
