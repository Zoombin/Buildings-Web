//ajax错误提示
$( document ).ajaxError(function() {
    window.location.href = 'ShowDialog:900950.com?msg=网络请求错误，请确认你的网络连接正常。';
    return;
})
//token过期
.ajaxSuccess(function(event, request, config, data){
    
    if(!data.result && data.paramMap.resultCode==='500002'){
        window.location.href = 'ShouldLogin:900950.com';
        return;
    }
});

$.ajaxSetup({
    
    dataType: 'json',
    //30秒超时
    timeout: 30000

});



// 去掉左右空格
String.prototype.trim = function() { return this.replace(/\s+/g,""); }   

var BrokerWeb = BrokerWeb || {
    apiBaseUrl: 'http://218.4.117.11:8093',
    params: {},
    search: '',
    token: '',
    brokerid: '',
    init: function(callback){
        // this.login();
        this.params = this.getParams();
        this.token = this.params.token;
        this.brokerid = this.params.id;
        this.recieverType = this.type;
        this.screen = this.screen();


        callback();
    },

    setLogin: function(id, token){
        this.brokerid = id;
        this.params.login = 1;
        if(typeof token !== 'undefined'){
            this.token = token;
        }
        
    },

    login: function(user, callback){
        user = {
            phone:'18501735208',
            password: '111111'
        };

        $.ajax({
            url: BrokerWeb.apiBaseUrl + '/broker/rest/cubp/getToken',
            type: 'POST',
            data: user,
            success: function(resp){
                console.info('login resp==', resp);
                if(resp.result){
                   BrokerWeb.token = resp.value; 

                   if(typeof callback === 'function'){
                        callback();
                   }
                }
                
            }
        });
    },

    screen: function(){
        var lockdiv = $('<div class="load-wrapper"><div class="ui-loader ui-corner-all ui-body-loading ui-loader-verbose"><span class="ui-icon ui-icon-loading"></span><h1>加载中...</h1></div></div>');
        $('body').append( $(lockdiv) ); 
        
        return {
            lock : function(msg){
                
                if(msg){
                    $( lockdiv ).find('h1').html(msg);
                }else{
                    $( lockdiv ).find('h1').html('加载中...');
                }
                $( lockdiv ).show(); 
            },
            unlock : function(){
                $( lockdiv ).hide();
            }
        };
    },

    getParams: function () {
        var params = {};

        var href = window.location.href;
        this.search = window.location.search;

        if (href.indexOf('?') == -1) {
            return [];
        }

        var param_str = href.substr(href.indexOf('?') + 1);
        var arr = param_str.split('&');
        if ($.isArray(arr) && arr.length > 0) {
            $.each(arr, function (i, paramobj) {
                var obj_arr = paramobj.split('=');
                var tmp = {};
                params[obj_arr[0]] = obj_arr[1];

            });
        }

        return params;
    },

    phoneAddSpace: function(phone){
        var reversePhone = phone.split("").reverse().join("");//翻转
        var reversePhoneWithSpace = reversePhone.replace(/(\d{4})/g, '$1 ').replace(/(^\s+|\s+$)/,'');//每4个字符加一空格
        return reversePhoneWithSpace.split("").reverse().join("");
    },

    /**
     * 数字格式转换成千分位
     *@param{Object}num
     */
    commafy: function(num, n) {
        if( typeof n === 'undefined'){
            n = 2;
        }
        if ((num + "").trim() == "") {
            return"";
        }
        if (isNaN(num)) {
            return"";
        }
        num = num + "";
        if (/^.*\..*$/.test(num)) {
            var pointIndex = num.lastIndexOf(".");
            var intPart = num.substring(0, pointIndex);

            var pointPart = num.substring(pointIndex + 1, pointIndex + 1 + n);
            intPart = intPart + "";
            var re = /(-?\d+)(\d{3})/
            while (re.test(intPart)) {
                intPart = intPart.replace(re, "$1,$2")
            }
            num = intPart + "." + pointPart;
        } else {
            num = num + "";
            var re = /(-?\d+)(\d{3})/
            while (re.test(num)) {
                num = num.replace(re, "$1,$2")
            }
        }
        return num;
    },
    /**
     * 去除千分位
     *@param{Object}num
     */
    delcommafy: function(num) {
        if ((num + "").Trim() == "") {
            return"";
        }
        num = num.replace(/,/gi, '');
        return num;
    },

    getYear: function(str){
        var date = new Date(str);
        return date.getFullYear();
    },
    
    getDate: function(str){
        var date = new Date(str);
        var m = date.getMonth()+1;
        var d = date.getDate();
        m = m < 10 ? '0' + m : m;
        d = d < 10 ? '0' + d : d;
        return m + '/' + d;
    },

    showMask: function(theme, msg){
        $.mobile.showPageLoadingMsg(theme,msg);
        $(".mask_div").css("display", "block");
    },

    hideMask: function(theme, msg){
        $.mobile.hidePageLoadingMsg(theme,msg);
        $(".mask_div").css("display", "none");
    }
};

