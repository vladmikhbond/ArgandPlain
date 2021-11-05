const canvas = document.getElementById("canvas");
canvas.height = canvas.width = 512;
inputA.style.width = inputB.style.width = inputC.style.width = 256;

const canvasR = canvas.width / 2; 

const AREA = {x: 0, y: 0, r: 2, 
   get x1() { return this.x - this.r}, get x2() { return this.x + this.r}, 
   get y1() { return this.y - this.r}, get y2() { return this.y + this.r}
};

const EXPRS = [null, null, null];

let MAX_LEVEL = 100;
let ENLAG = 4;

setTimeout(refresh, 100);



