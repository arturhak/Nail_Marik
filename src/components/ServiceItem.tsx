import React from "react";
import MainButton from "../buttons/MainButton";


function ServiceItem (props:any)  {
    return (

        <div  className="service-component">
            <img src={props.background_1} alt="bg"/>

            <div className="service-component_content">
                <div className="service-component_content_left">
                    <div className="service-component_content_left-top">
                        {props.service}<span>.</span>
                    </div>
                    <div className="service-component_content_left-bottom">
                        {props.endPrice ? <div className="price">{props.startPrice} - {props.endPrice} AMD</div>: <div className="price">{props.startPrice} AMD</div>}
                        <div className="hour">
                            {props.hour? <span>{props.hour} hr</span>: ""}
                            {props.minute? <span> {props.minute} min</span>: ""}
                        </div>
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