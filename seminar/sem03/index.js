function square(a,b){
    return a*b;
}
function test(){
    if(1==1)
        return 1;
    else
        return "1";
    //do something;
}
console.log(square(2,3));
console.log(test());

const squareArr = (a, b) => a*b;
console.log(squareArr(2,3));

const arr = Object.freeze(["Ionut", "Mihai"]) 
const ob = Object.freeze({x:0,y:0})

//arr.push("Octavian") //fara Object.freeze astea 2 merg
//arr[2].push(2)
console.log(arr);
ob.d=6
console.log(ob);

function loop(x){
    console.log(x);
    if(x>=5)
        return;
    x++;
    loop(x);
}
loop(0);

//second() - luam rezultatul ei, invocam functia
//second - trimitem functia mai departe pt a fi invocata din alta parte
function first(){
    second();
}
function second(){
    console.log("Print")
}
first(second);

//Rest parameters

function multiplicator(multiplicator, ...numbers){
    for(item of numbers)
        console.log(item * multiplicator);
}
multiplicator(3,1,2,3,4,5);

let ob2 = {color: "blue", age: 20}

function copy(ob){
    let ob3 = ob;
    console.log(JSON.stringify(ob));
    let ob4 = JSON.parse(JSON.stringify(ob));
    ob.color = "red";
    console.log(ob);
    console.log(ob3);
    console.log(ob4);
}

function deepClone(ob){
    return JSON.parse(JSON.stringify(ob));
}
copy(ob2);
console.log(ob2);

//Nested function

function square(a,b){
    function sum(a){
        return a+a;
    }
    return sum(a) * sum(b)
}
console.log(square(2,3));

function outSideFunc(x){
    function insideFunc(y){
        return x*y;
    }
    return insideFunc;
}
let c = outSideFunc(2);
console.log(c(3));

function Persoana(name){
    let age;
    return{
        getName: () => name,
        setName: (newName) => name = newName,
        setAge: (newAge) => age = newAge,
        getAge: () => age,
        getNameAndAge: () => `${name} are ${age}. Este un tanar`
    }
}
let p = new Persoana("Ionut");
console.log(p);

console.log(p.getName());
p.setAge(20);
console.log(p.getNameAndAge());

let myArr = [
    {id:1, name: "Ionut", isActive: true},
    {id:2, name: "Octav", isActive: true},
    {id:3, name: "Mihai", isActive: false},
]

//filter - similar cu clauza WHERE din SQL
let f = myArr.filter(item => item.isActive)
console.log(f);

console.log(myArr.find(item => item.isActive));

//map - este similar cu clauza SELECT din SQL
console.log(myArr.map(item => item.name));

console.log(myArr.filter(item => item.isActive).map(item => item.name));

console.log(myArr.some(item => item.isActive));
console.log(myArr.every(item => item.isActive)); //nu se recomanda

let nr = [1,2,3,4,5];

console.log(nr.reduce((previousValue, currentValue) => previousValue + currentValue))

console.log(nr.join(","));

class Om{
    constructor(age,nume){
        this.age=age;
        this.nume=nume;
    }
    getName = () => this.nume;
}
let o = new Om(20,"aaa");
console.log(o);
class Student extends Om{
    constructor(age,nume,faculty){
        super(age,nume);
        this.faculty = faculty;
    }
}
let s = new Student(20,"aaaa","dddd");
console.log(s);

const Color = Object.freeze({
    RED: "RED",
    BLUE: "BLUE"
});

