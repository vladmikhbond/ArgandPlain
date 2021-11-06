const canvas = document.getElementById("canvas");

const CANVAS_R = canvas.width / 2; 
const AREA = {x: 0, y: 0, // center of area
   r: 2,                  // radius of area
   get x1() { return this.x - this.r}, get x2() { return this.x + this.r}, 
   get y1() { return this.y - this.r}, get y2() { return this.y + this.r},
   get pow2() {return this.r / 2}
};
const EXPRS = [null, null, null];
let MAX_LEVEL = 100;
let ENLAG = 4;

setTimeout(refresh, 10);



