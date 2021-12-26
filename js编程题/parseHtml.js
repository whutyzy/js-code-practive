const startTagReg = /^<([a-zA-Z0-9]+)>/
const endTagReg = /^<\/([a-zA-Z0-9]+)>/

function parseHtml(html) {
    const startTagReg = /^<([a-zA-Z0-9]+)>/
    const endTagReg = /^<\/([a-zA-Z0-9]+)>/
    const stack = [{ tag: 'root', children: [] }]

    while (html) {
        const startTagMatch = html.match(startTagReg)
        if (startTagMatch) {
            const tag = { tag: startTagMatch[1], children: [] }
            const currentParent = stack[stack.length - 1]
            currentParent.children.push(tag)
            stack.push(tag)
            advance(startTagMatch[0].length)
        }

        const endTagMatch = html.match(endTagReg)
        if (endTagMatch) {
            stack.pop()
            advance(endTagMatch[0].length)
        }
    }
    function advance(n) {
        html = html.slice(n)
    }
    return stack[0].children[0]
}

parseHtml('<div><span></span><span></span></div>')
