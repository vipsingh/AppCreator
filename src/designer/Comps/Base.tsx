import React from 'react';
import { useNode, UserComponent } from '@craftjs/core';
import { XButton } from "../../components/Button";
import { XText } from "../../components/Text";
import { XTextBox } from "../../components/TextBox";
import { Button as AButton } from "antd";

export const DesignCompWrap: React.FC<any> = ({ style, children, ...restProps }) => {
  const {
    connectors: { connect, drag },
  } = useNode();

  const inputRef = React.createRef<HTMLDivElement>();

  React.useEffect(() => {
    const cref: any = inputRef.current;
    const cn = cref.children[0];
    cref.className = cn.className;
    cref.style = null;
    cref.attributes["style"].value = cn.attributes["style"].value;
    //remove border,background,padding,margin
    connect(inputRef.current);
  });

  return (<div ref={inputRef}>{children}</div>);
}

export const Button: DesignComponent<any> = ({ style, prop, ...restProps }) => {
    return (<DesignCompWrap style={style} ><XButton nodeStyle={style} {...restProps} {...prop} /></DesignCompWrap>);
  };
  Button.craft = {
    props: {controlType: "button", variant: "default" },
    settingInfo: {
      props: {
        general: [
          { Name: "Title", PropKey: "title", ControlType: "text" }
        ]
      },
      style: {
      "dim": ["width", "height", "margin"],
      "bg": ["background"],
      "typ": ["font"]
      }
    }
  };
 
  export const Text: DesignComponent<any> = (props) => {
    const { connectors: {connect, drag} } = useNode();

  return (
      <XText designRef={connect} nodeStyle={props.style} {...props} />
  );
  };

  Text.craft = {
    props: { controlType: "text" },
    settingInfo: {
      style: {
        "dim": ["width"],
        "typ": []
      }
    }
  };

  export const TextBox: DesignComponent<any> = (props) => {
    const { connectors: {connect, drag} } = useNode();

  return (
      <XTextBox designRef={connect} {...props} />
  );
  };

  TextBox.craft = {
    props: { controlType: "textbox" },
    settingInfo: {
      style: {
      "dim": ["width"],
      "typ": []
      }
    }
  };
