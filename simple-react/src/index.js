import React from './react';
import ReactDOM from 'react-dom/client';

const root = ReactDOM.createRoot(document.getElementById('root'));


const element = /*#__PURE__*/React.createElement("div", {
    class: "xixi",
    ref: "123",
    key: "456"
  }, /*#__PURE__*/React.createElement("div", null, "Hello"), "World");
console.log(element)
root.render(element);
