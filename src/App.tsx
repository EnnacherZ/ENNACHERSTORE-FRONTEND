import React from "react";
import { CartProvider } from "./Contexts/cartContext";
import { BrowserRouter as Router, Route, Routes, Navigate,} from "react-router-dom";
import HomePage from "./Components/HomePage";
import Shoes from "./Components/Shoes";
import Sandales from "./Components/Sandales";
import TShirts from "./Components/TShirts";
import Cart from "./Components//cart";
import Test from "./Components//test";
import YouCanPay  from "./payTest";
import ScrollToTop from "./Components//scrollToTop";
import { PaymentProvider } from "./Contexts/paymentContext";
import Checkout from "./Components//checkout";
import ProductDetail from "./Components//ProductDetail";
import { ProductsContextProvider } from "./Contexts/ProductsContext";
import { LangContextProvider } from "./Contexts/languageContext";


const App : React.FC = () =>{

    return(
      <LangContextProvider>
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
      </LangContextProvider>
    );



}

export default App
