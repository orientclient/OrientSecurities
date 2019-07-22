import { Message } from 'element-ui'
export { emptyForm, clearFormData } from '@/common/utils/form/index'
export { moveTreeNode, removeTreeNode, insertBeforeTreeNode, insertAfterTreeNode, appendChildTreeNode, clearTree, collapseTree, refreshLazyTree, constructTree, ifSameLevel, tidyTreeDataByDropType, refreshAllLoadTree, manualClickChecked, findFirstMachineNode } from '@/common/utils/tree/index'
export { addToTable, addToTableByIndex, deleteFromTable, selectable, batchDeleteTable, moveUpTable, moveDownTable } from '@/common/utils/table/index'

export function parseTime(time, cFormat) {
    if (arguments.length === 0) {
        return null
    }
    const format = cFormat || '{y}-{m}-{d} {h}:{i}:{s}'
    let date
    if (typeof time === 'object') {
        date = time
    } else {
        if (('' + time).length === 10) time = parseInt(time) * 1000
        date = new Date(time)
    }
    const formatObj = {
        y: date.getFullYear(),
        m: date.getMonth() + 1,
        d: date.getDate(),
        h: date.getHours(),
        i: date.getMinutes(),
        s: date.getSeconds(),
        a: date.getDay()
    }
    const time_str = format.replace(/{(y|m|d|h|i|s|a)+}/g, (result, key) => {
        let value = formatObj[key]
        if (key === 'a') return ['一', '二', '三', '四', '五', '六', '日'][value - 1]
        if (result.length > 0 && value < 10) {
            value = '0' + value
        }
        return value || 0
    })
    return time_str
}

export function formatTime(time, option) {
    time = +time * 1000
    const d = new Date(time)
    const now = Date.now()

    const diff = (now - d) / 1000

    if (diff < 30) {
        return '刚刚'
    } else if (diff < 3600) { // less 1 hour
        return Math.ceil(diff / 60) + '分钟前'
    } else if (diff < 3600 * 24) {
        return Math.ceil(diff / 3600) + '小时前'
    } else if (diff < 3600 * 24 * 2) {
        return '1天前'
    }
    if (option) {
        return parseTime(time, option)
    } else {
        return d.getMonth() + 1 + '月' + d.getDate() + '日' + d.getHours() + '时' + d.getMinutes() + '分'
    }
}

export function toggleClass(element, className) {
    if (!element || !className) {
        return
    }
    let classString = element.className
    const nameIndex = classString.indexOf(className)
    if (nameIndex === -1) {
        classString += '' + className
    } else {
        classString = classString.substr(0, nameIndex) + classString.substr(nameIndex + className.length)
    }
    element.className = classString
}

export function debounce(func, wait, immediate) {
    let timeout, args, context, timestamp, result

    const later = function() {
    // 据上一次触发时间间隔
        const last = +new Date() - timestamp

        // 上次被包装函数被调用时间间隔last小于设定时间间隔wait
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

    return function(...args) {
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

export function formatJson(filterVal, jsonData) {
    return jsonData.map(v => filterVal.map(j => {
        if (j === 'timestamp') {
            return parseTime(v[j])
        } else {
            return v[j]
        }
    }))
}

// 操作提示框
export function showMessage(res) {
    let msgType = null
    let message = '接口未提供错误信息！'
    if (res.msgType) {
        msgType = res.msgType
    } else {
        if (res.code === '20000') {
            msgType = 'success'
        } else {
            msgType = 'error'
        }
    }
    if (res.msg) {
        message = res.msg
    }
    Message({
        showClose: true,
        message: message,
        type: msgType
    })
}

// 数字递增，最小为0
export function numberIncrement(theNumber) {
    let num = null
    if (theNumber && theNumber.length > 0) {
        num = theNumber * 1
        if (isNaN(num)) {
            num = 0
        } else {
            if (num < 0) {
                num = 0
            } else {
                num++
            }
        }
    } else {
        num = 0
    }
    return num
}

// 数字递减，最小为0
export function numberDecrement(theNumber) {
    let num = null
    if (theNumber && theNumber.length > 0) {
        num = theNumber * 1
        if (isNaN(num)) {
            num = 0
        } else {
            if (num === 0 || num < 0) {
                num = 0
            } else {
                num--
            }
        }
    } else {
        num = 0
    }
    return num
}

// 对象、数组深拷贝
export function deepClone(obj) {
    var copy

    // Handle the 3 simple types, and null or undefined
    if (obj == null || typeof obj !== 'object') return obj

    // Handle Date
    if (obj instanceof Date) {
        copy = new Date()
        copy.setTime(obj.getTime())
        return copy
    }

    // Handle Array
    if (obj instanceof Array) {
        copy = []
        for (var i = 0, len = obj.length; i < len; i++) {
            copy[i] = deepClone(obj[i])
        }
        return copy
    }

    // Handle Object
    if (obj instanceof Object) {
        copy = {}
        for (var attr in obj) {
            if (obj.hasOwnProperty(attr)) copy[attr] = deepClone(obj[attr])
        }
        return copy
    }

    throw new Error("Unable to copy obj! Its type isn't supported.")
}

// 字符串按，拼接
// 该方法接受两个个参数，分别是：数组，要拼接的属性
export function concatenation(selArry, name) {
    let allName = ''
    selArry.forEach((item, i) => {
        if (i === selArry.length - 1) {
            allName += item[name]
        } else {
            allName += item[name] + ','
        }
    })
    return allName
}

// 装配参数，将需要的参数取出封装到对象，依次push到condition数组中
// 该方法接受三个参数，分别是：待解构参数的数组，参数名，要重新设置的参数名
export function assemblyParam(disassembly, getParam, setParam) {
    let params = { 'condition': [] }
    const arry = []
    if (disassembly instanceof Array && getParam instanceof Array && setParam instanceof Array) {
        disassembly.forEach((item, i) => {
            const obj = {}
            getParam.forEach((value, i) => {
                obj[setParam[i]] = item[value]
            })
            arry.push(obj)
        })
        params = { 'condition': arry }
    } else if (disassembly instanceof Array) {
        params = { 'condition': disassembly }
    } else if (disassembly instanceof Object) {
        params = { 'condition': {}}
        getParam.forEach((value, i) => {
            params.condition[setParam[i]] = disassembly[value]
        })
    } else {
        console.error('解构的必须是数组或对象！')
    }
    return params
}

// 数据对象赋值
// 该方法接受五个参数，分别是：this, 要赋值的对象，要赋值的属性，取值的对象，取值的属性
export function objectAssignment(current, setObj, setAttr, fromObj, fromAttr) {
    if (setObj && fromObj) {
        if (setObj instanceof Object && fromObj instanceof Object) {
            if (setAttr instanceof Array && fromAttr instanceof Array) {
                setAttr.forEach((value, i) => {
                    let setValue = null
                    if (fromAttr[i] && fromObj[fromAttr[i]]) {
                        setValue = fromObj[fromAttr[i]]
                    } else {
                        setValue = null
                    }
                    current.$set(setObj, value, setValue)
                })
            } else {
                console.error('对象的属性需以数组传入！')
            }
        } else {
            console.error('赋值的必须为对象！')
        }
    } else {
        console.error('对象未定义！')
    }
}

// 两个数组求并集，交集，差集
// 接受三个参数，第一个数组，第二个数组，处理类型type：union，intersect，difference
export function subtractArray(arryFirst, arrySecond, type) {
    const a = new Set(arryFirst)
    const b = new Set(arrySecond)
    let handleArray = new Set([])

    if (type && type === 'union') {
    // 并集
        handleArray = new Set([...a, ...b])
    } else if (type && type === 'intersect') {
    // 交集
        handleArray = new Set([...a].filter(x => b.has(x)))
    } else if (type && type === 'difference') {
    // 差集
        handleArray = new Set([...a].filter(x => !b.has(x)))
    } else {
        console.error('处理类型需为union，intersect，difference之一，错误的处理类型！无法处理')
    }
    return Array.from(handleArray) // set转数组
}

// 数组升序排序
export function compareUp(array, propertyName) { // 升序排序
    if ((typeof array[0][propertyName]) !== 'number') { // 属性值为非数字
        return function(object1, object2) {
            var value1 = object1[propertyName]
            var value2 = object2[propertyName]
            return value1.localeCompare(value2)
        }
    } else {
        return function(object1, object2) { // 属性值为数字
            var value1 = object1[propertyName]
            var value2 = object2[propertyName]
            return value1 - value2
        }
    }
}
// 数组降序排序
export function compareDown(array, propertyName) { // 降序排序
    if ((typeof array[0][propertyName]) !== 'number') { // 属性值为非数字
        return function(object1, object2) {
            var value1 = object1[propertyName]
            var value2 = object2[propertyName]
            return value2.localeCompare(value1)
        }
    } else {
        return function(object1, object2) { // 属性值为数字
            var value1 = object1[propertyName]
            var value2 = object2[propertyName]
            return value2 - value1
        }
    }
}
