import React, {Children} from "react";
import MenuItem from "./MenuItem";

export type PropsMenu = {
    style?: React.CSSProperties | undefined,
    className?: string | undefined,
    children?: React.ReactElement<MenuItem>[] | undefined
}

export default class Menu extends React.Component<PropsMenu, any> {

    constructor(props: Readonly<PropsMenu>) {
        super(props);
    }

    mappedChildren() {
        if (Children) {
            return Children.map(this.props.children, child => {
                    return child
                }
            )
        } else {
            return null
        }

    }

    render() {
        return <div className={this.props.className ?? "bsr-menuDist"}>
            <ul className="menu">{this.mappedChildren()}</ul>
        </div>;
    }
}

