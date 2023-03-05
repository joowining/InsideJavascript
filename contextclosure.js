/*
    ch5 Execution context and Closure
    -1 concept of execution context
    -2 activation object and variable object
    -3 scope chain
    -4 closure
*/
//-1 Concept of execution context
//execution context is used for managing call stack which control each function call
// when execution context is made
// global code / code which is executed by eval() / execute function 

//#.2 process of execution context
function execute(param1, param2){
    let a=1, b=2;
    function func(){
        return a+b;
    }
    return param1+ parame2 + func();
};

execute(3,4);
// when function call
// javascript engine makes activation object 
// which handle various information to exectue context

//-3 Scope Chain
// when activation object makes, there are scope chain to refer its outer chontext's object
// example of global context
let var1 = 1;
let var2 = 2;
console.log(var1);
console.log(var2);

// example of activation context when function 'call'
let var3 = 1;
let var4 = 2;
function func() {
    let var3 = 10;
    let var4 = 20;
    console.log(var3);
    console.log(var4);
}
func();
console.log(var3);
console.log(var4);

// understanding scope chain
let value = 'value1';

function printValue(){
    return value;
}

function printFunc(func){
    let value = 'value2';
    console.log(func()); // at this point function now call and find out what 'value' is in it's scope chain
}

printFunc(printValue); // hand over function as object not function call

// + using with() statement
let y = { x : 5};

function withExamFunc(){
    var x = 10;
    var z;

    with(y) { // with add new object to its scope chain
        z = function(){ // in this case function z's x must be refer to x of withExamFunc()
            console.log(x); // but log object y's property x because of with(y)
        }
    }
    z();
}

withExamFunc();

// -4 Closure
// closure is concept that I can access to some variable / object which is belong to ended execution context
// applied closure concept 
// #1
function HelloFunc() {
    this.greeting = "hello";
} // used for constructor function 

HelloFunc.prototype.call = function(func){
    func ? func(this.greeting) : this.func(this.greeting);
} // add method to object whici is instantiated by HelloFunc()

var userFunc = function(greeting) {
    console.log(greeting);
} // some function 

var objHello = new HelloFunc(); // make object
objHello.func = userFunc; // asing userFunc() to property func  -> which affect to property call 
objHello.call(); // when method call is called 
//first object's func property is hand over
//check is function or not and that is function then, it hand over this.greeting
// then call userFunc with this.greeting

// the important thing is objHello.func() and objHello.call() make same result 
// then wha'ts the difference? 

// obj.call method control how to call obj.func so fix and manage in itself. 

// next is more complicate 
// from before example, next thing is hand over two parameter to method func
function saySomething(obj, methodName, name){
    return ( function(greeting) {
        return obj[methodName](greeting, name);
    });
} // in saySomething got object, methodname and name 
// and hand over it to inner function 
// point is, func is same structure like, it has only one parameter greeting 
// but becaue of saysomething we can add two parameter, greeting and name

function newObj( obj, name){
    obj.func = saySomething(this, "who", name);
    return obj;
} // constructor got two thing, object and name parameter and return that object 
// to change func method to saySomething

newObj.prototype.who = function(greeting, name){
    console.log(greeting + " " + ( name || "everyone"));
} // add who method 

var obj1 = new newObj(objHello, "zzoon");
obj1.call();