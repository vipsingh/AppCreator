import React from 'react';
import { useNode, UserComponent } from '@craftjs/core';
import { XContainer as CContainer, XRow as CRow, XCell as CCell } from "../../components/Container";

export const Row: UserComponent<any> = ({ children }) => {
  const { connectors: {connect} } = useNode();

  return (
    <CRow designRef={connect}>
        {children}
    </CRow>
  )
}

Row.craft = {
  displayName: 'Row',
  props: { controlType: "row" }
}

export const Cell: UserComponent<any> = ({ style, span, children }: any) => {
  const { connectors: {connect} } = useNode();

  return (
    <CCell designRef={connect} style={children ? style: {...style, ...styles.componentEmpty}} span={span} >
      {children}
    </CCell>
    );
  };

  Cell.craft = {
    displayName: 'Cell',
    props: { controlType: "cell" }
  } 

export const Container: any = ({ style, children }: any) => {
    const {
      connectors: { connect },
    } = useNode();

    return (
      <CContainer designRef={connect} style={children ? style: {...style, ...styles.componentEmpty}}>
        {children}
      </CContainer>
    )
};

Container.craft = {
  displayName: 'Container',
  props: { controlType: "container" }
}

const styles = {
  componentEmpty : {
    outline: "1px dashed #d9e8ec",
    outlineOffset: "-3px",
    minHeight: "32px"
  }
}