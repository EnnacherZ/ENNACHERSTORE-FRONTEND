import React from "react";
import './Sandales.css'
import Header from "./header";


export interface SandalSize {
    productId: number;
    size: number;
    quantity: number;
  }

export interface Sandal {
  id: number;
  productType : string;
  category: string;
  ref: string;
  name: string;
  price: number;
  promo: number;
  image: string;
  image1: string;
  image2: string;
  image3: string;
  image4: string;
  newest: boolean;
  sizes: SandalSize[];
  }

const Sandales: React.FC = () =>{

    
    return(
        <>
        <Header/>
        </>
    );


};
export default Sandales;