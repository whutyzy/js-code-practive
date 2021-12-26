function dedupliation(arr) {
    return [... new Set(arr)]
}

function union(a,b) {
    return a.concat(b.filter(v=>!a.includes(v)))
}

function intersetion(a,b) {
    return a.filter((v) => b.includes(v))
}