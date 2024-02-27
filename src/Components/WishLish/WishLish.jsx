import React, {  useContext, useLayoutEffect, useState } from 'react';
import styles from './WishLish.module.css';
import { motion ,useAnimationControls} from "framer-motion"
import axios from 'axios';
import toast from 'react-hot-toast';
import { WishContext } from './../../Context/Wish';
import { useQuery } from "react-query";
export default function WishLish() {

let {callApi} = useContext(WishContext)

  const [isOpen,setIsOpen] =useState(false)  
  const controls = useAnimationControls()

  const handleClick = ()=>{
    setIsOpen(!isOpen)
   
    
  }
  function getdata() {
    return callApi();
  }
  let {data} = useQuery("wishList",getdata,{
    cacheTime:0,
    refetchInterval:10,
  });
 


  async function deleteWish(productId,e){
    let {data}= await axios.delete(`https://ecommerce.routemisr.com/api/v1/wishlist/${productId}`,{
        headers:{
            token:localStorage.getItem("token")
        }
    })
    toast.success(data.message)
    getdata()
    localStorage.removeItem("idwish")
  }



  useLayoutEffect(()=>{
    if(isOpen){
      controls.start("open")
    }else{
      controls.start("close")
    }
  })
  const containerVariants = {
    close: {
      width:'4rem',
      height:'auto',
      transition:{
        type:"spring",
        damping:15,
        duration:0.5,
      }
    },
    open: {
      width:'25rem',
      height:'auto',
      transition:{
        type:"spring",
        damping:15,
        duration:0.5,
    }
  }
}

  return <>
  <motion.section
  variants={containerVariants}
  initial="close"
  animate={controls}
  className={styles.sideBar} >
 
 <i className="fas fa-heart fa-spin" onClick={handleClick}></i>
 <div className={styles.inner_sideBar}  >
    <div className="container">
    {data?.data.map((item,index)=>(
      <div className="row mt-1" key={index}>
  
      <div className={styles.Card}>
      <div className="col-md-4">
      <img src={item.imageCover} className='w-100 mt-1' alt="" />
     
      </div>
      <div className="col-md-8">
      <h2 className='text-center fs-6 mt-3'>{item.title}</h2>
      <div className="d-flex justify-content-between p-1">
      <h2 className='text-center fs-6 mx-1 mt-4'>{item.price}EGP</h2>
      <span className='text-center fs-6 '> <i  className="fas fa-star text-warning fs-6"></i>4.8</span>
      <i onClick={(e)=>deleteWish(item.id,e)} className='fa fa-trash text-success btn fs-6'></i>
  </div>
</div>
</div>
</div>))}
</div>
</div>
</motion.section>
    
   
  
   
    
   
  </>
}
