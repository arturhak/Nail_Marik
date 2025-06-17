import React from "react";
import Logo from "../assets/footer-logo-web.svg";
import logoTelegram from "../assets/tg.svg"
import logoInstagram from "../assets/instagram.svg";
import logoFacebook from "../assets/facebook.svg";
import MainButton from "../buttons/MainButton";
import { useNavigate } from "react-router";
import { useTranslation } from "react-i18next";

function Footer() {
    const navigate = useNavigate();
    const { t } = useTranslation();
    return (
        <div className="footer" >
            <div className="logo">
                <img src={Logo} alt="logo" />
            </div>
            <hr />
            <div className="contacts">
                <div className="contacts_item">
                    {t('Step into a place of Beauty and Elegance, Where Your Nails Become a Canvas of Creativity.')}
                </div>
                <div className="contacts_item">
                    {t('Vardananc 16, Yerevan, Armenia')}
                </div>
                <div className="contacts_item">
                    <a href="tel:+37455338007">(374-55) 338007</a>
                </div>
            </div>
            <div className="social-links">
                <a href="
https://www.instagram.com/chic.choc.nails/profilecard/?igsh=b3ZzY3g4bmhpMnRu" target="_blank" rel="noopener noreferrer">
                    <img src={logoInstagram} alt="instagram" />
                </a>
                <a href="https://www.facebook.com/share/18C3QR2JEp/?mibextid=LQQJ4d" target="_blank" rel="noopener noreferrer">
                    <img src={logoFacebook} alt="instagram" />
                </a>
                <a href="https://t.me/chicchocnails" target="_blank" rel="noopener noreferrer">
                    <img src={logoTelegram} alt="instagram" />
                </a>
            </div>
            <div className="footer-main-button">
                <MainButton
                    text="Book Now"
                    func={() => navigate("/book")}
                />
            </div>
        </div>
    )
}

export default Footer