const canvas = document.getElementById("canvas");
canvas.height = canvas.width = 512;
inputA.style.width = inputB.style.width = inputC.style.width = 256;
resA.style.width = resB.style.width = resC.style.width = 128;

const R = canvas.width / 2; 
const EXPRS = [null, null, null];

let MAX = 2 ** (range.value | 0);
let K  = R / MAX;

setTimeout(refresh, 100);



