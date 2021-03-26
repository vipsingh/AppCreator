import React from "react";
import { Provider as PaperProvider  } from 'react-native-paper';
import { Route, Switch } from "react-router-dom";
import { BrowserRouter as Router } from "react-router-dom";
//import { Button } from "react-native-web";
import Page from "./Page";
//import { Button  } from 'react-native-paper';
//import 'react-native-gesture-handler';
//import { NavigationContainer } from '@react-navigation/native';
//import { createStackNavigator } from '@react-navigation/stack';
import _ from "lodash";
//const Stack = createStackNavigator();
import PageContext, { createPageContext } from "./AppContext";
import StackScriptExecuter from "../core/StackScript/ScriptParser";

const pages = [{ name: "page1" }, { name: "page2" }];

function AppRoutes() {
  return (
    <Switch>
      <PageRoute exact path="/app" routeInfo={{ name: "page1" }} />
      {
        _.map(pages, p => {
          return <PageRoute exact path={`/app/${p.name}`} routeInfo={p} />;
        })
      }
     
    </Switch>
  );
}

const App: React.FC<any> = () => {
    const x: any ={};
    const execScript = () => {
      // const p = new StackScriptExecuter(null);
      // const v = p.ExecuteExpression("2 + _.parseint('3')");
      // console.log(v);
    }

    return (<Router><PaperProvider>
        <React.Fragment>
      <div className="viewport__page-side" style={{ display: "flex", height: "600px" }}>
        <div style={{ width: "450px", background: "#fff", marginTop: "30px", marginBottom: "20px", border: "1px solid green" }} className="h-full">
        <AppRoutes />
        </div>
    </div>
    
  </React.Fragment>
    </PaperProvider></Router>);
};

export default App;

function PageRoute({ component, routeInfo, ...rest }: any) {
  return (
    <Route
      {...rest}
      render={routeProps => {               
       
        window.scrollTo(0,0);
                
        return <PageContext.Provider value={createPageContext(routeInfo.pageId, routeProps.history)}><Page pageId={routeInfo.pageId} /></PageContext.Provider>
    }}
    />);
}