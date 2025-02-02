import React, {Children, ReactElement, ReactNode} from "react";
import MenuItem from "./MenuItem";

export type PropsMenu = {
    style?: React.CSSProperties | undefined
    id?:string|undefined
    className?: string | undefined,
    children?: React.ReactElement<MenuItem>[] |React.ReactElement<MenuItem>| undefined,
}
 export interface IPropMenu{
    list:Array<Exclude<ReactNode, boolean | null | undefined>>;
}


export default class Menu extends React.Component<PropsMenu, IPropMenu> {


    constructor(props: Readonly<PropsMenu>) {
        super(props);
        this.state={
            list:Children.toArray(this.props.children)
        }

    }
    public AddMenuItems(...item:ReactElement<MenuItem>[]){
        let d = this.state.list;
        item.forEach(i=>{
            d.push(i)
        })

        this.setState({
            list:d
        })
    }
    public ClearItems(){
        this.setState({
            list:[]
        })
    }
    public SpliceItems(start:number,count?:number){
        let d:IPropMenu={
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


    render() {
        return  <div
            className={this.props.className??"bsr-menu"}
            style={this.props.style}
            id={this.props.id}
        >{this.state.list}</div>
    }
}
