import Menu from "./menuDist/Menu";
import MenuItem from "./menuDist/MenuItem";
import {FaCaretDown, FaCaretLeft, FaCaretRight} from "react-icons/fa";
import {BiAperture} from "react-icons/bi";
import React, {useRef} from "react";
import {v4 as uuidv4} from 'uuid';

export function Test(){
    const refMenu=useRef<Menu>(null)
    const refMenuItem=useRef<MenuItem>(null)
    return(
        <>
            <Menu ref={refMenu} >
                <MenuItem  href={"#23"} content={'Menu1'} />
                <MenuItem id={"11111"} href={"#45"} content={"Menu2"}/>
                <MenuItem
                    iconClose={<FaCaretRight color={'#fff'}/>}
                    iconOpen={<FaCaretDown color={'#fff'}/>}
                    content={'sdddsdd'} >
                    <MenuItem href={"#23"} content={'Menu1-1 oisodi i'} />
                    <MenuItem href={"#45"} content={"Menu2-2"}/>
                    <MenuItem href={"#23"} content={'Menu1-1 oisodi i'} />
                    <MenuItem href={"#45"} content={"Menu2-2"}/>
                    <MenuItem href={"#23"} content={'Menu1-1 oisodi i'} />
                    <MenuItem href={"#45"} content={"Menu2-2"}/>
                    <MenuItem href={"#23"} content={'Menu1-1 oisodi i'} />
                    <MenuItem href={"#45"} content={"Menu2-2"}/>
                    <MenuItem href={"#23"} content={'Menu1-1 oisodi i'} />
                    <MenuItem href={"#45"} content={"Menu2-2"}/>
                    <MenuItem href={"#23"} content={'Menu1-1 oisodi i'} />
                    <MenuItem href={"#45"} content={"Menu2-2"}/>
                    <MenuItem href={"#23"} content={'Menu1-1 oisodi i'} />
                    <MenuItem href={"#45"} content={"Menu2-2"}/>
                    <MenuItem href={"#23"} content={'Menu1-1 oisodi i'} />
                    <MenuItem href={"#45"} content={"Menu2-2"}/>
                    <MenuItem
                        iconClose={<FaCaretLeft color={'#fff'}/>}
                        iconOpen={<FaCaretDown  color={'#fff'}/>}
                        href={"#45"}
                        dropPosition={'left'}
                        content={"Test"}>
                        <MenuItem href={"#23"} content={'11111111111'} />
                        <MenuItem href={"#45"} content={"555555555"}/>

                    </MenuItem>
                    <MenuItem
                        iconClose={<FaCaretLeft color={'#fff'}/>}
                        iconOpen={<FaCaretDown  color={'#fff'}/>}
                        href={"#45"}
                        dropPosition={'left'}
                        content={"Test"}>
                        <MenuItem href={"#23"} content={'2222222222222'} />
                        <MenuItem href={"#45"} content={"333333333333"}/>
                        <MenuItem href={"#45"} content={"333333333333"}/>
                        <MenuItem href={"#45"} content={"333333333333"}/>
                        <MenuItem href={"#45"} content={"3333 click 3333"} onClick={(m)=>{
                            //alert(m.id)
                        }}/>
                    </MenuItem>
                </MenuItem>
                <MenuItem
                    iconClose={<FaCaretRight color={'#fff'}/>}
                    iconOpen={<FaCaretDown color={'#fff'}/>}
                    content={'sdddsdd'} >
                    <MenuItem href={"#23"} content={'Menu1-1 oisodi i'} />
                    <MenuItem href={"#45"} content={"Menu2-2"}/>
                    <MenuItem
                        iconClose={<FaCaretLeft color={'#fff'}/>}
                        iconOpen={<FaCaretDown  color={'#fff'}/>}
                        href={"#45"}
                        dropPosition={'left'}
                        content={"Test"}>
                        <MenuItem href={"#23"} content={'2222222222222'} />
                        <MenuItem href={"#45"} content={"333333333333"}/>
                        <MenuItem href={"#45"} content={"333333333333"}/>
                        <MenuItem href={"#45"} content={"333333333333"}/>
                        <MenuItem href={"#45"} content={"3333 click 3333"} onClick={(m)=>{
                            //alert(m.id)
                        }}/>
                    </MenuItem>
                    <MenuItem
                        iconClose={<FaCaretLeft color={'#fff'}/>}
                        iconOpen={<FaCaretDown  color={'#fff'}/>}
                        href={"#45"}
                        dropPosition={'left'}
                        content={"Test"}>
                        <MenuItem href={"#23"} content={'2222222222222'} />
                        <MenuItem href={"#45"} content={"333333333333"}/>
                        <MenuItem href={"#45"} content={"333333333333"}/>
                        <MenuItem href={"#45"} content={"333333333333"}/>
                        <MenuItem href={"#45"} content={"3333 click 3333"} onClick={(m)=>{
                            //alert(m.id)
                        }}/>
                    </MenuItem>
                </MenuItem>
                <MenuItem href={"#23"} content={'Menu1'} />
                <MenuItem href={"#45"} content={"Menu2"}/>
                <MenuItem content={'44'} >
                    <MenuItem href={"#23"} content={'Menu1-1 oisodi i'} />
                    <MenuItem href={"#45"} content={"Menu2-2"}/>
                    <MenuItem
                        href={"#45"}
                        content={"Test"}
                        dropPosition={'right'}>
                        <MenuItem href={"#23"} content={'2222222222222'} />
                        <MenuItem href={"#45"} content={"333333333333"}/>
                    </MenuItem>
                </MenuItem>
            </Menu>
            <div>
                <button onClick={()=>
                {
                    refMenu.current?.AddMenuItems(< MenuItem key={uuidv4()} ref={refMenuItem} content={uuidv4()}/>)
                }}>

                   add
                </button>
                <button onClick={()=>
                {
                    refMenu.current?.ClearItems()
                }}>

                    clear
                </button>
                <button onClick={()=>
                {
                    refMenu.current?.SpliceItems(0,2)
                }}>

                    delete
                </button>

                <button onClick={()=>
                {
                    refMenu.current?.DeleteItemById("11111")
                }}>

                    delete by id
                </button>
                <br/>
                <button onClick={()=>
                {
                    refMenuItem.current?.AddItems(<MenuItem content={"sdsdsd22222222"}/>)
                }}>

                    add item
                </button>
                <button onClick={()=>
                {
                    refMenuItem.current?.ClearItems()
                }}>

                    clear item
                </button>
            </div>
        </>
    )
}