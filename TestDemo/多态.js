// 1.多态示例
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

renderMap(googleMap);
renderMap(baiduMap);
renderMap(sousouMap);

// 2.私有变量，公开方法
let myObject = (name) => {
  let _privateName = '糖糖';
  return {
    getName() {
      return _privateName + '，' + name;
    }
  };
}

console.log(myObject('徇齐').getName() + '。');





