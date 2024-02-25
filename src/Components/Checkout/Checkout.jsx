import { useFormik } from 'formik';
import React, { useContext, useState } from 'react';
// import styles from './Checkout.module.css';
import * as Yup from 'yup'
import { CartContext } from '../../Context/CartContext';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';
export default function Checkout() {
  let navigate= useNavigate()
let [online,setOnline]=useState(false)
let {cartId,setNumberOfProducts}= useContext(CartContext)
 async function paymentFun(shippingAddress){
   
  const endPoint=online?`https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartId}?url=http://localhost:3000`
 :`https://ecommerce.routemisr.com/api/v1/orders/${cartId}` 
 let {data}= await axios.post(endPoint,{shippingAddress},
 {headers:{
    token:localStorage.getItem("token")
   }})
   console.log(data)
   if(data.status === "success"){
    toast.success("order Placed Successfully")
    setNumberOfProducts(0)
    if(online){
      window.location.href=data.session.url;
    }else{
      setTimeout(()=>{
      navigate("/allorders")
      },4000)
    }
   
   }else{
    toast.error("fe Mo4kla ya Kber")
   }
  }

  
  const validationSchema=Yup.object({
    details:Yup.string().min(3,"Details is to Short").max(15,"Details is to Long").required("Details Required"),
    phone:Yup.string().matches(/^01[0125][0-9]{8}$/,"Invalid Phone Number").required("Phone Required"),
    city:Yup.string().required("City Required")
  })
   const formValidation=useFormik({
     initialValues:{
       details:"",
       phone:"",
       city:""
     },
     onSubmit:(values)=>{
      paymentFun(values)
     },
     validationSchema:validationSchema
   })
  

  return <>
  <div className="container">
  <Helmet>
  <title>Checkout</title>
  <meta name="description" content="Helmet application" />
</Helmet>
  <form onSubmit={formValidation.handleSubmit} className='p-5'>
 <div className="position-relative input-group flex-nowrap mt-5 my-5">
 
  <div className="input-group-text" id="addon-wrapping">Deatils</div>
  <input onChange={formValidation.handleChange} value={formValidation.values.details} onBlur={formValidation.handleBlur} name="details"   type="text" className="form-control" placeholder="Deatils" aria-label="Username" aria-describedby="addon-wrapping" />
  {formValidation.errors.details && formValidation.touched.details? <div className='alert alert-danger end-0 top-100 position-absolute'>{formValidation.errors.details}</div>:null}
  </div>
<div className="input-group flex-nowrap mt-3 my-5">
<span className="input-group-text" id="addon-wrapping">Phone</span>
<input onChange={formValidation.handleChange} value={formValidation.values.phone} onBlur={formValidation.handleBlur} type="tel" className="form-control" placeholder="phone" name='phone' aria-label="phone" aria-describedby="addon-wrapping" />
{formValidation.errors.phone && formValidation.touched.phone? <div className='alert alert-danger end-0 top-100 position-absolute'>{formValidation.errors.phone}</div>:null}
</div>

<div className="input-group flex-nowrap mt-3 my-5">
<span className="input-group-text" id="addon-wrapping">City</span>
<input onChange={formValidation.handleChange} value={formValidation.values.city} onBlur={formValidation.handleBlur} type="text" className="form-control" placeholder="city" name='city' aria-label="Username" aria-describedby="addon-wrapping" />

{formValidation.errors.city && formValidation.touched.city? <div className='alert alert-danger end-0 top-100 position-absolute'>{formValidation.errors.city}</div>:null}
</div>
<div className="d-flex align align-items-center">
<input type="checkbox" className='form-check-input' onChange={()=> setOnline(!online)} /> Online

</div>
{
  online? <button className='mx-2 mt-1  btn bg-main text-white '  disabled={!(formValidation.isValid && formValidation.dirty )}>Online Payment</button>:<button className='mx-2 mt-1 btn bg-main text-white' disabled={!(formValidation.isValid && formValidation.dirty )}>Cash Payment</button> 
}



  </form>
  </div>
  </>
}
