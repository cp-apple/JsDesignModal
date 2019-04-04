// 1.多态示例
/* 示例一 */
let googleMap = {
  show() {
    console.log('google map is ok.');
  }
};
let baiduMap = {
  show() {
    console.log('baidu map is ok.');
  }
};
let sousouMap = {
  show() {
    console.log('sousou map is ok.')
  }
};

let renderMap = (map) => {
  if (map.show instanceof Function) {
    map.show();
  }
};

renderMap(googleMap);  //google map is ok.
renderMap(baiduMap);  //baidu map is ok.
renderMap(sousouMap);  //sousou map is ok.

/* 示例二 */
let makeSound=function(animal){
  animal.sound();
};
let Dog=function(){
  this.name='dog';
};
Dog.prototype.sound=function(){
  console.log(this.name+'汪汪汪');
};
let Duck=function(){
  this.name='duck';
};
Duck.prototype.sound=function(){
  console.log(this.name+'嘎嘎嘎');
};
makeSound(new Dog());  //dog汪汪汪
makeSound(new Duck());  //duck嘎嘎嘎

// 2.私有变量，公开方法
let myObject = (name) => {
  let _privateName = '糖糖';
  return {
    getName() {
      return _privateName + '，' + name;
    }
  };
}

console.log(myObject('徇齐').getName() + '。');  //糖糖，徇齐。


// 3.类的继承
class person{
  constructor(name,age,gender){
    this.name=name;
    this.age=age;
    this.gender=gender;
  }
  getInfo(){
    console.log('姓名：'+this.name+'，年龄：'+this.age+'，性别：'+this.gender);
  }
}

class child extends person{
  constructor(name,age,gender){
    super(name,age);
    this.gender='what?';
  }
  getInfo(){
    console.log(this.name+this.age+this.gender)
  }
}

let a=new person('cc',24,'girl');
a.getInfo();  //姓名：cc，年龄：24，性别：girl

let b=new child('hh',10,'boy');
b.getInfo();  //hh10what?
console.log(b);  //child { name: 'hh', age: 10, gender: 'what?' }


