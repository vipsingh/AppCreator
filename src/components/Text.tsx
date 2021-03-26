import React from "react";
import { Text, View } from "react-native-web";

export const XText: React.FC<any> = ({ designRef, text, nodeStyle, dataContext }) => {

  return (<View ref={designRef}>
         
    <Text style={nodeStyle}>{text}</Text>
    </View>)
}