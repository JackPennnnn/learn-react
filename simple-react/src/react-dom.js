import {REACT_ELEMENT_TYPE} from './shared/ReactSymbols'
function render(VNode,container){
    // ...
    mount(VNode,container)
    // ...
}

function mount(VNode,container){
    // 1.将虚拟DOM转换为真实DOM
    const newDOM = createDom(VNode)
    // 2.将真实DOM插入到容器中
    newDOM && container.appendChild(newDOM)
}

function createDom(VNode){
    // 创建真实DOM
    const {type,props} = VNode
    let dom
     if(typeof type === 'function' && type.prototype.isReactComponent && VNode.$$typeof === REACT_ELEMENT_TYPE){
        // 如果是类组件
        return mountClassComponent(VNode)
    }else if(typeof type === 'function' && VNode.$$typeof === REACT_ELEMENT_TYPE){
        // 如果是函数，则代表是组件
       return mountComponent(VNode)
    }else if(type && VNode.$$typeof === REACT_ELEMENT_TYPE){
        dom = document.createElement(type)
    }
    // 处理子元素
    if(props){
        //  如果是对象，则代表只有一个子元素
        if(typeof props.children === 'object' && props.children.type){
            mount(props.children,dom)
        }else if(Array.isArray(props.children)){
            // 如果是数组，则代表有多个子元素
            mountArray(props.children,dom)
        }else{
            // 如果是字符串，则代表是文本节点
            dom.appendChild(document.createTextNode(props.children))
        }
    }
    setProps(dom,props)
    return dom
}

function mountArray(children,parent){
    if(!Array.isArray(children))return
    for(let i = 0;i<children.length;i++){
        if(typeof children[i] === 'string'){
            parent.appendChild(document.createTextNode(children[i]))
        }else{
            mount(children[i],parent)
        }
    }
}

function setProps(dom,props = {}){
    if(!dom) return
    for(let key in props){
        if(key === 'children')continue
        if(/^on[A-Z].*/.test(key)){
            // 事件
            dom[key.toLowerCase()] = props[key]
        }else if(key === 'style'){
            // 样式
            let style = props.style
            for(let styleName in style){
                dom.style[styleName] = style[styleName] 
            }
        }else if(key === 'className'){
            // 类名
            dom.className = props[key]
        }else{
            // 属性
            dom.setAttribute(key,props[key])
        }
    }
}

function mountComponent(VNode){
    const {type,props} = VNode
    const renderVNode = type(props)
    if(!renderVNode)return null
   return createDom(renderVNode)
}

function mountClassComponent(VNode){
    const {type,props} = VNode
    const instance = new type(props)
    const renderVNode = instance.render()
    if(!renderVNode)return null
    return createDom(renderVNode)
}


const ReactDOM = {
    render
}

export default ReactDOM
