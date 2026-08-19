/*------------1.Number array------------*/ 
// let nums=[10,20,30];

/*---------2.String array------------*/ 
// let fruits=["apple","banana","orange"];

/*----------3.Index Finding---------------*/ 
// console.log(fruits);
// console.log(fruits[0]);
// console.log(fruits[2]);

/*----------4.Length Finding---------------*/
// console.log(fruits.length);

/*----------5.Element Replacing---------------*/
// let nums=[4,8,12];
// nums[1]=10;
// console.log(nums);

/*----------6. Adding and Removing Elements---------------*/

// let arr=[1,2,3];
// // arr.push(4); 
// // console.log(arr);
// // arr.pop();
// // console.log(arr);
// arr.unshift(0);
// console.log(arr);
// arr.shift();
// console.log(arr);

/*----------7.includes() & indexOf()-----------*/ 

// let items=["pen","book","pencil"];
// console.log(items.includes("book"));
// console.log(items.indexOf("pencil"));

/*----------8.for loop in array-----------*/ 

// let names=["Hasna","Safa","Amina"];
// for(let i=0;i<names.length;i++){
//     console.log(names[i]);
// }

/*----------ACTIVITIES-----------*/

let colors=['red',"green","blue","yellow"];
console.log(colors[2]);

colors[2]="orange";
console.log(colors);

let animals=["cat","dog","rabbit"];
console.log(animals.length);

let num=["hasna",26,[56,74,66,95]];
console.log(num[2][2]);

colors.push("kiwi");
console.log(colors);

colors.pop();
console.log(colors);

colors.unshift("charity");
console.log(colors);

colors.shift();
console.log(colors);

let number=[2,3,45,87,98,90,12,34];
num2=number.slice(1,4);
console.log(num2);
