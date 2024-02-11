import React from 'react';
import styles from './Products.module.css';
import axios from 'axios';
import { useQuery } from 'react-query';
import { BallTriangle } from 'react-loader-spinner'
export default function Products() {

  


  function getProducts(){
   return axios.get(`https://ecommerce.routemisr.com/api/v1/products`)
  }
let {isLoading , isError , data , isFetching}=useQuery("products",getProducts)


  return <>
 {isLoading?<div className="w-100 vh-100 py-5 d-flex justify-content-center ">
 <BallTriangle
  height={100}
  width={100}
  radius={5}
  color="#4fa94d"
  ariaLabel="ball-triangle-loading"
  wrapperStyle={{}}
  wrapperClass=""
  visible={true}/>
 </div>: <div className="container py-2">
 <h2>Featuerd Products</h2>
 <div className="row">
{data?.data.data.map(product=><div key={product.id} className="col-md-2">
<div className="product cursor-pointer py-3 px-2">
<img className='w-100' src={product.imageCover} alt={product.title} />
<span className='text-main font-sm fw-bolder'>{product.category.name}</span>
<h3 className='h6'>{product.title.split(" ").slice(0,2).join(" ")}</h3>
<div className="d-flex justify-content-between mt-3">
<span>{product.price} EGP</span>
<span><i className="fa-regular fa-heart"></i>{product.ratingsAverage}</span>

</div>
<button className='btn bg-main text-white w-100 btn-sm mt-3'>add to Cart</button>
</div>
 </div>)}
 </div>
 </div>}
 
  </>
}
