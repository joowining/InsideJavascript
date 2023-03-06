/*
    Obejct Oriented Programming in Javascript
    implementation with javascripts special concept like prototype, scope, closuer etc...
*/


// -1 Class, Constructor and Method
function Person(arg){
    this.name = arg;

    this.getName = function(){
        return this.name;
    }

    this.setName = function(value){
        this.name = value;
    }
}

let me = new Person("zzoon");
console.log(me.getName());

me.setName('hello');
console.log(me.getName());

// prototype version constructor function
// for memory saving  don't need to every fucntion memory for new instance
function Person(arg){
	this.name = arg;
}

Person.prototype.getName = function(){
	return this.name;
}

Person.prototype.setName = function(value){
	this.name = value;
}

// douglas crackford
// function that asign method to its prototype object 
Function.prototype.method = function(name, func){
    if ( !this.prototype[name]){
        this.prototype[name] = func;
    }
}

//adding a new method with douglas's method adding function
function Person(arg){
	this.name =arg;
}

Person.method("setName", function(value){
	this.name = value;
});

// -2 Inheritance
// in javascript, inheritance can be implemeted by two way, class based and prototype based
// prototype based
function create_object(o){ // 리턴할 객체가 상속할 o라는 부모객체를 받아서
	function F() { } // 함수를 통해 임의의 prototype을 준비하고
	F.prototype = o; // 해당 prototype에 o라는 객체를 할당해서
	return new F(); // 그것을 리턴하도록 
}
// jQuery 's extend
/*
```jsx
function create_object(o){ // 리턴할 객체가 상속할 o라는 부모객체를 받아서
	function F() { } // 함수를 통해 임의의 prototype을 준비하고
	F.prototype = o; // 해당 prototype에 o라는 객체를 할당해서
	return new F(); // 그것을 리턴하도록 
}
```
*/
// theses are shallow copy, so when property changes, object's protperty can be changed

// class based inheritance
function Person(arg){
	this.name = arg;
} // 생성자 함수

Person.prototype.setName = function(value){
	this.name = value;
}; // 프로토타입에 메소드 설정

Person.prototype.getName = function(){
	return this.name;
}; // 프로토타입에 메소드 설정

function Student(arg){
} //빈 생성자 함수 설정

var you = new Person('iamhjoo');
Student.prototype = you; // you객체를 prototype으로 설정, 상속함  

var me2 = new Student('zzoon');//student객체를 만듬
// 이것을 반영하진 않음, 왜냐하면
// student에는 this.name이 존재하지 않기 때문에 
me2.setName('zzoon'); // student의 name 프로퍼티를 zzoon으로 설정 이 메소드를 호출할 때에야
// 비로소 name 프로퍼티가 만들어진다. 그전까지는 빈 객체 
console.log(me2.getName());

// because Student constructor function is empty object
// before it call parent's constructor that might be cause problem 
// so apply supper to sub
function Student(arg){
	Person.apply(this, arguments);
}

// next is modified version with moderator
function Person(arg){
	this.name = arg;
}

Function.prototype.method = function(name, func){
	this.prototype[name] = func;
}

Person.method("setName", function(value){
	this.name = value;
});

Person.method("getName", function(){
	return this.name;
});

function Student(arg){
}

function F(){};
F.prototype = Person.prototype;
Student.prototype = new F();
Student.prototype.constructor = Student;
Student.super = Person.prototype;

var you = new Person('hello');

var me3 = new Stduent();
me3.setName('zzoon');
console.log(me3.getName());

// that F's prototype works like a cushioning between sub and supper's prototype

// make inheritance with immediate execute and closure
var inherit = function(Parent, Child){
	var F = function() { };
	return function(Parent, Child){
		F.prototype = Parent.prototype;
		Child.prototype = new F();
		Child.prototype.constructo = Child;
		Child.super = Parent.prototype;
	}
}

// -3 Capsulation
// in Javascript, variable defined as a var in block, can not be accessed from outside
var Person = function(arg){
	var name = arg ? arg : 'zzoon';

	this.getName = function(){
		return name;
	}

	this.setName = function(arg){
		name = arg;
	}
}

//#1 javascript's ordinary capsulation - module pattern
var Person = function(arg){
	var name = arg ? arg : 'zzoon';

	return {
		getName : function(){
			return name;
		},
		setName : function(arg){
			name = arg
		}
	};
};

// instead of returning function than objct 
// using a closure for encapsulation
var Person = function(arg){
	var name = arg ? arg : 'zzoon';

	var Func = function(){}
	Func.prototype = {
		getName : function(){
			return name;
		},
		setName : function(arg){
			name = arg
		}
	};

	return Func;
}();

// -4 some examples applied OOP concept
// subClass function which make other object to be class which can inheritance and encapsulation
/*
    subClass() 's structure
    -1 make child class ( function object ) 
    -2 call constructor
    -3 implement inheritance by prototype chain
    -4 adding child class based on argument obj's method and variable
    -5 return child function
*/
function subClass(obj){
	var parent = this === window ? Function : this; // if Runtime is node use global
	// 부모 객체를, this로 해서 이 subClass 호출시의 prototype 객체로, 만약 그것이 window면, 최상위 Function으로  
	
	var F = function(){}; //빈함수 F를 만듬
	
	//생성자 호출 
	// 이 블록은, 리턴되는 부분이기 때문에 외부에서 호출할 때 비로소 실행
	//자식의 생성자와 부모의 생성자를 모두 적용, 다만 상속받는 대상이 아니면, 자신만 호출
	var child = function(){
		var _parent = child.parent;
		
		if(_parent && _parent !== Function){
			_parent.apply(this, arguments);
		}
		
		if(child.prototype._init){
			child.prototype._init.apply(this, arguments);
		}
	};
	
	//자식 클래스 생성 및 상속
	//이게 먼저 실행 프로토타입 체인을 통해 구현. 
	F.prototype = parent.prototype;//빈함수의 prototype을 this로 
	child.prototype = new F(); //그리고 그 리턴하는 객체를 child.prototype으로
	child.prototype.constructor = child; // 
	child.parent = parent;
	child.subClass = arguments.callee;
	
	//자식 클래스 확장
	//hasOwnProperty()는 해당 객체 내에서만 찾는 함수, extend()역할을 하는 부분
	for( var i in obj){
		if (obj.hasOwnProperty(i)){
			child.prototype[i] = obj[i];
		}
	}// 부모의 프로퍼티를 모두 자식에게 할당. 

	return child;
} // +) 여기에 new F()를 더 효율적으로 다루기 위해, 클로저를 활용해서 F의 정의 부분과 그 나머지 부분을 분리할 수 있다. 

//사용방법
//supperObj = subClass(supper);
//subObj = supperObj.subClass(sub);
//이런식으로 객체를 클래스 관계로 구현할 수 있다. 

// using subClass function example
var person_obj = {
	_init : function(){
		console.log("person init");
	},
	getName : function(){
		return this._name;
	},
	setName : function(arg){
		this._name = arg
	}
};// _init이라는 생성자 메서드, 그래고 메서드들을 프로퍼티로 가지는 객체

var student_obj = {
	_init : function(){
		console.log("student init");
	},
	getName : function(){
		return "Student Name: " + this._name;
	}
}; // 비슷한 객체이지만, Person에서부터 상속받게끔 만들 수 있다. 
// subClass() 메서드를 통해, 정의한 객체를 -> 상속가능한 클래스 객체로 변환
var Person = subClass(person_obj); // Person 클래스 정의
var person = new Person(); // person init 출력 // 위의 리턴 함수를 통해 다시 객체 생성
person.setName('zzoon');

var Student = Person.subClass(student_obj); // Student 클래스 정의 // 부모 클래스의 메소드로써의 subClass()사용으로 상속 구현
var student = new Student(); // person init, student init 출력
student.setName('iamjoo'); // 상속받은 setName() 메소드 사용