import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Designer from "./designer";
import { AppRegistry } from 'react-native-web';
import App from "./app";
import INative from "./app/INative";

AppRegistry.registerComponent('App', () => {
    if (window.location.href.indexOf("/app") > 0) return INative;
    return Designer;
});
AppRegistry.runApplication('App', { rootTag: document.getElementById('app') });

//ReactDOM.render(<Designer />, document.getElementById('app'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
//serviceWorker.unregister();
