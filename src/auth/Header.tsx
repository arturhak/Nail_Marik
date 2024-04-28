import React from "react";
import WebHeader from "./WebHeader";
import MobileHeader from "./MobileHeader";
import {headerData} from "../constants/headerData";

function Header () {
    return (
        <div className="header">
            <WebHeader
                headerData={headerData}
            />
            {/*<MobileHeader*/}
            {/*    headerData={headerData}*/}
            {/*/>*/}
        </div>
    )
}

export default Header