import React, {Children, ReactNode} from "react";
import {v4 as uuidv4} from 'uuid';
import {IPropMenu} from "./Menu";


interface IState {
    isOpen: boolean;
    list:Array<Exclude<ReactNode, boolean | null | undefined>>;
}

type PropsMenuItems = {
    style?: React.CSSProperties | undefined,
    className?: string | undefined,
    children?: React.ReactElement<MenuItem>[] |React.ReactElement<MenuItem>| undefined,
    href?: string | undefined,
    content?: string | ReactNode
    dropPosition?: 'left' | 'middle' | 'right'
    iconClose?: ReactNode | undefined
    iconOpen?: ReactNode | undefined
    id?: string | undefined
    onClick?: (item: MenuItem) => void | undefined
}

export default class MenuItem extends React.Component<PropsMenuItems, IState> {
    private readonly mRefPopup: React.RefObject<HTMLDivElement | null>;
    private readonly mRefLi: React.RefObject<HTMLDivElement | null>;
    public readonly id: string;
    public href?: string | undefined

    constructor(props: Readonly<PropsMenuItems>) {
        super(props);
        this.mRefPopup = React.createRef<HTMLDivElement>();
        this.mRefLi = React.createRef<HTMLDivElement>()
        this.omMouseOver = this.omMouseOver.bind(this)
        this.omMouseOut = this.omMouseOut.bind(this)
        this.innerClick = this.innerClick.bind(this)
        this.state = {
            isOpen: false,
            list:Children.toArray(this.props.children)
        }
        this.id = this.props.id ?? uuidv4()
        this.href = this.props.href
    }
    public AddItems(...item:React.ReactElement<MenuItem>[]){
        let d:IState={
            list:this.state.list,
            isOpen:this.state.isOpen
        }
        d.list.push(item)
        console.log(d.list)
        this.setState(d);
    }
    public ClearItems(){
        let d:IState={
            list:[],
            isOpen:this.state.isOpen
        }
        this.setState(d);
    }

    public SpliceItems(start:number,count?:number){
        let d:IState={
            isOpen:this.state.isOpen,
            list:this.state.list,
        }
        d.list.splice(start,count)
        this.setState(d);
    }
    public DeleteItemById(id:string){
        let startIndex=-1;
        for (let i = 0; i < this.state.list.length; i++) {
            let it=this.state.list[i];
            if(it){
                let r= it as React.ReactElement<MenuItem>

                if(r){
                    if(r.props.id===id){
                        startIndex=i;
                        break
                    }
                }
            }
        }
        if(startIndex!==-1){
            this.SpliceItems(startIndex,1);
        }
    }

    innerClick() {
        if (this.props.onClick) {
            this.props.onClick(this)
        }
    }

    getContent() {
        if (this.props.href) {
            return (<a onClick={this.innerClick}
                       className={'bsr-menu-link'} href={this.props.href}>{this.props.content}</a>)
        } else {

            return <div onClick={this.innerClick} className={'bsr-menu-link'}>{this.props.content}</div>
        }
    }

    omMouseOver() {
        if (this.mRefPopup.current) {
            this.mRefPopup.current.style.visibility = 'visible'
            if (this.props.dropPosition === 'right' && this.mRefLi.current) {
                let d = "" + this.mRefLi.current?.offsetWidth + "px"
                let h = "" + this.mRefLi.current?.offsetTop  + "px"
                this.mRefPopup.current.style.marginLeft = d;
                this.mRefPopup.current.style.top = h;
            }
            if (this.props.dropPosition === 'left' && this.mRefLi.current) {
                let d = "-" + this.mRefPopup.current?.offsetWidth + "px"
                let h = "" + this.mRefLi.current?.offsetTop  + "px"
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

    getInnerLi() {

        if (this.props.dropPosition === 'left') {
            return <>
                {this.state.isOpen ? this.props.iconOpen : this.props.iconClose}
                <div style={{width: "100%"}}>{this.getContent()}</div>
            </>

        } else {
            return <>
                <div style={{width: "100%"}}>{this.getContent()}</div>
                {this.state.isOpen ? this.props.iconOpen : this.props.iconClose}
            </>
        }


    }

    getLi() {
        if (this.props.iconOpen && this.props.iconClose) {

            return <div ref={this.mRefLi}
                        id={this.id}
                        style={this.props.style}
                        onMouseOver={this.omMouseOver}
                        onMouseOut={this.omMouseOut}
                        className={'menu-item bsr-container-item'}>

                {this.getInnerLi()}

            </div>
        } else {

            return <div ref={this.mRefLi}
                        className={this.props.className ?? "menu-item"}
                        style={this.props.style}
                        id={this.id}
                        onMouseOver={this.omMouseOver}
                        onMouseOut={this.omMouseOut}>{this.getContent()}</div>
        }

    }

    getRoot() {
        if (this.state.list.length == 0) {
            return <div
                ref={this.mRefLi}
                style={this.props.style}
                id={this.id}
                className={this.props.className ?? "menu-item"}>{this.getContent()}</div>;
        } else {
            return <div style={{height: "100%"}}>
                {this.getLi()}
                <div ref={this.mRefPopup} style={{position: "absolute", visibility: "hidden"}}
                     onMouseOut={this.omMouseOut}
                     onMouseOver={this.omMouseOver}>
                    {
                        this.state.list
                        // Children.map(this.props.children, child =>
                        //     <>{child}</>
                        // )
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