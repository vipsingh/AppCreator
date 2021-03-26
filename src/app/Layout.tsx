import React from "react";
import _ from "lodash";
import { getComponent } from "../components"
import { DataContext } from "./AppContext";

const Layout: React.FC<any> = ({ Layout }) => {  
    const builder = React.useMemo(() => {
      return new LayoutBuilder(Layout);
    }, []);

    const root = builder.getRoot();

    return (<div className="w-full h-full" style={{ overflow: "auto" }}>
      {_.map(root.nodes, n => {
        return <XNode builder={builder} nodeId={n} />;
      })}
    </div>);
};

const XNode: React.FC<any> = ({ nodeId, builder }) => {
  const dataContext = React.useContext(DataContext);
   const { Component, info } = builder.getNodeInfo(nodeId);

   if (info.nodes && info.nodes.length > 0) {
    return (<Component {...info.props}>
       {_.map(info.nodes, n => {
        return <XNode builder={builder} nodeId={n} />;
      })}
    </Component>);
   }
   const iprops = dataContext.refineProps(info.props);

   if(iprops.isHidden) return <div></div>;
    return (<Component {...iprops} dataContext={dataContext} />);
}

export default Layout;

class LayoutBuilder {
  layout: any
  constructor(layout: any) {
    this.layout = layout;
  }

  getRoot() {
    return this.layout["ROOT"];
  }

  getNodeInfo(nodeId: string) {
    const info = this.layout[nodeId];
    const Component = getComponent(info.props.controlType);

    return { Component, info };
  }
}