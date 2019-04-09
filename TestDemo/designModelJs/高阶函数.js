// 满足下列条件之一的函数就是高阶函数
// (1).函数可以作为参数被传递；
// (2).函数可以作为返回值输出。

// 一、函数作为参数传递
// 1. 回调函数
let getUserInfo=function(userId,callback){
	$.ajax('www.xx.com?getUserInfo/userId='+userId,function(data){
		if(typeof callback === 'function'){
			callback(data)
		}
	});
};
getUserInfo(123,function(data){
	alert(data.userName);
});
// 创建10个div,然后改变他们的颜色
let appendDiv=function(callback){
	for (var i = 0; i < 10; i++) {
		let div=document.createElement('div');
		div.innerHTML=i;
		document.body.appendChild(div);
		if(typeof callback === 'function'){
			callback(div);
		}
	}
};
appendDiv(function(div){
	div.style.color='red';
});
// 2. Array.prototype.sort
let a=[1,2,5,3,4];
a.sort(function(a,b){
	return a-b;   //a-b>0，b会被排列到a之前
});
console.log(a);  //[1,2,3,4,5]

// 二、函数作为返回值输出
// 1. 判断数据的类型
let isType=function(type){
	return function(obj){
		return Object.prototype.toString.call(obj)==='[object '+type+']';
	};
};

let isString=isType('String');
let isNumber=isType('Number');
let isArray=isType('Array');

console.log(isString('abc'));  //true
console.log(isNumber('abc'));  //false
console.log(isNumber(1));  //true
console.log(isArray([]));  //true
console.log(isArray(null));  //false

// for循环批量注册
let Type={};
let TypeArr=['Array','Number','String','Object','Null'];
for (var i = 0; i < TypeArr.length; i++) {
	(function(item){
		Type['is'+item]=function(obj){
			return Object.prototype.toString.call(obj)==='[object '+item+']'
		};
	})(TypeArr[i]);
}
console.log(Type.isArray([]));  //true
console.log(Type.isNumber(32));  //true
console.log(Type.isString('asd'));  //true
console.log(Type.isObject({name:'a'}));  //true
console.log(Type.isNull(null));  //true

// getSingle单例模式
let getSingle=function(fn){
	let ret;
	return function(){
		return ret||(ret=fn.apply(this,arguments));
	}
};
let getDiv=getSingle(function(){
	let div=document.createElement('div');
	div.innerHTML='xxx';
	document.body.appendChild(div);
	return div;
});

let firstDiv=new getDiv();
let secondDiv=new getDiv();

console.log(firstDiv===secondDiv); //tru。 只有一个div

// 三、高阶函数实现AOP（AOP：面向切面编程，把一些跟核心业务逻辑模块无关的功能抽离出来，如：日志统计，异常处理等。）
Function.prototype.before=function(beforefn){
	let __self=this;
	return function(){
		beforefn.apply(this,arguments);
		return __self.apply(this,arguments);
	};
};
Function.prototype.after=function(afterfn){
	let __self=this;
	return function(){
		let ret=__self.apply(this,arguments);
		afterfn.apply(this,arguments);
		return ret;
	};
};
let func=function(){
	console.log(2);
};
func=func.before(function(){
	console.log(1);
}).after(function(){
	console.log(3);
});
func(); //1,2,3

// 四、高阶函数的其他应用
// 1.函数柯里化
var num = (function(num){
  if(num<=1){
      return 1;
  }else{
      return num*arguments.callee(num-1);   //arguments.callee
  }
})(5);
console.log(num); //结果为120


