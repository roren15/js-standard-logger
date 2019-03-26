'use strict'

const util = require('util')

module.exports = {

  isArray(obj) {
    return obj && Object.prototype.toString.call(obj) === '[object Array]'
  },

  isObj(obj) {
    return obj && Object.prototype.toString.call(obj) === '[object Object]'
  },

  /**
   * check not empty for object
   * @param obj
   * @returns {boolean}
   */
  objectNotEmpty(obj) {

    if (this.isObj(obj)) {
      for (let key in obj) {
        return true
      }
      return false
    } else {
      return true
    }
  },

  /**
   * check not empty for array
   * @param array
   * @returns {boolean}
   */
  arrayNotEmpty(array) {

    if (this.isArray()) {
      return array.length > 0
    } else {
      return true
    }
  },

  /**
   * 非空(有东西)判断 ps:为空情况：空字符串'',空数组[],空对象{},undefined,null,NaN
   * @param val
   * @returns {*|boolean}
   */
  judgeNotNull(val) {
    return (val || val === 0 || val === false) && this.objectNotEmpty(val) && this.arrayNotEmpty(val)
  },

  getType(obj) {
    //tostring会返回对应不同的标签的构造函数
    var toString = Object.prototype.toString;
    var map = {
      '[object Boolean]': 'boolean',
      '[object Number]': 'number',
      '[object String]': 'string',
      '[object Function]': 'function',
      '[object AsyncFunction]': 'function',
      '[object Array]': 'array',
      '[object Date]': 'date',
      '[object RegExp]': 'regExp',
      '[object Undefined]': 'undefined',
      '[object Null]': 'null',
      '[object Object]': 'object'
    };
    var val = toString.call(obj)
    return map[val];
  },

  /**
   * use reflection tech to check algorithm name exists
   * @param func_name
   * @param target_object
   * @returns {boolean}
   */
  checkFuncExists(func_name, target_object) {

    if (this.judgeNotNull(func_name) && this.judgeNotNull(target_object)) {
      const func = target_object[func_name]
      return this.getType(func) === 'function'
    } else {
      return false
    }
  },

  /**
   * detect null arguments
   * @param args
   * @returns {boolean}
   */
  checkArgsNotNull(...args) {

    let res = true

    args.forEach(async val => {
      if (!this.judgeNotNull(val)) {
        res = false
        return false
      }
    })
    return res
  },

  /**
   * get inspected object
   * @param obj
   * @returns {*|string}
   */
  inspect(obj) {

    return util.inspect(obj, {depth: 9})
  },
}