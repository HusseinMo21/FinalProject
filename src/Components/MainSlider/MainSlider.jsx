import React from "react";
// import styles from './MainSlider.module.css';
import Slider from "react-slick";
import img1 from "../../Assets/images/slider-image-1.jpeg";
import img2 from "../../Assets/images/slider-image-2.jpeg";
import img3 from "../../Assets/images/slider-image-3.jpeg";
import gsap from 'gsap';
import { useRef } from "react";
// import { useLayoutEffect } from "react";
import { useGSAP } from "@gsap/react";
export default function MainSlider() {
  
 const comp= useRef(null)

useGSAP(()=>{
  const t1=gsap.timeline();

  t1.from('#slider2',{
    x:"-330%",
    duration:2
  })

  t1.from('#slider',{
    x:"-150%",
    duration:3
  })

},{scope:comp})


  var settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplayspeed:500,
   arrows : false,
  };
  return (
    <>
      <div className="container mt-5" ref={comp}>
        <div className="row">
          <div className="col-md-8" id="slider">
            <Slider {...settings}>
              <img src={img1} className="w-100" alt="" />
              <img src={img2} className="w-100" alt="" />
              <img src={img3} className="w-100" alt="" />
            </Slider>
          </div>
          <div className="col-md-4" id="slider2">
            <img src={img1} className="w-100 mb-2" alt="" />
            <img src={img2} className="w-100" alt="" />
          </div>
        </div>
      </div>
    </>
  );
}
