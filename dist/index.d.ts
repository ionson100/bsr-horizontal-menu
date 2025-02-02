import React, { ReactNode, ReactElement } from 'react';

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
declare class MenuItem extends React.Component<PropsMenuItems, IState> {
    private readonly mRefPopup;
    private readonly mRefMenuItem;
    readonly id: string;
    href?: string | undefined;
    constructor(props: Readonly<PropsMenuItems>);
    AddIMenuItems(...item: React.ReactElement<MenuItem>[]): void;
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

type PropsMenu = {
    style?: React.CSSProperties | undefined;
    id?: string | undefined;
    className?: string | undefined;
    children?: React.ReactElement<MenuItem>[] | React.ReactElement<MenuItem> | undefined;
};
interface IPropMenu {
    list: Array<Exclude<ReactNode, boolean | null | undefined>>;
}
declare class Menu extends React.Component<PropsMenu, IPropMenu> {
    constructor(props: Readonly<PropsMenu>);
    AddMenuItems(...item: ReactElement<MenuItem>[]): void;
    ClearItems(): void;
    SpliceItems(start: number, count?: number): void;
    DeleteItemById(id: string): void;
    render(): React.JSX.Element;
}

export { Menu, MenuItem };
