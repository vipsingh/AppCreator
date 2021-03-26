import React from 'react';
import { useNode, UserComponent } from '@craftjs/core';
import XCard from "../../components/Card";
import { DesignCompWrap } from "./Base";

export const Card: DesignComponent<any> = ({ style, prop, ...restProps }) => {
    return (<DesignCompWrap style={style} {...restProps} ><XCard nodeStyle={style} {...restProps} {...prop} /></DesignCompWrap>);
  };
  Card.craft = {
    props: {controlType: "card", variant: "default" },
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