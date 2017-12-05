;(function($){
	/* 默认配置项
	 * param: initData {} 事件流程数据
	 * goNum：int 事件进行到哪一步了
	 * width: int 事件框大小
	 * eleBox：string 事件框
	 * isOdd: boolean 是否展示偶数项数字
	 * methods：传入的方法
	 */
	var defaults={
		width:250,
		isOdd:true,
		initData:[{proNum:1,proName:'采集资料'},{proNum:2,proName:'采集中...'},{proNum:3,proName:'等待处理'},{proNum:4,proName:'后台接件'},{proNum:5,proName:'办理中'},{proNum:6,proName:'结果通知'},{proNum:7,proName:'等待确认'},{proNum:8,proName:'结果确认'},{proNum:9,proName:'等待交接'}],
		methods:{
			loadSuccess:null,
			itemClick:null,
		}
	};
	$.fn.eventProcess=function(options,num){
		var $eleBox=$(this);  //事件流程框
		var isInit=$eleBox.attr('isInit');  //是否已经初始化
		//设置进程所处数字	
		if(typeof options=='string'&&isInit=='true'){
			var setGoNumber=num,doms=$eleBox.find('li');
			$.fn.eventProcess.setGoNum(doms,setGoNumber)
			return false;
		}
		var options=$.extend(defaults,options);
		var	initData=options.initData,  //传值数据
			isOdd=options.isOdd,  //是否暂时偶数项
			methods=options.methods;  //方法集合
			
		var domData='',goNum=options.goNum,lis='';
		for(var i=0;i<initData.length;i++){
			var domActive='',proNumDom='';
			//已进行流程高亮展示
			if(initData[i].proNum<goNum){
				domActive='end';
			}else if(initData[i].proNum==goNum){
				domActive='active';
			}

			//不展示偶数项数字
			if(!isOdd){
				if(initData[i].proNum%2==0){
					proNumDom='';
				}else{
					proNumDom='<div class="proNum">'+initData[i].proNum+'</div>';
				}
			}else{
				proNumDom='<div class="proNum">'+initData[i].proNum+'</div>';
			}
			lis+='<li class="'+domActive+'">\
				<div class="vLine"></div>\
				'+proNumDom+'\
				<div class="proName">'+initData[i].proName+'</div>\
			</li>';
		}
		isInit=true;
		$eleBox.empty().append('<div class="procBox"><ul>'+lis+'</ul></div>');
		$eleBox.find('.procBox').css('width',options.width);
		$eleBox.attr('isInit','true');  //标识为已初始化

		//流程框加载完成事件	
		methods.loadSuccess?methods.loadSuccess($eleBox.find('.procBox')):null;

		//流程项的点击事件
		$eleBox.find('li').on('click',function(){
			methods.itemClick?methods.itemClick($(this)):null;
		});

	}

	//方法：设置进程所处数字	
	$.fn.eventProcess.setGoNum=function(domItem,setGoNumber){
		domItem.each(function(i,item){
			var domNum=$(item).find('.proNum').text()*1;
			if(domNum<setGoNumber){
				$(item).parents('li').prevObject.attr('class','end')
			}else if(domNum==setGoNumber){
				$(item).parents('li').prevObject.attr('class','active')
			}else{
				$(item).parents('li').prevObject.attr('class','')
			}
		});
	}

})(jQuery)