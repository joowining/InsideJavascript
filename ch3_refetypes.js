// basic reference type, object 
let object1 = {
    "name" : "js",
    "age" : 15
}

// access to object's property
console.log(obejct1.name);
console.log(object1["name"]);

// add new property dynamically
object1.school = "high";

// only accss by square brackets
object1["full-name"] = "javascript";

// handle all proprty
let prop;
for ( prop in object1){
    console.log(prop, object[porp]);
}

//delete property of object
delete object1.age;

// call by value
let num = 100;
function numChanger(num){
    num = 200;
} 
numChanger(num);
//after this function num is still 100 
//because JS copy its basic type value and handle it. 

// call by reference
let numbers = {
    "one" : 100,
    "two" : 200,
}
function referChanger(object){
    object.one = 200;
    object.two = 400;
}
referChanger(numbers);
//after this, the object numbers' each value is changed permanently 
//becuase js interpreter hand over object's memory location not itself. 
//so inner function's handling is applied to outter space

//check the prototype
console.dir(numbers);

//Arrays
//make array
let lengA = [10]; // -> all elements are undefined;
let emptyA = [];
emptyA[0] =10;
emptyA[10] = 20; // -> index 1 ~ 9 is made as undefined;

// array's length property
emptyA.length;
emptyA.length = 15; // -> index under biggest and unasigned is now undefined
// with length property, standard array method is applied

//difference between normal object and array as object
console.dir(emptyA); // [[prototype]] -> Array.prototype
console.dir(object); // [[prototype]] -> Object.prototype

// Array's dynamic property 
emptyA.name = "sample"
for ( prop in emptyA){
    console.log(prop, emptyA[prop]);
}

// deleting Array's property
delete emptyA[0]; // make index 0's element undefined not eliminated
emptyA.splice(2,1) // delete index's element 

// make Array with two ways
let samArray = new Array(10); // make length 10's array
let sam2Array = new Array(1,2,3); // make array which elements are 1,2,3

//array-like object
let arrayLike = {
    "num" : 10
}
arrayLike.length = 10;
//more detail in ch4

//basic type's standard method
// number case
let num2 = 0.5;
num2.toExponential(1); // -> 5.0e-1

// string case
"test".charAt(2); //-> s

//operator 
// + operator
console.log(1+1);
console.log(1+"num");

//typeof operator
typeof console;

// == operator
console.log(1=='1') // this is true, == change operands type for comparison

// === operator
console.log(1==="1") // this is false === change nothing

// !! operator, show the operands bool value which is interpreted in JavaScript
console.log( !! 1); // true
console.log( !! 0 ); // false