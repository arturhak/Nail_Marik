import React from "react";
import Logo from "../assets/footer-logo-web.svg";
import logoInstagram from "../assets/instagram.svg";
import logoFacebook from "../assets/facebook.svg";
import MainButton from "../buttons/MainButton";
import {useNavigate} from "react-router";

function Footer () {
    const navigate = useNavigate()
    return (
        <div className="footer" >
            <div className="logo">
                <img src={Logo} alt="logo"/>
            </div>
            <hr/>
            <div className="contacts">
                <div className="contacts_item">
                    Step into a Realm of Beauty and Elegance, Where Your Nails Become a Canvas of Creativity.
                </div>
                <div className="contacts_item">
                    Vardananc 16, Yerevan, Armenia
                </div>
                <div className="contacts_item">
                    (374-10)229622
                </div>
            </div>
            <div className="social-links">
                <img src={logoInstagram} alt="instagram" rel="nofollow"/>
                <img src={logoFacebook} alt="facebook" rel="nofollow"/>
            </div>
            <div className="footer-main-button">
                <MainButton
                    text="Book Now"
                    func={()=>navigate("/book")}
                />
            </div>
        </div>
    )
}

export default Footer