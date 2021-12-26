function findNthDigit(n) {
    let start = 1
    let digit = 1
    let count = 9 * digit * start
    while (count < n) {
        n -= count
        digit++
        start *= 10
        count = 9 * digit * start
    }
    let number = Math.floor(start + (n - 1) / digit) + ''
    let index = (n - 1) % digit
    return number[index]
}
