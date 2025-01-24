import React, {Children, ReactElement, ReactNode} from "react";
import {v4 as uuidv4} from 'uuid';
import {BiAperture} from "react-icons/bi";

interface IState {
    isOpen: boolean;
}

type PropsMenuItems = {
    style?: React.CSSProperties | undefined,
    className?: string | undefined,
    children?: React.ReactElement<MenuItem>[] | undefined,
    href?: string | undefined,
    content?: string | ReactNode
    dropPosition?: 'left' | 'middle' | 'right'
    iconClose?: ReactNode | undefined
    iconOpen?: ReactNode | undefined
}

export default class MenuItem extends React.Component<PropsMenuItems, IState> {
    private readonly mRefPopup: React.RefObject<HTMLDivElement | null>;
    private readonly mRefLi: React.RefObject<HTMLLIElement | null>;

    constructor(props: Readonly<PropsMenuItems>) {
        super(props);
        this.mRefPopup = React.createRef<HTMLDivElement>();
        this.mRefLi = React.createRef<HTMLLIElement>()
        this.omMouseOver = this.omMouseOver.bind(this)
        this.omMouseOut = this.omMouseOut.bind(this)
        this.state = {
            isOpen: false
        }
    }


    mappedChildren() {
        if (Children) {
            return Children.map(this.props.children, child =>
                this.props.href !== undefined ? (<a className={'bsr-menu-link'} href={this.props.href}>
                    {child}
                </a>) : (<div className={'bsr-menu-link'}>{child}</div>)
            )
        } else {
            return null
        }

    }

    getContent() {
        if (this.props.href) {
            return (<a className={'bsr-menu-link'} href={this.props.href}>{this.props.content}</a>)
        } else {
            return <div className={'bsr-menu-link'}>{this.props.content}</div>
        }
    }

    omMouseOver() {
        if (this.mRefPopup.current) {
            this.mRefPopup.current.style.visibility = 'visible'
            if (this.props.dropPosition === 'right' && this.mRefLi.current) {
                let d = "" + this.mRefLi.current?.offsetWidth + "px"
                let h = "" + this.mRefLi.current?.offsetHeight * 2 + "px"
                this.mRefPopup.current.style.marginLeft = d;
                this.mRefPopup.current.style.top = h;
            }
            if (this.props.dropPosition === 'left' && this.mRefLi.current) {
                let d = "-" + this.mRefPopup.current?.offsetWidth + "px"
                let h = "" + this.mRefLi.current?.offsetHeight * 2 + "px"
                this.mRefPopup.current.style.marginLeft = d;
                this.mRefPopup.current.style.top = h;
            }
            if (this.props.iconOpen && this.props.iconClose) {
                this.setState({
                    isOpen: true
                })
            }
        }
    }

    omMouseOut() {
        if (this.mRefPopup.current) {
            this.mRefPopup.current.style.visibility = 'hidden'
            if (this.props.iconOpen && this.props.iconClose) {
                this.setState({
                    isOpen: false
                })
            }
        }
    }

    iconLi(content: string | ReactNode, icon: ReactNode) {
        return (
            <>
                {content}

            </>
        )
    }

    getInnerLi() {

        if (this.props.dropPosition === 'left') {
            return <>
                {this.state.isOpen ? this.props.iconOpen : this.props.iconClose}
                <li className={this.props.className ?? " "} style={{width: "100%"}}>{this.getContent()}</li>
            </>

        } else {
            return <>
                <li className={this.props.className ?? " "} style={{width: "100%"}}>{this.getContent()}</li>
                {this.state.isOpen ? this.props.iconOpen : this.props.iconClose}
            </>
        }


    }

    getLi() {
        if (this.props.iconOpen && this.props.iconClose) {
            // @ts-ignore
            return <div ref={this.mRefLi}
                        onMouseOver={this.omMouseOver}
                        onMouseOut={this.omMouseOut}
                        className={'menu-item containerItem'}>

                {this.getInnerLi()}

            </div>
        } else {
            return <li ref={this.mRefLi} className={this.props.className ?? "menu-item"} style={this.props.style}
                       onMouseOver={this.omMouseOver}
                       onMouseOut={this.omMouseOut}>{this.getContent()}</li>
        }

    }

    getRoot() {
        if (Children.count(this.props.children) == 0) {
            return <li className={this.props.className ?? "menu-item"}>{this.getContent()}</li>;
        } else {
            return <div style={{height: "100%"}}>
                {this.getLi()}
                <div ref={this.mRefPopup} style={{position: "absolute", visibility: "hidden"}}
                     onMouseOut={this.omMouseOut}
                     onMouseOver={this.omMouseOver}>
                    {
                        Children.map(this.props.children, child =>
                            <>{child}</>
                        )
                    }
                </div>
            </div>;
        }
    }

    render() {
        return <>
            {this.getRoot()}
        </>
    }

}