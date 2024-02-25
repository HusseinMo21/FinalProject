import React from 'react';
// import styles from './Categories.module.css';
import { useQuery } from 'react-query';
import axios from 'axios';
import Loader from '../Loader/Loader';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';

export default function Categories() {

 

async function getCategories(){
  let {data} = await axios.get("https://ecommerce.routemisr.com/api/v1/categories")
  return data
}


let {data , isLoading } = useQuery("categories", getCategories)



return <>
<Helmet>
<title>Categories</title>
<meta name="description" content="Helmet application" />
</Helmet>
{isLoading ? <Loader /> : (
  <div className="container py-2">
    <h2>Category</h2>
    <div className="row">
      {data?.data.map((product) => (
        <div key={product._id} className="col-md-4 mt-5 cursor-pointer">
        <Link to={`/sub/${product._id}`} className='text-decoration-none'>
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



