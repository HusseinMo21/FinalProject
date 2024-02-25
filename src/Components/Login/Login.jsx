import { BallTriangle } from 'react-loader-spinner'
import React, { useContext, useState } from 'react';
import styles from './Login.module.css';
import { useFormik } from 'formik';
import * as Yup from 'yup'
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import { UserContext } from '../../Context/UserContext';
import { Helmet } from 'react-helmet';
export default function Login() {

  let {setuserToken}=useContext(UserContext)


  let navigate=useNavigate();

  let [errorMassage,seterrorMassage]=useState("")
  let [isLoading,setIsLoading]=useState(false)

  async function calLogin(reqBody){
    seterrorMassage("")
    setIsLoading(true)
  let {data} = await axios.post(`https://ecommerce.routemisr.com/api/v1/auth/signin`,reqBody)
  .catch(err=>{setIsLoading(false)
    seterrorMassage(err.response.data.message)})
    if(data.message === "success"){
      localStorage.setItem("token",data.token)
      setuserToken(data.token)
       navigate("/")
    }
  }

  
  let validationSchema=Yup.object({
    email:Yup.string().email("Invalid Email").required("Email Required"),
    password:Yup.string().matches(/^[A-Z][a-z0-9]{3,8}$/,"Invalid Password").required("Password Required")
  })

  let RegisterForm=useFormik({
    initialValues:{
     email:"",
      password:""
    },
    validationSchema,
    onSubmit:calLogin,

    
  })
  
  return <>
  <Helmet>
  <title>Login</title>
  <meta name="description" content="Helmet application" />
</Helmet>
   <div className="container w-75">
    <h3 className='mx-5 mt-3 px-5 text-white'>Register Now:</h3>
   
    <form onSubmit={RegisterForm.handleSubmit} className='mx-5 px-5'>
    {errorMassage && <div className='alert alert-danger'>{errorMassage}</div>}
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
    <Link to={"/register"}  className={`${styles.regbtn} 'btn  text-white mb-4'`} >Register</Link>
    <Link to={"/forgetPassword"}  className={`${styles.regbtn} 'btn  text-white mb-4'`} >ForgetPasswordd</Link>
  <button className='btn bg-main text-white d-block ms-auto mt-2' type='submit' disabled={!(RegisterForm.isValid && RegisterForm.dirty)}>{isLoading?<span className='text-center'> <BallTriangle
    height={20}
    width={20}
    radius={5}
    color="#ffffff"
    ariaLabel="ball-triangle-loading"
    wrapperStyle={{}}
    wrapperClass=""
    visible={true}
    
/></span>:"Login"}</button>

    </form>
    </div>
  </>


}
