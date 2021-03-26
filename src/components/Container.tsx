import React from "react";
//import { Row } from "antd";
import { View } from 'react-native-web';

export const XContainer: React.FC<any> = ({designRef, children, nodeStyle, ...restProps}) => {
    let sty = {width: "100%", margin: "5px 0" };
    if (nodeStyle) Object.assign(sty, nodeStyle);
    
    return (
      <div ref={designRef} style={sty} {...restProps}>
        {children}
      </div>
    )
  }

export const XRow: React.FC<any> = ({designRef, children, style, ...restProps}) => {

    return (<View ref={designRef} style={styles.row}>
      {children}
    </View>)
  }

  export const XCell: React.FC<any> = ({designRef, span, children, style, ...restProps}) => {

    return (<View ref={designRef} style={{...style, width: getCellWidthPercent(span) }} {...restProps}>
      {children}
    </View>
    )
  }

  function getCellWidthPercent(span: number) {
    const t = (100 / (24/span));

    return `${t.toFixed(5)}%`;
  }
  
const styles = {
  row: {flex: 1, flexDirection: 'row'},
  cell: {}
}