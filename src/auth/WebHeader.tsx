import React, { useState } from "react";
import headerLogo from "../assets/header_logo-web.svg";
import { useTranslation } from "react-i18next";
import i18n from "../translate/i18n";
import { Dropdown, MenuProps, Space } from "antd";
import ArrowUp from "../assets/next.svg";

function WebHeader({ navigate }: any) {
    const [language, setLanguage] = useState<any>(
        localStorage.getItem("selectedLanguage")
    );
    const { t } = useTranslation();
    const [servicesOpen, setServicesOpen] = useState(false);

    const handleChangeLanguage = (lang: any) => {
        i18n.changeLanguage(lang);
        localStorage.setItem("selectedLanguage", lang);
        setLanguage(lang);
    };

    /** NAVIGATION CALLS **/
    const handleNavigate = (route: string) => {
        navigate(route);
    };

    /** DROPDOWN ITEMS **/
    const servicesItems: MenuProps["items"] = [
        {
            key: "1",
            label: (
                <a
                    className="menu-dropdown-item"
                    onClick={() => handleNavigate("./lashbrows")}
                >
                    {t("Lashes & Brows")}
                </a>
            ),
        },
        {
            key: "2",
            label: (
                <a
                    className="menu-dropdown-item"
                    onClick={() => handleNavigate("./book")}
                >
                    {t("Manicure")}
                </a>
            ),
        },
        {
            key: "3",
            label: (
                <a
                    className="menu-dropdown-item"
                    onClick={() => handleNavigate("./hair")}
                >
                    {t("Hairstyling")}
                </a>
            ),
        },
        {
            key: "4",
            label: (
                <a
                    className="menu-dropdown-item"
                    onClick={() => handleNavigate("./chaild")}
                >
                    {t("For Kids")}
                </a>
            ),
        },
    ];

    return (
        <div className="web_header">
            {/* LEFT SIDE */}
            <div className="left_block">
                {/* SERVICES DROPDOWN */}
                <Dropdown
                    className="drop_down"
                    menu={{ items: servicesItems }}
                    trigger={["click"]}
                    onOpenChange={(e) => setServicesOpen(e)}
                    placement="bottomLeft"
                >
                    <a onClick={(e) => e.preventDefault()}>
                        <Space>
                            <span className="header-nav-item">{t("Services")}</span>
                            <img
                                src={ArrowUp}
                                alt="arrow"
                                className={`dropdown-arrow ${servicesOpen ? "open" : ""}`}
                            />


                        </Space>
                    </a>
                </Dropdown>

                {/* CONTACT US */}
                <div
                    className="header-nav-item"
                    onClick={() => handleNavigate("./contact")}
                >
                    {t("Contact Us")}
                </div>
            </div>

            {/* CENTER LOGO */}
            <div className="center_block">
                <img src={headerLogo} alt="logo" onClick={() => navigate("/")} />
            </div>

            {/* RIGHT SIDE LANGUAGE */}
            <div className="right_block">
                <div className="translate_block">
                    <div
                        className={
                            language === "EN"
                                ? "language_item is-lang-selected"
                                : "language_item"
                        }
                        onClick={() => handleChangeLanguage("EN")}
                    >
                        EN
                    </div>
                    <div className="line"></div>
                    <div
                        className={
                            language === "AM"
                                ? "language_item is-lang-selected"
                                : "language_item"
                        }
                        onClick={() => handleChangeLanguage("AM")}
                    >
                        ՀԱՅ
                    </div>
                </div>
            </div>
        </div>
    );
}

export default WebHeader;
