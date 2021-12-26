function minArray(numbers) {
    let left = 0
    let right = numbers.length - 1
    while (left < right) {
        const middle = Math.floor(left + (right - left) / 2)
        if (numbers[middle] === numbers[right]) {
            right--
        } else if (numbers[middle] > numbers[right]) {
            left = middle + 1
        } else {
            right = middle
        }
    }
    return numbers[left]
}
