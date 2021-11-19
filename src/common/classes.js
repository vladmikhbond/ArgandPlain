class Lexema {
    constructor(tag, num) 
    {
        // (,  ),  +, -, *, /,  ^,  r число,  i мним.число,  v переменная, ~ унар.минус, # унар.плюс 
        this.tag = tag;  
        this.num = num;
    }
    toString() {
        if (!this.num)
            return this.tag;
        return this.num + (this.tag == 'i' ? 'i' : '');
    }
}



// Свойства: name, body, color, value - комплексное значение
class Expression {
    constructor(line, color) {
        // parse line to name & body
        let ss = line.split('=');
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
   
    // Подставляет тело другого выражения вместо его имени.
    // заодно подставляет и константы.
    // делает это до лексического анализа
    substitution(other) {
        if (other.name && other != this) {
           this._repAll(other.name, other.body); 
        }       
    }

    substitutionParams(str) {   
        str = str.replace(/\s/g, '');  
        let ss = str.split(";").filter(x => x);
        for(let s of ss) {
            let [l, r] = s.split("=");
            this._repAll(l, r);
        }
    }

    _repAll(regex, subst) {
        let re = new RegExp(regex,"g");
        this.body = this.body.replace(re, "(" + subst + ")");
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
        return new Complex(x, y).sub(this.value).abs() < 0.1; 
    }
}

class Area {
    constructor (x, y, r) {
        this.x = x;   // center X
        this.y = y;   // center Y
        this.r = r;   // radius
    }

    get x1() { return this.x - this.r};  
    get x2() { return this.x + this.r};

    get y1() { return this.y - this.r};
    get y2() { return this.y + this.r};

    get pow2() {return this.r / 2};

    get unit() {return canvas.width / (2 * this.r)};
}
