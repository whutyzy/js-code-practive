function subsets(nums) {
    let result = []
    function helper(index, tempResult) {
        result.push(tempResult.slice())
        if (index > nums.length) return
        for (let i = index; i < nums.length; i++) {
            const num = nums[i]
            tempResult.push(num)
            helper(i + 1, tempResult)
            tempResult.pop(num)
        }
    }
    helper(0, [])
    return result
}

function subsetsWithDup(nums) {
    nums = nums.sort()
    let result = []
    function helper(start, tempResult) {
        result.push(tempResult.slice())
        if (tempResult.lenngth === nums.length) return
        for (let i = start; i < nums.length; i++) {
            const num = nums[i]
            if (i !== start && nums[i] == nums[i - 1]) {
                continue
            }
            tempResult.push(num)
            helper(i + 1, tempResult)
            tempResult.pop(num)
        }
    }
    helper(0, [])
    return result
}

console.log(JSON.stringify(subsetsWithDup([1, 2, 2])))
