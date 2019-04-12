// ·代理模式
// - 代理和本体接口应保持一致
// - 可进行惰性加载
// 一、虚拟代理实现图片预加载
let myImage=(function(){
	let imgNode=document.createElement('img');
	document.body.appendChild(imgNode);

	return {
		setSrc:function(src){
			imgNode.src=src;	
		},
	};
})();

let proxyImage=(function(){
	let img=new Image();  //缓存一张图片
	img.onload=function(){
		myImage.setSrc(this.src);
	};

	return {
		setSrc:function(src){
			myImage.setSrc('file:// /E:/cp_practice/JsDesignModel/TestDemo/designModelJs/loading.gif');
			img.src=src;
		},
	};
})();
proxyImage.setSrc('https://ustbhuangyi.github.io/vue-analysis/assets/mind.png');

// 二、缓存代理--计算乘积
let mult=function(){
	let res=1;
	for (var i = 0; i < arguments.length; i++) {
		res=res*arguments[i];
	}
	return res;
};

let proxyMult=(function(){
	let cache={}
	return function(){
		let args=Array.prototype.join.call(arguments,',');
		if(args in cache){
			console.log('haha');
			return cache[args];
		}
		return cache[args]=mult.apply(this,arguments);
	};
})();

console.log(proxyMult(3,2,4,5));  //120
console.log(proxyMult(3,2,4,5));  //haha 120

// 三、用高阶函数动态创建代理
// 计算加和
let plus=function(){
	let res=0;
	for (var i = 0; i < arguments.length; i++) {
		res+=arguments[i];
	}
	return res;
};
// 计算乘积
let mult=function(){
	let res=1;
	for (var i = 0; i < arguments.length; i++) {
		res=res*arguments[i];
	}
	return res;
};
// 创建缓存代理的工厂
let createProxyFactory=function(fn){
	let cache={};

	return function(){
		let args=Array.prototype.join.call(arguments,',');
		if(args in cache){
			console.log('haha')
			return cache[args];
		}
		return cache[args]=fn.apply(this,arguments);
	};
};

let proxyPlus=createProxyFactory(plus);
console.log(proxyPlus(2,3,4,6));  //15
console.log(proxyPlus(2,3,4,6));  // haha 15
let proxyMult=createProxyFactory(mult);
console.log(proxyMult(2,3,4));  //24
console.log(proxyMult(2,3,4));  //haha 24 
console.log(proxyMult(2,3,4,6));  //144 




