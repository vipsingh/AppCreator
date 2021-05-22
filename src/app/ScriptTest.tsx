import React from "react";
import PageContext, { createPageContext } from "./AppContext";
import StackScriptExecuter from "../core/StackScript/ScriptParser";
//import { tex } from "antd";

const appvar = { user: "bhhot nath", company: "google inc", role: "admin" };

const ScriptApp: React.FC<any> = () => {
    const x: any ={};
    const [scriptText, setScript] = React.useState("");
    const [scriptRes, setResult] = React.useState("");
    const [state, setState] = React.useState<IDictionary<any>>({});

    const getStateData = React.useCallback((propName: string) => {
        return state[propName];
    }, [state]);

    const execScript = React.useCallback(() => {
        const scriptContext = { stateProp: "Page", getStateData };
      const p = new StackScriptExecuter(scriptContext, { AppVar: appvar });
      const v = p.ExecuteExpression(scriptText);
      setResult(v);
    }, [scriptText]);

    return (<div>
        <textarea value={scriptText} onChange={(e) => setScript(e.target.value)} style={{ width: "100%", height: "300px" }}></textarea>
        <button onClick={execScript}>Execute</button>
        <br/>
        <br/>
        <span>{scriptRes}</span>
    </div>)
};

export default ScriptApp;