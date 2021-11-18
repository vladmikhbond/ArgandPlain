// String => [Lexema]
//
function lexicalAnalisys(input) 
{
    const isOpenBracketOrOperator = x => "(+-*/^".indexOf(x) > -1;
    const isBracketOrOperator = x => "()+-*/^".indexOf(x) > -1;
    const isDigit = x => "01234.56789".indexOf(x) > -1;
    //const isVariable = x => 'A' <= x && x <= 'Z';
    const isVariable = x => x != 'i' && x.toUpperCase() != x.toLowerCase();
    
    input = input.replace(/\s/g, '');
    const output = []; 
    let nStr = "";  // строковое представление числа
    for (let i = 0; i < input.length; i++) 
    {
        let c = input[i];
        if (isBracketOrOperator(c)) {
            // unary operation
            if (i == 0 || isOpenBracketOrOperator(input[i-1])) 
            {   
                if (c == '-') 
                   output.push(new Lexema('~'));  //  unary -
                else if (c == '+') 
                   output.push(new Lexema('#'));  //  unary +
                else
                   output.push(new Lexema(c));
            }
            // binary operation 
            else 
            {
                if (nStr) {           
                    output.push(new Lexema('r', +nStr));
                    nStr = "";
                }
                output.push(new Lexema(c));
            }
        } else if (isVariable(c)) { 
            output.push(new Lexema('v', c));           
        } else if (isDigit(c)) {
            nStr += c;
        } else if (c == 'i') {
            if (nStr) {           
                output.push(new Lexema('i', +nStr));               
            } else {
                output.push(new Lexema('i', 1));
            }
            nStr = "";
        }       
    }
    if (nStr) {           
        output.push(new Lexema('r', +nStr));
    }
    // postoperation  rer -> r; rei -> i;  
    for (let i = 0; i < output.length - 2; i++) {
        if (output[i].tag == 'r' && output[i+1].tag == 'v' && output[i+1].tag == 'e' ) {
            if (output[i+2].tag == 'r' || output[i+2].tag == 'i') {
                output[i].tag = output[i+2].tag;
                output[i].num += "e" + output[i+2].num;
                output.splice(i+1, 2);
            }   
        }
    }

    return output;
}

function getPriority(op) {
    switch(op) {
        case '#': case '~': return 9;
        case '^': return 8;
        case '*': case '/': return 7;
        case '+': case '-': return 6;
        case ')':  return 1;
        case '(':  return 0;     
    }
}

function priorityInTop(stack) {
    if (stack.length == 0) 
        return -1;
    return getPriority(stack[stack.length - 1].tag);
}

// [Lexema] => [Lexema]
function toPoland(input) {
    const isBracketOrOperator = x => "^*/+-()#~".indexOf(x) > -1;
    
    let output = [], stack = [];
    for (let lex of input) {
        let p = getPriority(lex.tag);
        if (isBracketOrOperator(lex.tag)) 
        {
            if (lex.tag == ')') 
            {
                while (priorityInTop(stack) != 0 ) {
                    output.push(stack.pop());
                }
                stack.pop();  // remove '('
            } 
            else if (p == 0 || p > priorityInTop(stack)) 
            {
               stack.push(lex);
            } 
            else 
            {
                while (priorityInTop(stack) >= p ) {
                    output.push(stack.pop());
                }
                stack.push(lex);
            }          
        } 
        else 
        {
           output.push(lex);
        }       
    }
    //
    while(stack.length) {
        output.push(stack.pop());
    }
    return output;
}

// dict = {X: Complex1, Y: Complex2, ... }
function evalPoland(poland, dict) {
    const stack = [];
    for (let pol of poland) {
        switch(pol.tag) {
        case 'r':
            stack.push(new Complex(pol.num, 0));
            break;
        case 'i':
            stack.push(new Complex(0, pol.num));
            break;
        case 'v':
            if (!dict || !dict[pol.num])
                throw new Error("wrong dictionary");
            stack.push(dict[pol.num]);
            break;
        case '+': case '-': case '/': case '*': case '^':
            let c2 = stack.pop();
            let c1 = stack.pop();
            if (!c1 || !c2) 
                throw new Error("wrong poland expression");
            switch (pol.tag) {
                case '+': stack.push(c1.add(c2)); break;
                case '-': stack.push(c1.sub(c2)); break;
                case '*': stack.push(c1.mul(c2)); break;
                case '/': stack.push(c1.div(c2)); break;
                case '^': stack.push(c1.pow(c2)); break;
            } 
            break; 
        case '#': case '~':
            let c = stack.pop();
            if (!c) 
                throw new Error("wrong poland expression")
            switch (pol.tag) {
                case '#': stack.push(c); break;
                case '~': stack.push(c.neg()); break;
            } 
            break;  
        }
    }
    return stack[0];
}

// ---------------- coordinate suit ------------------------------

function eventCoord(e) {
    switch (e.constructor.name) {
        case "MouseEvent":
            return [e.offsetX, e.offsetY];
        case "TouchEvent":            
            let x = e.changedTouches[0].clientX - e.target.offsetLeft;
            let y = e.changedTouches[0].clientY - e.target.offsetTop;            
            return [x, y];
    }
    throw Error("Bad event name")
}

function toModelCoord(x, y) {
    const k  = CANVAS_R / AREA.r;
    return [ x/k + AREA.x1, (2 * CANVAS_R - y)/k + AREA.y1 ];
}

function toCanvasCoord(x, y) {
    const k  = CANVAS_R / AREA.r;
    return [ k * (x - AREA.x1),  2 * CANVAS_R - k * (y - AREA.y1) ];
}


////////////////////////////////////////////////////////////////////
function test() {
    function t(input, expRe, expIm, dict) {
        
        let a = lexicalAnalisys(input);
        let p = toPoland(a);
        let c = evalPoland(p, dict);
        let exp = new Complex(expRe, expIm)
        if (c.sub(exp).abs() < 1e-10)
            console.log('OK')
        else 
            console.log(input)
    }

    // t("3.4e3i", 0, 0, {Z: Complex.ZERO});

    // t("3.4i * Z", 0, 0, {Z: Complex.ZERO});
    // t("-A * (B + C)", -1, -1, {A: Complex.ONE, B: Complex.ONE, C: Complex.I});

//    t("0^(-2+-2i)", NaN, NaN);  // ошибка в Complex.js

//     t("3.4i", 0, 3.4); 
//     t("-1.2 + +3.4i", -1.2, 3.4);
//     t("((1-(2+3))*1)^(1+2)", -64, 0)  //"-63.99999999999998 + 2.3513218543629174e-14i"
//     t("1+2i*3i-4/(5+6i)", -5.32786885245901, 0.3934426229508196);     //"-5.327868852459017 + 0.3934426229508196i");   

}
test()



// (0+0i)^(-2+-2i)