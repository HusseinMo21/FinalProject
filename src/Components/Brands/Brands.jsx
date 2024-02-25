import React from 'react';
import styles from './Brands.module.css';
import Loader from '../Loader/Loader';
import { useQuery } from 'react-query';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';
export default function Brands() {
 
async function getCategories(){
  let {data} = await axios.get("https://ecommerce.routemisr.com/api/v1/brands")
  return data
}


let {data , isLoading } = useQuery("categories", getCategories)


  return <>
  <Helmet>
  <title>Brands</title>
  <meta name="description" content="Helmet application" />
</Helmet>
  {isLoading ? <Loader /> : (
    <div className="container py-2">
      <h2>Brands</h2>
      <div className="row">
        {data?.data.map((product) => (
          <div key={product._id} className="col-md-2 mt-5 cursor-pointer">
   <Link to={`/spc/${product._id}`} className='text-decoration-none'>
   <img src={product.image} height={300} className='w-100' alt="" />
    <h2 className='text-center text-white'>{product.name}</h2>
   </Link>
    </div>
        ))}
      </div>
    </div>
  )}



  </> 

}