function arrayToTree(items, id) {
    const map = {}
    items.array.forEach((item) => {
        const pItem = map[item.pid] || (map[item.pid] = { children: {} })
        map[item.id] = {
            ...item,
            children: (map[item.id] && map[item.id] && ['children']) || []
        }
        pItem.children.push(map[item.id])
    })
    return map[id]
}

function arrayToTree(items,rootId) {
    const result = [] // 存放结果集
    const itemMap = {} //

    // 先转成map存储
    for (const item of items) {
        itemMap[item.id] = { ...item, children: [] }
    }

    for (const item of items) {
        const id = item.id
        const pid = item.pid
        const treeItem = itemMap[id]
        if (pid === rootId) {
            result.push(treeItem)
        } else {
            if (!itemMap[pid]) {
                itemMap[pid] = {
                    children: []
                }
            }
            itemMap[pid].children.push(treeItem)
        }
    }
    return result[0]
}

function fn(obj) {
    const stack = [] // 声明栈，用来存储待处理元素
    const res = [] // 接收结果
    stack.push(obj) // 将初始元素压入栈
    while (stack.length) {
        // 栈不为空则循环执行
        const item = stack[0] // 取出栈顶元素
        res.push(item) // 元素本身压入结果数组
        stack.shift() // 将当前元素弹出栈
        // 逻辑处理，如果当前元素包含子元素，则将子元素压入栈
        if (item.children && item.children.length) {
            stack.push(...item.children)
        }
    }
    return res
}
