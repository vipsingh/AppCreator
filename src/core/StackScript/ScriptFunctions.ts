import ScriptException from "./ScriptException";
export { UtilityFunctions } from "./UtilityFunctions";

export const ScriptFunctions: IDictionary<(args: Array<any>, binder?: any) => any> = {    
    "log": (args: Array<any>, binder: any = null) => {        
        console.log(args[0]);
        return null;
    },
    "iftrue": (args: Array<any>, binder: any = null) => {        
        if (args.length <= 1 )
        throw new ScriptException("Invalid arguments in IfTrue");

        var arg1 = args[0];
        if (!(typeof arg1 === "boolean"))
            throw new ScriptException("Invalid condition in IfTrue");

        if (arg1 == true) {
            return args[1];
        } else {
            return args.length > 2 ? args[2] : null;
        }
    },
    "ifnull": (args: Array<any>, binder: any = null) => {        
        if (args.length <= 1 )
        throw new ScriptException("Invalid arguments in IfNull");

        var arg1 = args[0];
        if (arg1 == null) {
            return args[1];
        } else {
            return args.length > 2 ? args[2] : null;
        }
    },
} 


export const ExpressionFunctions: IDictionary<(args: Array<any>, binder?: any) => any> = {
    "+": (args: Array<any>, binder: any = null) => {
        let r = args[0];
        for(let i=1; i< args.length; i++)
            r += args[i];

        return r;
    },
    "-": (args: Array<any>, binder: any = null) => {
        let r = args[0];
        for(let i=1; i< args.length; i++)
            r -= args[i];
            
        return r;
    },
    "*": (args: Array<any>, binder: any = null) => {
        let r = args[0];
        for(let i=1; i< args.length; i++)
            r = r * args[i];
            
        return r;
    },    
    "/": (args: Array<any>, binder: any = null) => {
        let r = args[0];
        for(let i=1; i< args.length; i++)
            r = r / args[i];
            
        return r;
    },
    "==": (args: Array<any>, binder: any = null) => {                     
        return args[0] === args[1];
    },
    "!=": (args: Array<any>, binder: any = null) => {                     
        return args[0] !== args[1];
    },
    ">": (args: Array<any>, binder: any = null) => {
        return args[0] > args[1];
    }
}

