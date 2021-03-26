import React from 'react';
import StyleSetting from "./StyleSetting";
import PropSetting from "./CompPropSetting";
import { Tabs } from "antd";

const CompSetting: React.FC<any> = ({settingInfo}) => {

    return settingInfo ? (<Tabs >
        <Tabs.TabPane tab="Props" key="1">
            {settingInfo.props && <PropSetting info={settingInfo.props} />}
        </Tabs.TabPane>
        <Tabs.TabPane tab="Style" key="2">
        {settingInfo.style && <StyleSetting info={settingInfo.style} />}
        </Tabs.TabPane>
        </Tabs>): null;
}

export default CompSetting;