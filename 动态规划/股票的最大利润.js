var maxProfit = function (prices) {
    const n = prices.length
    //生成二维数组
    let dp_i_0 = 0
    let dp_i_1 = -prices[0]
    for (let i = 1; i < n; i++) {
        let temp = dp_i_0
        dp_i_0 = Math.max(dp_i_0, dp_i_1 + prices[i])
        dp_i_1 = Math.max(dp_i_1, -prices[i])
    }
    return dp_i_0
}
console.log(maxProfit([7, 1, 5, 3, 6, 4]))


// 不限制次数
var maxProfit = function (prices) {
    if (prices.length <= 1) return 0
    if (prices.length == 2) return Math.max(0, prices[1] - prices[0])

    const N = prices.length

    let dp_i_0 = 0 // 卖出后的利润
    let dp_i_1 = -prices[0] // 买入后的利润

    for (let i = 1; i < N; i++) {
        const temp = dp_i_0 // 保留转换前的值提供给dp_i_1做计算

        // 是否卖出是根据买入后的利润+今天价钱，是否比不卖出的高来确定是否卖出
        dp_i_0 = Math.max(dp_i_0, dp_i_1 + prices[i])

        // 是否买入是根据当前卖出后的利润-今天价钱，是否比不买入的钱多
        dp_i_1 = Math.max(dp_i_1, temp - prices[i])
    }

    return dp_i_0
}


function package(packages,profit) {
    let result = []
    function helper(index,currentStr) {
        if (currentStr.length === str.length) {
            result.push(currentStr)
            return
        }
        const char = str[index]
        console.log(char)
        helper(index+1,currentStr + str[index].toUpperCase())
        helper(index+1,currentStr + str[index].toLowerCase())
    }
    helper(0,'')
    return result
}
console.log(combine('ABC'))