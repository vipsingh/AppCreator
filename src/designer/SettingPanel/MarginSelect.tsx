import React from 'react';
import { Col, InputNumber, Row, Slider, Space } from "antd";

const MarginSelect: React.FC<any> = ({ onChange, styleValue, PropKey }) => {

    return (<div>
            <div>
                <Space>
                    <Row><Col span="6">L</Col><Col span="18"><InputNumber value={styleValue[`${PropKey}Left`]} onChange={(v) => onChange(v, "Left")} style={{ minWidth: "50px", width: "50px" }}/></Col></Row>
                    <Row><Col span="6">R</Col><Col span="18"><InputNumber value={styleValue[`${PropKey}Right`]} onChange={(v) => onChange(v, "Right")} style={{ minWidth: "50px", width: "50px" }}/></Col></Row>
                </Space>
            </div>
            <div>
            <Space>
                    <Row><Col span="6">T</Col><Col span="18"><InputNumber value={styleValue[`${PropKey}Top`]} onChange={(v) => onChange(v, "Top")} style={{ minWidth: "50px", width: "50px" }}/></Col></Row>
                    <Row><Col span="6">B</Col><Col span="18"><InputNumber value={styleValue[`${PropKey}Bottom`]} onChange={(v) => onChange(v, "Bottom")} style={{ minWidth: "50px", width: "50px" }}/></Col></Row>
                </Space>
            </div>
            </div>)
};

export default MarginSelect;