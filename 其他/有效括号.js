function isValid(s) {
    let len = s.length
    if (len % 2 === 1) return false
    const stack = []
    const pairs = new Map([[')', '('], ['}', '{'], [']', '[']])
    for (let i = 0; i < s.length; i++){
        const char = s[i]
        if (pairs.get(char)) {
            if (stack.length === 0 || stack[stack.length-1] !== paises.get(char)) {
                return false
            }
            pairs.pop()
        } else {
            stack.push(char)
        }
    }
    return !stack.length
}