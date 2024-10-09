import React from "react";
import { CartProvider } from "./cartContext";
import { BrowserRouter as Router, Route, Routes, Navigate,} from "react-router-dom";
import HomePage from "./HomePage";
import Shoes from "./Shoes";
import Sandales from "./Sandales";
import TShirts from "./TShirts";
import Cart from "./cart";
import Test from "./test";
import YouCanPay  from "./payTest";
import ScrollToTop from "./scrollToTop";
import { PaymentProvider } from "./paymentContext";
import Checkout from "./checkout";
import ProductDetail from "./ProductDetail";
import { ProductsContextProvider } from "./ProductsContext";


const App : React.FC = () =>{

    return(
      <PaymentProvider>
      <CartProvider>
      <ProductsContextProvider>
      <Router>
          <ScrollToTop/>
          <Routes>
            <Route path='productDetail/:productType/:category/:ref' element={<ProductDetail/>}/>
            <Route path="/test" element={<Test/>}/>
            <Route path="/" element={<Navigate to="/Home"/>}/>
            <Route path="/Home" element={<HomePage/>} />
            <Route path="/Shoes" element={<Shoes/>}/>
            <Route path="/Sandals"  element={<Sandales/>} />
            <Route path="/Shirts"  element={<TShirts/>} />
            <Route path="/YourCart" element={<Cart/>}/>
            <Route path="/Checkout" element={<Checkout/>}/>
            <Route path="/pay" element={<YouCanPay pubKey="pub_sandbox_1bfc0387-7aea-49ab-b51e-930e5" tokenId='fake-token-id-for-testing'/>}/>
          </Routes>
        </Router>
      </ProductsContextProvider>
      </CartProvider>
      </PaymentProvider>
    );



}

export default App
