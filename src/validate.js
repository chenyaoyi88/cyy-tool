"use strict";
exports.__esModule = true;
var Validation = /** @class */ (function () {
    function Validation() {
    }
    /**
     * 检验输入值是否为空
     * @param {string} val
     */
    Validation.prototype.checkEmpty = function (val) {
        var reg = /\S/;
        return !reg.test(val) ? false : true;
    };
    /**
     * 检验手机号
     * @param {string} val - {
     * 移动号段：
     * 134 135 136 137 138 139 147 150 151 152 157 158 159 172 178 182 183 184 187 188
     * 联通号段：
     * 130 131 132 145 155 156 171 175 176 185 186
     * 电信号段：
     * 133 149 153 173 177 180 181 189
     * 虚拟运营商:
     * 170
     * }
     */
    Validation.prototype.checkPhone = function (val) {
        var reg = /^(13[0-9]|14[579]|15[0-35-9]|17[01235678]|18[0-9])[0-9]{8}$/;
        return !reg.test(val) ? false : true;
    };
    /**
     * 检验是否为纯数字
     * @param {string} val
     */
    Validation.prototype.checkPureNum = function (val) {
        var reg = /^[0-9]*$/;
        return !reg.test(val) ? false : true;
    };
    /**
     * 大于等于0的整数或者小数
     * @param {any} val
     */
    Validation.prototype.checkAmountNum = function (val) {
        var reg = /^(0|0\.\d+|[1-9](\.\d+)?(\d+)?(\.\d+)?)$/g;
        return !reg.test(val) ? false : true;
    };
    /**
     * 检验val的值的长度是否与len相等
     * @param {string} val - 值
     * @param {number} len - 长度
     */
    Validation.prototype.checkLengthEqual = function (val, len) {
        return val.length !== len ? false : true;
    };
    /**
     * 检验val的长度是否在min和max之间
     * @param {string} val - 值
     * @param {number} min - 最小长度
     * @param {number} max - 最大长度
     */
    Validation.prototype.checkLength = function (val, min, max) {
        if (max === undefined) {
            return (val.length < min) ? false : true;
        }
        return (val.length < min || val.length > max) ? false : true;
    };
    /**
     * 格式化千分位
     * @param {number} val - 值
     */
    Validation.prototype.formatThousandth = function (val) {
        var reg = /(\d)(?=(\d{3})+(?:\.\d+)?$)/g;
        if (!!val) {
            return val.replace(reg, '$1,');
        }
        else {
            return val;
        }
    };
    /**
     * 将千分位的','去掉
     * @param {number} val - 值
     */
    Validation.prototype.parseThousandth = function (val) {
        return val.replace(/,/g, '');
    };
    /**
     * 检验身份证号
     * @param {number} val - 值
     */
    Validation.prototype.checkCardID = function (val) {
        var reg = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;
        return !reg.test(val) ? false : true;
    };
    /**
     * 校验银行卡号
     * @param {number} val - 银行卡
     */
    Validation.prototype.checkBankCard = function (val) {
        var reg = /^\d{16}|\d{19}$/;
        return !reg.test(val) ? false : true;
    };
    /**
     * 校验邮箱
     * @param val 邮箱
     */
    Validation.prototype.checkEmail = function (val) {
        var reg = /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/;
        return !reg.test(val) ? false : true;
    };
    /**
     * 检验密码
     * @param {string} val - 密码字符串，由6-16位的数字和字母混合组成
     */
    Validation.prototype.checkPassword = function (val) {
        var reg = /^(?![^a-zA-Z]+$)(?!\D+$).{6,16}$/g;
        return !reg.test(val) ? false : true;
    };
    /**
     * 校验中文名
     * @param val 中文
     */
    Validation.prototype.checkUserName = function (val) {
        var reg = /^[\u4E00-\u9FA5\·\.]+$/g;
        return reg.test(val) ? true : false;
    };
    return Validation;
}());
exports["default"] = new Validation;
