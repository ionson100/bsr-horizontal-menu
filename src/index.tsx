import React, {ReactElement} from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import Menu from "./menuDist/Menu";
import './menuDist/index.css'
import MenuItem from './menuDist/MenuItem'
import { BiAperture } from "react-icons/bi";
import { FaCaretLeft } from "react-icons/fa";
import { FaCaretDown } from "react-icons/fa";
import { FaCaretRight } from "react-icons/fa";

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
function textImage(str:string,image:ReactElement){
    return (
        <div className={'containerItem'}>
            <BiAperture color={"red"} /><div className={'inner-item-text'}>Menu3 </div>
        </div>
    )
}
root.render(
  <React.StrictMode>
      <Menu >
          <MenuItem href={"#23"} content={'Menu1'} />
          <MenuItem href={"#45"} content={"Menu2"}/>
          <MenuItem
              iconClose={<FaCaretRight/>}
              iconOpen={<FaCaretDown/>}
              content={'sdddsdd'} >
              <MenuItem href={"#23"} content={'Menu1-1 oisodi i'} />
              <MenuItem href={"#45"} content={"Menu2-2"}/>
              <MenuItem
                  iconClose={<FaCaretLeft/>}
                  iconOpen={<FaCaretDown/>}
                  href={"#45"}
                  dropPosition={'left'}
                  content={"Test"}>
                  <MenuItem href={"#23"} content={'2222222222222'} />
                  <MenuItem href={"#45"} content={"333333333333"}/>
                  <MenuItem href={"#45"} content={"333333333333"}/>
                  <MenuItem href={"#45"} content={"333333333333"}/>
                  <MenuItem href={"#45"} content={"333333333333"}/>
              </MenuItem>
          </MenuItem>
          <MenuItem href={"#23"} content={'Menu1'} />
          <MenuItem href={"#45"} content={"Menu2"}/>
          <MenuItem content={textImage('Menu22',<BiAperture/>)} >
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
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals

