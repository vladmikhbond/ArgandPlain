
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

class Expression {
    constructor(line, color) {
        // parse line to name & body
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

    replace(other) {
        if (other.name) {
            let re = new RegExp(other.name,"g");
            let subst = "(" + other.body + ")";
            this.body = this.body.replace(re, subst);
        }        
    }
    
    eval() {
        try {
            let l = lexicalAnalisys(this.body);
            let p = toPoland(l);
            this.value = evalPoland(p);
        } catch (error) {
            this.value = null;
        }      
    }

    isNear(x, y) { 
        return new Complex(x, y).sub(this.value).abs() < 5/K; 
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
        switch(pol.tag) {
        case 'r':
            stack.push(new Complex(pol.num, 0));
            break;
        case 'i':
            stack.push(new Complex(0, pol.num));
            break;
        case '+': case '-': case '/': case '*': case '^':
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


function test() {
    function t(input, expected) {
        let a = lexicalAnalisys(input);
        let p = toPoland(a);
        let c = evalPoland(p);
        if (c.toString() == expected) 
            console.log('OK')
        else 
            console.log(input)
    }

    t("-1.2 + +3.4i", "-1.2 + 3.4i");
    t("3.4i", "3.4i"); 
    t("((1-(2+3))*1)^(1+2)", "-63.99999999999998 + 2.3513218543629174e-14i");  
    t("1+2i*3i-4/(5+6i)", "-5.327868852459017 + 0.3934426229508196i");   
}
test()



