import React from "react";
import { Carousel, message } from "antd";

const data: any = [

  {
    author: "Մ. Սարգսյան",
    message: "Chic-Choc եղունգների սրահը իսկական գոհար է Հայաստանում: Անձնակազմը չափազանց պրոֆեսիոնալ է, իսկ սրահը՝ հարմարավետ և ժամանակակից: Իմ եղունգները ստացվեցին անթերի՝ մանրակրկիտ ուշադրությամբ և հիանալի դիզայնով: Անձնակազմի ջերմ ընդունելությունը հաճելի դարձրեց իմ փորձը: Խորհուրդ եմ տալիս բոլորին, ովքեր փնտրում են որակյալ ծառայություններ Հայաստանում! 🌟"
  },

  {
    author: "V.Mughdusyan",
    message: "Chic-Choc Nail Salon exceeded all my expectations! The staff was welcoming, the atmosphere was relaxing, and my nails turned out absolutely stunning. Their attention to detail and professionalism are unmatched. Highly recommend for anyone seeking flawless nail art!"
  },

  {
    author: "A.Vardanyan",
    message: 'Awesome atmosphere, cool service, best personal! Thank you for being so Chic!'
  }
]

const Slider = ({ carouselRef }: any) => (

  <div className="carousel">
    <Carousel
      dots={false}
      ref={carouselRef}
    >
      {/*[1,2,3,4] => data from backend */}
      {data.map((item: any, index: any) => (
        <div className="slider-content" key={index}>
          <div className="author">{item.author}</div>
          <div className="author-content">{`“${item.message}”`}</div>
        </div>
      ))}
    </Carousel>
  </div>
);

export default Slider;
