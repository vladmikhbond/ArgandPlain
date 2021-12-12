// ARGAND
inputParams.addEventListener('change', refresh);
inputA.addEventListener('change', refresh);
inputB.addEventListener('change', refresh);
inputC.addEventListener('change', refresh);
range.addEventListener('change', refresh);


// learning ---------------------------------------
for (let i = 0; i < DATA.length; i++) {
    let btn = document.createElement("button");
    btn.id="card" + i;
    btn.className = "btn btn-info"; 
    btn.innerHTML = i + 1;
    btn.type = "button";
    btn.title = DATA[i].h;
    btn.addEventListener("click", learn);
    btn.style.marginLeft = "4px";
    document.getElementById("buttonsDiv").appendChild(btn);
}


function learn() {
    let i = +this.id.slice(4);
    cardTitle.innerHTML = `${i+1} ${DATA[i].h}`;
    let dataT = DATA[i].t.replace( /<<(\w):(.*)>>/g,
        '<span class="config" onclick="learn2(' + i + ',\'$1\')">$2</span>');
    cardText.innerHTML = dataT;
    inputA.value = DATA[i].a[0];
    inputB.value = DATA[i].a[1];
    inputC.value = DATA[i].a[2];
    if (DATA[i].a[3]) inputParams.value = DATA[i].a[3];
    range.value = DATA[i].m;
    refresh();
}


function learn2(i, x) {
    inputA.value = DATA[i][x][0];
    inputB.value = DATA[i][x][1];
    inputC.value = DATA[i][x][2];
    if (DATA[i][x][3]) 
       inputParams.value = DATA[i][x][3];
    refresh();
}

// canvas mouse events ---------------------------------

let selectedInput = null;

canvas.addEventListener('contextmenu', event => event.preventDefault());

canvas.addEventListener('mousedown', startListener);
canvas.addEventListener('touchstart', startListener);

function startListener(e) {    
    let [ex, ey] = eventCoord(e);
    for (let i = 0; i < EXPRS.length; i++) {
        let [x, y] = toModelCoord(ex, ey);
       if (EXPRS[i].isNear(x, y)) {
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
    const dictParams = parseConstatnsLine(inputParams.value);  
    for (let i = 0; i < EXPRS.length; i++) {
        // substitution      
        EXPRS[i].substitutionParams(dictParams);
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


