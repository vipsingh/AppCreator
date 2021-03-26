import React from "react";
import _ from "lodash";
import Layout from "./Layout";
import StackScriptExecuter from "../core/StackScript/ScriptParser";
import { DataContext, createDataContext } from "./AppContext";
const appvar = { user: "bhhot nath", company: "google inc", role: "admin" };

class Page extends React.Component<any, any> {
    scriptExec: StackScriptExecuter
    constructor(props: any) {
        super(props);
        this.state = {
            pageVar: _.cloneDeep(_page.Variables)
        }
        const scriptContext = { stateProp: "Page", getStateData: this.getStateData }
        this.scriptExec =new StackScriptExecuter(scriptContext, { AppVar: appvar });
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
            <Layout Layout={_page.Layout} />
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
},"Layout": {"ROOT":{"type":{"resolvedName":"Page"},"isCanvas":true,"props":{"padding":5,"width":"600px","height":"700px","background":"#fff"},"displayName":"Page","custom":{},"hidden":false,"nodes":["e9QV3cJoI","9U_varUs8","guZTMHhQ0","BL5NQ6hoy"],"linkedNodes":{}},"BL5NQ6hoy":{"type":{"resolvedName":"Card"},"isCanvas":false,"props":{"controlType":"card","variant":"default","style":{"width":"50%"}},"displayName":"Card","custom":{},"hidden":false,"nodes":[],"linkedNodes":{},"parent":"ROOT"},"9U_varUs8":{"type":{"resolvedName":"Button"},"isCanvas":false,"props":{"controlType":"button","variant":"default","title":"Click me","style":{"backgroundColor":"#9a4040","width":"300px","fontSize":0,"height":""}},"displayName":"Button","custom":{},"hidden":false,"nodes":[],"linkedNodes":{},"parent":"ROOT"},"e9QV3cJoI":{"type":{"resolvedName":"Row"},"isCanvas":false,"props":{"controlType":"row"},"displayName":"Row","custom":{},"hidden":false,"nodes":["031BHZEO18","Fgud94qLKp"],"linkedNodes":{},"parent":"ROOT"},"031BHZEO18":{"type":{"resolvedName":"Column"},"isCanvas":true,"props":{"controlType":"cell","span":12},"displayName":"Column","custom":{},"hidden":false,"nodes":[],"linkedNodes":{},"parent":"e9QV3cJoI"},"Fgud94qLKp":{"type":{"resolvedName":"Column"},"isCanvas":true,"props":{"controlType":"cell","span":12},"displayName":"Column","custom":{},"hidden":false,"nodes":["Hn8TMkbZc"],"linkedNodes":{},"parent":"e9QV3cJoI"},"6w3ei65qd":{"type":{"resolvedName":"Card"},"isCanvas":false,"props":{"controlType":"card","variant":"default"},"displayName":"Card","custom":{},"hidden":false,"nodes":[],"linkedNodes":{},"parent":"8jADKak_r7"},"Hn8TMkbZc":{"type":{"resolvedName":"Card"},"isCanvas":false,"props":{"controlType":"card","variant":"default"},"displayName":"Card","custom":{},"hidden":false,"nodes":[],"linkedNodes":{},"parent":"Fgud94qLKp"},"guZTMHhQ0":{"type":{"resolvedName":"Row"},"isCanvas":false,"props":{"controlType":"row"},"displayName":"Row","custom":{},"hidden":false,"nodes":["N431eaUIlu","8jADKak_r7","CU4Jcvvw7n"],"linkedNodes":{},"parent":"ROOT"},"N431eaUIlu":{"type":{"resolvedName":"Column"},"isCanvas":true,"props":{"controlType":"cell","span":8},"displayName":"Column","custom":{},"hidden":false,"nodes":[],"linkedNodes":{},"parent":"guZTMHhQ0"},"8jADKak_r7":{"type":{"resolvedName":"Column"},"isCanvas":true,"props":{"controlType":"cell","span":8},"displayName":"Column","custom":{},"hidden":false,"nodes":["6w3ei65qd"],"linkedNodes":{},"parent":"guZTMHhQ0"},"CU4Jcvvw7n":{"type":{"resolvedName":"Column"},"isCanvas":true,"props":{"controlType":"cell","span":8},"displayName":"Column","custom":{},"hidden":false,"nodes":[],"linkedNodes":{},"parent":"guZTMHhQ0"}}};

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

