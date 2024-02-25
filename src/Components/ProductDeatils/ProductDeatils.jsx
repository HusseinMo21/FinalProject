import React, { useContext, useEffect, useState } from 'react';
// import styles from './ProductDeatils.module.css';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { CartContext } from './../../Context/CartContext';
import toast from 'react-hot-toast';
export default function ProductDeatils() {

  async function addProductToCart(id) {
    let cartDetails = await addToCart(id)
    
    if(cartDetails.status === "success"){
      toast.success("Product added to cart successfully")
        }
  }



 const {addToCart}  =  useContext(CartContext)
  let [SingleProduct,setSingleProduct]= useState([]);
  const {productId} =useParams();
 async function getSpacifcProduct() {

    let {data}= await axios.get(`https://ecommerce.routemisr.com/api/v1/products/`+ productId);
    setSingleProduct(data?.data)
  }

  useEffect(()=>{
    getSpacifcProduct()    
  },[])

  return <>
    <div className="container">
   <div className="row my-5 p-5">
  {SingleProduct?<> 
    <div className="col-md-3 mt-4">
  <img src={SingleProduct.imageCover} className='w-100' alt="" />
  </div>
  <div className="col-md-9 mt-5">
  <p className='mt-5'>{SingleProduct.title}</p>
  <h5 className='text-main'>{SingleProduct?.category?.name}</h5>
 <p>{SingleProduct.description}</p>
 <div className="d-flex justify-content-between">
 <p>{SingleProduct.price}EGP</p>
<div className="new">
<i className='fa fa-star rating-color'></i><span>{SingleProduct.ratingsAverage}</span>
</div>
 </div>
 <button onClick={()=>addProductToCart(productId)} className="btn bg-main w-100 text-white btn-sm">+ add to cart</button>
  </div></> :''} 


   </div> 
    </div>
  </>
}
