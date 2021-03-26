import React from "react";
import _ from "lodash";
import { Button, Text, TextBox } from "./Base";
import { Cell, Container, Row } from "./Containers";
import { Card } from "./Card";
import { Page } from "./Page";
import CompSetting from "../SettingPanel/CompSetting";

const factory: IDictionary<any> = {};

factory["Button"] = Button;
factory["Text"] = Text;
factory["TextBox"] = TextBox;

factory["Row"] = Row;
factory["Cell"] = Cell;
factory["Container"] = Container;
factory["Page"] = Page;
factory["Card"] = Card;

function init() {
    _.forIn(factory, (v, k) => {
        function CompFunc(this: any) {
            return React.createElement(CompSetting, { settingInfo: this.settingInfo });
        };

        v.craft = _.assign({}, v.craft, {
            displayName: k,
            related: {
              settings: CompFunc.bind({ settingInfo: v.craft ? v.craft.settingInfo: null })
            }
          });
    });
}

init();

export const components = factory;