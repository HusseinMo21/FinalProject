import './App.css';
import { RouterProvider, createHashRouter } from 'react-router-dom';
import Home from './Components/Home/Home'
import Products from './Components/Products/Products'
import Cart from './Components/Cart/Cart'
import Brands from './Components/Brands/Brands'
import Login from './Components/Login/Login'
import Register from './Components/Register/Register'
import Categories from './Components/Categories/Categories'
import Layout from './Components/Layout/Layout'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { UserContext } from './Context/UserContext';
import { useContext, useEffect } from 'react';
import ProtectedRoutes from './Components/ProtectedRoutes/ProtectedRoutes';
import ProductDeatils from './Components/ProductDeatils/ProductDeatils';
import Spc from './Components/Spc/Spc';
import Checkout from './Components/Checkout/Checkout';
import SubCategories from './Components/SubCategories/SubCategories';
import ForgetPassword from './Components/ForgetPassword/ForgetPassword';
import NotFound from './Components/NotFound/NotFound';
import MyOrders from './Components/MyOrders/MyOrders';
import Profile from './Components/Profile/Profile';

let routes = createHashRouter([
  { path: '/', element: <Layout />, children: [
    {index:true , element:<ProtectedRoutes><Home/></ProtectedRoutes>  },
    {path:'Products' , element:<ProtectedRoutes><Products/></ProtectedRoutes> },
    {path:'details/:productId' , element:<ProtectedRoutes><ProductDeatils/></ProtectedRoutes> },
    {path:'Cart' , element:<ProtectedRoutes><Cart/></ProtectedRoutes> },
    {path:'Categories' , element:<ProtectedRoutes><Categories/></ProtectedRoutes> },
    {path:'Brands' , element:<ProtectedRoutes><Brands/></ProtectedRoutes> },
    {path:'spc/:id' , element:<ProtectedRoutes><Spc/></ProtectedRoutes> },
    {path:'sub/:id' , element:<ProtectedRoutes><SubCategories/></ProtectedRoutes> },
    {path:'checkout', element:<ProtectedRoutes><Checkout/></ProtectedRoutes> },
    {path:'allorders', element:<ProtectedRoutes><MyOrders/></ProtectedRoutes> },
    {path:'profile', element:<ProtectedRoutes><Profile/></ProtectedRoutes> },
    {path:'forgetPassword' , element:<ForgetPassword/>},
    {path:'Login' , element:<Login/>},
    {path:'Register' , element:<Register/>},
    {path:'*' , element:<NotFound/>},
  ] }
])


function App(props) {
  let {setuserToken}=useContext(UserContext)

  useEffect(()=>{
    if(localStorage.getItem("token") !== null){
      setuserToken(localStorage.getItem("token"))
    }
  }, );


  return <>
  <RouterProvider router={routes}></RouterProvider>
  {props.children}
  </>
 
}

export default App;

