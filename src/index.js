import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import CounterContextProvider from './Context/CounterContext';
import UserContextProvider from './Context/UserContext';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { QueryClient, QueryClientProvider } from 'react-query';
import CartContextProvider from './Context/CartContext';
import  { Toaster } from 'react-hot-toast';
import 'react-toastify/dist/ReactToastify.css';


const root = ReactDOM.createRoot(document.getElementById('root'));
let queryClient=new QueryClient()
root.render(
    <QueryClientProvider client={queryClient}>
    <CartContextProvider>
    <UserContextProvider>
    <CounterContextProvider>
    <App>
    <Toaster />
    </App>
    </CounterContextProvider>
    </UserContextProvider>
    </CartContextProvider>
    </QueryClientProvider>
   
   
);
