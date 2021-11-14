// ARGAND
inputParams.addEventListener('change', refresh);
inputA.addEventListener('change', refresh);
inputB.addEventListener('change', refresh);
inputC.addEventListener('change', refresh);
range.addEventListener('change', refresh);

// learning ---------------------------------------

let buttons = [...document.getElementsByClassName("b-c")]
for (let i = 0; i < buttons.length; i++) {
    buttons[i].addEventListener("click", learn);
    buttons[i].title = DATA[i].h;
}

function learn() {
    let idx = +this.id.slice(4) - 1 ;
    cardTitle.innerHTML = `${idx+1} ${DATA[idx].h}`;
    cardText.innerHTML = DATA[idx].t;
    inputParams.value = DATA[idx].a[0];
    inputA.value = DATA[idx].a[1];
    inputB.value = DATA[idx].a[2];
    inputC.value = DATA[idx].a[3];
    range.value = DATA[idx].m;
    refresh();
}

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
}

canvas.addEventListener('mousemove', moveListener)
canvas.addEventListener('touchmove', moveListener);

function moveListener (e) {
    e.preventDefault();
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
}
 
canvas.addEventListener('mouseup', endListener);
canvas.addEventListener('touchend', endListener);

function endListener(e) {
    selectedInput = null;
}

// ------------------------------------------------------


function refresh() {
    // creation
    EXPRS[0] = new Expression(inputA.value, inputA.style.borderColor);
    EXPRS[1] = new Expression(inputB.value, inputB.style.borderColor);
    EXPRS[2] = new Expression(inputC.value, inputC.style.borderColor);
      
    for (let i = 0; i < EXPRS.length; i++) {
        // substitution      
        EXPRS[i].substitutionParams(inputParams.value);
        for (let j = 0; j < i; j++) {
            EXPRS[i].substitution(EXPRS[j])
        }
        // evalution      
        EXPRS[i].eval();
    }
    AREA.r = 2 ** (range.value | 0);
    show();
    draw();
}


