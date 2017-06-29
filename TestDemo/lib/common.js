
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


$.fn.extend(cp_wrapper);