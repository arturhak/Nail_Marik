import React from "react";
import Address from "../assets/address.svg";
import Clock from "../assets/clock.svg";
import Phone from "../assets/phone.svg";
import Email from "../assets/email.svg";
import Map from "../assets/map.png";
import {useTranslation} from "react-i18next";

function Contact() {
    const {t} = useTranslation()
    return (
        <div className="layout">
            <div className="contacts_page_1">
                <div className="home_page_1_title">
                    {t('Feel free to reach out to us using any of the methods below. Our dedicated team is ready to assist you and ensure that your experience with us is nothing short of exceptional.')}
                </div>
                <div className="home_page_1_content">
                    {t('Contact  Us')}
                </div>
            </div>

            <div className="map-navigation">
                <div className="map-navigation_item">
                    <img src={Address} alt="address" />
                    <div className="address_content">
                        <a href="https://maps.app.goo.gl/jbLqe65ZFFcu3edY9" target="_blank" rel="noreferrer">
                            {t('Vardananc 16, Yerevan, Armenia')}
                        </a>
                    </div>
                </div>
                <div className="map-navigation_item">
                    <img src={Clock} alt="address" />
                    <div className="clock_content">
                        {t('Monday - Sunday')} 10:00 - 20:00
                    </div>
                </div>
                <div className="map-navigation_item">
                    <img src={Phone} alt="address" />
                    <div
                        className="clock_content"
                        onClick={() => { window.open('tel:+37455338007') }}
                        style={{ cursor: "pointer" }}
                    >
                        +374 55 338007
                    </div>
                </div>

                <div className="map-navigation_item">
                    <img src={Email} alt="address" />
                    <div
                        className="clock_content"
                        style={{ cursor: "pointer" }}
                        onClick={() => window.location.assign("mailto:marketing@chicchoc.top?subject=Subject&body=Your%20message%20here")}
                    >
                        marketing@chicchoc.top
                    </div>

                </div>
            </div>

            <div className="map-image">
                <img src={Map} alt="map" />
            </div>



        </div>
    )

}

export default Contact;