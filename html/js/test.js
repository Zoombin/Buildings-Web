var scrollSelection = {
	loaded:function(){
		myScroll = new iScroll('provinceDiv', {
			checkDOMChanges : true,
			hScrollbar : false,
			vScrollbar : false,
			onScrollEnd: function () {
				//40为单个li高度
				var scrollIndex = parseInt(Math.abs(this.y)/40);
				var overflow = parseInt(Math.abs(this.y)%40);
				
				scrollSelection.pullDownAction(scrollIndex, overflow);
			}
		});
		setTimeout(function () { document.getElementById('provinceDiv').style.left = '0'; }, 800);
		
		myScrollDistrict = new iScroll('cityDiv', {
			checkDOMChanges : true,
			hScrollbar : false,
			vScrollbar : false,
			onScrollEnd: function () {
				//40为单个li高度
				var scrollIndex = parseInt(Math.abs(this.y)/40);
				var overflow = parseInt(Math.abs(this.y)%40);
				
				scrollSelection.pullDownActionDistrict(scrollIndex, overflow);
			}
		});
		setTimeout(function () { document.getElementById('cityDiv').style.left = '0'; }, 800);
	},
	pullDownAction:function(scrollIndex, overflow){
		if(overflow > 20){
			scrollIndex = scrollIndex + 1;
			$("#provinceDiv ul").css("margin-top", "-" + (40 - overflow) + "px");
		} else {
			$("#provinceDiv ul").css("margin-top", overflow + "px");
		}
	
		$("#provinceDiv ul li").removeClass("selected");
		$("#provinceDiv ul li").each(function(i){
			if((scrollIndex + 3) == i){
				$(this).addClass("selected");
				var city = $(this).html();
				scrollSelection.loadDistrict(city);
			}
		});
	},
	pullDownActionDistrict:function(scrollIndex, overflow){
		if(overflow > 20){
			scrollIndex = scrollIndex + 1;
			$("#cityDiv ul").css("margin-top", "-" + (40 - overflow) + "px");
		} else {
			$("#cityDiv ul").css("margin-top", overflow + "px");
		}
	
		$("#cityDiv ul li").removeClass("selected");
		$("#cityDiv ul li").each(function(i){
			if((scrollIndex + 3) == i){
				$(this).addClass("selected");
				var district = $(this).html();
			}
		});
	},
	loadDistrict:function(city){
		var districtHtml = '';
		if(city == "上海"){
			districtHtml += '<li></li><li></li><li></li>';//填充高度
			districtHtml += '<li>静安区</li><li>长宁区</li><li>徐汇区</li><li>杨浦区</li><li>宝山区</li>';
			districtHtml += '<li></li><li></li><li></li>';//填充高度
			$("#cityDiv ul").empty().html(districtHtml);
		} else if(city == "乌鲁木齐"){
			districtHtml += '<li></li><li></li><li></li>';//填充高度
			districtHtml += '<li>乌鲁木齐1</li><li>乌鲁木齐2</li><li>乌鲁木齐2</li><li>乌鲁木齐4</li><li>乌鲁木齐5</li>';
			districtHtml += '<li></li><li></li><li></li>';//填充高度
			$("#cityDiv ul").empty().html(districtHtml);
		} else {
			$("#cityDiv ul").empty().html(districtHtml);
		}
	},
	confirmSelect:function(){
		var city = $("#provinceDiv ul .selected").html();
		var district = $("#cityDiv ul .selected").html();
		alert(city + district);
	}
}

$(document).bind("pageshow", function(e) {
	scrollSelection.loaded();
});
