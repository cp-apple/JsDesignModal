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
// 1. 函数柯里化
var num = (function(num){
  if(num<=1){
    return 1;
  }else{
    return num*arguments.callee(num-1);   //arguments.callee可以用于引用该函数的函数体内当前正在执行的函数
  }
})(5);
console.log(num); //结果为120。 5*4*3*2*1=120

// 遍历本月每天的开销并求出它们的总和
function currying(fn){
	let args=[];
	return function(){
		if(arguments.length===0){
			return fn.apply(this,args);
		}else{
			[].push.apply(args,arguments);
			return arguments.callee;
		}
	};
}
let cost=(function(){
	let money=0;
	return function(){	
		for (var i = 0; i < arguments.length; i++) {
			money+=arguments[i];
		}
		return money;
	};
})();
const costFn = currying(cost);
costFn(100);  //保存
costFn(200);  //保存
costFn(300);  //保存
console.log(costFn());  //600

// 2. uncurrying 反柯里化的作用在与扩大函数的适用性，使本来作为特定对象所拥有的功能的函数可以被任意对象所用.
Function.prototype.uncurrying=function(){
	let self=this;
	return function(){
		let obj=Array.prototype.shift.call(arguments);
		return self.apply(obj,arguments);
		// 调用push(arguments,4)后。这一句相当于 Array.prototype.push(obj,4)
	};
};

let push=Array.prototype.push.uncurrying();

(function(){
	push(arguments,4);
	console.log(arguments);  // arguments { '0': 1, '1': 2, '2': 3, '3': 4 }
})(1,2,3);

// 3. 函数节流 函数被触发的频率太高
let throttle=function(fn,interval){
	let __self=fn,  //保存需要被延迟执行的函数
			timer,
			firstTime=true;  //是否是第一次执行
	return function(){
		let __me=this,
				args=arguments;
		if(firstTime){   //第一次执行不用延迟执行
			__self.apply(__me,args);
			return firstTime=false;
		}
		if(timer){  //timer存在说明前一次延迟执行还没有结束
			return false;
		}
		timer=setTimeout(function(){
			clearTimeout(timer);
			timer=null;
			__self.apply(__me,args);
		},interval||500);
	};
};

window.onresize=throttle(function(){
	console.log(11);
},3000);

// 4. 分时函数
// 例：每1s建1000个dom改为每200ms建8个dom
// arr:需创建的dom数据，fn:创建dom的逻辑函数,count:每200ms创建多少个dom
let timeChunk=function(arr,fn,count){
	let obj,t;
	let len=arr.length;
	let star=function(){
		for(let i=0;i<Math.min(count||1,arr.length);i++){
			let obj='dom:'+arr.shift();
			fn(obj);
		}
	};

	return function(){
		t=setInterval(function(){
			if(arr.length===0){  //如果全部已建好
				clearInterval(t);
			}
			star();
		},200);
	};
};

var arr=[];
for (let i = 0; i < 1000; i++) {
	arr.push(i);
}
let renderDom=timeChunk(arr,function(n){
	let div=document.createElement('div');
	div.innerHTML=n;
	document.body.appendChild(div);
},8);

renderDom();

// 5. 惰性加载函数
let addEvent=function(elem,type,handler){
	if(window.addEventListener){
		addEvent=function(elem,type,handler){
			elem.addEventListener(type,handler,false);
		};
	}else if(window.attachEvent){
		addEvent=function(elem,type,handler){
			elem.attachEvent('on'+type,handler);
		};
	}
	addEvent(elem,type,handler);
};

let body=document.body;
addEvent(body,'click',function(){
	console.log(1);
});

addEvent(body,'click',function(){
	console.log(2);
});









