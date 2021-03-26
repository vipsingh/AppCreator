import React from "react";
import { TextInput, View } from "react-native-web";

export const XTextBox: React.FC<any> = ({ designRef, value, nodeStyle, dataContext, ...rest }) => {

  return (<View ref={designRef}>
         
         <TextInput
            style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
            onChangeText={(t: any) => dataContext.setValue(rest["value__bind"], t)}
            value={value}
        />
    </View>)
}