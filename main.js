// ----------- main ------------------------
const canvas = document.getElementById("canvas");
canvas.height = canvas.width;

inputA.addEventListener('change', refresh);
inputB.addEventListener('change', refresh);
inputC.addEventListener('change', refresh);

const ctx = canvas.getContext("2d");
const MAX = 5;
const R = canvas.width / 2; 
const K  = R / MAX;
const EXPRS = [null, null, null];

setTimeout(refresh, 100);
// ---------------------------------------


class Expr {
    constructor(line, color) {
        // name & body
        let ss = line.toLowerCase().split('=');
        if (ss.length == 2) {
            this.name = ss[0].trim();
            this.body = ss[1].trim();
        } else if (ss.length == 1){
            this.name = null;
            this.body = ss[0].trim();
        } else {
            throw new Error("Wrong expression");
        }

        this.color = color;
        this.value = null;
    }

    eval() {
        try {
            this.value = evaluate(this.body);
        } catch (error) {
            this.value = null;
        }      
    }

    replace(other) {
        if (other.name) {
            let re = new RegExp(other.name,"g");
            let subst = "(" + other.body + ")";
            this.body = this.body.replace(re, subst);
        }        
    }
}

function refresh() {
    // creation
    EXPRS[0] = new Expr(inputA.value, "red");
    EXPRS[1] = new Expr(inputB.value, "green");
    EXPRS[2] = new Expr(inputC.value, "blue");
          
    for (let i = 0; i < EXPRS.length; i++) {
        for (let j = 0; j < i; j++) {
            EXPRS[i].replace(EXPRS[j])
        }
        EXPRS[i].eval();
    }
    show();
    draw();
}



function show() {
    const ids = ["resA", "resB", "resC"];
    for (let i = 0; i < ids.length; i++) {
        document.getElementById(ids[i]).innerHTML = 
           EXPRS[i] && EXPRS[i].value ? EXPRS[i].value.round(2).toString() : "";
    }
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.save();
    ctx.translate(canvas.width / 2, canvas.height / 2);
    ctx.scale(1, -1);

    drawAxes(ctx);

    ctx.lineWidth = 3;
    ctx.lineCap = 'round';
    ctx.setLineDash([]);
    for (let z of EXPRS) {
        if (z && z.value) {
            ctx.strokeStyle = z.color;           
            ctx.beginPath(); 
            ctx.moveTo(0, 0); 
            ctx.lineTo(z.value.re * K, z.value.im * K); 
            ctx.stroke();
        }
    }
    ctx.restore();
}  

function drawAxes(ctx) {
    ctx.lineWidth = 0.5;
    for (let x = -R; x < R; x += K) {
        if (x) {
            ctx.strokeStyle =  "gray";
            ctx.setLineDash([5, 10]);
        } else {
            ctx.strokeStyle =  "black";
            ctx.setLineDash([]);
        }
        ctx.beginPath();
        ctx.moveTo(-R, x); 
        ctx.lineTo(R, x); 
        ctx.moveTo(x, -R); 
        ctx.lineTo(x, R); 
        ctx.stroke();   
    }
}

