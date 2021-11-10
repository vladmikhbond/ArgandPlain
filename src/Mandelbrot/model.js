function getLevels(expr, step) 
{ 
    const d = step *  AREA.r / CANVAS_R;
    let anal = lexicalAnalisys(expr);
    let poland = toPoland(anal);

    let levels = [];
    let x, y;
    for (x = AREA.x1; x < AREA.x2; x += d) {
       for (y = AREA.y1; y < AREA.y2; y += d) {
          levels.push(getLevel());   
       }
    }
    return levels;

    function getLevel() 
    {   
        let dict = {'Z': Complex.ZERO, 'C': new Complex(x, y)};
        for (let level = 0; level < MAX_LEVEL; level++) {
            if (dict['Z'].abs() > 2)
                return level;
            dict['Z'] = evalPoland(poland, dict);
        }
        return MAX_LEVEL;
    }    
 }
 
 
function getDeepLevel(x, y, poland, maxLevel) 
{   
    let dict = {'Z': Complex.ZERO, 'C': new Complex(x, y)};
    for (let level = 0; level < maxLevel; level++) {
        if (dict['Z'].abs() > 2)
            return level;
        dict['Z'] = evalPoland(poland, dict);
    }
    return maxLevel;
}


function toModelCoord(x, y) {
    const k  = CANVAS_R / AREA.r;
    return [ x/k + AREA.x1, (2 * CANVAS_R - y)/k + AREA.y1 ];
}

function toCanvasCoord(x, y) {
    const k  = CANVAS_R / AREA.r;
    return [ k * (x - AREA.x1),  2 * CANVAS_R - k * (y - AREA.y1) ];
}
//