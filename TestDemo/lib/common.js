var cp_wrapper={
	demo1_1:function(){
		console.log($(this).text()+'balabala');
	}
};
cp_wrapper.dblClickSomeEle=function(){  //双击元素，h2元素隐藏或显示
	$(this).dblclick(function(){
		$('h2').slideToggle();
	});
}
cp_wrapper.testcc='wahahaha';
$.fn.extend(cp_wrapper);