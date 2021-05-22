import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Designer from "./designer";
import { AppRegistry } from 'react-native-web';
import App from "./app";
import ScriptApp from "./app/ScriptTest";
import INative from "./app/INative";
import Notify from "./core/Utils/Notify";
import Request from "./core/Utils/Request";
import _ from 'lodash';

window._App = {
    Notify,
    Request,
    FormatString: (str: string, data: any): string => {
      var compiled = _.template(str);
      return compiled(data);
    }
  };
  window._AppSetting = {
    UserId: 1,
    RoleId: 1,
    Language: "en-us",
    DateFormat: "DD-MM-YYYY",
    BaseUrl: "/",
    ApiUrl: "@ViewBag.Host",
    AssetUrl: "@ViewBag.Host",
    BaseCurrency: 1,
    BaseCurrencySymbol: "$",
    DecimalPlaces: 2
  };
AppRegistry.registerComponent('App', () => {
    if (window.location.href.indexOf("/app") > 0) return INative;
    if (window.location.href.indexOf("/script") > 0) return ScriptApp;
    return Designer;
});
AppRegistry.runApplication('App', { rootTag: document.getElementById('app') });

//ReactDOM.render(<Designer />, document.getElementById('app'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
//serviceWorker.unregister();
