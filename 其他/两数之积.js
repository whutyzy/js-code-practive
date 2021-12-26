function twoProduct(nums, target) {
    const map = new Map()
    const result = []
    for (let i = 0; i < nums.length; i++) {
        const num = nums[i]
        if (num !== 0 && map.has(target / num) ) {
            result.push([num, target / num])
        } else {
            map.set(num, i)
        }
    }
    return result
}
