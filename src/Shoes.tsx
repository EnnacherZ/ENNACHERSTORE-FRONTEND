import React, { useEffect, useState } from "react";
import Header from "./header";
import ProductAds from "./ProductAds.tsx";
import "./Shoes.css";
import { DataToFilter } from "./FilterSection";
import Products from "./products";
import Footer from "./footer.tsx";
import { LiaShoePrintsSolid } from "react-icons/lia";
import Marquee from "react-fast-marquee"
import packageJson from '../package.json';
import { FaCircleDot } from "react-icons/fa6";


export interface Shoe {
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
  sizes: ShoeSize[];
}
export   interface ShoeSize {
  productId: number;
  size: number;
  quantity: number;
}

const Shoes: React.FC = () => {
  const apiUrl = packageJson.config.backendURL;

  const [shoeProduct, setShoeProduct] = useState<Shoe[]>([]);
  const [filteredShoeProduct, setFilteredShoeProduct] = useState<Shoe[]>([]);
  const [shoeSizesProduct, setShoeSizesProduct] = useState<ShoeSize[]>([]);
  const [selectedCriteria, setSelectedCriteria] = useState<DataToFilter>({
        product : "",
        category : "",
        ref : "",
        name : "",})
  

  useEffect(() => {
    const eventSourceShoes = new EventSource(`${apiUrl}events/shoes/`);
    const eventSourceShoeSizes = new EventSource(`${apiUrl}events/shoe_sizes/`);

    eventSourceShoes.onmessage = (event) => {
      const { list_shoes } = JSON.parse(event.data);
      setShoeProduct(list_shoes);
      if(selectedCriteria){
        const filtredStreamedShoes = filterData(list_shoes, selectedCriteria);
        setFilteredShoeProduct(filtredStreamedShoes); 
      }else{ setFilteredShoeProduct(list_shoes);};
      
    };

    eventSourceShoeSizes.onmessage = (event) => {
      const { list_shoeSizes } = JSON.parse(event.data);
      setShoeSizesProduct(list_shoeSizes);
    };

    eventSourceShoes.onerror = (error) => {
      console.error('EventSource failed:', error);
    };

    eventSourceShoeSizes.onerror = (error) => {
      console.error('EventSource failed:', error);
    };

    return () => {
      eventSourceShoes.close();
      eventSourceShoeSizes.close();
    };
  }, [selectedCriteria]);


  const filterData = (data: Shoe[], criterias: DataToFilter) => {
    return data.filter((item) => {
      if(criterias.category===""&& criterias.name===""&& criterias.ref===""){return true}
      const categoryMatch = criterias.category
      ? item.category.replace(/\s/g, "").toLowerCase().includes(criterias.category.replace(/\s/g, "").toLowerCase())
      : false;

    const refMatch = criterias.ref
      ? item.ref.replace(/\s/g, "").toLowerCase().includes(criterias.ref.replace(/\s/g, "").toLowerCase())
      : false;

    const nameMatch = criterias.name
      ? item.name.replace(/\s/g, "").toLowerCase().includes(criterias.name.replace(/\s/g, "").toLowerCase())
      : false;

    return categoryMatch || refMatch || nameMatch;
    });
  };

  const handleShoeSearch = (criterias: DataToFilter) => {
    setSelectedCriteria(criterias);
    const filteredShoes = filterData(shoeProduct, criterias);
    setFilteredShoeProduct(filteredShoes);
  };

  return (<>

    <Header/>
    <ProductAds/>
    <div className="ShoesTitle fw-bold rounded">
      <LiaShoePrintsSolid className="ShoesTitleIcon" /> 
      Shoes models 
      <LiaShoePrintsSolid className="ShoesTitleIcon" /> 
    </div>
    <div className="ShoesAnnouncement ">
      <Marquee speed={50} gradient={false} >
        <span>
        <FaCircleDot /> Mocassins 
        </span>
        <span>
        <FaCircleDot /> Classics
        </span>
        <span>
        <FaCircleDot /> Baskets
        </span>
        <span>
        <FaCircleDot /> Medical
        </span>

      </Marquee>
    </div>
    <Products pData={filteredShoeProduct} pDataDetails={shoeSizesProduct} productShowed="Shoe" handleFilter={handleShoeSearch}/>

    <Footer/>

 

    </>
  );
};

export default Shoes;
