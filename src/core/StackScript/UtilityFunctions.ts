import ScriptException from "./ScriptException";

export const UtilityFunctions: IDictionary<(args: Array<any>, binder?: any) => any> = {    
    "parseint": (args: Array<any>, binder: any = null) => {        
        if (args.length == 0 )
            throw new ScriptException("Invalid arguments in ParseInt");

        var val = args[0];

        return parseInt(val);
    },
    "isempty": (args: Array<any>, binder: any = null) => {        
        if (args.length == 0 )
            throw new ScriptException("Invalid arguments in isempty");

        var val = args[0];

        return !val;
    },
    "isnull": (args: Array<any>, binder: any = null) => {        
        if (args.length == 0 )
            throw new ScriptException("Invalid arguments in isempty");

        var val = args[0];

        return val === null;
    }
} 