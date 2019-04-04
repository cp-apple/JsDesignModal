// 1.作为对象的方法调用
let obj1={
	name:'obj1',
	getName(){
		console.log(this.name);
	}
};
obj1.getName();   //obj1

// 2.为普通函数调用
// 当函数不作为对象的属性被调用时，也就是我们常说的普通函数方式，此时的 this 总是指向全局对象。在浏览器的 JavaScript里，这个全局对象是 window 对象。
var name='global';
var getName=function(){
	return this.name;
}
console.log(getName());  //global

// 3.构造器调用
var obj2=function(){
	this.name='obj2';
}
var o2=new obj2();
console.log(o2.name);  //obj2

// 4.Function.prototype.call 或 Function.prototype.apply 调用
let a={
	name:'aa',
	getName(){
		console.log(this.name)
	},
};
let b={
	name:'bb',
};
a.getName();  //aa
a.getName.call(b);  //bb
a.getName.apply(b);  //bb

// 5.丢失的this
let obj3={
	name:'obj3',
	getName(){
		console.log(this.name);
	},		
};
let getName2=obj3.getName;
obj3.getName();  //obj3
getName2();  //undefined。 作为普通函数调用，this指向全局

