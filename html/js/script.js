var BrokerWeb = BrokerWeb || {
    apiBaseUrl: 'http://218.4.117.11:8093',
    brokerid: 0,
    getParams: function () {
        var params = {};

        var href = window.location.href;

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
    }
};
