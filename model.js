
//const { default: Complex } = require("complex.js");

class Lexema {
    constructor(tag, num) 
    {
       this.tag = tag;  // (,  ),  +, -, *, /,  ^,  r,  i
       this.num = num;
    }
    toString() {
        if (!this.num)
            return this.tag;
        return this.num + (this.tag == 'i' ? 'i' : '');
    }
}

// String => [Lexema]
//
function lexicalAnalisys(input) 
{
    const isOpenBracketOrOperator = x => "(+-*/^".indexOf(x) > -1;
    const isBracketOrOperator = x => "()+-*/^".indexOf(x) > -1;
    const isDigit = x => "01234.56789".indexOf(x) > -1;
    
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
            else 
            {
                if (nStr) {           
                    output.push(new Lexema('r', +nStr));
                    nStr = "";
                }
                output.push(new Lexema(c));
            }
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

function evalPoland(poland) {
    const stack = [];
    for (let pol of poland) {
        if (pol.tag == 'r')
            stack.push(new Complex(pol.num, 0));
        else if (pol.tag == 'i')
            stack.push(new Complex(0, pol.num));
        else if ("+-/*^".indexOf(pol.tag) > -1) {
            let c2 = stack.pop();
            let c1 = stack.pop();
            if (!c1 || !c2) 
                throw new Error("wrong poland expression")
            switch (pol.tag) {
                case '+': stack.push(c1.add(c2)); break;
                case '-': stack.push(c1.sub(c2)); break;
                case '*': stack.push(c1.mul(c2)); break;
                case '/': stack.push(c1.div(c2)); break;
                case '^': stack.push(c1.pow(c2)); break;
            }   
        }
    }
    return stack[0];
}

function evaluate(exp) {
    let l = lexicalAnalisys(exp);
    let p = toPoland(l);
    let c = evalPoland(p);
    return c;
}

function test() {

    let a4 = lexicalAnalisys("-1.2 + +3.4i");
    let p4 = toPoland(a4);
    console.log(a4);
    console.log(p4);

    console.log("-----------------");
    let a = lexicalAnalisys("3.4i");
    let r = a.map(x => x.toString()).join('');
    // if (r == 'i:3.4') console.log('OK');
    let p = toPoland(a);
    let c = evalPoland(p);
    console.log(c);
    

    let a1 = lexicalAnalisys("1.2 + 3.4i");
    let r1 = a1.map(x => x.toString()).join('');
    // if (r1 == 'r:1.2+:undefinedi:3.4') console.log('OK');
    let p1 = toPoland(a1);
    let c1 = evalPoland(p1);
    console.log(c1);


    let a2 = lexicalAnalisys("((1-(2+3))*1)^(1+2)");
    let p2 = toPoland(a2);
    let c2 = evalPoland(p2);
    //console.log(p2.map(x => x.toString()).join(''))
    console.log(c2);

    let a3 = lexicalAnalisys("1+2i*3i-4/(5+6i)");
    let p3 = toPoland(a3);
    let c3 = evalPoland(p3);
    // console.log(p3.map(x => x.toString()).join(''))
    console.log(c3);

}
test()



