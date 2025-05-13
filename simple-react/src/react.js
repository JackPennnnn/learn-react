import REACT_ELEMENT_TYPE from './shared/ReactElement'
// const element = /*#__PURE__*/React.createElement("div", {
//     class: "xixi",
//     ref: "123",
//     key: "456"
//   }, "Hello");

// {
//     $$typeof: any,
//     type: any,
//     key: any,
//     ref: any,
//     props: any,

//   }

function createElement(type,config = {},children){
    const props = {...config}
    // props里面的key和ref 要提取出来
    const ref = props.ref || null // 跟操作dom有关
    const key = props.key || null // 用于diff

    // 如果参数大于3个，代表存在子元素, 需要转换成数组
    if(arguments.length > 3){
        props.children = Array.prototype.slice.call(arguments,2)
    }else{
        // 变成一个对象
        props.children = children
    }
    return {
        $$typeof:REACT_ELEMENT_TYPE,
        type,
        ref,
        key,
        props,
    }
}

const React = {
    createElement
}

export default React
