function setAttribute(dom, name, value) {
    if(name === 'className') name = 'class'

    if(/on\w+/.test(name)) {
        name = name.toLowerCase()
        dom[name] = value
    } else if(name === 'style') {
        if(value && typeof value === 'string') {
            dom.style.cssText = value
        } else if(value && typeof value === 'object') {
            for(let name in value) {
                dom.style[name] = typeof value[name] === 'numer' ? value[name] + 'px' : value[name]
            }
        }
    } else {
        if(value) dom.setAttribute(name, vlaue)
        else dom.removeAttribute(name, vlaue)
    }
}
export default setAttribute