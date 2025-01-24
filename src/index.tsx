import React, {ReactElement, useRef} from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import Menu from "./menuDist/Menu";
import './menuDist/index.css'
import MenuItem from './menuDist/MenuItem'
import { BiAperture } from "react-icons/bi";
import { FaCaretLeft } from "react-icons/fa";
import { FaCaretDown } from "react-icons/fa";
import { FaCaretRight } from "react-icons/fa";
import {Test} from "./test";

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
function textImage(str:string,image:ReactElement){
    return (
        <div className={'bsr-container-item'}>
            <BiAperture color={"red"} /><div className={'inner-item-text'}>Menu3 </div>
        </div>
    )
}

root.render(
  <React.StrictMode>
     <Test/>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals

