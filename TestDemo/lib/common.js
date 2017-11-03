var cp_wrapper={
	demo1_1:function(){
		console.log($(this));
		console.log($(this).text()+'balabala');
	},
	//cp_wrapper_child
	cp_wrapper_child:{
		showChild:function(val){
			var _dom=val;
			console.log(_dom);
			_dom.on('click',function(){
				_dom.append('I\'m a kid.');
			});
		}
	}
};

cp_wrapper.dblClickSomeEle=function(){  //双击元素，h2元素隐藏或显示
	console.log($(this));
	$(this).dblclick(function(){
		$('h2').slideToggle();
	});
}
cp_wrapper.testcc='wahahaha';

//类型API
cp_wrapper.class2type=function(){
	var class2type={};
	//生成class2type映射
	"Boolean Number String Function Array Date RegExp Object Error".split(" ").map(function(item,index){
		class2type["[object "+item+"]"] =item.toLowerCase();
	});
	return class2type;
};
//类型判断
cp_wrapper.type=function(obj){	
	if(obj==null){
		return obj+"";
	}
	debugger
	return typeof obj==="object" || 
			typeof obj ==="function" ? cp_wrapper.class2type()[Object.prototype.toString.call(obj)]||"object":typeof obj;
};
cp_wrapper.isFunction= function(obj){
	return cp_wrapper.type(obj)==='function';
}
$.fn.extend(cp_wrapper);