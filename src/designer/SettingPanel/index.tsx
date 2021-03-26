import { useEditor } from '@craftjs/core';
import React from 'react';
import { Row, Col, Typography } from "antd";
import CompSetting from "./CompSetting"
import { components } from "../Comps/factory";

export const SettingsPanel = () => {
  const { actions, selected } = useEditor((state, query) => {
    const currentNodeId = state.events.selected;
    let selected, settingInfo;

    if (currentNodeId) {
      selected = {
        id: currentNodeId,
        name: state.nodes[currentNodeId].data.name,
        settings:
          state.nodes[currentNodeId].related &&
          state.nodes[currentNodeId].related.settings,
        isDeletable: query.node(currentNodeId).isDeletable(),
      };
    }

    return {
      selected
    };
  });

  return selected ? (
    <div style={{background: "rgba(0, 0, 0, 0.06)"}}>
      <div >
        <div><Typography>Selected</Typography></div>
        {selected.settings && React.createElement(selected.settings as any)}
        
      </div>
    </div>
  ) : null;
};

