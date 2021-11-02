const canvas = document.getElementById("canvas");
canvas.height = canvas.width = 512;
inputA.style.width = inputB.style.width = inputC.style.width = 256;

const R = canvas.width / 2; 
const EXPRS = [null, null, null];

const MAX = 2;
let K  = R / MAX;

setTimeout(refresh, 100);



