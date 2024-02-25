import React, { useState } from 'react';
// import styles from './Register.module.css';
import { useFormik } from 'formik';
import * as Yup from 'yup'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { BallTriangle } from 'react-loader-spinner'
import { Helmet } from 'react-helmet';
export default function Register() {
  let navigate=useNavigate();

  let [errorMassage,seterrorMassage]=useState("")
  let [isLoading,setIsLoading]=useState(false)

  async function callRegister(reqBody){
    seterrorMassage("")
    setIsLoading(true)
  let {data} = await axios.post(`https://ecommerce.routemisr.com/api/v1/auth/signup`,reqBody)
  .catch(err=>{setIsLoading(false)
    seterrorMassage(err.response.data.message)})
    if(data.message === "success"){
       navigate("/login")
    }
  }

  let validationSchema=Yup.object({
    name:Yup.string().min(3,"Name is to Short").max(15,"Name is to Long").required("Name Required"),
    email:Yup.string().email("Invalid Email").required("Email Required"),
    password:Yup.string().matches(/^[A-Z][a-z0-9]{3,8}$/,"Invalid Password").required("Password Required"),
    rePassword:Yup.string().oneOf([Yup.ref("password")],"Password and rePassword Should Match").required("rePassword is Required"),
    phone:Yup.string().matches(/^01[0125][0-9]{8}$/,"Invalid Phone Number").required("Phone Required")
  })

  let RegisterForm=useFormik({
    initialValues:{
      name:"",
      email:"",
      password:"",
      rePassword:"",
      phone:""
    },
    onSubmit:callRegister,
    validationSchema,

    
  })



  return <>
  <Helmet>
  <title>Register</title>
  <meta name="description" content="Helmet application" />
</Helmet>
   <div className="container w-75">
    <h3 className='mx-5 mt-3 px-5'>Register Now:</h3>
   
    <form onSubmit={RegisterForm.handleSubmit} className='mx-5 px-5'>
    {errorMassage && <div className='alert alert-danger'>{errorMassage}</div>}
    <div className="form-group">
    <label htmlFor="name">name:</label>
    <input type="text" id='name'  placeholder='Name' className='form-control mb-3' value={RegisterForm.values.name} onChange={RegisterForm.handleChange} />
   {RegisterForm.errors.name && RegisterForm.touched.name ?<div className='alert alert-danger'>{RegisterForm.errors.name}</div>:null}
    </div>
    <div className="form-group">
    <label htmlFor="email">Email:</label>
    <input type="email" id='email'  placeholder='email' className='form-control mb-3' value={RegisterForm.values.email} onChange={RegisterForm.handleChange} />
    {RegisterForm.errors.email && RegisterForm.touched.email ?<div className='alert alert-danger'>{RegisterForm.errors.email}</div>:null}
    </div>
    <div className="form-group">
 
    <label htmlFor="password">Password:</label>
    <input type="password" id='password'  placeholder='password' className='form-control mb-3' value={RegisterForm.values.password} onChange={RegisterForm.handleChange} />
    {RegisterForm.errors.password && RegisterForm.touched.password ?<div className='alert alert-danger'>{RegisterForm.errors.password}</div>:null}
    </div>
    <div className="form-group">

    <label htmlFor="rePassword">rePassword:</label>
    <input type="password" id='rePassword'  placeholder='rePassword' className='form-control mb-3' value={RegisterForm.values.rePassword} onChange={RegisterForm.handleChange} />
    {RegisterForm.errors.rePassword && RegisterForm.touched.rePassword ?<div className='alert alert-danger'>{RegisterForm.errors.rePassword}</div>:null}
    </div>
    <div className="form-group">
    <label htmlFor="phone">Phone:</label>
    <input type="tel" id='phone'  placeholder='phone' className='form-control mb-3' value={RegisterForm.values.phone} onChange={RegisterForm.handleChange} />
    {RegisterForm.errors.phone && RegisterForm.touched.phone ?<div className='alert alert-danger'>{RegisterForm.errors.phone}</div>:null}
    </div>

   

  <button className='btn bg-main text-white d-block ms-auto' type='submit' disabled={!(RegisterForm.isValid && RegisterForm.dirty)}>{isLoading?<span> <BallTriangle
    height={20}
    width={20}
    radius={5}
    color="#ffffff"
    ariaLabel="ball-triangle-loading"
    wrapperStyle={{}}
    wrapperClass=""
    visible={true}
    
/></span>:"Register"}</button>
    </form>
    </div>
  </>
}
