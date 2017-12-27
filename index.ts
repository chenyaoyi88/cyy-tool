/*
 * @Author: chenyaoyi 
 * @Date: 2017-12-25 11:41:11 
 * @Last Modified by: chenyaoyi
 * @Last Modified time: 2017-12-26 09:23:55
 */

/// <reference path='index.d.ts' />

/**
 * DOM 元素全部加载完成
 * @param fn 成功回调
 */
function domReady(fn: Function): void {
    if (document.addEventListener) {
        document.addEventListener('DOMContentLoaded', function () {
            fn && fn();
        }, false);
    } else {
        document['attachEvent']('onreadystatechange', function () {
            if (document.readyState == 'complete') {
                fn && fn();
            }
        });
    }
}

/**
 * 确保页面中 js/css 完全加载
 * 
 * @param url url
 * @param fnSucc 加载之后的回调函数
 */

function loadFile(url: string, fnSucc: Function): any {
    const type: string = getFileType(url);
    if (type === 'unknow') return type;
    const oTag: HTMLScriptElement | HTMLLinkElement | any = document.createElement(type);
    switch (type) {
        case 'js':
            oTag.src = url;
            break;
        case 'css':
            oTag.rel = 'stylesheet';
            oTag.href = url;
            break;
    }
    const oHead: HTMLHeadElement = document.getElementsByTagName('head')[0];
    oHead.appendChild(oTag);
    oTag.onload = oTag.onreadystatechange = function () {
        if (!this.readyState || this.readyState == 'loaded' || this.readyState == 'complete') {
            fnSucc && fnSucc();
        }
    };
}

/**
 * url 上面获取参数对应的值
 * 
 * @param name 要截的值名称
 */
function getQueryString(name: string): string | null {
    const reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)');
    const r = window.location.search.substr(1).match(reg);
    if (r != null) {
        return window['unescape'](r[2]);
    };
    return null;
}

/**
 * 返回一个在特点范围内的随机数字
 * 
 * @param startNum 开始
 * @param endNum 结束
 */
function getRandomNum(startNum: number, endNum: number) {
    return parseInt(String(Math.random() * (endNum + 1 - startNum) + startNum));
}

/**
 * 获取文件类型
 * @param file 文件对象
 */
function getFileType(file: string): string {
    const cuttingPoint = file.lastIndexOf('.');
    if (cuttingPoint == -1) {
        return 'unknow';
    } else {
        return file.substring(cuttingPoint + 1);
    }
}

/**
 * 鼠标滚轮事件
 * @param obj 响应鼠标滚轮的元素
 * @param fn 鼠标滚轮后的回调函数
 */
function fnMouseWheel(obj: HTMLElement, fn: Function): void {
    if (window.navigator.userAgent.toLowerCase().indexOf('firefox') != -1) {
        obj.addEventListener('DOMMouseScroll', fnWheel, false);
    } else {
        obj.onmousewheel = fnWheel;
    }

    /**
     * 鼠标滚轮事件
     * @param ev 事件对象
     */
    function fnWheel(ev: Event): boolean {
        const oEvent: any = ev || window.event;
        let bDown = true;
        if (oEvent.wheelDelta) {
            bDown = oEvent.wheelDelta > 0 ? false : true;
        } else {
            bDown = oEvent.detail > 0 ? true : false;
        }
        fn && fn(bDown);
        oEvent.preventDefault && oEvent.preventDefault();
        return false;
    }
}


/**
 * 判断对象是否为空，true -> json为空
 * @param json json 对象
 */
function isJsonEmpty(json: Object): boolean {
    for (let name in json) {
        // 如果 json 有数据则会进入循环
        return false;
    }
    return true;
}

function isArray(obj): boolean {
    return Object.prototype.toString.call(obj) === '[object Array]';
}
/**
 * 操控样式
 */
const fnClass = {
    /**
     * 样式是否存在
     * @param obj HTML元素
     * @param sClass 样式名
     */
    hasClass: function (obj: HTMLElement, sClass: string): boolean {
        if (obj.classList.contains) {
            return obj.classList.contains(sClass);
        } else {
            const reg = new RegExp('\\b' + sClass + '\\b');
            return reg.test(obj.className);
        }
    },
    /**
     * 添加样式
     * @param obj HTML元素
     * @param sClass 样式名
     */
    addClass: function (obj: HTMLElement, sClass: string): Object {
        if (obj.className) {
            if (!this.hasClass(obj, sClass)) {
                if (obj.classList.add) {
                    obj.classList.add(sClass);
                } else {
                    obj.className += ' ' + sClass;
                }
            }
        } else {
            obj.className = sClass;
        }
        return obj;
    },
    /**
     * 移除样式
     * @param obj HTML元素
     * @param sClass 样式名
     */
    removeClass: function (obj: HTMLElement, sClass: string): Object {
        if (obj.classList.remove) {
            obj.classList.remove(sClass);
        } else {
            const reg = new RegExp('\\b' + sClass + '\\b');
            if (this.hasClass(obj, sClass)) {
                obj.className = obj.className.replace(reg, '').replace(/^\s+|\s+$/g, '').replace(/\s+/g, '');
            }
        }
        return obj;
    }
};

/**
 * 设置 css3 的样式
 * @param obj HTML元素
 * @param name 要设置的样式名称
 * @param value 要设置的样式值
 */
function setCss3Style(obj: HTMLElement, name: string, value: string): void {
    const str = name.charAt(0).toUpperCase() + name.substring(1);
    obj.style['Webkit' + str] = value;
    obj.style['Moz' + str] = value;
    obj.style['ms' + str] = value;
    obj.style['O' + str] = value;
    obj.style[name] = value;
};

/**
 * 设置倒计时
 * 
 * @param id HTML元素的 ID
 * @param currentTimestamp 当前时间戳
 * @param targetTimestamp 目标时间时间戳
 */
function setTimeCountDown(id, currentTimestamp, targetTimestamp) {
    const oShowTime = document.querySelector('#' + id);
    if (!oShowTime) return;
    const regTime = /^\d{13}$/;
    if (!regTime.test(currentTimestamp)) return;
    if (!regTime.test(targetTimestamp)) return;

    const oTarget = new Date(currentTimestamp) || new Date();
    const oTargetTime = new Date(targetTimestamp);
    const oYear = oTargetTime.getFullYear();
    const oMonth = oTargetTime.getMonth();
    const oDay = oTargetTime.getDay();
    oTarget.setFullYear(oYear, oMonth, oDay);
    oTarget.setHours(0, 0, 0);

    countDown();
    setInterval(countDown, 1000);

    function countDown() {
        let x = parseInt(String((oTarget.getTime() - new Date().getTime()) / 1000));
        const d = parseInt(String(x / 86400));
        x %= 86400;
        const h = parseInt(String(x / 3600));
        x %= 3600;
        const m = parseInt(String(x / 60));
        x %= 60;
        oShowTime && (oShowTime.innerHTML = `还有${formatSingleNum(d)}天${formatSingleNum(h)}小时${formatSingleNum(m)}分${formatSingleNum(x)}秒`);
    }
}


/**
 * 字符串间隔（字符串四位间隔）
 * 
 * @param {string} type 类型 phone: 手机，bankcard: 银行卡
 * @param {string} val 要转换的字符串
 * @returns {string} 返回处理完的字符串
 */
function stringSpacing(type: string, val: string): string {
    val = val.replace(/\s/g, '').replace(/(.{4})/g, '$1 ');
    if (type === 'bankcard') {
        val = val.replace(/\s/g, '').replace(/(.{4})/g, '$1 ');
    } else if (type === 'phone') {
        if (val.length < 3) {
            val = val.replace(/\s/g, '');
        } else {
            val = val.substring(0, 3) + ' ' + val.substring(3).replace(/\s/g, '').replace(/(.{4})/g, '$1 ');
        }
    }
    if (val.charAt(val.length - 1) === ' ') {
        val = val.substring(0, val.length - 1);
    }
    return val;
}

/**
 * 时间格式转换
 * 
 * @param {(string | number)} time 时间戳
 * @param {string} [symbol='.'] 间隔符号
 * @returns {string} YYYY.MM.DD hh:mm:ss
 */
function formatDate(time: string | number, symbol: string = '.'): string {
    if (time) {
        const newTime = typeof time === 'number' ? time : parseInt(time);
        const date = new Date(newTime);
        return date.getFullYear() + symbol + formatSingleNum(date.getMonth() + 1) + symbol + formatSingleNum(date.getDate()) +
            ' ' + formatSingleNum(date.getHours()) + ':' + formatSingleNum(date.getMinutes()) + ':' + formatSingleNum(date.getSeconds());
    } else {
        return '----.--.-- --:--:--';
    }
}

/**
 * 将小于10的数字前面加上'0'
 * 
 * @param {*} num 
 * @returns {(string | number)} 
 */
function formatSingleNum(num: any): string | number {
    if (num === 'undefined' || num === undefined || num === '' || num === null) return;

    const newNum = typeof num === 'number' ? num : parseInt(num);
    return newNum > 9 ? newNum : ('0' + newNum);
}

/**
 * 字符串截取（多余的显示省略号）
 * 
 * @param {string} value 要截取的字符串
 * @param {number} [len=10] 截取的长度
 * @returns {string} 返回处理完的字符串
 */
function stringCut(value: string, len: number = 10): string {
    const v: string = String(value);
    if (v) {
        if (v.length === 0) {
            return '';
        } else if (v.length < len) {
            return v;
        } else {
            const arr = v.split('');
            arr.length = len;
            return arr.join('') + '...';
        }
    } else {
        return v;
    }
}

/**
 * 数值添加千分位处理
 * 
 * @param {*} num 需要处理的字符串或数字
 * @returns {string} 返回处理完的字符串
 * 
 */
function formatThousands(num: any): string {
    // 1.先去除空格,判断是否空值和非数
    num = num + '';
    // 去除空格
    num = num.replace(/[ ]/g, '');
    if (!/\d/.test(num) || isNaN(num)) {
        return null;
    };
    // 2.针对是否有小数点，分情况处理
    const index: number = num.indexOf('.');
    if (index === -1) {
        // 无小数点
        const reg: RegExp = /(-?\d+)(\d{3})/;
        while (reg.test(num)) {
            num = num.replace(reg, '$1,$2');
        }
        num += '.00';
    } else {
        let intPart: string = num.substring(0, index);
        const pointPart: string = num.substring(index + 1, num.length);
        const reg: RegExp = /(-?\d+)(\d{3})/;
        while (reg.test(intPart)) {
            intPart = intPart.replace(reg, '$1,$2');
        }
        num = intPart + '.' + pointPart;
    }
    return num;
}

/**
 * 判断浏览器
 */
const fnBrowser = {
    ua: window.navigator.userAgent.toLowerCase(),
    /**
     * 判断是移动端还是PC端
     */
    isMobile: function () {
        return this.ua.match(/mobile/i);
    },
    /**
     * 判断是否微信
     */
    isWeixin: function (): boolean {
        if (this.ua.match(/MicroMessenger/i) && this.ua.match(/MicroMessenger/i).length > 0) {
            return true;
        } else {
            return false;
        }
    },
    /**
     * 判断是否 ios 设备
     */
    isIOS: function () {
        return this.ua.match(/iPad/i) || this.ua.match(/iPhone/i) || this.ua.match(/iPod/i);
    },
    /**
     * 判断是否 android 设备
     */
    isAndroid: function () {
        return this.ua.match(/Android/i);
    },
    /**
     * 判断是否 webview
     */
    isWebView: function () { }
};

/**
 * json 转成 url 
 * 
 * @param json json对象
 */
function jsonTourl(json: { t: number }): string {
    json.t = Math.random();
    let arr = [];
    for (let name in json) {
        arr.push(name + '=' + encodeURIComponent(json[name]));
    }
    return arr.join('&');
}

// function showCountDown(id, year, month, day) {

//     const oShowTime = document.querySelector(id);
//     var oTarget = new Date();
//     oTarget.setFullYear(year, month, day);
//     oTarget.setHours(0, 0, 0);

//     countDown();
//     setInterval(countDown, 1000);

//     function countDown() {
//         var x = parseInt((oTarget.getTime() - new Date().getTime()) / 1000);

//         var d = parseInt(x / 86400);
//         x %= 86400;
//         var h = parseInt(x / 3600);
//         x %= 3600;
//         var m = parseInt(x / 60);
//         x %= 60;

//         oShowTime.innerHTML = `还有${d}天${h}小时${m}分${x}秒`;
//     }
// }

/**
 * HTTP 请求
 */
const http = {
    get: function (url: string, params: any = {}, options?: Ajax_Options): Promise<any> {
        const xhr = new XMLHttpRequest();
        let timer = null;
        for (let pro in options.headers) {
            xhr.setRequestHeader(pro, options.headers[pro]);
        };

        xhr.open('GET', url + '?' + jsonTourl(params), true);
        xhr.send();

        return this.hanlde(xhr, timer, options);

    },
    post: function (url: string, params: any = {}, options?: Ajax_Options): Promise<any> {
        const xhr = new XMLHttpRequest();
        let timer = null;
        for (let pro in options.headers) {
            xhr.setRequestHeader(pro, options.headers[pro]);
        };

        xhr.open('POST', url, true);
        xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');

        if (typeof params === 'string') {
            xhr.send(params);
        } else {
            xhr.send(jsonTourl(params));
        }

        return this.hanlde(xhr, timer, options);
    },
    hanlde: function (xhr: XMLHttpRequest, timer: any, options?: Ajax_Options) {
        return new Promise((resolve, reject) => {
            xhr.onreadystatechange = function () {
                // 完成
                if (xhr.readyState === 4) {
                    clearTimeout(timer);
                    if (xhr.status >= 200 && xhr.status < 300 || xhr.status === 304) {
                        resolve(JSON.parse(xhr.responseText));
                    } else {
                        // 失败
                        reject('error');
                    }
                }
            };

            if (options.timeout) {
                timer = setTimeout(function () {
                    reject('timeout');
                    // 终止
                    xhr.abort();
                }, options.timeout);
            }

        });
    }
};

export {
    domReady,
    loadFile,
    getFileType,
    getQueryString,
    getRandomNum,
    fnMouseWheel,
    isJsonEmpty,
    isArray,
    fnClass,
    fnBrowser,
    setCss3Style,
    stringSpacing,
    formatDate,
    formatSingleNum,
    formatThousands,
    stringCut,
    jsonTourl,
    http
};