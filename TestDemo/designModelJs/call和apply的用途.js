// apply和call。  当使用 call 或者 apply 的时候，如果我们传入的第一个参数为 null ，函数体内的 this 会指向默认的宿主对象，在浏览器中则是 window 
let a=Math.max.apply(null, [1, 2, 5, 3, 4]);
let b = Math.max(1, 2, 5, 3, 4);
console.log(a);  //5
console.log(b);  //5

// 1.改变this指向
window.name='window';
let obj1={
	name:'obj1',
};
let obj2={
	name:'obj2',
};
function getName(){
	console.log(this.name);
}

getName();  //window
getName.apply(obj1);  //obj1
getName.call(obj2);  //obj2

// 2.Function.prototype.bind 只绑定了this,没有执行函数。
let a={
	name:'aa',
	getName(a,b,c,d){
		console.log(this.name);
		console.log(a+b+c+d);
	},
};
let getName=a.getName.bind(a,1,2);
getName(3,4);  //aa 10

// 3.借用其他对象的方法
// 3.1.借用构造函数
let A=function(name){
	this.name=name;
}
let B=function(){
	A.apply(this,arguments)
};
B.prototype.getName=function(){
	console.log(this.name);
};
let bb=new B('cp');
bb.getName();  //cp
// 3.2.操作arguments
(function(){
	Array.prototype.shift.call(arguments,3);  //删除arguments开头的第一个元素
	Array.prototype.unshift.call(arguments,3);  //向arguments开头的添加一个元素
	Array.prototype.push.call(arguments,3);  //向arguments尾部添加一个元素
	Array.prototype.slice.call(arguments);  //将arguments转换为真正的数组
})(1,2);

