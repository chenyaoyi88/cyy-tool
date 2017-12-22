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
function loadFile(type: string = 'script', url: string, fnSucc: Function): void {
    const oTag: HTMLScriptElement | HTMLLinkElement | any = document.createElement(type);
    if (type == 'script') {
        oTag.src = url;
    } else {
        oTag.rel = 'stylesheet';
        oTag.href = url;
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
function getQueryString(name: string): string | null {
    const reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)');
    const r = window.location.search.substr(1).match(reg);
    if (r != null) {
        return window['unescape'](r[2]);
    };
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
function rnd(startNum: number, endNum: number) {
    return parseInt(String(Math.random() * (endNum - startNum) + startNum));
}

/**
 * 使用示例：
 * 
 * 例如想要 4-13 之间的随机数，要写成：rnd(4, 14)
 * rnd(4, 14);
 */

/**
 * 鼠标滚轮事件
 * @param obj 响应鼠标滚轮的元素
 * @param fn 鼠标滚轮后的回调函数
 */
function addMouseWheel(obj: HTMLElement, fn: Function): void {
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
 * 使用示例：
 * 
 * const oDiv = document.getElementById('div1');
 * addMouseWheel(oDiv, (bDown) => {
 *      if (bDown) {
 *          // 鼠标上
 *      } else {
 *          // 鼠标下
 *      }
 * });
 */


/**
 * 判断对象是否为空，true -> json为空
 * @param json json 对象
 */
function isJsonEmpty(json: Object): boolean {
    for (let name in json) {
        return false;     //有数据则会进入循环
    }
    return true;
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
function getFileType(file: string): string {
    const cuttingPoint = file.lastIndexOf('.');
    if (cuttingPoint == -1) {
        return 'unknow';
    } else {
        return file.substring(cuttingPoint + 1);
    }
}

/**
 * 使用示例：
 * 
 * getFileType(文件对象);
 */

/**
 * 添加样式
 * @param obj HTML元素
 * @param sClass 样式名
 */
function addClass(obj: HTMLElement, sClass: string): void {
    // 如果有样式了
    if (obj.className) {
        if (!hasClass(obj, sClass)) {
            if (obj.classList.add) {
                obj.classList.add(sClass);
            } else {
                obj.className += ' ' + sClass;
            }
        }
    } else {
        obj.className = sClass;
    }
}

/**
 * 样式是否存在
 * @param obj HTML元素
 * @param sClass 样式名
 */
function hasClass(obj: HTMLElement, sClass: string): boolean {
    if (obj.classList.contains) {
        return obj.classList.contains(sClass);
    } else {
        const reg = new RegExp('\\b' + sClass + '\\b');
        return reg.test(obj.className);
    }
}

/**
 * 移除样式
 * @param obj HTML元素
 * @param sClass 样式名
 */
function removeClass(obj: HTMLElement, sClass: string): void {
    if (obj.classList.remove) {
        obj.classList.remove(sClass);
    } else {
        const reg = new RegExp('\\b' + sClass + '\\b');
        if (hasClass(obj, sClass)) {
            obj.className = obj.className.replace(reg, '').replace(/^\s+|\s+$/g, '').replace(/\s+/g, '');
        }
    }
}

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
        const newTime = typeof time === 'number' ? time : Number.parseInt(time);
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

    const newNum = typeof num === 'number' ? num : Number.parseInt(num);
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
function thousandsFormat(num: any): string {
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