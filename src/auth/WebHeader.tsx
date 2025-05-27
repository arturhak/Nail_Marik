import React, {useState} from "react";
import headerLogo from "../assets/header_logo-web.svg"
import MainButton from "../buttons/MainButton";
import {useTranslation} from "react-i18next";
import i18n from "../translate/i18n";

function WebHeader ({headerData,navigate}:any) {
    const [language, setLanguage] = useState<any>(localStorage.getItem("selectedLanguage"))
    const {t} = useTranslation();

    const handleChangeLanguage = (lang:any) => {
        i18n.changeLanguage(lang);
        localStorage.setItem("selectedLanguage", lang)
        let selectedLanguage:any = localStorage.getItem("selectedLanguage")
        setLanguage(selectedLanguage)
    }

    const handleNavigate = (index:number) => {
        switch (index) {
            case 0:
                navigate("./about")
                break;
            case 1:
                navigate("./services")
                break;
            case 2:
                navigate("./baby")
                break;
            case 3:
                navigate("./contact")
                break;

            default:
                navigate("./error")
        }
    }

    const bookNow = () => {
        navigate("./book")
    }

    return (
        <div className="web_header">
            <div className="left_block">
                {headerData.map((nav:any,index: any) => {
                    return <div
                        className="nav_item"
                        key={index}
                        onClick={()=>handleNavigate(index)}
                    >
                        {t(nav.title)}
                    </div>
                })}
            </div>
            <div className="center_block">
                <img src={headerLogo} alt="headerLogo" onClick={()=>navigate("/")}/>
            </div>
            <div className='right_block'>
                <MainButton
                    text="Book Now"
                    func={bookNow}
                />
                <div className="translate_block">
                    <div className={language === "EN" ? "language_item is-lang-selected" : "language_item"} onClick={() => handleChangeLanguage('EN')}>EN</div>
                    <div className="line"></div>
                    <div className={language === "AM" ? "language_item is-lang-selected" : "language_item"} onClick={() => handleChangeLanguage('AM')}>ՀԱՅ</div>
                </div>
            </div>

        </div>
    )
}

export default WebHeader