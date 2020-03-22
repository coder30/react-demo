import Component from '../react/component';
import setAttribute from './dom';

export default function render(vnode, container) {
    container.appendChild(_render(vnode))
}

function _render(vnode) {
    if(typeof vnode === 'number') vnode = String(vnode)
    if (typeof vnode === 'string') {
        const textnode = document.createTextNode(vnode)
        return textnode
    }

    if (typeof vnode.tag === 'function') {
        const component = createComponent(vnode.tag, vnode.attrs)
        setComponentProps(component, vnode.attrs)
        return component.base
    }


    const dom = document.createElement(vnode.tag)

    if (vnode.attrs) {
        for (let key in vnode.attrs) {
            setAttribute(dom, key, vnode.attrs[key])
        }
    }

    vnode.children.forEach(element => {
        render(element, dom)
    });

    return dom
}

function createComponent(component, props) {
    let inst
    if (component.prototype && component.prototype.render) {
        inst = new component(props)
    } else {
        inst = new Component(props)
        inst.constructor = component
        inst.render = function () {
            return this.constructor(props)
        }
    }

    return inst
}

function setComponentProps(component, props) {
    if(!component.base) {
        if(component.componentWillMount) component.componentWillMount()
    } else if(component.componentWillRecevieProps) {
        component.componentWillRecevieProps()
    }

    component.props = props
    renderComponent(component)
}

export function renderComponent(component) {
    let base

    const renderer = component.render()

    if (component.base && component.componentWillUpdate) {
        component.componentWillUpdate()
    }

    base = _render(renderer)

    if (component.base) {
        if (component.componentDidUpdate) component.componentDidUpdate()
    } else {
        if (component.componentDidMount) component.componentDidMount()
    }

    if (component.base && component.base.parentNode) {
        component.base.parentNode.replaceChild(base, component.base)
    }

    component.base = base
    base._component = component
}