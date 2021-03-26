import React from "react";
//import { Button } from "react-native-web";
import { Button  } from 'react-native-paper';

export const XButton: React.FC<any> = ({designRef,title, variant, nodeStyle, ...restProps}) => {
    
    return (<Button ref={designRef} mode="contained" style={nodeStyle} color={nodeStyle && nodeStyle.color} {...restProps}>
        {title}
    </Button>)
}
