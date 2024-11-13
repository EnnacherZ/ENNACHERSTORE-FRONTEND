import React from "react";
import { CartProvider } from "./Contexts/cartContext";
import { BrowserRouter as Router, Route, Routes, Navigate,} from "react-router-dom";
import HomePage from "./Components/HomePage";
import Shoes from "./Components/Shoes";
import Sandales from "./Components/Sandales";
import TShirts from "./Components/TShirts";
import Cart from "./Components//cart";
import Test from "./Components//test";
import ScrollToTop from "./Components//scrollToTop";
import { PaymentProvider } from "./Contexts/paymentContext";
import Checkout from "./Components/checkout";
import ProductDetail from "./Components//ProductDetail";
import { ProductsContextProvider } from "./Contexts/ProductsContext";
import { LangContextProvider } from "./Contexts/languageContext";
import { DataContextProvider } from "./Contexts/dataContext";
import SuccessTrans from "./Components/successTrans";
import ModifyPdfExample from "./pdf";


const App : React.FC = () =>{

    return(
      <LangContextProvider>
      <DataContextProvider>
      <CartProvider>
      <PaymentProvider>
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
            <Route path="/Trans" element={<SuccessTrans/>}/>
            <Route path="pdf" element={<ModifyPdfExample/>}/>
          </Routes>
      </Router>
      </ProductsContextProvider>
      </PaymentProvider>
      </CartProvider>
      </DataContextProvider>
      </LangContextProvider>
    );



}

export default App
