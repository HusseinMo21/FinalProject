import './App.css';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
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

let routes = createBrowserRouter([
  { path: '/', element: <Layout />, children: [
    {index:true , element:<ProtectedRoutes><Home/></ProtectedRoutes>  },
    {path:'Products' , element:<ProtectedRoutes><Products/></ProtectedRoutes> },
    {path:'Cart' , element:<ProtectedRoutes><Cart/></ProtectedRoutes> },
    {path:'Categories' , element:<ProtectedRoutes><Categories/></ProtectedRoutes> },
    {path:'Brands' , element:<ProtectedRoutes><Brands/></ProtectedRoutes> },
    {path:'Login' , element:<Login/>},
    {path:'Register' , element:<Register/>},
  ] }
])


function App() {
  let {setuserToken}=useContext(UserContext)
 
  useEffect(()=>{
    if(localStorage.getItem("token") !== null){
      setuserToken(localStorage.getItem("token"))
    }
  }, );


  return <RouterProvider router={routes}></RouterProvider>
}

export default App;
