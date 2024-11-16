import React from "react";
import Logo from "../assets/footer-logo-web.svg";
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
                    {t('Step into a Realm of Beauty and Elegance, Where Your Nails Become a Canvas of Creativity.')}
                </div>
                <div className="contacts_item">
                    {t('Vardananc 16, Yerevan, Armenia')}
                </div>
                <div className="contacts_item">
                    <a href="tel:+37455338007">(374-55) 338007</a>
                </div>
            </div>
            <div className="social-links">
                <img src={logoInstagram} alt="instagram" rel="nofollow" />
                <img src={logoFacebook} alt="facebook" rel="nofollow" />
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