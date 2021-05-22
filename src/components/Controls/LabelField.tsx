import React from "react";
import { Typography } from 'antd';
import { formatValue } from "../../core/Utils/DataFormatter";
//import ActionLink from "../../ActionLink";

const { Text } = Typography;

export default class LabelField extends React.Component<WidgetInfoProps> {

    getFormattedValue() {
        const { WidgetType, AdditionalValue, FormatedValue, Value } = this.props;
        
        let d = FormatedValue, isRightAlign = false;
        if (FormatedValue === undefined && Value) {
            d = formatValue(this.props as WidgetInfo, { Value });
        }

        if (typeof d === "object"){
            d = d.Text;
        }

        // if (AdditionalValue && AdditionalValue.ViewLink) {
        //     const { ViewLink } = AdditionalValue;
            
        //     return (<ActionLink ActionId={"VIEW"} {...ViewLink} Title={d} />);
        // }

        return <Text style={{ textAlign: isRightAlign ? "right" : "left" }}>{d}</Text>;
    }

    render() {

        return this.getFormattedValue();
    }
}