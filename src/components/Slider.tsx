import React, {createRef, RefObject} from "react";
import { Carousel } from "antd";
import {CarouselRef} from "antd/es/carousel";
import prev from "../assets/prev.svg"
import next from "../assets/next.svg"

const carouselRef: RefObject<CarouselRef> = createRef<CarouselRef>();
const onChangeNext = () => {
  carouselRef.current?.next()
};
const onChangePrev = () => {
  carouselRef.current?.prev()
};

const contentStyle: React.CSSProperties = {
  width: "100%",
  maxWidth: "600px",
  display:"flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  padding: "24px",
  gap: "24px",
 };

const Slider = () => (
  <div  className="carousel">
    <Carousel
        dots={false}
        ref={carouselRef}
    >
      {/*[1,2,3,4] => data from backend */}
      {[1,2,3,4].map((data,index)=> { return (
          <div>
            <div style={contentStyle}>
              <div className="header-dots">
                <div></div>
                <div className="author">A. Grirgoryan</div>
                <div className="next-item-dots">
                  <img src={prev} alt="prev" onClick={onChangePrev}/>
                  <img src={next} alt="next" onClick={onChangeNext}/>
                </div>
              </div>
              <div className="author-content">“The staff greeted me with genuine smiles and took the time to understand exactly what I wanted. Their attention to detail and commitment to customer satisfaction were evident from the get-go. Throughout my visit, the nail technician displayed unparalleled skill and precision, transforming my nails into a work of art.”</div>
            </div>
          </div>
      )
      })}
    </Carousel>
  </div>
);

export default Slider;
