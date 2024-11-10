import React, {useEffect, useState} from "react";
import ServiceItem from "./ServiceItem";
import {allServices} from "../constants/allServices";
import {useNavigate} from "react-router";

function Services () {
    // const [selectedService, setSelectedService] = useState([]) //if choose many service
    const navigate = useNavigate();

    useEffect(() => {
        localStorage.setItem("selectedService", JSON.stringify([]));

    },[])

    const handleSelectService = (serviceItem:any) => {
        // let services:any = [...selectedService,serviceItem] //if choose many service
        localStorage.setItem("selectedService", JSON.stringify(serviceItem));
        navigate("/book")
        // setSelectedService(serviceItem) //if choose many service
    };


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
                    {allServices.manicure.map((serviceItem:any,index) => {
                        return (
                            <ServiceItem
                                key={index}
                                background_1={serviceItem.bg}
                                service={serviceItem.value}
                                startPrice={serviceItem.startPrice}
                                endPrice={serviceItem.endPrice}
                                hour={serviceItem.hour}
                                minute={serviceItem.minute}
                                timeToMinute={serviceItem.timeToMinute}
                                func={()=>handleSelectService(serviceItem)}
                            />
                        )
                    })}
                </div>
            </div>

            <div className="services">
                <div className="services-title">Pedicure<span>.</span></div>
                <div className="service-content">
                    {allServices.pedicure.map((serviceItem:any, index) => {
                        return (
                            <ServiceItem
                                key={index}
                                background_1={serviceItem.bg}
                                service={serviceItem.value}
                                startPrice={serviceItem.startPrice}
                                endPrice={serviceItem.endPrice}
                                hour={serviceItem.hour}
                                minute={serviceItem.minute}
                                timeToMinute={serviceItem.timeToMinute}
                                func={()=>handleSelectService(serviceItem)}
                            />
                        )
                    })}
                </div>
            </div>

            <div className="services margin-bottom">
                <div className="services-title">face skin care<span>.</span></div>
                <div className="service-content">
                    {allServices.faceSkinCare.map((serviceItem:any, index   ) => {
                        return (
                            <ServiceItem
                                key={index}
                                background_1={serviceItem.bg}
                                service={serviceItem.value}
                                startPrice={serviceItem.startPrice}
                                endPrice={serviceItem.endPrice}
                                hour={serviceItem.hour}
                                minute={serviceItem.minute}
                                timeToMinute={serviceItem.timeToMinute}
                                func={()=>handleSelectService(serviceItem)}
                            />
                        )
                    })}
                </div>
            </div>


        </div>
    )
}

export default Services;