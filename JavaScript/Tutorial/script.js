// -----------------Basic----------------------
// console.log(`Hello`);
// console.log(`I like pizza!`)
// window.alert(`This is an alert!`)

// ---------------getElementById--------------------
// document.getElementById("myH1").textContent=`Hello`;
// document.getElementById("myP").textContent=`I like pizza`;

// ------------Variables-----------------------------
// let age=25;
// let price=10.99;
// let gpa=2.1;

// console.log(typeof age);
// console.log(`You are ${age} years old`);
// console.log(`The price is $${price}`);
// console.log(`Your gpa is: ${gpa}`);
// console.log(age);

// let fullName="Zoople";
// let age=25;
// let isStudent=false;

// document.getElementById("p1").textContent=`Your name is ${fullName}`;
// document.getElementById("p2").textContent=`You are ${age} years old`;
// document.getElementById("p3").textContent=`Enrolled: ${isStudent}`;

// ---------Arithmetic Operators--------------------

// let students=30;
// // students=students+1;
// // students=students-1;
// // students=students*2;
// // students=students/2;
// // students=students%2;
// // students=students ** 3;

// // students+=1;
// // students-=1;
// // students*=2;
// // students/=2;
// // students%=2;
// // students**=2;
// // students++;
// // students--;

// console.log(students);

/*
operator precedence
1.parenthesis
2.exponents
3.multiplication & division & modulo
4.addition & subtraction
*/

// -----------Accept user input------------------
// let username;
// username=window.prompt("What's your username?");

// console.log(username);

// let username;
// document.getElementById("mySubmit").onclick=function(){ username=document.getElementById("myText").value; console.log(username);}
// let username;
// document.getElementById("mySubmit").onclick=function(){ username=document.getElementById("myText").value; document.getElementById("myH1").textContent=`Hello ${username}`}

// --------Text Conversion------------------

// let age=window.prompt("How old are you?");
// age=Number(age);
// age+=1;
// console.log(age,typeof age);

// let x="";
// let y="";
// let z="";

// x=Number(x);
// y=String(y);
// z=Boolean(z);

// console.log(x, typeof x);
// console.log(y, typeof y);
// console.log(z, typeof z);

// ----------Constants----------------
// const PI=3.14159;
// let radius;
// let circumference;

// // radius=window.prompt(`Enter the radius of the circle`)
// radius=Number(radius);

// document.getElementById("mySubmit").onclick=function(){
//    radius= document.getElementById("myText").value;
//    radius=Number(radius);
//    circumference=2*PI*radius;
//    document.getElementById("myH3").textContent=circumference + "cm";
// }

// ---------------Counter Program------------------

// const decreaseBtn=document.getElementById("decreaseBtn");
// const resetBtn=document.getElementById("resetBtn");
// const increaseBtn=document.getElementById("increaseBtn");
// const countLabel=document.getElementById("countLabel");
// let count=0;

// increaseBtn.onclick=function(){
//     count++;
//     countLabel.textContent=count;
// }
// decreaseBtn.onclick=function(){
//     count--;
//     countLabel.textContent=count;
// }
// resetBtn.onclick=function(){
//     count=0;
//     countLabel.textContent=count;
// }

// ----------Math Object----------------

// let x=3.21;
// let y=2;
// let z=1;

// // z=Math.round(x);
// // z=Math.floor(x);
// // z=Math.ceil(x);
// // z=Math.trunc(x);
// // z=Math.pow(x,y);
// // z=Math.sqrt(x);
// // // z=Math.log(x);
// // z=Math.sin(x);
// // z=Math.cos(x);
// // z=Math.tan(x);
// // z=Math.abs(x);
// // z=Math.sign(x);

// let max=Math.max(x,y,z);
// let min=Math.min(x,y,z);

// console.log(max);

// -----------Random Number generator---------------

// const myButton=document.getElementById("myButton");
// const label1=document.getElementById("label1")
// const label2=document.getElementById("label2")
// const label3=document.getElementById("label3")
// const min=1;
// const max=6;
// let randomNum1;
// let randomNum2;
// let randomNum3;

// myButton.onclick=function(){
//     randomNum1=Math.floor(Math.random() * max) + min;
//     randomNum2=Math.floor(Math.random() * max) + min;
//     randomNum3=Math.floor(Math.random() * max) + min;
//     label1.textContent=randomNum1;
//     label2.textContent=randomNum2;
//     label3.textContent=randomNum3;
// }

// -------------If statements--------------------

// const myText = document.getElementById("myText");
// const mySubmit = document.getElementById("mySubmit");
// const resultElement = document.getElementById("resultElement");
// let age = 0;

// mySubmit.onclick = function () {
//   age = myText.value;
//   age = Number(age);

//   if (age >= 100) {
//     resultElement.textContent = `You are TOO OLD to enter this site`;
//   } else if (age == 0) {
//     resultElement.textContent = `You can't enter. You were just born.`;
//   } else if (age >= 18) {
//     resultElement.textContent = `You are old enough to enter this site`;
//   } else if (age < 0) {
//     resultElement.textContent = `Your age can't be below 0`;
//   } else {
//     resultElement.textContent = `You must be 18+ to enter this site`;
//   } 
// };


// --------------- Checked Property------------------
