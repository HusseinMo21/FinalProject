import React, { useContext, useEffect, useState } from 'react';
import styles from './SubCategories.module.css';
import { useParams } from 'react-router-dom';
import { CategoryContext } from '../../Context/CategoryContext';
import img1 from '../../Assets/images/Ha.jpeg'
import Loader from './../Loader/Loader';

export default function SubCategories() {
 const {getsubCategories}= useContext(CategoryContext)
  const {id}= useParams()
  const [getData,setgetData]= useState([])
  let [isLoading,setIsLoading ]=useState(true)
async function callingSubCat(){
    let {data} = await getsubCategories(id)
    setgetData(data);
    setIsLoading(false)
  }

  useEffect(()=>{
    callingSubCat()
  },[])

  return <>
   <div className="container">
   <div className="row">
   {isLoading ? <Loader /> : getData?.map((product) =><>
   
   <div key={product?._id} className="col-md-3 my-5 text-center">
   <div className="card">
  <img src={img1}  className="card-img-top w-100" alt={product?.name}/>
  <div className="card-body">
    <h5 className="card-title">{product?.name}</h5>
    <p className="card-text">{product?.slug.split('').splice(0, 20).join('')}</p>
  </div>
</div>
   
   </div>
   </>
   )}
   </div>
   </div>
  </>
}
