import React from "react";
import HField from "./Controls/HiddenField";
import LabelField from "./Controls/LabelField";
import  { FormControlType } from "../Constant";
import { TextBox } from "./Controls/Input";

export function getComponent(controlType: number, isViewMode?: boolean) {
    let editComponent = null;
    let viewComponent: any = LabelField;
    switch(controlType) {
        case FormControlType.TextBox:
            editComponent = TextBox;
            break;
        default:
                // const w = widgets[controlType];
                // if (w) {
                //     editComponent = w.edit;
                //     viewComponent = w.view;
                //}
                break;
        }
        
        if(isViewMode) {
            return viewComponent;
        }
        return editComponent;
}

export const HiddenField = HField;

export const BlockElement = (props: any) => { return React.createElement("div", props) }