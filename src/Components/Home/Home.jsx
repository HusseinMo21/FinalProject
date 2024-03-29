import React, { useContext } from "react";
import { Helmet } from "react-helmet";
import MainSlider from "../MainSlider/MainSlider";
import CategorySlider from './../CategorySlider/CategorySlider';
import { Offline } from "react-detect-offline";
// import { useSelector } from "react-redux";
import { CartContext } from './../../Context/CartContext';
export default function Home() {
let {setNumberOfProducts}=  useContext(CartContext)
  if(localStorage.getItem("token")){
    setNumberOfProducts(localStorage.getItem("numOfCartItems"))
  }

    // useSelector((state)=> console.log(state))
  return<>
  <Helmet>
  <title>Home</title>
  <meta name="description" content="Helmet application" />
</Helmet>


<div>
<Offline> 
<p className="position-absolute  top-5 end-0 mx-5 mt-2 border border-2 border-danger bg-danger rounded"> <i className="fas fa-wifi"></i><span> Only shown when you're offline</span></p>
</Offline>
</div>




 

  <MainSlider/>
  <CategorySlider/>
  
  </>
}
