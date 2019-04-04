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