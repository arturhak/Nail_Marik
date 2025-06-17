import React, {useState} from "react";
import headerLogo from "../assets/header_logo-web.svg"
import {useTranslation} from "react-i18next";
import i18n from "../translate/i18n";
import {Dropdown, MenuProps, Space} from "antd";
import ArrowUp from "../assets/next.svg";

function WebHeader ({headerData,navigate}:any) {
    const [language, setLanguage] = useState<any>(localStorage.getItem("selectedLanguage"))
    const {t} = useTranslation();
    const [nftDropdownOpen, setNftDropdownOpen] = useState<any>();


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

    const handleOpenBookDropdown = (e: any) => {
        setNftDropdownOpen(e)
    };

    const handleNavigateChild = () => {
        navigate("./hair")
    };
    const handleNavigateManicure = () => {
        navigate("./book")
    };

    const items: MenuProps['items'] = [
        {
            key: '1',
            label: (
                <a className="book-now-dropdown-items" rel="noopener noreferrer" onClick={handleNavigateChild}>
                    {t('For Kids')}
                </a>
            ),
        },
        {
            key: '2',
            label: (
                <a className="book-now-dropdown-items" rel="noopener noreferrer" onClick={handleNavigateManicure}>
                    {t('For Adults')}
                </a>
            ),
        },
    ];


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
                <Dropdown
                    menu={{items}}
                    trigger={["click"]}
                    onOpenChange={handleOpenBookDropdown}
                    placement="bottomRight"
                >
                    <a onClick={(e) => e.preventDefault()}>
                        <Space>
                            <span className="book-text">{t('Book Now')}</span>
                            <img src={ArrowUp} alt="up"
                                 className={nftDropdownOpen ? "rotate-arrow-transition" : "rotate-arrow-transition rotate-arrow"}/>
                        </Space>
                    </a>
                </Dropdown>
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
