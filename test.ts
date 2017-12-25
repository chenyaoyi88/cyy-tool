// import { http, domReady } from './index';


function json2url(json: { t: number }): string {
    json.t = Math.random();
    var arr = [];
    for (var name in json) {
        arr.push(name + '=' + encodeURIComponent(json[name]));
    }
    return arr.join('&');
}

const http = {
    get: function (url: string, params: any = {}, headers?: any): Promise<any> {
        const xhr = new XMLHttpRequest();
        let timer = null;
        for (let pro in headers) {
            xhr.setRequestHeader(pro, headers[pro]);
        };
        xhr.open('GET', url + '?' + json2url(params), true);
        xhr.send();

        return this.hanlde(xhr, timer);

    },
    post: function (url: string, params: any, headers: any) {
        let xhr = new XMLHttpRequest();
    },
    timeout: function () {
    },
    hanlde: function (xhr: XMLHttpRequest, timer: any) {
        return new Promise((resolve, reject) => {
            xhr.onreadystatechange = function () {
                // 完成
                if (xhr.readyState === 4) {
                    clearTimeout(timer);
                    // 成功
                    if (xhr.status >= 200 && xhr.status < 300 || xhr.status === 304) {
                        resolve(JSON.parse(xhr.responseText));
                    } else {
                        // 失败
                        reject('error');
                    }

                }
            };
        });
    },
    handleError: function () { }
};

const url = 'https://www.easy-mock.com/mock/5a3c68910df23b51b36151d0/test';
http.get(url, {})
    .then((data: any) => {
        console.log(data);
    })
    .catch((err: any) => {
        console.warn(err);
    });