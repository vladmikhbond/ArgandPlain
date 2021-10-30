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
