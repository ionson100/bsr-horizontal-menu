import React, { ReactNode } from "react";
interface IState {
    isOpen: boolean;
    list: Array<Exclude<ReactNode, boolean | null | undefined>>;
}
type PropsMenuItems = {
    style?: React.CSSProperties | undefined;
    className?: string | undefined;
    children?: React.ReactElement<MenuItem>[] | React.ReactElement<MenuItem> | undefined;
    href?: string | undefined;
    content?: string | ReactNode;
    dropPosition?: 'left' | 'middle' | 'right';
    iconClose?: ReactNode | undefined;
    iconOpen?: ReactNode | undefined;
    id?: string | undefined;
    onClick?: (item: MenuItem) => void | undefined;
};
export default class MenuItem extends React.Component<PropsMenuItems, IState> {
    private readonly mRefPopup;
    private readonly mRefMenuItem;
    readonly id: string;
    href?: string | undefined;
    constructor(props: Readonly<PropsMenuItems>);
    AddItems(...item: React.ReactElement<MenuItem>[]): void;
    ClearItems(): void;
    GetHtmlDiv(): HTMLDivElement | null;
    SpliceItems(start: number, count?: number): void;
    DeleteItemById(id: string): void;
    private innerClick;
    private getContent;
    private omMouseOver;
    private omMouseOut;
    private getInnerLi;
    private getLi;
    private getRoot;
    render(): React.JSX.Element;
}
export {};
