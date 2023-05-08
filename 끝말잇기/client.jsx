const React = require('react');
const ReactDOM = require('react-dom/client');

const WordRelay = require('./WordRelay');

//ReactDOM.render(<WordRelay />, document.querySelector('#root'));
ReactDOM.createRoot(document.querySelector('#root')).render(<WordRelay />);