//var, const, let

var x=5;
const y=7;
let z=9;
//z="Ionut";
console.log(z);

//y=8

var a;
console.log(a);

/*if(1!=1){
    var b=5;
    let c=5;
}

console.log(b);
console.log(c);*/

//operators

console.log(3 + 3);
console.log(3 - 3);

console.log(3 + "3");
console.log(3 - "3");

console.log(3 + "Ana");
console.log(3 - "Ana");

console.log(1 + 2 + 3);
console.log(1 + "2" + 3);
console.log(1 + +"2" + 3);

console.log(typeof("2"))
console.log(typeof(+"2"))

if(1 == "1") //comparatie doar pe valoare
    console.log("Am intrat");
else
    console.log("Nu am intrat")

if(1 === "1") //comparatie pe tip si valoare
    console.log("Am intrat");
else
    console.log("Nu am intrat")

let i="";
if(!i)
    console.log("falsy")

if(null == undefined)
    console.log("Intra")

console.log(typeof(undefined))
console.log(typeof(null))

let arr = ["test1", "test2", "test3"];

//for in este similar cu forul classicm i este indexul
for(let i in arr)
    console.log(i)

//for of este foreach
for(let i of arr)
    console.log(i)

let ob ={
    x:0,
    y:1
}
for(let i in ob)
    console.log(i)

/*for(let i of ob)
    console.log(i)*/

let arr3 =["Ionut", "Alex", "Mihai"];
console.log(arr3)
arr3.push("Marcela","Alexandra")
console.log(arr3)

arr3.pop()
console.log(arr3)

arr3.unshift("Oprea")
console.log(arr3)

arr3.shift()
console.log(arr3)

arr3.splice( 1, 0,"Octavian")
console.log(arr3)
arr3.splice( 1, 2,"Ionica", "Mihaela")
console.log(arr3)

arr3.forEach((item, index) => {
    console.log(item + "-" + index)
})