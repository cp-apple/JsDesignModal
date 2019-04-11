
// JavaScript 中的单例模式
// · 单例模式的定义是：保证一个类仅有一个实例，并提供一个访问它的全局访问点。
// - 用代理模式实现单例模式
let createDiv=function(html){
	this.html=html;
	this.init();
};
createDiv.prototype.init=function(){
	let div=document.createElement('div');
	div.innerHTML=this.html;
	document.body.appendChild(div);
};
let proxySingletonCreateDiv=(function(){
	let instance;
	return function(html){
		if(!instance){
			instance=new createDiv(html);
		}
		return instance;
	};
})();

let a=new proxySingletonCreateDiv('one');
let b=new proxySingletonCreateDiv('two');
console.log(a===b);  //true

// 一、避免全局变量污染的几种方式
// 1. 适用命名空间
let globalSpace={
	a:function(){},
	b:function(){}
};

// 2. 使用闭包封装私有变量
let user=(function(){
	let __name='cp';
	let __age=24;
	return function(){
		return '__name='+__name+',__age='+__age;
	};
})();

console.log(user());  //__name=cp,__age=24

// 二、通用的惰性单例
let getSingle=function(fn){
	let result;
	return function(){
		return result || (result = fn.apply(this,arguments));
	};
};

let createDiv=function(html){
	let div=document.createElement('div');
	div.innerHTML=html;
	document.body.appendChild(div);
	return div;
};

let createSingleDiv=getSingle(createDiv);
let dom=createSingleDiv('one');
console.log(dom);







