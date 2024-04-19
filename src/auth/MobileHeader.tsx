import React, {useState} from "react";
// import {useNavigate} from "react-router";
import {Drawer} from "antd";

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
            <Drawer
                placement="left"
                onClose={onClose}
                open={open}
                className="drower-el"
            >




            </Drawer>
        </div>
    )
}

export default MobileHeader;