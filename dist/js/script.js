$(document).ajaxError(function(){window.location.href="ShowDialog:900950.com?msg=网络请求错误，请确认你的网络连接正常。"}),String.prototype.trim=function(){return this.replace(/\s+/g,"")};var BrokerWeb=BrokerWeb||{apiBaseUrl:"http://218.4.117.11:8093",brokerid:0,params:{},search:"",init:function(e){this.params=this.getParams(),this.brokerid=this.params.id,this.recieverType=this.type,this.screen=this.screen(),e()},setLogin:function(e){this.brokerid=e,this.params.login=1},screen:function(){var e=$('<div class="ui-loader ui-corner-all ui-body-loading ui-loader-verbose"><span class="ui-icon ui-icon-loading"></span><h1>加载中...</h1></div>');return $("body").append($(e)),{lock:function(r){$(e).find("h1").html(r?r:"加载中..."),$(e).show()},unlock:function(){$(e).hide()}}},getParams:function(){var e={},r=window.location.href;if(this.search=window.location.search,-1==r.indexOf("?"))return[];var i=r.substr(r.indexOf("?")+1),n=i.split("&");return $.isArray(n)&&n.length>0&&$.each(n,function(r,i){var n=i.split("=");e[n[0]]=n[1]}),e},phoneAddSpace:function(e){var r=e.split("").reverse().join(""),i=r.replace(/(\d{4})/g,"$1 ").replace(/(^\s+|\s+$)/,"");return i.split("").reverse().join("")},commafy:function(e,r){if("undefined"==typeof r&&(r=2),""==(e+"").trim())return"";if(isNaN(e))return"";if(e+="",/^.*\..*$/.test(e)){var i=e.lastIndexOf("."),n=e.substring(0,i),t=e.substring(i+1,i+1+r);n+="";for(var a=/(-?\d+)(\d{3})/;a.test(n);)n=n.replace(a,"$1,$2");e=n+"."+t}else{e+="";for(var a=/(-?\d+)(\d{3})/;a.test(e);)e=e.replace(a,"$1,$2")}return e},delcommafy:function(e){return""==(e+"").Trim()?"":e=e.replace(/,/gi,"")},getYear:function(e){var r=new Date(e);return r.getFullYear()},getDate:function(e){var r=new Date(e),i=r.getMonth()+1,n=r.getDate();return i=10>i?"0"+i:i,n=10>n?"0"+n:n,i+"/"+n},showMask:function(e,r){$.mobile.showPageLoadingMsg(e,r),$(".mask_div").css("display","block")},hideMask:function(e,r){$.mobile.hidePageLoadingMsg(e,r),$(".mask_div").css("display","none")}};