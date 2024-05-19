import React, {useState} from "react";
// import {useNavigate} from "react-router";
import {Drawer} from "antd";
import headerLogoTablet from "../assets/header-logo-tablet.svg";
import MainButton from "../buttons/MainButton";

function MobileHeader({headerData}:any) {
    const [open, setOpen] = useState(false);
    // const navigate = useNavigate()

    const showDrawer = () => {
        setOpen(true);
    };
    const onClose = () => {
        setOpen(false);
    };

    return (
        <div className="mobile-header">
            <div className="burger" onClick={showDrawer}>
                <div className="burger-line"></div>
                <div className="burger-line"></div>
                <div className="burger-line"></div>
            </div>
            <div className="center_block">
                <img src={headerLogoTablet} alt="headerLogo"/>
            </div>
            <MainButton
                text="Book Now"
            />
            <Drawer
                placement="left"
                onClose={onClose}
                open={open}
                className="drower-el"
            >


dsgsdfgdfg

            </Drawer>
        </div>
    )
}

export default MobileHeader;