import React, { useEffect, useState } from "react";
import Header from "./header";
import Test from "./test";
import Footer from "./footer.tsx";
import ProductCarousel from "./ProductCarousel.tsx";
import packageJson from "../package.json";
import { Shoe } from "./Shoes.tsx";
import axios from "axios";
import "./HomePage.css";
import { TbRosetteDiscount } from "react-icons/tb";

const HomePage: React.FC = () => {
    const apiUrl = packageJson.config.backendURL;
    const [allData, setAllData] = useState<Shoe[]>([])
    const [productCPromo, setProductCPromo] = useState<Shoe[]>([])
    const [productCNoPromo, setProductCNoPromo] = useState<Shoe[]>([])
    
    useEffect(()=>{
      const getData = async () =>{
              const newestShoes = await axios.get(`${apiUrl}api/getNewestShoes`)
              setAllData(newestShoes.data.list_newest_shoes || []);
              setProductCPromo(allData.filter((i)=>{if(i.promo!=0){return true}else{return false}}))
              setProductCNoPromo(allData.filter((i)=>{if(i.promo==0){return true}else{return false}}))
              
      };
      getData();

    },[])

    return (<>
        <Header />        
        <Test/>
        <div className="ProductsPromoHome">
            <div className="HomeTitle fw-bold rounded">
                <TbRosetteDiscount className="HomeTitleIcon" />
                Our promotions
                <TbRosetteDiscount className="HomeTitleIcon" />
            </div>
            <div className="ProductsPromoAnnouncement">
            </div>
            <ProductCarousel Data={productCPromo}/>
        </div>
        <div className="ProductsHome">
        <div className="HomeTitle fw-bold rounded">
                <TbRosetteDiscount className="HomeTitleIcon" />
                Our product
                <TbRosetteDiscount className="HomeTitleIcon" />
            </div>
            <div className="ProductsPromoAnnouncement">
            </div>
            <ProductCarousel Data={productCNoPromo}/>
        </div>
        
        <Footer/>    
    </>
    );
};

export default HomePage;
