$(document).ajaxError(function(){alert("网络请求错误，请确认你的网络连接正常。")}),String.prototype.trim=function(){return this.replace(/\s+/g,"")};var BrokerWeb=BrokerWeb||{apiBaseUrl:"http://218.4.117.11:8093",brokerid:0,params:{},search:"",init:function(r){this.params=this.getParams(),this.brokerid=this.params.id,this.recieverType=this.type,r()},setLogin:function(r){console.info("setLogin",r),this.brokerid=r,this.params.login=1},getParams:function(){var r={},t=window.location.href;if(this.search=window.location.search,-1==t.indexOf("?"))return[];var e=t.substr(t.indexOf("?")+1),i=e.split("&");return $.isArray(i)&&i.length>0&&$.each(i,function(t,e){var i=e.split("=");r[i[0]]=i[1]}),r},commafy:function(r,t){if("undefined"==typeof t&&(t=2),""==(r+"").trim())return"";if(isNaN(r))return"";if(r+="",/^.*\..*$/.test(r)){var e=r.lastIndexOf("."),i=r.substring(0,e),n=r.substring(e+1,e+1+t);i+="";for(var a=/(-?\d+)(\d{3})/;a.test(i);)i=i.replace(a,"$1,$2");r=i+"."+n}else{r+="";for(var a=/(-?\d+)(\d{3})/;a.test(r);)r=r.replace(a,"$1,$2")}return r},delcommafy:function(r){return""==(r+"").Trim()?"":r=r.replace(/,/gi,"")},getYear:function(r){var t=new Date(r);return t.getFullYear()},getDate:function(r){var t=new Date(r),e=t.getMonth()+1,i=t.getDate();return e=10>e?"0"+e:e,i=10>i?"0"+i:i,e+"/"+i}};