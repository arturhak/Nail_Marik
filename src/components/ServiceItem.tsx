import React from "react";
import MainButton from "../buttons/MainButton";
import { useTranslation } from "react-i18next";


function ServiceItem(props: any) {
    const { t } = useTranslation()

    return (
        <div className="service-component" style={{ backgroundImage: `url(${props.bgImage})` }}>
            <div className="service-component_content">
                <div className="service-component_content_left">
                    <div className="service-component_content_left-top">
                        {t(props.service)}<span>.</span>
                    </div>
                    <div className="service-component_content_left-bottom">
                        {props.endPrice ? <div className="price">{props.startPrice} - {props.endPrice} {t('AMD')}</div> :
                            <div className="price">
                                {props.startPrice} {t('AMD')} 
                                &nbsp;&nbsp;&nbsp;&nbsp;
                                <span className="hour">
                                    {props.hour ? <span>{props.hour} {t('hr')}</span> : ""}
                                    {props.minute ? <span> {props.minute} {t('min')}</span> : ""}
                                </span>
                            </div>}

                        {/* <div className="hour">
                            {props.hour ? <span>{props.hour} {t('hr')}</span> : ""}
                            {props.minute ? <span> {props.minute} {t('min')}</span> : ""}
                        </div> */}
                    </div>
                </div>
                <MainButton
                    text="Book Now"
                    width={true}
                    func={props.func}
                />

            </div>

        </div>
    )
}

export default ServiceItem;