"use strict";
/*
 * @Author: chenyaoyi
 * @Date: 2017-12-25 11:41:11
 * @Last Modified by: chenyaoyi
 * @Last Modified time: 2017-12-25 17:49:46
 */
Object.defineProperty(exports, "__esModule", { value: true });
/// <reference path='index.d.ts' />
/**
 * DOM 元素全部加载完成
 * @param fn 成功回调
 */
function domReady(fn) {
    if (document.addEventListener) {
        document.addEventListener('DOMContentLoaded', function () {
            fn && fn();
        }, false);
    }
    else {
        document['attachEvent']('onreadystatechange', function () {
            if (document.readyState == 'complete') {
                fn && fn();
            }
        });
    }
}
exports.domReady = domReady;
/**
 * 使用示例：
 *
 * domReady(() => {
 *      // 要处理逻辑
 * });
 */
/**
 * 确保页面中 js/css 完全加载
 * @param type 文件类型
 * @param url url
 * @param fnSucc 加载之后的回调函数
 */
function loadFile(type, url, fnSucc) {
    if (type === void 0) { type = 'script'; }
    var oTag = document.createElement(type);
    if (type == 'script') {
        oTag.src = url;
    }
    else {
        oTag.rel = 'stylesheet';
        oTag.href = url;
    }
    var oHead = document.getElementsByTagName('head')[0];
    oHead.appendChild(oTag);
    oTag.onload = oTag.onreadystatechange = function () {
        if (!this.readyState || this.readyState == 'loaded' || this.readyState == 'complete') {
            fnSucc && fnSucc();
        }
    };
}
/**
 * 使用示例：
 *
 * loadFile('script', 'https://www.baidu.com/src/xxx.js', () => {
 *      // 要处理逻辑
 * });
 */
/**
 * url 上面获取参数对应的值
 * @param type 要截的值名称
 */
function getQueryString(name) {
    var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)');
    var r = window.location.search.substr(1).match(reg);
    if (r != null) {
        return window['unescape'](r[2]);
    }
    ;
    return null;
}
/**
 * 使用示例：
 *
 * getQueryString('script', 'https://www.baidu.com/src/xxx.js');
 */
/**
 * 生成一个范围内随机一个数字
 * 例如想要 4-13 之间的随机数，要写成：rnd(4,14)
 * @param startNum 开始数字
 * @param endNum 结束数字
 */
function getRandomNum(startNum, endNum) {
    return parseInt(String(Math.random() * (endNum - startNum) + startNum));
}
/**
 * 使用示例：
 *
 * 例如想要 4-13 getRandomNum(4, 14)
 * getRandomNum(4, 14);
 */
/**
 * 鼠标滚轮事件
 * @param obj 响应鼠标滚轮的元素
 * @param fn 鼠标滚轮后的回调函数
 */
function fnMouseWheel(obj, fn) {
    if (window.navigator.userAgent.toLowerCase().indexOf('firefox') != -1) {
        obj.addEventListener('DOMMouseScroll', fnWheel, false);
    }
    else {
        obj.onmousewheel = fnWheel;
    }
    /**
     * 鼠标滚轮事件
     * @param ev 事件对象
     */
    function fnWheel(ev) {
        var oEvent = ev || window.event;
        var bDown = true;
        if (oEvent.wheelDelta) {
            bDown = oEvent.wheelDelta > 0 ? false : true;
        }
        else {
            bDown = oEvent.detail > 0 ? true : false;
        }
        fn && fn(bDown);
        oEvent.preventDefault && oEvent.preventDefault();
        return false;
    }
}
/**
 * 使用示例：
 *
 * const oDiv = document.getElementById('div1');
 * addMouseWheel(oDiv, (bDown) => {
 *      if (bDown) {
 *          // 鼠标滚轮往上滚的时候触发回调
 *      } else {
 *          // 鼠标滚轮往下滚的时候触发回调
 *      }
 * });
 */
/**
 * 判断对象是否为空，true -> json为空
 * @param json json 对象
 */
function isJsonEmpty(json) {
    for (var name_1 in json) {
        // 如果 json 有数据则会进入循环
        return false;
    }
    return true;
}
function isArray(obj) {
    return Object.prototype.toString.call(obj) === '[object Array]';
}
/**
 * 使用示例：
 *
 * const json = {};
 * isJsonEmpty(json);
 *
 * 输出结果：
 * true
 */
/**
 * 获取文件类型
 * @param file 文件对象
 */
function getFileType(file) {
    var cuttingPoint = file.lastIndexOf('.');
    if (cuttingPoint == -1) {
        return 'unknow';
    }
    else {
        return file.substring(cuttingPoint + 1);
    }
}
/**
 * 使用示例：
 *
 * var file = 文件对象;
 * getFileType(file);
 *
 * 输出结果：
 * jpg
 */
/**
 * 操控样式
 */
var fnClass = {
    /**
     * 样式是否存在
     * @param obj HTML元素
     * @param sClass 样式名
     */
    hasClass: function (obj, sClass) {
        if (obj.classList.contains) {
            return obj.classList.contains(sClass);
        }
        else {
            var reg = new RegExp('\\b' + sClass + '\\b');
            return reg.test(obj.className);
        }
    },
    /**
     * 添加样式
     * @param obj HTML元素
     * @param sClass 样式名
     */
    addClass: function (obj, sClass) {
        if (obj.className) {
            if (!this.hasClass(obj, sClass)) {
                if (obj.classList.add) {
                    obj.classList.add(sClass);
                }
                else {
                    obj.className += ' ' + sClass;
                }
            }
        }
        else {
            obj.className = sClass;
        }
        return obj;
    },
    /**
     * 移除样式
     * @param obj HTML元素
     * @param sClass 样式名
     */
    removeClass: function (obj, sClass) {
        if (obj.classList.remove) {
            obj.classList.remove(sClass);
        }
        else {
            var reg = new RegExp('\\b' + sClass + '\\b');
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
function setCss3Style(obj, name, value) {
    var str = name.charAt(0).toUpperCase() + name.substring(1);
    obj.style['Webkit' + str] = value;
    obj.style['Moz' + str] = value;
    obj.style['ms' + str] = value;
    obj.style['O' + str] = value;
    obj.style[name] = value;
}
;
/**
 * 字符串间隔（字符串四位间隔）
 *
 * @param {string} type 类型 phone: 手机，bankcard: 银行卡
 * @param {string} val 要转换的字符串
 * @returns {string} 返回处理完的字符串
 */
function stringSpacing(type, val) {
    val = val.replace(/\s/g, '').replace(/(.{4})/g, '$1 ');
    if (type === 'bankcard') {
        val = val.replace(/\s/g, '').replace(/(.{4})/g, '$1 ');
    }
    else if (type === 'phone') {
        if (val.length < 3) {
            val = val.replace(/\s/g, '');
        }
        else {
            val = val.substring(0, 3) + ' ' + val.substring(3).replace(/\s/g, '').replace(/(.{4})/g, '$1 ');
        }
    }
    if (val.charAt(val.length - 1) === ' ') {
        val = val.substring(0, val.length - 1);
    }
    return val;
}
/**
 * 使用示例：
 *
 * stringSpacing('bankcard': '6225888888888888');
 * stringSpacing('phone': '15912341234');
 *
 * 输出结果：
 *
 * 6225 8888 8888 8888
 * 159 1234 1234
 */
/**
 * 时间格式转换
 *
 * @param {(string | number)} time 时间戳
 * @param {string} [symbol='.'] 间隔符号
 * @returns {string} YYYY.MM.DD hh:mm:ss
 */
function formatDate(time, symbol) {
    if (symbol === void 0) { symbol = '.'; }
    if (time) {
        var newTime = typeof time === 'number' ? time : parseInt(time);
        var date = new Date(newTime);
        return date.getFullYear() + symbol + formatSingleNum(date.getMonth() + 1) + symbol + formatSingleNum(date.getDate()) +
            ' ' + formatSingleNum(date.getHours()) + ':' + formatSingleNum(date.getMinutes()) + ':' + formatSingleNum(date.getSeconds());
    }
    else {
        return '----.--.-- --:--:--';
    }
}
/**
 * 将小于10的数字前面加上'0'
 *
 * @param {*} num
 * @returns {(string | number)}
 */
function formatSingleNum(num) {
    if (num === 'undefined' || num === undefined || num === '' || num === null)
        return;
    var newNum = typeof num === 'number' ? num : parseInt(num);
    return newNum > 9 ? newNum : ('0' + newNum);
}
/**
 * 字符串截取（多余的显示省略号）
 *
 * @param {string} value 要截取的字符串
 * @param {number} [len=10] 截取的长度
 * @returns {string} 返回处理完的字符串
 */
function stringCut(value, len) {
    if (len === void 0) { len = 10; }
    var v = String(value);
    if (v) {
        if (v.length === 0) {
            return '';
        }
        else if (v.length < len) {
            return v;
        }
        else {
            var arr = v.split('');
            arr.length = len;
            return arr.join('') + '...';
        }
    }
    else {
        return v;
    }
}
/**
 * 使用示例：
 *
 * stringCut('我我我我我我我我我我我我我我我我我我');
 *
 * 输出结果：
 *
 * 我我我我我我我我我我...
 */
/**
 * 数值添加千分位处理
 *
 * @param {*} num 需要处理的字符串或数字
 * @returns {string} 返回处理完的字符串
 */
function thousandsFormat(num) {
    // 1.先去除空格,判断是否空值和非数
    num = num + '';
    // 去除空格
    num = num.replace(/[ ]/g, '');
    if (!/\d/.test(num) || isNaN(num)) {
        return null;
    }
    ;
    // 2.针对是否有小数点，分情况处理
    var index = num.indexOf('.');
    if (index === -1) {
        // 无小数点
        var reg = /(-?\d+)(\d{3})/;
        while (reg.test(num)) {
            num = num.replace(reg, '$1,$2');
        }
        num += '.00';
    }
    else {
        var intPart = num.substring(0, index);
        var pointPart = num.substring(index + 1, num.length);
        var reg = /(-?\d+)(\d{3})/;
        while (reg.test(intPart)) {
            intPart = intPart.replace(reg, '$1,$2');
        }
        num = intPart + '.' + pointPart;
    }
    return num;
}
/**
 * 使用示例：
 *
 * thousandsFormat(1234567890456);
 * thousandsFormat('1234567890456');
 *
 * 输出结果：
 *
 * 1,234,567,890,456.00
 * 1,234,567,890,456.00
 */
/**
 * 判断浏览器
 */
var fnBrowser = {
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
    isWeixin: function () {
        if (this.ua.match(/MicroMessenger/i) && this.ua.match(/MicroMessenger/i).length > 0) {
            return true;
        }
        else {
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
function json2url(json) {
    json.t = Math.random();
    var arr = [];
    for (var name in json) {
        arr.push(name + '=' + encodeURIComponent(json[name]));
    }
    return arr.join('&');
}
/**
 * HTTP 请求
 */
var http = {
    get: function (url, params, options) {
        if (params === void 0) { params = {}; }
        var xhr = new XMLHttpRequest();
        var timer = null;
        for (var pro in options.headers) {
            xhr.setRequestHeader(pro, options.headers[pro]);
        }
        ;
        xhr.open('GET', url + '?' + json2url(params), true);
        xhr.send();
        return this.hanlde(xhr, timer);
    },
    post: function (url, params, options) {
        if (params === void 0) { params = {}; }
        var xhr = new XMLHttpRequest();
        var timer = null;
        for (var pro in options.headers) {
            xhr.setRequestHeader(pro, options.headers[pro]);
        }
        ;
        xhr.open('POST', url, true);
        xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
        if (typeof params === 'string') {
            xhr.send(params);
        }
        else {
            xhr.send(json2url(params));
        }
        return this.hanlde(xhr, timer, options);
    },
    hanlde: function (xhr, timer, options) {
        return new Promise(function (resolve, reject) {
            xhr.onreadystatechange = function () {
                // 完成
                if (xhr.readyState === 4) {
                    clearTimeout(timer);
                    if (xhr.status >= 200 && xhr.status < 300 || xhr.status === 304) {
                        resolve(JSON.parse(xhr.responseText));
                    }
                    else {
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
    },
    handleError: function () { }
};
exports.http = http;
/**
 * @description 自己封装的简单 ajax
 * @param {*Object} options ajax 选项
 * @returns {Promise}
 * url 提交的 url
 * data 提交的数据对象
 * timeout 请求超时时间
 * header 需要设置的请求头
 * success 请求成功回调
 * error 请求失败回调
 */
function ajax(options) {
    // options = options || {};
    if (!options.url) {
        return;
    }
    options.data = options.data || {};
    options.type = options.type || 'GET';
    options.timeout = options.timeout || 0;
    options.headers = options.headers || {};
    var xhr = null;
    var timer = null;
    //1 创建
    xhr = new XMLHttpRequest();
    if (options.type.toUpperCase() === 'GET') {
        xhr.open('GET', options.url + '?' + json2url(options.data), true);
        xhr.send();
    }
    else {
        xhr.open('POST', options.url, true);
        xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
        for (var pro in options.headers) {
            xhr.setRequestHeader(pro, options.headers[pro]);
        }
        if (typeof options.data === 'string') {
            xhr.send(options.data);
        }
        else {
            xhr.send(json2url(options.data));
        }
    }
    return new Promise(function (resolve, reject) {
        xhr.onreadystatechange = function () {
            // 完成
            if (xhr.readyState === 4) {
                clearTimeout(timer);
                // 成功
                if (xhr.status >= 200 && xhr.status < 300 || xhr.status === 304) {
                    options.success && options.success(JSON.parse(xhr.responseText));
                    resolve(JSON.parse(xhr.responseText));
                }
                else {
                    //失败
                    options.error && options.error('error');
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
