import React from "react";
import { Carousel } from "antd";

const Slider = ({carouselRef}:any) => (
  <div  className="carousel">
    <Carousel
        dots={false}
        ref={carouselRef}
    >
      {/*[1,2,3,4] => data from backend */}
      {[1,2,3,4].map((data,index)=> { return (
            <div className="slider-content"  key={index}>
              <div className="author">A. Grirgoryan</div>
              <div className="author-content">“The staff greeted me with genuine smiles and took the time to understand exactly what I wanted. Their attention to detail and commitment to customer satisfaction were evident from the get-go. Throughout my visit, the nail technician displayed unparalleled skill and precision, transforming my nails into a work of art.”</div>
            </div>
      )
      })}
    </Carousel>
  </div>
);

export default Slider;
