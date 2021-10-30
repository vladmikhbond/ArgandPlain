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
    return [
        (e.offsetX - canvas.width / 2) / K,
       -(e.offsetY - canvas.width / 2) / K ];
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
        selInput.value = `${x.toFixed(2)} + ${y.toFixed(2)}i`; 
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





// ----------- main ------------------------
const canvas = document.getElementById("canvas");
canvas.height = canvas.width = 512;


const R = canvas.width / 2; 
const EXPRS = [null, null, null];

let MAX = 2 ** (range.value | 0);
let K  = R / MAX;


setTimeout(refresh, 100);
// ---------------------------------------


