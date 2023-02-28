/*
chapter 4 
Function and Prototype Chaining 
contents
-various ways to create function
-function object
-various concepts of functions
-function call and 'this' binding
-prototype and prototype chaining
*/

//-Various ways to create function
//function statement
function numPlus(num1, num2){
    return num1+num2;
};

//function literal and expression
const myFun = function(myName){
    console.log(myName);
};
myFun('hello');
//myFun is not function name, but function variable 
//myFun has reference value of that function. 

//function hoisting
numMinus(1,2);
function numMinus( num1, num2){
    return num1-num2;
};
//as function statement function call before its definition 
//activate

//but function expression can't do that
//numMultiple(1,2);
const numMultiple = function (num1,num2){
    return num1 * num2;
};

//-Function Object
/*
things can do with function because it's object.
    -literal 
    -asign to variable, elements in array and property of object
    -hand over as parameter
    -return in other function
    -dynamically make property and assign to function
*/
//function is 'first class' object
//Function property's standard property method
myFun.arguments;
myFun.caller;
myFun.length;
console.dir(myFun);
//myFun has Empty() as __proto__ its function.prototype

//-various concepts of functions
//call back
//immediate call 
function sam(num1, num2){
    return ( num1 === num2) ? true : false;
}(1,2);

//inner function
//you must call inner function after make it
function outer(name){
    console.log(name);
    function inner(name){
        console.log(name);
        console.log(name);
    }
    inner(name);
}
//closure 
function outer(name){
    console.log(name);
    let innerName = 'choi';
    function inner(name){
        console.log(name);
        console.log(name);   
    }
    return inner(innerName);;
}
let closure = outer('kim');
//remain inner variable even outer function's execution is not related.
//because of closure which is made by inner function returned. 
closure;

//-Function call and 'this' binding 
//#1 'this' binding with object method call
const myObj = {
    name : 'foo',
    callName : function(){
        console.log(this.name);
    }
}
//result will be foo, because that method's this is binded to object which calls function.

//#2 'this' binding with function call 
const sameFun = function () {
    console.log(this);
}
sameFun();
// result is about global or window object

//#3 'this' binding with inner function
const outerFun = function () {
    let name = 'foo';
    const innerFun = function () {
        console.log(this.name);
    };
    innerFun();
};
outerFun();
//result is not foo becaue inner is binded to global 
//substitution of this problem 
//sub #1
const outerFun2 = function(){
    let name = 'foo';
    let that = this;
    const innerFun = function(){
        console.log(that.name);
    };
};
outerFun2();
//sub#2 
const outerFun3 = function(){
    let name = 'foo';
    const innerFun = function(){
        console.log(this.name).apply(outerFun3);
    };
};
outerFun3();

//#4 'this' binding with constructor function 
const conFun = function () {
    this.name = 'foo';
    this.call = function() {
        console.log(this.name);
    };
}

const conThis = new conFun();

