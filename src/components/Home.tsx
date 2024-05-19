import React, {createRef, RefObject} from "react";
import MainButton from "../buttons/MainButton";
import Slider from "./Slider";
import prev from "../assets/prev.svg";
import next from "../assets/next.svg";
import {CarouselRef} from "antd/es/carousel";
import Text from "../assets/text.svg"


const carouselRef: RefObject<CarouselRef> = createRef<CarouselRef>();
const onChangeNext = () => {
    carouselRef.current?.next()
};
const onChangePrev = () => {
    carouselRef.current?.prev()
};
function Home () {

    return (
        <div className="layout">
           <div className="home_page_1">
               <div className="home_page_1_title">
                   Our goal is to provide a luxurious and relaxing experience with excellent nail care and artistry, exceeding client expectations with a range of services including manicures, pedicures and creative nail designs.
               </div>
               <div className="home_page_1_content">
                   Dare to dream differently with us!
               </div>
           </div>
            <div className="content-footer">
                Got a quirky wish? We've got you covered! Let us sprinkle some magic and make it real, reflecting your awesome personality. And hey, while we're at it, let's pamper those nails with some luxe treatment too!
            </div>
            <div className="our-service">
                Our Services
            </div>
            <div className="service-items">
                <div className="service-item_1">
                    <div className="service-text">Manicure<span>.</span></div>
                </div>
                <div className="service-item_2">
                    <div className="service-text">Pedicure<span>.</span></div>
                </div>
            </div>
            <div className="content-footer">
                Get ready to witness perfection in action! Our awesome team is all about making your nails look and feel amazing. Whether you're after a fancy manicure or just chilling with a pedicure, we promise a super comfy vibe every step of the way.
            </div>
            <MainButton
                text="Go to Services"
                suffix={true}
            />
            <div className="home_page_2">
                <img src={Text} alt="text" className="home_page_2_content"/>
                <MainButton
                    text="Book Now"
                />
            </div>
            <div className="slide">
                <div className="slide-header">KIND WORDS FROM OUR CUSTOMERS</div>
                <div className="slider-group">
                    <Slider
                        carouselRef={carouselRef}
                    />
                    <div className="next-item-dots">
                        <img src={prev} alt="prev" onClick={onChangePrev}/>
                        <img src={next} alt="next" onClick={onChangeNext}/>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Home