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
    const [productDetails, setProductDetails] = useState([])
    const [productCPromo, setProductCPromo] = useState<Shoe[]>([])
    const [productCNoPromo, setProductCNoPromo] = useState<Shoe[]>([])
    
    useEffect(()=>{
      const getData = async () =>{
              const newestShoes = await axios.get(`${apiUrl}api/getNewestShoes`)
              const ShoesData = await axios.get(`${apiUrl}api/getShoeSizes`)
              setAllData(newestShoes.data.list_newest_shoes || []);
              setProductDetails(ShoesData.data.list_shoeSizes || []);
     };
      getData();

    },[])
    useEffect(()=>{
        if (allData.length > 0) {
            const { promo, noPromo } = allData.reduce((acc, shoe) => {
                if (shoe.promo === 0) {
                    acc.noPromo.push(shoe);
                } else {
                    acc.promo.push(shoe);
                }
                return acc;
            }, { promo: [], noPromo: [] } as { promo: Shoe[]; noPromo: Shoe[] });

            setProductCPromo(promo);
            setProductCNoPromo(noPromo);
        }
    }, [allData])

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
            <ProductCarousel Data={productCPromo} DataDetails = {productDetails}/>
        </div>
        <div className="ProductsHome">
        <div className="HomeTitle fw-bold rounded">
                <TbRosetteDiscount className="HomeTitleIcon" />
                Our product
                <TbRosetteDiscount className="HomeTitleIcon" />
            </div>
            <div className="ProductsPromoAnnouncement">
            </div>
            <ProductCarousel Data={productCNoPromo} DataDetails = {productDetails}/>
        </div>
        
        <Footer/>    
    </>
    );
};

export default HomePage;
