let classes = document.getElementsByClassName("myClass");
console.log(classes);

let tags = document.getElementsByTagName("label");
console.log(tags);

let octav = document.querySelector("div #myId");
console.log(octav);

let list = document.querySelectorAll(".myClass");
console.log(list);

function test(e){
    e.preventDefault();
    e.stopPropagation();

    let btn = document.getElementById("btnId");
    btn.classList.remove("btn");
    btn.classList.add("green");
}