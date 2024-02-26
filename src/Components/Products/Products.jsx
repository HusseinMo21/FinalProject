import React, { useContext, useState } from "react";
// import styles from "./Products.module.css";
import axios from "axios";
import { useQuery } from "react-query";
// import { BallTriangle } from "react-loader-spinner";
import { Link } from 'react-router-dom';
import { CartContext } from './../../Context/CartContext';
import toast from 'react-hot-toast';
import Loader from "../Loader/Loader";
import { Helmet } from "react-helmet";
export default function Products() {

  const [isClicked, setIsClicked] = useState(false);

  const y=[]
  async function addtoWish(productId,e){
    let {data}= await axios.post(`https://ecommerce.routemisr.com/api/v1/wishlist`,{
      productId
    },{
        headers:{
            token:localStorage.getItem("token")
        }
    })
    
    y.push(productId)
    e.target.classList.replace('text-info','text-danger')
    setIsClicked(!isClicked)
    localStorage.setItem("idwish",y)
    toast.success(data.message)
    
  }
if(localStorage.getItem("idwish") !== null){
let x=localStorage.getItem("idwish")
console.log(x);
}

async function deleteWish(productId,e){
  let {data}= await axios.delete(`https://ecommerce.routemisr.com/api/v1/wishlist/${productId}`,{
      headers:{
          token:localStorage.getItem("token")
      }
  })
  console.log(data);
  e.target.classList.replace('text-danger','text-info')
  toast.success(data.message)
  

}





const {addToCart} = useContext(CartContext)
  async function addProductToCart(id) {
    let cartDetails = await addToCart(id)
    if(cartDetails.status === "success"){
      toast.success('el7md Le Allah.');
        }else{
          toast.error(cartDetails.message);
        }
  }
  // function getOnfo(id,e){
  //   e.target.classList.replace('text-info','text-danger')
  // }


  function getProducts() {
    return axios.get(`https://ecommerce.routemisr.com/api/v1/products`);
  }
  let { isLoading, data} = useQuery(
    "products",
    getProducts
  );

  return (
    <>
    <Helmet>
    <title>Products</title>
    <meta name="description" content="Helmet application" />
</Helmet>
      {isLoading ? <Loader /> : (
        <div className="container py-2">
          <h2>Featuerd Products</h2>
          <div className="row">
            {data?.data.data.map((product,idx) => (
              <div key={product.id} className="col-md-2">
              <div className="product cursor-pointer py-3 px-2">
              <Link to={`/details/${product.id}`} className=" text-decoration-none text-dark">
                  <img
                    className="w-100"
                    src={product.imageCover}
                    alt={product.title}
                  />
                  <span className="text-main font-sm fw-bolder">
                    {product.category.name}
                  </span>
                  <h3 className="h6 text-white">
                    {product.title.split(" ").slice(0, 3).join(" ")}
                  </h3>
                  <div className="d-flex text-white justify-content-between mt-3">
                    <span>{product.price} EGP</span>
                 <span><i className="fas fa-star rating-color"  ></i>
                 {product.ratingsAverage}  
                 </span>
                  </div>
                  </Link>
                  {localStorage.getItem("idwish")?.includes(product.id) ? <span onClick={(e) => deleteWish(product.id,e)}><i className="fas fa-heart" ></i></span> :<span  onClick={(e) => addtoWish(product.id,e)}><i className="fas fa-heart"></i></span>}
                  <button onClick={() => addProductToCart(product.id)} className=" btn bg-main text-white w-100 btn-sm mt-3">
                    add to Cart
                  </button>
                </div>
               
                </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
}
// <span onClick={() => setInWishList(!inWishList)}>{inWishList?<i  className="fas fa-heart rating-color mx-1"></i>:<i  className="fa-regular fa-heart rating-color mx-1"></i> }</span> 

// <span onClick={(e) => addtoWish(product.id,e)}><i className="fas fa-heart text-info"></i></span>