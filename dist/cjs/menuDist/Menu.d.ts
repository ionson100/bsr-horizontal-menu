import React, { ReactElement, ReactNode } from "react";
import MenuItem from "./MenuItem";
export type PropsMenu = {
    style?: React.CSSProperties | undefined;
    id?: string | undefined;
    className?: string | undefined;
    children?: React.ReactElement<MenuItem>[] | React.ReactElement<MenuItem> | undefined;
};
export interface IPropMenu {
    list: Array<Exclude<ReactNode, boolean | null | undefined>>;
}
export default class Menu extends React.Component<PropsMenu, IPropMenu> {
    constructor(props: Readonly<PropsMenu>);
    AddMenuItems(...item: ReactElement<MenuItem>[]): void;
    ClearItems(): void;
    SpliceItems(start: number, count?: number): void;
    DeleteItemById(id: string): void;
    render(): React.JSX.Element;
}
