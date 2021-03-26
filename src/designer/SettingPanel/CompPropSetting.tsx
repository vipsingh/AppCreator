import React from 'react';
import _ from "lodash";
import { useNode } from '@craftjs/core';
import { Row, Col, Typography, Collapse, Input, Slider, Checkbox, Select, InputNumber, Tabs } from "antd";
import ColorPicker from "./ColorPicker";
import MarginSelect from "./MarginSelect";

const PropSetting: React.FC<any> = ({info}) => {
    const {
        actions: { setProp },
        propValue,
      } = useNode((node) => ({
        propValue: node.data.props["prop"],
      }));

    const setPropValue = React.useCallback((propKey, value) => {
        setProp((props: any) => {
            if (props.prop) {
                props.prop[propKey] = value;
            } else {
                props.prop = { [propKey]: value };
            }
        });
    }, []);

    if (!info) {
        return <div></div>;
    }

    return (<div>
        <Collapse activeKey="general">
        {
            _.map(Object.keys(info), k => {
                return (<Collapse.Panel header={SettingGroups[k]} key={k}>
                    {
                        _.map(info[k], (fitem) => {
                            return <FormItem {...fitem} Value={propValue && propValue[fitem.PropKey]} setValue={setPropValue} styleValue={propValue} />;
                        })
                    }
                </Collapse.Panel>)
            })
        }
        </Collapse>
    </div>);
}


export const FormItem: React.FC<any> = ({Name, ControlType, PropKey, Value, setValue, ...restProps}) => {
    //const value = propValue; //Array.isArray(propValue) ? propValue[index] : propValue;
    
    return (<Row>
        <Col span="10">{Name}</Col>
        <Col span="14">
            {
                ControlType === ControlTypes.Text ? 
                (<Input 
                    value={Value} 
                    onChange={(ev) => {
                        setValue(PropKey, ev.target.value);
                    }} 
                />)
                : ControlType === ControlTypes.Slider ? 
                (<Slider value={Value} onChange={(v: any) => setValue(PropKey, v)} max={100} />)
                : ControlType === ControlTypes.Color ? 
                (<ColorPicker value={Value} onChange={(v: any) => setValue(PropKey, v)} max={100} />)
                : ControlType === ControlTypes.Check ? 
                (<Checkbox value={Value} onChange={(v: any) => setValue(PropKey, v)} />)
                : ControlType === ControlTypes.Selection ? 
                (<Select value={Value} onChange={(v: any) => setValue(PropKey, v)}>
                    {_.map(restProps.Options, (o: any) => {
                        return  <Select.Option value={o}>{o}</Select.Option>;
                    })}
                </Select>)
                 : ControlType === ControlTypes.Number ? 
                 (<InputNumber value={Value} onChange={(v: any) => setValue(PropKey, v)} />)
                 : ControlType === ControlTypes.MarginSelect ? 
                 (<MarginSelect PropKey={PropKey} styleValue={restProps.styleValue || {}} onChange={(v: any, key: string) => setValue(`${PropKey}${key}`, v)} />)
                :null
            }
        </Col>
    </Row>);
};

export default PropSetting;

export const ControlTypes = {
    Text: "text",
    Slider: "slider",
    Color: "color",
    Check: "check",
    Number: "number",
    Selection: "selection",
    MarginSelect: "margin"
};

const SettingGroups: IDictionary<any> = {
    general: "General",
    others: "Others"
}

const CompSettingType: any = [
    { Name: "Width", PropKey: "width", ControlType: ControlTypes.Text, Group: SettingGroups.general },
];