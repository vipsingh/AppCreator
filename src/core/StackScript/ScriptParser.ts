import _ from "lodash";
//import esprima from "esprima";
import ScriptException from "./ScriptException";
import ObjectDataProvider from "./ObjectDataProvider";
import { ScriptFunctions, ExpressionFunctions } from "./ScriptFunctions";

const s = {"type":"Program","body":[{"type":"VariableDeclaration","declarations":[{"type":"VariableDeclarator","id":{"type":"Identifier","name":"x"},"init":{"type":"Literal","value":"xyz","raw":"\"xyz\""}}],"kind":"var"},{"type":"IfStatement","test":{"type":"BinaryExpression","operator":"!=","left":{"type":"Identifier","name":"x"},"right":{"type":"Literal","value":"zz","raw":"\"zz\""}},"consequent":{"type":"BlockStatement","body":[{"type":"ExpressionStatement","expression":{"type":"CallExpression","callee":{"type":"Identifier","name":"alert"},"arguments":[{"type":"Literal","value":"x","raw":"\"x\""}]}}]},"alternate":null}],"sourceType":"script"};


export function parse() {
    //console.log(new Date());
    const p = new StackScriptExecuter(null);
    p.executeBody(s.body);
    
    //console.log(new Date());

    //console.log(vars);
}

export default class StackScriptExecuter {
    currentScriptTag: string
    _DataProvider: ObjectDataProvider
    constructor(scriptContext: any, params?: IDictionary<any>) {
        this.currentScriptTag = "";
        this._DataProvider = new ObjectDataProvider(scriptContext, params);
    }

    public ExecuteScript(codeStr: string): AnyStatus
    {
        const status: AnyStatus = { id: "success", message: "" };
        try {
            const program = esprima.parseScript(codeStr);
            this.executeBody(program.body);
        } catch (ex) {
            status.id = "fail";
            status.message = this.currentScriptTag + "::" + ex.message;
        }

        return status;
    }

    public ExecuteExpression(code: string, params?: IDictionary<any>): any {
        try {
            const program = esprima.parseScript(code);
            if (program.body && program.body[0].expression) {
                // if (params) {
                //     this._DataProvider.SetVarData
                // }
                return this.getVarFromExp(program.body[0].expression);
            }
        } catch (ex) {
            throw new ScriptException("Invalid script: " + this.currentScriptTag);
        }                
        
        return null;
    }

    executeBody(bodyColl: Array<any>) {
        _.each(bodyColl, (body) => {
            switch(body.type) {
                case "VariableDeclaration":
                    this.VariableDeclaration(body.declarations);
                    break;
                case "ExpressionStatement":
                    this.ExpressionStatement(body.expression);
                    break;
                case "IfStatement":
                    this.IfStatement(body);
                    break;
            }
        })
    }

    VariableDeclaration(declartions: Array<any>) {
        const dec = declartions[0];
        const varNme= dec.id.name;
        let varVal = this.getVarFromExp(dec.init);    
    
        this.setVar(varNme, varVal);
    }
    
    setVar(name: string, value: any) {
        this._DataProvider.SetVarData(name, value);
    }
    
    getVar(name: string) {
        return this._DataProvider.GetVarData(name);
    }
    
    getVarFromExp(exp: any): any {
        if (exp.type === "Literal") {
            return this.LteralExp(exp);
        } else if (exp.type === "Identifier") {
            return this.getVar(exp.name);
        } else if (exp.type === "BinaryExpression") {
            return this.BinaryExpression(exp);
        } else if (exp.type === "CallExpression") {
            return this.CallExpression(exp as ICallExp);
        } else if (exp.type == "MemberExpression") {
            return this.MemberExpression(exp as IMemberExpression);
        } else {
             throw new ScriptException("Expression not allowed: " + exp.type.ToString());
        }
    }
    
    ExpressionStatement(exp: IExp) {
        if (exp.type === "AssignmentExpression") {
            this.AssignmentExpression(exp as ISimpleExp);
        } else if (exp.type === "CallExpression") {
            this.CallExpression(exp as ICallExp);
        }
    }
    
    LteralExp(exp: IValueExp) {
        return exp.value;
    }
    
    BinaryExpression(expression: ISimpleExp) {
        const lVal = this.getVarFromExp(expression.left);
        const rVal = this.getVarFromExp(expression.right);
    
        return  ExpressionFunctions[expression.operator]([lVal, rVal]);
    }
    
    AssignmentExpression(expression: ISimpleExp) {        
        const rVal = this.getVarFromExp(expression.right);
        const lExp = expression.left as any;
        if (lExp.object) {
            //SetMemberExpression(expression.Left as MemberExpression, rVal);
        } else {
            const lVal = expression.left.name;
            this.setVar(lVal, rVal);
        }
    }
    
    CallExpression(expression: ICallExp) {
        const args = _.map(expression.arguments, a => {
            return this.getVarFromExp(a);
        });

        if (expression.callee.type === "MemberExpression") {
            return this.MemberExpression(expression.callee as any, args);
        }
        const fun = expression.callee.name;
        if (ScriptFunctions[fun]) {           
    
            return ScriptFunctions[fun].call(null, args);
    
        } else {
            throw new Error(`Function with name ${fun} is not defined`);
        }
    }
    
    IfStatement(expression: IIfExp) {
        const test = this.BinaryExpression(expression.test);
        
        if (test) {
            this.executeBody(expression.consequent.body);
        }
    }
    
    MemberExpression(expression: IMemberExpression, args: Array<any>|undefined = undefined) {
                const objName = expression.object.name;
                const propName = expression.property.name;
                
                //currentScriptTag = `object member ${objName}.${propName}`;
    
                //if (expression.property is IValueExp)
                {
                    if (args === undefined) 
                    {
                        return this._DataProvider.GetObjectPropData(objName, propName);
                    }
                    else
                    {                    
                        return this._DataProvider.GetObjectFunctionData(objName, propName, args);
                    }
                }
    
                return null;
            }
}

////////////////////////////////
type AnyStatus = {
  id: string,
  message: string
}

interface IValueExp{
    type: string,
    value: any,
    name: string
}
interface IExp{
    type: string
}
interface ISimpleExp extends IExp {    
    operator: string,
    left: IValueExp,
    right: IValueExp
}

interface ICallExp extends IExp {
    callee: IValueExp,
    arguments: Array<IValueExp>
}

interface IBodyExp extends IExp {    
    body: Array<IExp>
}

interface IIfExp extends IExp {
    test: ISimpleExp,
    consequent: IBodyExp
}

interface IMemberExpression extends IExp {
    object: IValueExp,
    property: IValueExp
}
