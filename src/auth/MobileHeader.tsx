import React, {useState} from "react";
// import {useNavigate} from "react-router";
import {Drawer} from "antd";
import headerLogoTablet from "../assets/header-logo-tablet.svg";
import MainButton from "../buttons/MainButton";

function MobileHeader({headerData, navigate}: any) {
    const [open, setOpen] = useState(false);

    const showDrawer = () => {
        setOpen(true);
    };
    const onClose = () => {
        setOpen(false);
    };
    const bookNow = () => {
        setOpen(false);
        navigate("./book")
    }

    const handleNavigate = (index:number) => {
        switch (index) {
            case 0:
                setOpen(false);
                navigate("./about")
                break;
            case 1:
                setOpen(false);
                navigate("./services")
                break;
            case 2:
                setOpen(false);
                navigate("./contact")
                break;

            default:
                navigate("./error")
        }
    }

    return (
        <div className="mobile-header">
            {/*<MainButton*/}
            {/*    text="Book Now"*/}
            {/*    func={bookNow}*/}
            {/*/>*/}
            <div className="center_block">
                <img src={headerLogoTablet} alt="headerLogo" onClick={() => navigate("/")}/>
            </div>
            <div className="burger" onClick={showDrawer}>
                <div className="burger-line"></div>
                <div className="burger-line"></div>
                <div className="burger-line"></div>
            </div>
            <Drawer
                placement="right"
                onClose={onClose}
                open={open}
                rootClassName="burger-drawer"
            >
                <div className="mob-nav-group">
                    <div className="mob-nav-group_header">
                        {headerData.map((nav: any, index: any) => {
                            return <div
                                className="mob-nav-group_item"
                                key={index}
                                onClick={()=>handleNavigate(index)}
                            >
                                {nav.title}
                            </div>
                        })}
                    </div>
                    <div className="mob-nav-group_burger-footer">
                        <div className="mob-nav-group_burger-footer__lang">
                            <div className="translate_block">
                                <div className="language_item">EN</div>
                                <div className="line"></div>
                                <div className="language_item">ՀԱՅ</div>
                            </div>
                        </div>
                        <div className="mob-nav-group_burger-footer__content">
                            {('"Discover the ultimate in nail care luxury at CHIC ∙ CHOC Nail Salon. Treat yourself to expert manicures and pedicures in our serene and welcoming atmosphere. Book your appointment today for a rejuvenating experience you won\'t forget!"')}

                        </div>
                        <MainButton
                            text="Book Now"
                            func={bookNow}
                        />
                    </div>
                </div>

            </Drawer>
        </div>
    )
}

export default MobileHeader;