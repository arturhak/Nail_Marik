import React from "react";
import headerLogo from "../assets/header_logo.svg"
import MainButton from "../buttons/MainButton";

function WebHeader ({headerData}:any) {
    return (
        <div className="web_header">
            <div className="left_block">
                {headerData.map((nav:any) => {return <div className="nav_item">{nav.title}</div>})}
            </div>
            <div className="center_block">
                <img src={headerLogo} alt="headerLogo"/>
            </div>
            <div className='right_block'>
                <MainButton />
                <div className="translate_block">
                    <div className="language_item">EN</div>
                    <div className="line"></div>
                    <div className="language_item">ՀԱՅ</div>
                </div>
            </div>

        </div>
    )
}

export default WebHeader