import React from "react";
import StackScriptExecuter from "../core/StackScript/ScriptParser";

const PageContext = React.createContext({ navigator: {
    navigate: (url: string, replace: boolean = false) => { },
    reload: () => { }, 
    history: null
} });

function createPageContext(pageId: string, history: any) {

    return {
        navigator: {
            windowType: "", // "","POPUP","TAB"
            pageId,
            openerWindowId: 0,
            navigate: (url: string, replace: boolean = false) => {
                if (replace)
                    history.replace(url);
                else
                    history.push(url);
            },
            reload: () => { },
            history
        }
    };
}
const appvar = { user: "bhhot nath", company: "google inc", role: "admin" };

const DataContext = React.createContext<any>(null);

function createDataContext(pageVar: IDictionary<any> = {}) {
    const params = { AppVar: appvar, Page: pageVar }
    const p = new StackScriptExecuter(null, params);

    return {
        executeExpression: (exp: string) => {
            return p.ExecuteExpression(exp);
        }
    };
}

export { createPageContext, DataContext, createDataContext };

export default PageContext;

type DataContextType = {
    executeExpression: Function
}