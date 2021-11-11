// ARGAND

inputA.addEventListener('change', refresh);
inputB.addEventListener('change', refresh);
inputC.addEventListener('change', refresh);

range.addEventListener('change', function(e) {
    AREA.r = 2 ** (range.value | 0);
    refresh();
});

// canvas mouse events ---------------------------------

let selectedInput = null;

canvas.addEventListener('contextmenu', event => event.preventDefault());

canvas.addEventListener('mousedown', startListener);
canvas.addEventListener('touchstart', startListener);

function startListener(e) {    
    let [x, y] = eventCoord(e);
    for (let i = 0; i < EXPRS.length; i++) {
       if (EXPRS[i].isNear(...toModelCoord(x, y))) {
           selectedInput = [inputA, inputB, inputC][i];           
       }
    }
    console.log("start")  ////////////////////////
}

canvas.addEventListener('mousemove', function(e) {
    let [x, y] = eventCoord(e);
    [x,y] = toModelCoord(x, y);
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
    console.log("move")  ////////////////////////
});

canvas.addEventListener('mouseup', function(e) {
    selectedInput = null;
    console.log("end")  ////////////////////////
});


// ------------------------------------------------------


function refresh() {
    // creation
    EXPRS[0] = new Expression(inputA.value, inputA.style.borderColor);
    EXPRS[1] = new Expression(inputB.value, inputB.style.borderColor);
    EXPRS[2] = new Expression(inputC.value, inputC.style.borderColor);
      
    for (let i = 0; i < EXPRS.length; i++) {
        // substitution      
        EXPRS[i].substitutionConst()
        for (let j = 0; j < i; j++) {
            EXPRS[i].substitution(EXPRS[j])
        }
        // evalution      
        EXPRS[i].eval();
    }
   
    show();
    draw();
}


