import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup'
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import styles from './ForgetPassword.module.css';
import { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { BallTriangle } from 'react-loader-spinner';
export default function ForgetPassword() {

  let [isLoading,setIsLoading]=useState(false)

  async function callforgetPassword(val){
    setIsLoading(true)
  let {data} = await axios.post(`https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords`,val)
  console.log(data);
  if(data.statusMsg == "success"){
    toast.success(data.message)
    setIsLoading(false)
   }else{
    toast.error(data.message)
    setIsLoading(false)
   }
  }

  let validationSchema=Yup.object({
    email:Yup.string().email("Invalid Email").required("Email Required"),
  })

  let RegisterForm=useFormik({
    initialValues:{
     email:"",
    },
    validationSchema,
    onSubmit:callforgetPassword,

    
  })

  return <>

  <Helmet>
  <title>Forget Password</title>
  <meta name="description" content="Helmet application" />
</Helmet>
<div className="container w-75">
<h3 className='mx-5 mt-3 px-5 text-white'>Forget Password:</h3>

<form onSubmit={RegisterForm.handleSubmit} className='mx-5 px-5'>
<div className="form-group">
<label htmlFor="email">Email:</label>
<input type="email" id='email'  placeholder='email' className='form-control mb-3' value={RegisterForm.values.email} onChange={RegisterForm.handleChange} />
{RegisterForm.errors.email && RegisterForm.touched.email ?<div className='alert alert-danger'>{RegisterForm.errors.email}</div>:null}
</div>
<Link to={"/register"}  className={`${styles.regbtn} 'btn  text-white mb-4'`} >Register</Link>
<Link to={"/login"}  className={`${styles.regbtn} 'btn  text-white mb-4'`} >Login</Link>
<button className='btn bg-main text-white d-block ms-auto mt-2' type='submit' disabled={!(RegisterForm.isValid && RegisterForm.dirty)}>{isLoading?<span className='text-center'> <BallTriangle
height={20}
width={20}
radius={5}
color="#ffffff"
ariaLabel="ball-triangle-loading"
wrapperStyle={{}}
wrapperClass=""
visible={true}

/></span>:"Submit"}</button>

</form>
</div>

  
  </>
}
