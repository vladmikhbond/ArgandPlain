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
   
    // Подсталяет тело другого выражения вместо его имени.
    // заодно подставляет и константы.
    // делает это до лексического анализа
    substitution(other) {
        if (other.name && other != this) {
           this._repAll(other.name, other.body); 
        }       
    }

    substitutionConst() {     
        this._repAll('e', Math.E.toString());
        this._repAll('p', Math.PI.toString());
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
        return new Complex(x, y).sub(this.value).abs() < 5/K; 
    }
}
