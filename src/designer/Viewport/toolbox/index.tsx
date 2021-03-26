import React from 'react';
import { useEditor, Element } from '@craftjs/core';
import { Col, Row, Button, List, Card } from 'antd';
import { components } from "../../Comps/factory";
import { Cell, Container, Row as CRow } from "../../Comps/Containers";

const Toolbox: React.FC<any> = () => {
    const { connectors } = useEditor();

    const data = [
        <ToolItem cref={(ref: any) => connectors.create(ref, <components.Button title="Click me"></components.Button>)} title="Button" />,
        <ToolItem cref={(ref: any) => connectors.create(ref, <components.Text text="Hi world" />)} title="Text" />,
        <ToolItem cref={(ref: any) => connectors.create(ref, <components.TextBox />)} title="TextBox" />,
        <ToolItem cref={(ref: any) => connectors.create(ref, <Element canvas is={Container} padding={5} background="#eeeeee" />)} title="Container" />,
        <ToolItem cref={(ref: any) => connectors.create(ref, <CRow><Element canvas is={Cell} span={12} /><Element canvas is={Cell} span={12} /></CRow>)} title="Row (2)" />,
        <ToolItem cref={(ref: any) => connectors.create(ref, <CRow><Element canvas is={Cell} span={8} /><Element canvas is={Cell} span={8} /><Element canvas is={Cell} span={8} /></CRow>)} title="Row (3)" />,
        <ToolItem cref={(ref: any) => connectors.create(ref, <components.Card title="Card Title" subtitle="Card subtitle" />)}  title="Card" />   
    ]
    
    return (<List
        grid={{ gutter: 2, column: 3 }}
        dataSource={data}
        renderItem={(Item: any) => (
        <List.Item>
            {Item}
        </List.Item>
    )} />);
}

const ToolItem: React.FC<any> = ({ title, cref }) => {

    return (<div ref={cref} style={{ cursor: "pointer" }}><div style={{ height: "80px", background: "#fff" }}>
        {title}
    </div></div>);
};

export default Toolbox;