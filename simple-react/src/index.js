import React from './react';
import ReactDOM from './react-dom';


function MyFunctionComponent(){
    return <div className="xixi" ref="123" key="456" style={{color:'red',fontSize:'20px'}}>Hello World<div>123</div></div>
}
class MyClassComponent extends React.Component {
    constructor(props) {
        super(props);
    }

    render(){
        return <div>456</div>
    }
}

ReactDOM.render(<MyClassComponent />,document.getElementById('root'))
