import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { NavLink } from 'react-router-dom';
import logo from '../../Assets/images/freshcart-logo.svg'
import { UserContext } from '../../Context/UserContext';
import { CartContext } from '../../Context/CartContext';

export default function Navbar() {
let {numberOfProducts} =  useContext(CartContext)

  let navigate=useNavigate();
 function logout(){
  localStorage.removeItem("token")
  navigate("login")
  window.location.reload()
  
  }


  let {userToken}=useContext(UserContext)
  return <>
    <nav className={`text-white navbar navbar-expand-lg bg-body-tertiary `}>
      <div className="container">
        <Link className="navbar-brand" to="/">
          <img src={logo} alt="fresh cart logo" />
        </Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">

          {userToken!==null? <>  <li className="nav-item">
          <NavLink className={({ isActive }) => (isActive ? 'active nav-link bg-warning border border-1 rounded' : 'nav-link text-white')}to="/">Home</NavLink>
        </li>
        <li className="nav-item">
          <NavLink className={({ isActive }) => (isActive ? 'active nav-link bg-warning border border-1 rounded' : 'nav-link text-white')} to="/products">Products</NavLink>
        </li>
        <li className="nav-item">
          <NavLink className={({ isActive }) => (isActive ? 'active nav-link bg-warning border border-1 rounded' : 'nav-link text-white')} to="/categories">Categories</NavLink>
        </li>

        <li className="nav-item">
          <NavLink className={({ isActive }) => (isActive ? 'active nav-link bg-warning border border-1 rounded' : 'nav-link text-white')} to="/brands">Brands</NavLink>
        </li>
        </>:''}
          
          </ul>
          <ul className="navbar-nav ms-auto mb-2 mb-lg-0">

            <li className="nav-item d-flex align-items-center">
            <li className="nav-item">
            <NavLink className="nav-link position-relative" to="/cart"><i className="fa-solid fa-cart-shopping text-main"></i><span className="position-absolute top-0 start-75 translate-middle badge rounded-pill bg-main">
            {numberOfProducts}
            <span className="visually-hidden">Cart items</span>
          </span></NavLink>
          </li>
              <i className='fab mx-2 fa-facebook'></i>
              <i className='fab mx-2 fa-twitter'></i>
              <i className='fab mx-2 fa-instagram'></i>
              <i className='fab mx-2 fa-youtube'></i>
              <i className='fab mx-2 fa-tiktok'></i>
              <li className="nav-item">
              <Link className="nav-link text-white" to="/profile">Profile</Link>
            </li>
            </li>

            {userToken!==null? <> <li className="nav-item">
            <span className="nav-link cursor-pointer text-white" onClick={logout} >Logout</span>
          </li>  </>:<> <li className="nav-item">
          <Link className="nav-link " to="/login">Login</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/register">Register</Link>
        </li></>  }
           
           
         

          </ul>

        </div>
      </div>
    </nav>
  </>
}
