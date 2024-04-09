import React from "react";
import WebHeader from "./WebHeader";
import MobileHeader from "./MobileHeader";

function Header () {
    return (
        <div>
            <WebHeader/>
            <MobileHeader/>
        </div>
    )
}

export default Header