import React from "react";
import _ from "lodash";
import Layout from "./Layout";
import StackScriptExecuter from "../core/StackScript/ScriptParser";
import { DataContext, createDataContext } from "./AppContext";
const appvar = { user: "bhhot nath", company: "google inc", role: "admin" };

class Page extends React.Component<any, any> {
    scriptExec: StackScriptExecuter
    _layoutInfo: any
    constructor(props: any) {
        super(props);
        this.state = {
            pageVar: _.cloneDeep(_page.Variables)
        }
        const scriptContext = { stateProp: "Page", getStateData: this.getStateData }
        this.scriptExec =new StackScriptExecuter(scriptContext, { AppVar: appvar });
        const layoutInfo = sessionStorage.getItem("pageinfo");
        if (layoutInfo) {
          const pageInfo = _page;
          pageInfo.Layout = JSON.parse(layoutInfo);
          this._layoutInfo = pageInfo;
        }
    }

    getStateData = (propName: string) => {
        return this.state.pageVar[propName];
    }

    setValue = (key: string, value: any): any => {
        let k = key;
        if (key.indexOf(".") > 0) {
            k = key.split('.')[1];
        }
        this.setState({ pageVar:  _.assign({}, this.state.pageVar, { [k]: value }) });
    }

    refineProps = (cProps: any) => {
        
        _.forIn(cProps, (v, k) => {
            if (typeof v === "string" && k.indexOf("__bind") > 0) {
                let ke = k.replace("__bind", "");                                
                cProps[ke] = this.scriptExec.ExecuteExpression(v);                
            }
        });

        return cProps;
    }

    render() {
        return (<DataContext.Provider value={{ setValue: this.setValue, refineProps: this.refineProps }}>
            {this._layoutInfo.Layout && <Layout Layout={this._layoutInfo.Layout} />}
        </DataContext.Provider>);
    }
}

export default Page;

const _page = {"Variables": {
  "title": "Page 1"
},
"DataBinding": {
  "api": "",
  "object": "contact",
  "recordId": 1
}, Layout: null};

const _page1 = {
    "Variables": {
      "title": "Page 1"
    },
    "DataBinding": {
      "api": "",
      "object": "contact",
      "recordId": 1
    },
    "Layout": {
    "ROOT": {
      "type": {
        "resolvedName": "XPage"
      },
      "isCanvas": true,
      "props": {},
      "displayName": "pe",
      "custom": {},
      "hidden": false,
      "nodes": [
        "53KhXev9q",
        "YdxdiLbDt",
        "FqYlGFo5_",
        "FqYlGFo9_"
      ],
      "linkedNodes": {}
    },
    "YdxdiLbDt": {
      "type": {
        "resolvedName": "XContainer"
      },
      "isCanvas": true,
      "props": {
        "controlType": "container",
        "nodeStyle": {
          "height": "300px",
          "border": "2px solid"
        }
      },
      "displayName": "Container",
      "custom": {},
      "hidden": false,
      "nodes": [],
      "linkedNodes": {},
      "parent": "ROOT"
    },
    "53KhXev9q": {
      "type": {
        "resolvedName": "XRow"
      },
      "isCanvas": false,
      "props": {
        "controlType": "row"
      },
      "displayName": "Row",
      "custom": {},
      "hidden": false,
      "nodes": [
        "ql3yWbYBDo",
        "-uv7m1cg0w"
      ],
      "linkedNodes": {},
      "parent": "ROOT"
    },
    "ql3yWbYBDo": {
      "type": {
        "resolvedName": "XCell"
      },
      "isCanvas": true,
      "props": {
        "controlType": "cell",
        "span": 12
      },
      "displayName": "Cell",
      "custom": {},
      "hidden": false,
      "nodes": [
        "-lkbmTZ3J"
      ],
      "linkedNodes": {},
      "parent": "53KhXev9q"
    },
    "-uv7m1cg0w": {
      "type": {
        "resolvedName": "XCell"
      },
      "isCanvas": true,
      "props": {
        "controlType": "cell",
        "span": 12
      },
      "displayName": "Cell",
      "custom": {},
      "hidden": false,
      "nodes": [
        "6jdrvzEbT"
      ],
      "linkedNodes": {},
      "parent": "53KhXev9q"
    },
    "-lkbmTZ3J": {
      "type": {
        "resolvedName": "XButton"
      },
      "isCanvas": false,
      "props": {
        "controlType": "button",
        "variant": "default",
        "title": "Button"
      },
      "displayName": "XButton",
      "custom": {},
      "hidden": false,
      "nodes": [],
      "linkedNodes": {},
      "parent": "ql3yWbYBDo"
    },
    "6jdrvzEbT": {
      "type": {
        "resolvedName": "XButton"
      },
      "isCanvas": false,
      "props": {
        "controlType": "button",
        "variant": "default",
        "title": "Button",
        "isHidden": false,
        "isHidden__bind": "_.isempty(Page.title)"
      },
      "displayName": "XButton",
      "custom": {},
      "hidden": false,
      "nodes": [],
      "linkedNodes": {},
      "parent": "-uv7m1cg0w"
    },
    "FqYlGFo5_": {
      "type": {
        "resolvedName": "XText"
      },
      "isCanvas": false,
      "props": {
        "controlType": "text",
        "text": "",
        "text__bind": "Page.title",
        "nodeStyle": {
          "fontSize": "20px",
          "color": "green"
        }
      },
      "displayName": "XText",
      "custom": {},
      "hidden": false,
      "nodes": [],
      "linkedNodes": {},
      "parent": "ROOT"
    },
    "FqYlGFo9_": {
        "type": {
          "resolvedName": "XTextBox"
        },
        "isCanvas": false,
        "props": {
          "controlType": "textbox",
          "value": "",
          "value__bind": "Page.title",
        },
        "displayName": "XTextBox",
        "custom": {},
        "hidden": false,
        "nodes": [],
        "linkedNodes": {},
        "parent": "ROOT"
      }
  }
  };

