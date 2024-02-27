import React from 'react';
import styles from './Layout.module.css';
import { Outlet } from 'react-router-dom';
import Navbar from '../Navbar/Navbar'
import WishLish from '../WishLish/WishLish';
export default function Layout() {
  return <>
  <Navbar/>
  <WishLish />
  <Outlet></Outlet>

  </>
}
