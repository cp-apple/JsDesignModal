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

	for (var i = 0; i < fns.length; i++) {
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



















