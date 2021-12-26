var verifyPostorder = function (postorder) {
    if (postorder.length <= 1) return true
    let root = postorder[postorder.length - 1]
    let index = postorder.length - 1
    for (let i = 0; i < postorder.length - 1; i++) {
        if (postorder[i] > root) {
            index = i
            break
        }
    }
    const left = postorder.slice(0, index)
    const right = postorder.slice(index, postorder.length - 1)
    for (let i = 0; i < right.length; i++) {
        if (right[i] < root) {
            return false
        }
    }
    return verifyPostorder(left) && verifyPostorder(right)
}
