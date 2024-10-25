import React, { useEffect, useState } from "react";
import Header from "./header";
import ProductAds from "./ProductAds.tsx";
import "../Styles/Shoes.css";
import { DataToFilter } from "./FilterSection";
import Products from "./products";
import Footer from "./footer.tsx";
import { LiaShoePrintsSolid } from "react-icons/lia";
import Marquee from "react-fast-marquee"
import { FaCircleDot } from "react-icons/fa6";
import { useDataContext } from "../Contexts/dataContext.tsx";


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
  const {shoesData, shoesDataDetails} = useDataContext();
  const [filteredShoeProduct, setFilteredShoeProduct] = useState<Shoe[]>([]);
  const [selectedCriteria, setSelectedCriteria] = useState<DataToFilter>(
    {product : '',
    category : '',
    ref : '',
    name : ''}
  )
  

  useEffect(() => {
    const show = () =>{
        const filtredStreamedShoes = filterData(shoesData, selectedCriteria);
        setFilteredShoeProduct(filtredStreamedShoes); 
      };
      show();
  }, [selectedCriteria, shoesData]);

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
    const filteredShoes = filterData(shoesData, criterias);
    setFilteredShoeProduct(filteredShoes);
  };
  const handleReset = ()=>{
    setSelectedCriteria(
      {product : '',
        category : '',
        ref : '',
        name : ''}
    )
  }

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
    <Products pData={filteredShoeProduct} 
              pDataDetails={shoesDataDetails} 
              productShowed="Shoe" 
              handleFilter={handleShoeSearch}
              handleReset={handleReset}/>

    <Footer/>

 

    </>
  );
};

export default Shoes;
