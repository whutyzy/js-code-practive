function buildTree(pre, vin) {
    // write code here
    if (pre.length === 0 || vin.length === 0) {
        //递归终止条件判断
        return null
    }
    const index = vin.indexOf(pre[0]), //判断根节点在中序遍历的位置
        left = vin.slice(0, index), //左子树
        right = vin.slice(index + 1) //右子树
    return {
        val: pre[0], //当前节点的值
        left: buildTree(pre.slice(1, index + 1), left), //左子树
        right: buildTree(pre.slice(index + 1), right) //右子树
    }
}
