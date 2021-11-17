

const DATA = [
{
h: "Мнимые числа", 
t: `Раньше люди не умели извлекать квадратный корень из 
отрицательных чисел, никому это даже в голову не приходило.
Но когда им пришлось решать кубические уравнения, это 
понадобилось.
Никакое вещественное число, умноженное само на себя, не
не даст в результате отрицательного числа.
Вот здесь и были открыты не вещественные числа, которые 
получили название мнимых. 
Чтобы отличать их от обычных чисел, в конце к ним 
приписывают латинскую букву i, от слова imagination.
     Как и вещественные, мнимые числа изображают точками на 
числовой оси, только направлена эта ось перпендикулярно 
оси вещественных чисел. 
     Природа мнимых чисел такова, что 1i*1i = -1.
Поэтому 
<<b: √-4 = √4 * √-1 = 2 * 1i = 2i >>
(заметим, что число 1i обычно записыват как i).

<a href="https://ru.wikipedia.org/wiki/%D0%9A%D0%BE%D0%BC%D0%BF%D0%BB%D0%B5%D0%BA%D1%81%D0%BD%D0%BE%D0%B5_%D1%87%D0%B8%D1%81%D0%BB%D0%BE#%D0%9E%D1%81%D0%BD%D0%BE%D0%B2%D0%BD%D1%8B%D0%B5_%D0%BE%D1%82%D0%BB%D0%B8%D1%87%D0%B8%D1%8F_%D0%BA%D0%BE%D0%BC%D0%BF%D0%BB%D0%B5%D0%BA%D1%81%D0%BD%D1%8B%D1%85_%D1%87%D0%B8%D1%81%D0%B5%D0%BB_%D0%BE%D1%82_%D0%B2%D0%B5%D1%89%D0%B5%D1%81%D1%82%D0%B2%D0%B5%D0%BD%D0%BD%D1%8B%D1%85" class="">Wikipedia</a> 
`,
a:["x = 3i", "y = 2i", "z = i"], 
b:["x = -4", "y = x^0.5", ""], 
m: 3,
},
{
h: "Комплексные числа", 
t: `
Комплексное число состоит из вещественной и мнимой части.
В примере вещественная часть = 2, мнимая = 3i.
Если вещественные и мнимые числа - это точки
на прямых, то комплексные числа - это точки плоскости.
Чтоб сделать точку заметнее, добавляют линию - 
получается вектор.
     Тут надо сказать, что и вещественное, и мнимое число - 
частный случай числа комплексного. Когда b = 0, z 
делается вещественным числом. Когда a = 0, z становится 
мнимым числом.

Именно комплексные числа стали основным интструментом
в физике, технике, математике.
Например, основная теорема алгебры гласит: "Любое 
уравнение n-ой степени имеет ровно n комплексных корней."
`,
a:["a = 2", "b = 3i", "z = a + b"], m: 3,
},
{
h: "Сложение", 
t: `Комплексные числа не были бы числами, если бы с ними
нельзя было выполнять арифметические действия.
Сложение комплексных чисел выполняется по правилу 
параллелограмма, т.е. отдельно складываются вещественные 
части, отдельно мнимые, и из них образуется новое 
комплексное число.
`,
a:["a = 4 + i", "b = 1 + 3i", "c = a + b"], m: 3,
},
{
h: "Умножение", 
t: `Комплексные числа умножаются как многочлены
(1.2 + i) * (0.5 + 1.5i) = -0.9 + 2.3i
При этом учитывается, что i^2 = -1.
Заметим, что треугольник, образованный числами 1 и a
и треугольник, образованный числами b и c подобны 
друг другу. 
Вопрос: какие еще два подобных треугольника можно
увидеть на диаграмме?
`,
a:["a = 1.2 + i", "b = 0.5 + 1.5i", "c = a * b"], m: 2,
},
{
h: "Тригонометрическая форма", 
t: `Помимо декартовой системы координат, существует 
полярная система, в которой положение точки на 
плоскости определеяется ее удалением от начала координат
и углом между осью Ox и направлением на точку.
     Таким же образом можно задать и комплексное число. 
Удаление от начала координат называется модулем числа
и вычисляется по теореме Пифагора
|z| = √(x^2 + y^2)
Угол φ ненулевого комплексного числа называется аргументом.
Угол можно определить из соотношения 
x / y = tg φ.
     Если вещественную x и мнимую y части комплексного числа 
выразить через модуль r = |z| и аргумент φ, то всякое 
комплексное число z, кроме нуля, можно записать в 
тригонометрической форме:
     z = r (cos φ + i sin φ)
`,
a:["x = 3", "y = 4i", "z = 3 + 4i"], m: 3,
},

{
h: "Показательная форма", 
t: `
Фундаментальное значение в математике имеет формула Эйлера
     e<sup>iφ</sup> = cos φ + i sin φ
Применяя эту формулу к тригонометрической форме,
     z = r (cos φ + i sin φ)
получим показательную форму комплексного числа
     z = re<sup>iφ</sup>
С появлением комплексных чисел можно дать новые 
определения синуса и косинуса:
     cos φ = (e<sup>iφ</sup> + e<sup>-iφ</sup>) / 2
     sin φ = (e<sup>iφ</sup> - e<sup>-iφ</sup>) / 2i     
которые непосредственно следуют из формулы Эйлера.

`,
a:["φ = π", "c = (e^(φ * i) + e^(-φ * i) ) / 2", "s = (e^(φ * i) - e^(-φ * i) ) / 2", "π = 3.14159; e=2.71828"], m: 2,
},
{
h: "Возведение в степень и извлечение корней", 
t: `
Здесь очень пригодится показательная форма комплексных чисел.
Вспомним, что умножение - это умножение модулей и сложение 
аргументов. Возведение в целую степень - это многократное 
умножение.
Если z = re<sup>iφ</sup>, то z<sup>n</sup> = r<sup>n</sup>*e<sup>inφ</sup>

Это справедливо для любых степеней - целых, дробных, положительных, 
отрицательных и даже комплексных.

Чтобы извлечь корень n-й степени, нужно возвести число в
степень 1/n. Но таким образом можно получить только один 
корень из n.
`,
a:["φ = π", "y = e^(i*φ) ", "z = y^2", "π = 3.14159; e=2.71828" ], m: 2,
},
{
h: "Расчет электрических цепей", 
t: `
Сопротивления R = 1 Ом, L = 3 мГн, С = 2100 мкФ. 
Частота f = 50 Гц. 
Напряжение U = 100 В (начальная фаза = 0).
<img src="pic/cirquit1.png" >
По закону Ома ток в цепи равен I = U / Z
где U — комплексное входное напряжение, 
Z — полное сопротивление всей цепи. 
Z = R + jωL -j/(ωC)
ω = 2πf, 
Буквой j в электротехнике обозначают мнимое число i.


`,
a:["Z = R + j * ω * L - j / (ω * C)", "U = 1", "I = U / Z", "R = 1;   L = 3*10^-3;   C = 2100*10^-6;   ω = 2 * 3.14159 * 50; j = i"], m: 2,
},


];


