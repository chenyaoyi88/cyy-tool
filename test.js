// import { http, domReady } from './index';
function json2url(json) {
    json.t = Math.random();
    var arr = [];
    for (var name in json) {
        arr.push(name + '=' + encodeURIComponent(json[name]));
    }
    return arr.join('&');
}
var http = {
    get: function (url, params, headers) {
        if (params === void 0) { params = {}; }
        var xhr = new XMLHttpRequest();
        var timer = null;
        for (var pro in headers) {
            xhr.setRequestHeader(pro, headers[pro]);
        }
        ;
        xhr.open('GET', url + '?' + json2url(params), true);
        xhr.send();
        return this.hanlde(xhr, timer);
    },
    post: function (url, params, headers) {
        var xhr = new XMLHttpRequest();
    },
    timeout: function () {
    },
    hanlde: function (xhr, timer) {
        return new Promise(function (resolve, reject) {
            xhr.onreadystatechange = function () {
                // 完成
                if (xhr.readyState === 4) {
                    clearTimeout(timer);
                    // 成功
                    if (xhr.status >= 200 && xhr.status < 300 || xhr.status === 304) {
                        resolve(JSON.parse(xhr.responseText));
                    }
                    else {
                        // 失败
                        reject('error');
                    }
                }
            };
        });
    },
    handleError: function () { }
};
var url = 'https://www.easy-mock.com/mock/5a3c68910df23b51b36151d0/test';
http.get(url, {})
    .then(function (data) {
    console.log(data);
})
    .catch(function (err) {
    console.warn(err);
});
