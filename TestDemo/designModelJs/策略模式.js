// 一、基于传统面向对象语言的模仿
// 计算年终奖
let performanceS=function(){};
performanceS.prototype.calculate=function(salary){
	return salary * 4;
};
let performanceA=function(){};
performanceA.prototype.calculate=function(salary){
	return salary * 3;
};
let performanceB=function(){};
performanceB.prototype.calculate=function(salary){
	return salary * 2;
};

let Bonus=function(){
	this.salary=null;  //原始工资
	this.strategy=null;  //绩效等级对应的策略对象
};
Bonus.prototype.setSalary=function(salary){
	this.salary=salary;  //设置员工的原始工资
};
Bonus.prototype.setStrategy=function(strategy){
	this.strategy=strategy;  //设置员工绩效等级对应的策略对象
};
Bonus.prototype.getBonus=function(){  //获取奖金数额
	return this.strategy.calculate(this.salary);
};

let staffA=new Bonus();
staffA.setSalary(6000);
staffA.setStrategy(new performanceA());
console.log(staffA.getBonus());  //18000

let staffB=new Bonus();
staffB.setSalary(20000);
staffB.setStrategy(new performanceS());
console.log(staffB.getBonus());  //80000

// 二、JavaScript 版本的策略模式
let strategies={
	'S':function(salary){
		return salary * 4;
	},
	'A':function(salary){
		return salary * 3;
	},
	'B':function(salary){
		return salary * 2;
	},
};

let calculateBonus=function(salary,strategy){
	return strategies[strategy](salary);
};

let staffCBonus=calculateBonus(5000,'S');
console.log(staffCBonus);  //20000
let staffDBonus=calculateBonus(12000,'A');
console.log(staffDBonus);  //36000

// 三、使用策略模式完成表单校验
let strategies={
	isEmpty:function(value,errorMsg){
		if(value.length===0){
			return errorMsg;
		}
	},
	minLength:function(value,length,errorMsg){
		if(value.length<length){
			return errorMsg;
		}
	},
	isMobile:function(value,errorMsg){
		if(!(/^1[34578]\d{9}$/.test(value))){
			return errorMsg;
		}
	},
};

let validator=function(){
	this.cache=[];  //用于缓存验证规则
}
validator.prototype.add=function(dom,rule,errMsg){
	let arr=rule.split(':');
	this.cache.push(function(){
		let ruleName=arr.shift();
		arr.unshift(dom.value);
		arr.push(errMsg);
		console.log(arr);
		return strategies[ruleName].apply(dom,arr);
	});
};
validator.prototype.start=function(){
	for (var i = 0; i < this.cache.length; i++) {
		let msg=this.cache[i]();
		if(msg){
			return msg;
		}
	}
};



