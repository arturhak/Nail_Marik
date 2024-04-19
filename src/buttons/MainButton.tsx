import React from "react";
import arrowRight from "../assets/arrow-small-right.svg"

function MainButton (props:any) {
     return (
         <div className="main_button">
             {props.text} {props.suffix ? <span><img src={arrowRight} alt="right"/></span>: ""}
         </div>
     )
}

export default MainButton