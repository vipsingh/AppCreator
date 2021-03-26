import { XText } from "./Text";
import { XButton } from "./Button";
import { XTextBox } from "./TextBox";
import XCard from "./Card";
import { XContainer, XRow, XCell } from "./Container";

const factory: IDictionary<Array<any>> = {};
factory["text"] = [XText];
factory["button"] = [XButton];
factory["row"] = [XRow];
factory["container"] = [XContainer];
factory["cell"] = [XCell];
factory["textbox"] = [XTextBox];
factory["card"] = [XCard];

export function getComponent(type: string, isDetail?: boolean) {
    return factory[type][0];
}
