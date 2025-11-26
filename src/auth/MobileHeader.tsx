import React, { useState } from "react";
import { Drawer, Dropdown, MenuProps, Space } from "antd";
import headerLogoTablet from "../assets/header-logo-tablet.svg";
import MainButton from "../buttons/MainButton";
import { useTranslation } from "react-i18next";
import i18n from "../translate/i18n";
import ArrowUp from "../assets/next.svg";

function MobileHeader({ headerData, navigate }: any) {
    const [open, setOpen] = useState(false);
    const [language, setLanguage] = useState<any>(localStorage.getItem("selectedLanguage"))
    const [nftDropdownOpen, setNftDropdownOpen] = useState<any>();
    const { t } = useTranslation();

    const handleChangeLanguage = (lang: any) => {
        i18n.changeLanguage(lang);
        localStorage.setItem("selectedLanguage", lang)
        let selectedLanguage: any = localStorage.getItem("selectedLanguage")
        setLanguage(selectedLanguage);
        setOpen(false);
    }

    const showDrawer = () => {
        setOpen(true);
    };
    const onClose = () => {
        setOpen(false);
    };
    // const bookNow = () => {
    //     setOpen(false);
    //     navigate("./book")
    // }

    const handleNavigate = (index: number) => {
        switch (index) {
            case 0:
                setOpen(false);
                navigate("./book")
                break;
            case 1:
                setOpen(false);
                navigate("./lashbrows")
                break;
            case 2:
                setOpen(false);
                navigate("./hair")
                break;
            case 3:
                setOpen(false);
                navigate("./chaild")
                break;
            case 4:
                setOpen(false);
                navigate("./contact")
                break;

            default:
                setOpen(false);
                navigate("./error")
        }
    };

    const handleOpenBookDropdown = (e: any) => {
        setNftDropdownOpen(e)
    };

    const handleNavigateChild = () => {
        setOpen(false);
        navigate("./chaild")
    };
    const handleNavigateManicure = () => {
        setOpen(false);
        navigate("./book")
    };
    const handleNavigateHair = () => {
        setOpen(false);
        navigate("./hair")
    };

    const items: MenuProps['items'] = [
        {
            key: '1',
            label: (
                <a className="book-now-dropdown-items" rel="noopener noreferrer" onClick={handleNavigateHair}>
                    {t('Lashes & Brows')}
                </a>
            ),
        },
        {
            key: '2',
            label: (
                <a className="book-now-dropdown-items" rel="noopener noreferrer" onClick={handleNavigateHair}>
                    {t('Hairstyling')}
                </a>
            ),
        },
        {
            key: '3',
            label: (
                <a className="book-now-dropdown-items" rel="noopener noreferrer" onClick={handleNavigateManicure}>
                    {t('Manicure')}
                </a>
            ),
        },
        {
            key: '4',
            label: (
                <a className="book-now-dropdown-items" rel="noopener noreferrer" onClick={handleNavigateChild}>
                    {t('For Kids')}
                </a>
            ),
        },



    ];


    return (
        <div className="mobile-header">
            <div className="center_block">
                <img src={headerLogoTablet} alt="headerLogo" onClick={() => navigate("/")} />
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
                                onClick={() => handleNavigate(index)}
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
                        {/*<MainButton*/}
                        {/*    text="Book Now"*/}
                        {/*    func={bookNow}*/}
                        {/*/>*/}
                        <Dropdown
                            menu={{ items }}
                            trigger={["click"]}
                            onOpenChange={handleOpenBookDropdown}
                            placement="bottomRight"
                        >
                            <a onClick={(e) => e.preventDefault()}>
                                <Space>
                                    <span className="book-text">{t('Book Now')}</span>
                                    <img src={ArrowUp} alt="up"
                                        className={nftDropdownOpen ? "rotate-arrow-transition" : "rotate-arrow-transition rotate-arrow"} />
                                </Space>
                            </a>
                        </Dropdown>
                    </div>
                </div>

            </Drawer>
        </div>
    )
}

export default MobileHeader;