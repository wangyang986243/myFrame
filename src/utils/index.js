import Cookie from 'js-cookie'
import Config from '@/config'
import dayjs from 'dayjs'
import numeral from "numeral";

export default class Utils {
    /**
     * 根据对象属性比较排序
     * Jesse
     */
    static compareObj(prop, type = 'desc') {
        return function (fir, sec) {
            let firOrder = fir[prop] ? parseInt(fir[prop]) : Number.MAX_VALUE;
            let secOrder = sec[prop] ? parseInt(sec[prop]) : Number.MAX_VALUE;
            if (firOrder < secOrder) {
                return type === 'desc' ? 1 : -1;
            } else if (firOrder > secOrder) {
                return type === 'desc' ? -1 : 1;
            } else {
                return 0;
            }
        };
    }

    /**
     * 拷贝数据
     * Jesse
     */
    static copyData(target) {
        //先判断类型，再拷贝
        function checkType(val) {
            return Object.prototype.toString.call(val).slice(8, -1);
        }
        let res, type = checkType(target);
        if (type === 'Object') {
            res = {};
        } else if (type === 'Array') {
            res = [];
        } else {
            return target;
        }
        for (let i in target) { //数组和对象 for in 循环
            let value = target[i];
            if (checkType(value) === 'Object' || checkType(value) === 'Array') { //嵌套
                res[i] = this.copyData(value);
            } else { //基本数据或者函数
                res[i] = value;
            }
        }
        return res;
    }
    // 格式化 dayjs 时间
    static formatDateDayjs(date, fmt) {
        return dayjs(date).format(fmt);
    }

    // 格式化时间 IE
    static formatDateForIE(date = '', fmt = 'yyyy-MM-dd') {
        let parseTime = Date.parse(date.replace(/-/g, "/"));
        date = new Date(parseTime); //创建一个Date对象
        let o = {
            "M+": date.getMonth() + 1, //月份
            "d+": date.getDate(), //日
            "h+": date.getHours(), //小时
            "m+": date.getMinutes(), //分
            "s+": date.getSeconds(), //秒
            "q+": Math.floor((date.getMonth() + 3) / 3), //季度
            "S": date.getMilliseconds() //毫秒
        };
        if (/(y+)/.test(fmt)) {
            fmt = fmt.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length));
        }
        for (let k in o) {
            if (new RegExp("(" + k + ")").test(fmt)) {
                fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
            }
        }
        return fmt;
    }

    // 格式化时间
    static formatDate(date = '', fmt = 'yyyy-MM-dd') {
        date = new Date(date); //创建一个Date对象
        let o = {
            "M+": date.getMonth() + 1, //月份
            "d+": date.getDate(), //日
            "h+": date.getHours(), //小时
            "m+": date.getMinutes(), //分
            "s+": date.getSeconds(), //秒
            "q+": Math.floor((date.getMonth() + 3) / 3), //季度
            "S": date.getMilliseconds() //毫秒
        };
        if (/(y+)/.test(fmt)) {
            fmt = fmt.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length));
        }
        for (let k in o) {
            if (new RegExp("(" + k + ")").test(fmt)) {
                fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
            }
        }
        return fmt;
    }

    /**
     * 虚拟dom 模拟 a 标签下载
     */
    static downloadFile(data, fileName) {
        let a = document.createElement('a');
        document.body.appendChild(a);
        a.style = 'display: none';
        let blob = new Blob([data], {
            type: 'application/octet-stream'
        }),
            url = window.URL.createObjectURL(blob);
        a.href = url;
        a.download = fileName;
        a.click();
        window.URL.revokeObjectURL(url);
    }

    static downloadUrlFile(url, fileName) {
        let a = document.createElement('a');
        document.body.appendChild(a);
        a.style = 'display: none';
        a.href = url;
        a.download = fileName;
        a.click();
        window.URL.revokeObjectURL(url);
    }

    // 设置Cookie
    static setCookie(key, val, day = 0.2) {
        Cookie.set(key, val, {
            expires: day,
        });
    }
    // 获取Cookie
    static getCookie(key) {
        return Cookie.get(key);
    }
    // 移除Cookie
    static removeCookie(key) {
        Cookie.remove(key);
    }
    // 设置Token
    static setToken(token, day) {
        this.setCookie(Config.tokenKey, token, day);
    }
    // 获取Token
    static getToken() {
        return this.getCookie(Config.tokenKey);
    }
    // 移除Token
    static removeToken() {
        this.removeCookie(Config.tokenKey);
    }

    /*
     * 外链
     */
    static isExternal(path) {
        return /^(https?:|mailto:|tel:)/.test(path)
    }

    /**
     * 树形数据转换
     * @param {*} data
     * @param {*} id
     * @param {*} pid
     *
     * @res res 返回的数据
     */
    static translateListToTree(data, id = 'id', pid = 'parentId') {
        let map = {};
        data.forEach((item) => {
            // 将数据存储为 以 id 为 KEY 的 map 索引数据列
            map[item[id]] = item;
            // 删除 所有 children,以防止多次调用
            delete item.children;
        });
        let tree = [];
        data.forEach((item) => {
            // 以当前遍历项，的pid,去map对象中找到索引的id
            let parent = map[item[pid]];
            // 如果找到索引，那么说明此项不是顶级项,那么需要把此项添加到，他对应的父级中
            if (parent) {
                (parent.children || (parent.children = [])).push(item);
            } else {
                //如果没有在map中找到对应的索引ID,那么直接把 当前的item添加到 val结果集中，作为顶级
                tree.push(item);
            }
        });
        return tree;
    }
    /**
     * 给有 children 的父级添加重定向
     */
    static addRedirectToParent(data) {
        data && data.forEach(item => {
            if (item.children && item.children.length > 0) {
                item.redirect = item.children[0].path;
                this.addRedirectToParent(item.children);
            }
        })
        return data;
    }

    /**
     * 改变树形结构的 prop
     * data: Array
     * prop: 添加的属性值
     * isChild: 是否是子集调用
     */
    static changePropOfTree(data, prop = {
        id: 'id',
        pName: 'label',
        cName: 'label',
        children: 'children'
    }, isChild) {
        data && data.forEach((item, index) => {
            item['id'] = (item[prop['id']] || '_' + index + 1);
            if (isChild) {
                item['label'] = item[prop['cName']]
            } else {
                item['label'] = item[prop['pName']];
            }
            item['children'] = item[prop['children']]
            if (item['childrens']) {
                delete item['childrens']
            }
            if (item['children'] && item['children'].length > 0) {
                this.changePropOfTree(item['children'], prop, true)
            }
        })
        return data;
    }

    // 查找树下的children,添加redirect
    static findChildren(data) {
        data && data.forEach(item => {
            if (item.children && item.children.length > 0) {
                item.redirect = item.children[0].path;
                this.findChildren(item.children);
            }
        })
        return data;
    }
    // 格式化数字
    static numeral(num, fat) {
        return numeral(num).format(fat)
    }
    // 正整数 数字文本框
    static mustToNumber(val = '') {
        if (val && !/^\d+(\.\d{1,100})?$/.test(val)) {
            return ''
        } else if (val) {
            return Number(val).toFixed(2);
        }
    }
    //级联菜单 根据最后欧一级数据获取完整路径==>数组
    static getCascaderFullValue(cascader, id) {
        let cascaderFullValue = [id];
        _getParentId(cascaderFullValue, cascader, cascader, id);
        return cascaderFullValue;
        function _getParentId(cascaderFullValue, cascader, _cascader, _id) {
            if (!Array.isArray(cascader)) return;
            for (let cascaderItem of cascader) {
                if (!Array.isArray(cascaderItem.children)) continue;
                let index = cascaderItem.children.findIndex(
                    (item) => item.value === _id
                );
                if (index >= 0) {
                    cascaderFullValue.unshift(cascaderItem.value);
                    if (
                        _cascader.findIndex((item) => item.value === cascaderItem.value) <
                        0
                    )
                        _getParentId(
                            cascaderFullValue,
                            _cascader,
                            _cascader,
                            cascaderItem.value
                        );
                } else {
                    _getParentId(
                        cascaderFullValue,
                        cascaderItem.children,
                        _cascader,
                        _id
                    );
                }
            }
        }
    }

    /**
     * 表格中 字典格式化 
     * @param  {Array}  dictionary
     * @param  {string} value
     */
    static dictionaryFormat(dictionary, value) {
        let select = dictionary.find(
            (item) => item.value == value
        );
        return select.label
    }

    /**
     * 判断是否为对象
     */

    static isObject(o) {
        return !(o instanceof Array) && o instanceof Object

    }
}
/**
 * @param {Function} func
 * @param {number} wait
 * @param {boolean} immediate
 * @return {*}
 */
export function debounce(func, wait, immediate) {
    let timeout, args, context, timestamp, result

    const later = function () {
        // 据上一次触发时间间隔
        const last = +new Date() - timestamp

        // 上次被包装函数被调用时间间隔 last 小于设定时间间隔 wait
        if (last < wait && last > 0) {
            timeout = setTimeout(later, wait - last)
        } else {
            timeout = null
            // 如果设定为immediate===true，因为开始边界已经调用过了此处无需调用
            if (!immediate) {
                result = func.apply(context, args)
                if (!timeout) context = args = null
            }
        }
    }

    return function (...args) {
        context = this
        timestamp = +new Date()
        const callNow = immediate && !timeout
        // 如果延时不存在，重新设定延时
        if (!timeout) timeout = setTimeout(later, wait)
        if (callNow) {
            result = func.apply(context, args)
            context = args = null
        }

        return result
    }
}
