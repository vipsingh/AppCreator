import React from 'react';
import _ from "lodash";
import { useNode } from '@craftjs/core';
import { Collapse } from "antd";
import { FormItem, ControlTypes } from "./CompPropSetting";

const StyleSetting: React.FC<any> = ({info}) => {
    const {
        actions: { setProp },
        styleValue,
      } = useNode((node) => ({
        styleValue: node.data.props["style"],
      }));

    const setPropValue = React.useCallback((propKey, value) => {
        setProp((props: any) => {
            if (props.style) {
                props.style[propKey] = value;
            } else {
                props.style = { [propKey]: value };
            }
        });
    }, []);

    if (!info) {
        return <div></div>;
    }

    return (<div>
        <Collapse>
        {
            _.map(Object.keys(info), k => {
                return (<Collapse.Panel header={SettingGroups[k]} key={k}>
                    {
                        _.map(info[k], (fitem) => {
                            const its = StyleSettingType[fitem];

                            return _.map(its, i => {
                                return <FormItem {...i} Value={styleValue && styleValue[i.PropKey]} setValue={setPropValue} styleValue={styleValue} />;
                            })
                        })
                    }
                </Collapse.Panel>)
            })
        }
        </Collapse>
    </div>);
}

export default StyleSetting;

const SettingGroups: IDictionary<any> = {
    dim: "Dimension and Position",
    typ: "Typography",
    bg: "Background"
}

const StyleSettingType: any = {
    width: [
        { Name: "Width", PropKey: "width", ControlType: ControlTypes.Text, Postfix: ["px", "%"], Group: SettingGroups.dim },
        { Name: "MinWidth", PropKey: "minWidth", ControlType: ControlTypes.Text, Postfix: ["px", "%"], Group: SettingGroups.dim }
    ],
    height: [
        { Name: "Height", PropKey: "height", ControlType: ControlTypes.Text, Postfix: ["px", "%"], Group: SettingGroups.dim },
        { Name: "MinHeight", PropKey: "minHeight", ControlType: ControlTypes.Text, Postfix: ["px", "%"], Group: SettingGroups.dim }
    ],
    margin: [
        { Name: "Margin", PropKey: "margin", ControlType: ControlTypes.MarginSelect, Group: SettingGroups.dim },
    ],
    background: [
        { Name: "BackgroundColor", PropKey: "backgroundColor", ControlType: ControlTypes.Color, Group: SettingGroups.bg }
    ],
    font: [
        { Name: "FontSize", PropKey: "fontSize", ControlType: ControlTypes.Slider, Group: SettingGroups.typ }
    ]
};