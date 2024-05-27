import React from "react";
import MainButton from "../buttons/MainButton";


function ServiceItem (props:any)  {
    return (

        <div  className="service-component">
            <img src={props.background_1} alt="bg"/>

            <div className="service-component_content">
                <div className="service-component_content_left">
                    <div className="service-component_content_left-top">
                        {props.text}<span>.</span>
                    </div>
                    <div className="service-component_content_left-bottom">
                        <div className="price">{props.price} AMD</div>
                        <div className="hour">
                            {props.hour? <span>{props.hour} hr</span>: ""}
                            {props.minute? <span> {props.minute} min</span>: ""}
                        </div>
                    </div>
                </div>
                <MainButton
                    text="Book Now"
                    width={true}
                />

            </div>

        </div>
    )
}

export default ServiceItem;