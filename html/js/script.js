var BrokerWeb = BrokerWeb || {
    apiBaseUrl: 'http://218.4.117.11:8093',
    brokerid: 0,
    params: {},
    search: '',

    init: function(callback){
        this.params = this.getParams();
        this.brokerid = this.params.id;
        this.recieverType = this.type;

        callback();
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
    /**
     * 数字格式转换成千分位
     *@param{Object}num
     */
    commafy: function(num) {
        if ((num + "").trim() == "") {
            return"";
        }
        if (isNaN(num)) {
            return"";
        }
        num = num + "";
        if (/^.*\..*$/.test(num)) {
            varpointIndex = num.lastIndexOf(".");
            varintPart = num.substring(0, pointIndex);
            varpointPart = num.substring(pointIndex + 1, num.length);
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
        returnnum;
    }
};
