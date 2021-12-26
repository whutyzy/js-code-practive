// 前序
var preorderTraversal = function (root) {
    if (!root) return []
    const stack = [root]
    const res = []
    while (stack.length) {
        // 出栈
        const cur = stack.pop()
        res.push(cur.val)
        // 子节点存在压入栈中，先右再左
        cur.right && stack.push(cur.right)
        cur.left && stack.push(cur.left)
    }
    return res
}


// 中序
var inorderTraversal = function (root) {
    if (!root) return []
    const stack = []
    let cur = root
    const res = []
    while (stack.length || cur) {
        // 左节点都先压入栈
        while (cur) {
            stack.push(cur)
            cur = cur.left
        }
        const node = stack.pop()
        res.push(node.val)
        if (node.right != null) {
            cur = node.right
        }
    }
    return res
}

// 后序
var postorderTraversal = function (root) {
    if (!root) return null
    const res = []
    const stack = [root]
    while (stack.length) {
        const cur = stack.pop()
        // 总是头部插入，先被插入的在后面。
        res.unshift(cur.val)
        cur.left && stack.push(cur.left)
        cur.right && stack.push(cur.right)
    }

    return res
}
