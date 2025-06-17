import React, {useEffect} from "react";
import ServiceItem from "./ServiceItem";
import {allServices} from "../constants/allServices";
import {useNavigate} from "react-router";
import {useTranslation} from "react-i18next";
import { babyServices } from "../constants/babyServices";

function Baby () {
    // const [selectedService, setSelectedService] = useState([]) //if choose many service
    const navigate = useNavigate();
    const {t} = useTranslation();

    useEffect(() => {
        localStorage.setItem("selectedHairService", JSON.stringify([]));

    },[])

    const handleSelectService = (serviceItem:any) => {
        // let services:any = [...selectedService,serviceItem] //if choose many service
        localStorage.setItem("selectedHairService", JSON.stringify(serviceItem));
        navigate("/hair")
        // setSelectedService(serviceItem) //if choose many service
    };


    return (
        <div className="layout">
            <div className="service_baby_page_1">
                <div className="home_page_1_title">
                    {t("The world of caring for your little ones. Our children's salon is created exclusively for children, with a pleasant environment, caring professionals and a cheerful atmosphere.Check out the services below")}
                </div>
                <div className="home_page_1_content">
                    {t('Services')}
                </div>
            </div>

            <div className="services">
                <div className="services-title">{t('For Girls')}<span>.</span></div>
                <div className="service-content">
                    {babyServices.girls.map((serviceItem:any,index) => {
                        return (
                            <ServiceItem
                                key={index}
                                bgImage={serviceItem.bg}
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
                <div className="services-title">{t('For Boys')}<span>.</span></div>
                <div className="service-content">
                    {babyServices.boys.map((serviceItem:any, index) => {
                        return (
                            <ServiceItem
                                key={index}
                                bgImage={serviceItem.bg}
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
                {/* <div className="services-title">{t("Men's Manicure/Pedicure")}<span>.</span></div> */}
                {/* <div className="service-content">
                    {allServices.faceSkinCare.map((serviceItem:any, index   ) => {
                        return (
                            <ServiceItem
                                key={index}
                                bgImage={serviceItem.bg}
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
                </div> */}
            </div>

            {/* <div className="services margin-bottom">
                <div className="services-title">{t("Design")}<span>.</span></div>
                <div className="service-content">
                    {allServices.design.map((serviceItem:any, index   ) => {
                        return (
                            <ServiceItem
                                key={index}
                                bgImage={serviceItem.bg}
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
            </div> */}


        </div>
    )
}

export default Baby;