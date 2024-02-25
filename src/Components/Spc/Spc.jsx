import React, { useContext, useEffect, useState } from 'react';
// import styles from './SpcBrand.module.css';
import {useParams } from 'react-router-dom';
import { CategoryContext } from '../../Context/CategoryContext';
export default function Spc() {
 
  let [getData,setData]= useState([])
  let {id}= useParams();
 let {getSpcBrand} = useContext(CategoryContext);

 async function GetSpcBrand(){
    let {data} = await getSpcBrand(id)
    setData(data)
 }

 useEffect(()=>{
  GetSpcBrand();
 },[])

  return <>
  <div className="container">
  <h2 className='my-3 mx-5'>Your Brand Here :</h2>
  <div className="d-flex w-100 vh-100 justify-content-center align-items-center">
  <div className="row">
  <div className="col-md-6">
  <img src={getData?.image} className='w-100' width={'100%'} height={300} alt="" />
  </div>
  <div className="col-md-6">
  <h3 className='text-center mt-5 p-5 me-5'>{getData?.name}</h3>
  </div>
  </div>
  </div>
  </div>
  </>
}
