class Lexema {
    constructor(tag, val) 
    {
        // (,  ),  +, -, *, /,  ^,  r число,  i мним.число,  v переменная, ~ унар.минус, # унар.плюс 
        this.tag = tag;  
        this.val = val;
    }
    toString() {
        if (!this.val)
            return this.tag;
        return this.val + (this.tag == 'i' ? 'i' : '');
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
    // делает это до лексического анализа
    substitution(other) {
        if (other.name && other != this) {
           this._replaceAll(other.name, other.body); 
        }       
    }
    
    // Подставляет константы из словаря в выражение
    // "R = 1;   L = 3.0e-3;   C = 2.1e-3;   ω = 2 * 3.14159 * 50"
    substitutionParams(dict) {   
        for (let key in dict) {
            this._replaceAll(key, dict[key]);
        }
    }

    _replaceAll(name, value) {
        let regex = new RegExp(name,"g");
        this.body = this.body.replace(regex, "(" + value + ")");
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
        return new Complex(x, y).sub(this.value).abs() < 0.01 * AREA.r; 
    }
}

// Положение и размер выбранной квадратной области (координаты модельные)
//
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


    // get pow2() {return this.r / 2};

    // размер единицы длины модели в пикселях
    get unit() {return canvas.width / (2 * this.r)};
}
