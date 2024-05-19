import React from "react";
import Address from "../assets/address.svg";
import Clock from "../assets/clock.svg";
import Phone from "../assets/phone.svg";
import Email from "../assets/email.svg";
import Map from "../assets/map.png";
import {Link} from "react-router-dom";

function Contact () {
    return (
        <div className="layout">
            <div className="contacts_page_1">
                <div className="home_page_1_title">
                    Feel free to reach out to us using any of the methods below. Our dedicated team is ready to assist you and ensure that your experience with us is nothing short of exceptional.
                </div>
                <div className="home_page_1_content">
                   Contact Us
                </div>
            </div>

            <div className="map-navigation">
                <div className="map-navigation_item">
                    <img src={Address} alt="address"/>
                    <div className="address_content">
                        <a href="https://www.google.com/maps/place/6+Vardanants+St,+Yerevan+0010/@40.1747507,44.521163,17z/data=!3m1!4b1!4m6!3m5!1s0x406abcf15f84eed9:0x2d04aa9d967577c1!8m2!3d40.1747507!4d44.521163!16s%2Fg%2F11bw40ssvx?entry=ttu" target="_blank">
                            Vardananc 16, Yerevan, Armenia
                        </a>
                    </div>
                </div>
                <div className="map-navigation_item">
                    <img src={Clock} alt="address"/>
                    <div className="clock_content">
                        Monday - Sunday 10:00 - 20:00
                    </div>
                </div>
                <div className="map-navigation_item">
                    <img src={Phone} alt="address"/>
                    <div className="clock_content" onClick={()=>{window.open('+374 98 889878')}} style={{cursor:"pointer"}}>
                        +374 98 889878
                    </div>
                </div>
                <div className="map-navigation_item">
                    <img src={Email} alt="address"/>
                    <div className="clock_content" style={{cursor:"pointer"}} onClick={() => {window.location.assign("chichoc.beautysalon@gmail.com")}}>
                        chichoc.beautysalon@gmail.com
                    </div>
                </div>
            </div>

            <div className="map-image">
                <img src={Map} alt="map"/>
            </div>



            </div>
    )

}

export default Contact;