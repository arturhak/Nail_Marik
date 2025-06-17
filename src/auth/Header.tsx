import React from "react";
import WebHeader from "./WebHeader";
import MobileHeader from "./MobileHeader";
import {headerData} from "../constants/headerData";
import {useNavigate} from "react-router";

function Header () {

    const navigate = useNavigate()

    return (
        <div className="header">
            <WebHeader
                headerData={headerData}
                navigate={navigate}
            />
            <MobileHeader
                headerData={headerData}
                navigate={navigate}
            />
        </div>
    )
}

export default Header