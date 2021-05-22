import React from "react";
import { Layout } from "antd";
import { Editor, Frame, Element, useEditor } from '@craftjs/core';
import { Layers } from '@craftjs/layers';
import { Provider as PaperProvider  } from 'react-native-paper';
import { components } from "./Comps/factory";
import Toolbox from "./Viewport/toolbox";
import { Viewport } from "./Viewport";
import { RenderNode } from "./Viewport/RenderNode";
import { SettingsPanel } from "./SettingPanel";

const { Content, Sider, Header } = Layout;

export default class Designer extends React.Component {
    layoutInfo:  any
    constructor(props: any) {
        super(props);

        this.layoutInfo = sessionStorage.getItem("pageinfo");
    }    

    render () {
        
        return (<Layout style={{ minHeight: "100%" }}>  
            <Header style={{ position: 'fixed', zIndex: 1, width: '100%' }}>Header</Header>
            <Editor
                resolver={{
                    ...components
                }}
                onRender={RenderNode}
            >
                <Layout style={{ marginTop: 50 }}>
                <Sider 
                    width={250}
                    style={{
                        overflow: 'auto',
                        height: '100vh',
                        position: 'fixed',
                        left: 0,
                    }}>
                    <Toolbox />
                    <SaveButton />
                </Sider> 
                <Content style={{ marginLeft: 250, marginRight: 300 }}>
                    <PaperProvider>
                    <Viewport>
                        <Frame json={this.layoutInfo || undefined}>
                        <Element canvas is={components.Page} padding={5} width="600px" height="700px" background="#fff">
                                
                        </Element>
                        </Frame>
                    </Viewport>
                    </PaperProvider>
                </Content>
                <Sider theme="light" width={300} 
                 style={{
                    overflow: 'auto',
                    height: '100vh',
                    position: 'fixed',
                    right: 0,
                }}>
                    <SettingsPanel />
                    <Layers expandRootOnLoad={true}/>
                </Sider> 
            </Layout>
            </Editor>
        </Layout>);
    }
}

const SaveButton = () => {
    const { query } = useEditor();
    const saveFunc = React.useCallback(() => {
        const v = query.serialize();
        console.log(v);
        sessionStorage.setItem("pageinfo", v);
    }, []);
    
    return <a onClick={saveFunc}>Save JSON</a>
  }