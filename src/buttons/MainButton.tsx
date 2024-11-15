import React from "react";
import arrowRight from "../assets/arrow-small-right.svg"
import {useTranslation} from "react-i18next";

function MainButton (props:any) {
    const {t} = useTranslation();

     return (
         <div className={!props.width? "main_button": "main_button width-68"} onClick={props.func}>
             {t(props.text)} {props.suffix ? <span><img src={arrowRight} alt="right"/></span>: ""}
         </div>
     )
}

export default MainButton