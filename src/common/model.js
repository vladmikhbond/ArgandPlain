// String => [Lexema]
//
function lexicalAnalisys(input) 
{
    const isDigit = x => "01234.56789".indexOf(x) > -1;
    const isLetter = x => x.toUpperCase() != x.toLowerCase();
    const isOpenBracketOrOperator = x => "(+-*/^".indexOf(x) > -1;

    input = input.replace(/\s/g, '');
    const output = []; 
    // аварийные сообщения
    if (input.indexOf("**") != -1) 
        alert("Возведение в степень обозначается ^, а не **.");
    let regex = /\w*i/;
        
    // первая фаза
    for (let i = 0; i < input.length; i++) 
    {  
        if (isDigit(input[i])) 
            i = saveNumber(i);
        else if (isLetter(input[i])) 
            i = saveVariable(i);
        else 
            output.push(new Lexema(input[i]));
    }
    
    // вторая фаза
    for (let i = 0; i < output.length; i++) 
    {   
        // ~ унар.минус, # унар.плюс
        if (i == 0 || isOpenBracketOrOperator(output[i-1].tag) ) {
            if ( output[i].tag == '-') output[i].tag = '~';
            if ( output[i].tag == '+') output[i].tag = '#';
        }
        // отдельно стоящие i, j - в мнимое i
        if ( output[i].tag == 'v' && (output[i].val == 'i' || output[i].val == 'j')) {
            output[i].tag = 'i';
            output[i].val = 1;           
        }
    }
    return output;

    // inner functions: input & output are in closure
    function saveNumber(i) {
        let regex = /^[0-9]+[.]?[0-9]*([eE][-+]?[0-9]+)?[ij]?/;
        let match = regex.exec(input.slice(i));
        if (match) {
            let s = match[0], last = s[s.length-1];
            if (last == 'i' || last == 'j' ) {
                output.push(new Lexema('i', +s.slice(0, -1)));
            } else {
                output.push(new Lexema('r', +s));
            }
            return i + s.length - 1;   
        }
        throw Error("Unknown error :(");
    }
    function saveVariable(i) {
        let s = "";
        const c = input[i]; 
        for(; i < input.length && isLetter(input[i]); i++) 
            s += input[i];
        output.push(new Lexema('v', s));
        return i - 1;
    }

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
    for (let lex of poland) {
        switch(lex.tag) {
        case 'r':
            stack.push(new Complex(lex.val, 0));
            break;
        case 'i':
            stack.push(new Complex(0, lex.val));
            break;
        case 'v':
            if (!dict || !dict[lex.val])
                throw new Error("wrong dictionary");
            stack.push(dict[lex.val]);
            break;
        case '+': case '-': case '/': case '*': case '^':
            let c2 = stack.pop();
            let c1 = stack.pop();
            if (!c1 || !c2) 
                throw new Error("wrong poland expression");
            switch (lex.tag) {
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
            switch (lex.tag) {
                case '#': stack.push(c); break;
                case '~': stack.push(c.neg()); break;
            } 
            break;  
        }
    }
    return stack[0];
}
// ---------------- params suit ----------------------------------

    // Разбирает строку констант и составляет словарь
    // "R = 1;   L = 3.0e-3;   C = 2.1e-3;   ω = 2 * 3.14159 * 50"
    function parseConstatnsLine(str) {   
        str = str.replace(/\s/g, '');  
        let equotions = str.split(";").filter(x => x);
        // из массива уравнений составляем словарь констант
        let dict = {};
        for (let eq of equotions) {
            let [key, val] = eq.split("=");
            dict[key] = val;
        }
        // делаем возможные подстановки внутри словаря
        for (let k1 in dict) {
            let r = new RegExp(k1,"g"), v = dict[k1];
            for (let k2 in dict) {
                if (k1 == k2) continue;
                dict[k2] = dict[k2].replace(r, v);
            }         
        }    
        return dict;
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

    
    t("x-3e-3+2", 1.997, 0, {x: Complex.ZERO});
    t(" i", 0, 1, {Z: Complex.ZERO});

    t("3.4i * Z", 0, 0, {Z: Complex.ZERO});
    t("-A * (B + C)", -1, -1, {A: Complex.ONE, B: Complex.ONE, C: Complex.I});

    //t("0^(-2+-2i)", NaN, NaN);  // ошибка в Complex.js

    t("3.4i", 0, 3.4); 
    t("-1.2 + +3.4i", -1.2, 3.4);
    t("((1-(2+3))*1)^(1+2)", -64, 0)  //"-63.99999999999998 + 2.3513218543629174e-14i"
    t("1+2i*3i-4/(5+6i)", -5.32786885245901, 0.3934426229508196);     //"-5.327868852459017 + 0.3934426229508196i");   

}
test()
