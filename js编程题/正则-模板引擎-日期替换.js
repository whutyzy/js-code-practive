function render(template, context) {
    return template.replace(/\{\{(.*?)\}\}/g, (match, key) => {
        return context[key.trim()]
    })
}
const template = '{{name}}很厉name害，才{{age}}岁'
const context = { name: 'jawil', age: '15' }
console.log(render(template, context))

function dateFormat(fmt, date) {
    let ret
    const opt = {
        'Y+': date.getFullYear().toString(), // 年
        'm+': (date.getMonth() + 1).toString(), // 月
        'd+': date.getDate().toString(), // 日
        'H+': date.getHours().toString(), // 时
        'M+': date.getMinutes().toString(), // 分
        'S+': date.getSeconds().toString() // 秒
        // 有其他格式化字符需求可以继续添加，必须转化成字符串
    }
    for (let k in opt) {
        ret = new RegExp('(' + k + ')').exec(fmt)
        if (ret) {
            console.log(ret)
            fmt = fmt.replace(
                ret[1],
                ret[1].length == 1
                    ? opt[k]
                    : opt[k].padStart(ret[1].length, '0')
            )
        }
    }
    return fmt
}

let date = new Date()
console.log(dateFormat('YYYY-mm-dd HH:MM', date))

/**
 * @params {Number} money 金额
 * @params {Number} decimals 保留小数点后位数
 * @params {String} symbol 前置符号
 */
const formatMoney = (money, symbol = "", decimals = 2) => {
  let result = money
    .toFixed(decimals)
    .replace(/\B(?=(\d{3})+\b)/g, ",")
    .replace(/^/, `${symbol}`);
  return result;
};

formatMoney(12341234.246, "$", 2); // $12,341,234.25



