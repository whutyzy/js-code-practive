function findPathSum(root, target) {
    const result = []
    const path = []
   
    function helper(node,target) {
        if (!node) return
        path.push(node.val)
        target -= node.val
        if (target === 0 && !node.left && !node.right) {
            result.push(path.slice())
        }
        helper(node.left, target)
        helper(node.right, target)
        path.pop()

    }
    helper(root,target)
}