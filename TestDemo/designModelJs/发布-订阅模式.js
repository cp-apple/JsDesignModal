// 发布-订阅模式又叫观察者模式
// 一、Dom事件
document.body.addEventListener('click',function(){
	console.log(1);
});
document.body.addEventListener('click',function(){
	console.log(2);
});
document.body.addEventListener('click',function(){
	console.log(3);
});

document.body.click();  //1 2 3

// 二、自定义事件
let salesOffices={};  //售楼处
salesOffices.clientList={};  //缓存列表，存放订阅者的回调函数
salesOffices.listen=function(key,fn){  //添加订阅者	
	if(!this.clientList[key]){
		this.clientList[key]=[];
	}
	this.clientList[key].push(fn);
};
salesOffices.trigger=function(){  //发布消息
	let key=Array.prototype.shift.call(arguments),  
			fns=this.clientList[key];

	if(!fns||fns.length===0){
		return false;
	}

	for (let i = 0; i < fns.length; i++) {
		fns[i].apply(this,arguments);  
	}
};

// 小明订阅消息
salesOffices.listen('square100',function(price,square){
	console.log('价格'+price+'，'+square+'平方');  //价格100万，90平方
});
// 小红订阅消息
salesOffices.listen('square150',function(price,square){
	console.log('价格'+price+'，'+square+'平方');  //价格150万，120平方
});

// 售楼处发布消息
salesOffices.trigger('square100','100万',90);   
salesOffices.trigger('square150','150万',120);  

// 三、发布 － 订阅模式的通用实现
let event={
	clientList:{},
	// 添加订阅者
	listen:function(key,fn){
		if(!this.clientList[key]){
			this.clientList[key]=[];
		}
		this.clientList[key].push(fn);
	},
	// 发布消息
	trigger:function(){
		let key=Array.prototype.shift.call(arguments),  
			fns=this.clientList[key];

		if(!fns||fns.length===0){
			return false;
		}

		for (let i = 0; i < fns.length; i++) {
			fns[i].apply(this,arguments);  
		}
	},
	// 取消订阅的事件
	remove(key,fn){
		let fns = this.clientList[key];
		if(!fns){  //如果key对应的消息没有订阅者，则直接返回
			return false;
		}

		// 如果没有传入具体的回调函数，则表示需要取消key对应消息的所有订阅
		if(!fn){
			fns && (fns.length=0);
		}else{
			for (let i = fns.length-1;i>=0;i--) {  //反向遍历订阅的回调函数列表
				let _fn=fns[i];
				if(_fn===fn){
					fns.splice(i,1);   //删除订阅者的回调函数
				}
			}
		}
	},
};

let installEvent=function(obj){
	for (let i in event) {
		obj[i]=event[i];
	}
};

let salesOffices={};
installEvent(salesOffices);
// 添加订阅者--小鹿
salesOffices.listen('square120',fn1=function(price,square){
	console.log('价格：'+price+'，'+square+'平方。');
});
// 添加订阅者--小一
salesOffices.listen('square80',fn2=function(price,square){
	console.log('价格：'+price+'，'+square+'平方。');
});
salesOffices.trigger('square80','90万',80);  // 价格：90万，80平方。
salesOffices.trigger('square120','130万',120);  // 价格：130万，120平方。
salesOffices.remove('square80',fn2);
salesOffices.trigger('square80','90万',80);  //已取消订阅，无输出

// 四、全局发布
let Event=(function(){
	let clientList={},  ////缓存列表，存放订阅者的回调函数
			listen,
			trigger,
			remove;

	// 添加订阅者
	listen=function(key,fn){
		if(!this.clientList[key]){
			this.clientList[key]=[];
		}
		this.clientList[key].push(fn);
	};

	// 发布消息
	trigger=function(){
		let key=Array.prototype.shift.call(arguments),  
			fns=this.clientList[key];

		if(!fns||fns.length===0){
			return false;
		}

		for (let i = 0; i < fns.length; i++) {
			fns[i].apply(this,arguments);  
		}
	};

	// 取消订阅的事件
	remove=function(key,fn){
		let fns = this.clientList[key];
		if(!fns){  //如果key对应的消息没有订阅者，则直接返回
			return false;
		}

		// 如果没有传入具体的回调函数，则表示需要取消key对应消息的所有订阅
		if(!fn){
			fns && (fns.length=0);
		}else{
			for (let i = fns.length-1;i>=0;i--) {  //反向遍历订阅的回调函数列表
				let _fn=fns[i];
				if(_fn===fn){
					fns.splice(i,1);   //删除订阅者的回调函数
				}
			}
		}
	};

	return {
		clientList,
		listen,
		trigger,
		remove,
	};
})();

// 小小订阅消息
Event.listen('square140',fn3=function(price,square){
	console.log('价格：'+price+'，'+square+'平方。');
});
// 小xxx订阅消息
Event.listen('square160',fn4=function(price,square){
	console.log('价格：'+price+'，'+square+'平方。');
});
Event.trigger('square140','200万',140);  //价格：200万，140平方。
Event.trigger('square160','240万',140);  //价格：240万，140平方。
Event.remove('square140',fn3);
Event.trigger('square140','200万',140);  //已取消订阅，无输出

// 五、实现模块间通信
// - 比如现在有两个模块，a模块里面有一个按钮，每次点击按钮之后，b模块里的 div中会显示按钮的总点击次数。
let a=(function(){
	let count=0;
	let button=document.getElementById('count');
	button.onclick=function(){
		count++;
		Event.trigger('add',count);
	};
})();

let b=(function(){
	let div=document.getElementById('show');
	Event.listen('add',function(val){
		console.log(val)
		div.innerHTML=val;
	});
})();












