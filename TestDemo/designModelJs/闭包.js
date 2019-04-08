let A=function(){
	let a=1;
	return function(){
		a++;
		console.log(a);
	};
};
let B=A();
B();  //2
B();  //3
B();  //4
B();  //5
B();  //6

// 一、闭包的作用
// 1.封装变量
let mult=(function(){
	let cache={};
	return function(){
		let args=Array.prototype.join.apply(arguments);
		if(args in cache){
			return cache[args];
		}
    console.log('haha');
		let a=1;
		for(let i=0;i<arguments.length;i++){
			a=a*arguments[i];
		}
		return cache[args]=a;
	};
})();
console.log(mult(2, 5, 8));  //haha  80
console.log(mult(2, 5, 8));  //80
console.log(mult(2, 5, 3));  //haha 30

// 优化
const mult2 = (function () {
  const cache = {};
  const calculate = function () {
    let a = 1;
    for (let i = 0; i < arguments.length; i++) {
      a *= arguments[i];
    }
    return a;
  };
  return function () {
    const args = Array.prototype.join.call(arguments, ',');
    if (args in cache) {
      return cache[args];
    }
    console.log('haha');
    return cache[args] = calculate.apply(null, arguments);
  };
}());

console.log(mult2(5, 6, 7));  //haha 210
console.log(mult2(5, 6, 7));  //210
console.log(mult2(5, 2, 7));  //haha 70

// 2.延续局部变量的寿命
// img 对象进行数据上报
let report=(function(){
	var imgs=[];
	return function(src){
		let img=new Image();
		img.src=src;
		imgs.push(img);
	}
})();
report('http://www.xxx.png.com');

// 二、闭包和面向对象设计
// 闭包写法
let Extent=function(){
	let value=0;
	return {
		call:function(){
			value++;
			console.log(value)
		},
	};
};

let extent=new Extent();
extent.call();  //1
extent.call();  //2
extent.call();  //3

// 面向对象的写法
let extent2={
	value:0,
	call:function(){
		this.value++;
		console.log(this.value);
	}
};
extent2.call();  //1
extent2.call();  //2
extent2.call();  //3

// 或
let Extent3=function(){
	this.value=0;
};
Extent3.prototype.call=function(){
	this.value++;
	console.log(this.value);
};
let extent3=new Extent3();
extent3.call();  //1
extent3.call();	 //2
extent3.call();  //3

// 三、用闭包实现命令模式
let Tv={
	open:function(){
		console.log('打开电视机');
	},
	close:function(){
		console.log('关闭电视机');
	},
};

let createCommand=function(receiver){
	let execute=function(){
		return receiver.open();
	};
	let undo=function(){
		return receiver.close();
	};

	return {
		execute:execute,
		undo:undo
	};
};

let setCommand=function(command){
	document.getElementById('app').onclick=function(){
		command.execute();
	};
	document.body.onclick=function(){
		command.undo();
	};
};

setCommand(createCommand(Tv));


