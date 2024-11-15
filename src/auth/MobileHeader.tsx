import React, {useState} from "react";
import {Drawer} from "antd";
import headerLogoTablet from "../assets/header-logo-tablet.svg";
import MainButton from "../buttons/MainButton";
import {useTranslation} from "react-i18next";
import i18n from "../translate/i18n";

function MobileHeader({headerData, navigate}: any) {
    const [open, setOpen] = useState(false);
    const [language, setLanguage] = useState<any>(localStorage.getItem("selectedLanguage"))
    const {t} = useTranslation();

    const handleChangeLanguage = (lang:any) => {
        i18n.changeLanguage(lang);
        localStorage.setItem("selectedLanguage", lang)
        let selectedLanguage:any = localStorage.getItem("selectedLanguage")
        setLanguage(selectedLanguage);
        setOpen(false);
    }

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
                                {t(nav.title)}
                            </div>
                        })}
                    </div>
                    <div className="mob-nav-group_burger-footer">
                        <div className="mob-nav-group_burger-footer__lang">
                            <div className="translate_block">
                                <div className={language === "EN" ? "language_item is-lang-selected" : "language_item"} onClick={() => handleChangeLanguage('EN')}>EN</div>
                                <div className="line"></div>
                                <div className={language === "AM" ? "language_item is-lang-selected" : "language_item"} onClick={() => handleChangeLanguage('AM')}>ՀԱՅ</div>
                            </div>
                        </div>
                        <div className="mob-nav-group_burger-footer__content">
                            {t("Discover the ultimate in nail care luxury at CHIC ∙ CHOC Nail Salon. Treat yourself to expert manicures and pedicures in our serene and welcoming atmosphere. Book your appointment today for a rejuvenating experience you won't forget!")}

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