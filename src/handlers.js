inputA.addEventListener('change', refresh);
inputB.addEventListener('change', refresh);
inputC.addEventListener('change', refresh);

range.addEventListener('change', function(e) {
    MAX = 2 ** (range.value | 0);
    K  = R / MAX;
    refresh();
});

let selInput = null;

function toModelCoord(e) {
    return [ (e.offsetX - R) / K, -(e.offsetY - R) / K ];
}

document.getElementById("canvas").addEventListener('mousedown', function(e) {
    for (let i = 0; i < EXPRS.length; i++) {
       if (EXPRS[i].isNear(...toModelCoord(e))) {
           selInput = [inputA, inputB, inputC][i];           
           //alert(new Complex(x, y).sub(expr.value).abs());
       }
    }
});

document.getElementById("canvas").addEventListener('mousemove', function(e) {
    if (selInput) {
        let [x,y] = toModelCoord(e);
        let eqPos = selInput.value.indexOf('=');
        let right = `${x.toFixed(2)} + ${y.toFixed(2)}i`;
        if (eqPos == -1)       
            selInput.value = right;
        else 
            selInput.value = selInput.value.slice(0, eqPos + 1) + " " + right;
        refresh();
    }
    
});
document.getElementById("canvas").addEventListener('mouseup', function(e) {
    selInput = null;
});

function refresh() {
    // creation
    EXPRS[0] = new Expression(inputA.value, inputA.style.borderColor);
    EXPRS[1] = new Expression(inputB.value, inputB.style.borderColor);
    EXPRS[2] = new Expression(inputC.value, inputC.style.borderColor);
          
    for (let i = 0; i < EXPRS.length; i++) {
        for (let j = 0; j < i; j++) {
            EXPRS[i].replace(EXPRS[j])
        }
        EXPRS[i].eval();
    }
    show();
    draw();
}
