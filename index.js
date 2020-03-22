function createElement( tag, attrs, ...children ) {
    return {
        tag,
        attrs,
        children
    }
}
const React = {createElement}
const element = (
    <div style="color:blue; font-size:48;">
        <h1>hello</h1>
    </div>
)

function render(vnode ,container) {
    if(typeof vnode === 'string') {
        const textnode = document.createTextNode(vnode)
        return container.appendChild(textnode)
    }
    const dom = document.createElement(vnode.tag)
    if(vnode.attrs) {
        for(let key in vnode.attrs) {
            setAttribute(dom, key, vnode.attrs[key])
        }
    }

    vnode.children.forEach(element => {
        render(element, dom)
    });

    return container.appendChild(dom)
}

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

const ReactDom = {
    render: (vnode, container)=>{
        container.innerHTML = ''
        return render(vnode, container)
    }
}

ReactDom.render(element, document.getElementById('root'))
