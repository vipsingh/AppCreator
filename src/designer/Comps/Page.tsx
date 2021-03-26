import React from 'react';
import { useNode, UserComponent } from '@craftjs/core';

export const Page: any = ({ background, padding, children, width, height }: any) => {
    const {
      connectors: { connect, drag },
    } = useNode();
    return (
      <div
        ref={(ref) => connect(drag(ref))}
        style={{ width, height, margin: '5px 0', background, padding: `${padding}px`, border:"1px solid gray", overflow: "auto" }}
      >
        {children}
      </div>
    );
};  