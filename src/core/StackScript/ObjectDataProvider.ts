import _ from "lodash";
import ScriptException from "./ScriptException";
import { UtilityFunctions } from "./UtilityFunctions";

export default class ObjectDataProvider {
    _scriptContext: any
    _vars: IDictionary<any>
    _output: any
    _stateProp: string
    constructor(scriptContext: any, params?: IDictionary<any>) {
        this._scriptContext = scriptContext;
        this._vars = {};
        this._output = null;

        if (params) {
            _.forIn(params, (v, k) => {
                this._vars[k] = v;
            });
        }
        this._stateProp = "";
        if (scriptContext) {
            this._stateProp = scriptContext.stateProp;
        }
    }

    GetVarData(propName: string) {
        if (propName.toLowerCase() == "output") return this._output;
        //if (propName.ToLower() == "$context") return _appContext;

        return this._vars[propName]
    }

    SetVarData(propName: string, value: any) {
        this._vars[propName] = value;   
    }

    GetObjectPropData(objectName: string, propName: string) {
        let val = null;

        switch(objectName) {                
            case "$app":
                //val = GetAppVariable(propName);
                break;
            case "$context"://used on server
                //val = GetContextVariable(propName);
                break;
            default:
                return this.ProcessObjectProp(objectName, propName);
                break;
        }

        return val;
    }

    ProcessObjectProp(objectName: string, propName: string) {
        if (objectName === this._stateProp) {
            return this._scriptContext.getStateData(propName);
        }

        var model = this.GetVarData(objectName);
        if (model != null) {
            if (model[propName]) {                    
                return model[propName];
            } else {
                throw new ScriptException(`Object at ${objectName}.${propName} is not valid.`);
            }
        }

        return null;
    }

    GetObjectFunctionData(objectName: string, propName: string, args: Array<any>) {
        let val = null;
        switch(objectName) {
            case "_":
                val = this.GetUtilityResult(propName, args);
                break;
            default:
                return null; //ProcessFunction(objectName, propName, args);
                break;
        }

        return val;
    }

    GetUtilityResult(propName: string, args: Array<any>) {
            if (UtilityFunctions[propName])
                return UtilityFunctions[propName](args);
            
             throw new ScriptException("Invalid function _." + propName);
        }
}