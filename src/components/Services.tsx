import React from "react";
import ServiceItem from "./ServiceItem";
import BG_1 from "../assets/service-bg/bg_1.svg";
import BG_2 from "../assets/service-bg/bg_2.svg";
import BG_3 from "../assets/service-bg/bg_3.svg";
import BG_4 from "../assets/service-bg/bg_4.svg";
import BG_5 from "../assets/service-bg/bg_5.svg";
import BG_6 from "../assets/service-bg/bg_6.svg";
import BG_7 from "../assets/service-bg/bg_7.svg";
import BG_8 from "../assets/service-bg/bg_8.svg";
import BG_9 from "../assets/service-bg/bg_9.svg";
import BG_10 from "../assets/service-bg/bg_10.svg";
import BG_11 from "../assets/service-bg/bg_11.svg";
import BG_12 from "../assets/service-bg/bg_12.svg";
import BG_13 from "../assets/service-bg/bg_13.svg";

function Services () {
    return (
        <div className="layout">
            <div className="service_page_1">
                <div className="home_page_1_title">
                    Visit our calm retreat and leave behind the busy pace of daily life. Our skilled technicians will provide you with exceptional nail care, creating the perfect experience for you.
                </div>
                <div className="home_page_1_content">
                    Services
                </div>
            </div>

            <div className="services">
                <div className="services-title">Manicure<span>.</span></div>
                <div className="service-content">
                    <ServiceItem
                        background_1={BG_1}
                        text="Classic Manicure"
                        price="3.000"
                        hour="1"
                        minute="10"
                    />
                    <ServiceItem
                        background_1={BG_2}
                        text="Gel Nail Polish"
                        price="9.000"
                        hour="1"
                        minute="10"
                    />
                    <ServiceItem
                        background_1={BG_3}
                        text="Japan Style."
                        price="12.000"
                        minute="45"
                    />
                    <ServiceItem
                        background_1={BG_4}
                        text="Nail Fixing"
                        price="3.000"
                        minute="45"
                    />
                    <ServiceItem
                        background_1={BG_5}
                        text="Nail Refill"
                        price="15.000-20.000"
                        minute="45"
                    />
                    <ServiceItem
                        background_1={BG_6}
                        text="Refill Correction"
                        price="18.000"
                        minute="45"
                    />
                </div>
            </div>

            <div className="services">
                <div className="services-title">Pedicure<span>.</span></div>
                <div className="service-content">
                    <ServiceItem
                        background_1={BG_7}
                        text="Classic Pedicure."
                        price="9.000"
                        hour="1"
                        minute="30"
                    />
                    <ServiceItem
                        background_1={BG_8}
                        text="Gel Pedicure."
                        price="12.000"
                        hour="1"
                        minute="10"
                    />
                </div>
            </div>

            <div className="services margin-bottom">
                <div className="services-title">face skin care<span>.</span></div>
                <div className="service-content">
                    <ServiceItem
                        background_1={BG_9}
                        text="Daily Make-Up."
                        price="10.000-15000"
                        hour="1"
                        minute="30"
                    />
                    <ServiceItem
                        background_1={BG_10}
                        text="Wedding Make-Up."
                        price="20.000"
                        hour="1"
                        minute="10"
                    />
                    <ServiceItem
                        background_1={BG_11}
                        text="Eyebrow Shaping."
                        price="2.000"
                        hour="1"
                        minute="10"
                    />
                    <ServiceItem
                        background_1={BG_12}
                        text="Lamination."
                        price="12.000"
                        hour="1"
                        minute="10"
                    />
                    <ServiceItem
                        background_1={BG_13}
                        text="Waxing."
                        price="3.000-5000"
                        hour="1"
                        minute="10"
                    />
                </div>
            </div>


        </div>
    )
}

export default Services;