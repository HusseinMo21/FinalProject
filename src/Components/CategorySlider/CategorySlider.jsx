import React, { useEffect, useState } from 'react';
// import styles from './CategorySlider.module.css';
import axios from 'axios';
import Slider from 'react-slick';
export default function CategorySlider() {
  var settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 8,
    slidesToScroll: 1,
  };

  const [categores,setCategores]=useState([])
  async function getCategores(){
    let {data}= await axios.get("https://ecommerce.routemisr.com/api/v1/categories")
    setCategores(data.data)
  }

  useEffect(()=>{
    getCategores()
  },[])
  return <>
    <div className="container my-5">
    <h2>Shoo Pouplar Categories</h2>
    <Slider {...settings}>

    {
      categores.map(categore=><div className="cat">
      <img src={categore.image} height={200} className='w-100 px-1' alt="" />
      <h5>{categore.name}</h5>
      </div>)
    }
    </Slider>
    </div>

  </>
}
