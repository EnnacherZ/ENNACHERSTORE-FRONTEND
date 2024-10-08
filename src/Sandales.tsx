import React, { useState, useEffect, } from "react";
import './Sandales.css'
import Header from "./header";
import axios from "axios";
import { BsStars } from "react-icons/bs";
import { useCart } from "./cartContext";
import NotFound from "./NotFound";

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
    const {addItem} = useCart()
    const [newestShoes, setNewestShoes] = useState<Shoe[]>([]);
    const [shoeSizes, setShoeSizes] = useState<ShoeSize[]>([]);
    const [clickedButton, setClickedButton] = useState<{[key: number]: number | null }>({});
    const [selectedSize, setSelectedSize] = useState(0);

    function sizeFilter(L: ShoeSize[], l: number) {
        const S: Array<[number, number]> = [];
        for (const p of L) {
          if (p.product === l) {
            S.push([p.size, p.quantity]);
          }
        }
        return S;
      }
    
      const handleSizeClick = (shoeId: number, size: number) => {
        setClickedButton((prevClickedButton) => ({
          ...prevClickedButton,
          [shoeId]: size,
        }));
        setSelectedSize(size);
      };
      const productShowHeight = (L:Shoe[]) => {
        if(L.length % 4 == 0){return Math.floor(L.length/4)};
        if(L.length % 4>0){return Math.floor(L.length/4)+1};
        return (0)
      }
    
      
    
    
      const handleCommand = (shoe: Shoe,) => {
        const item = {
          id: shoe.id,
          category : shoe.category,
          ref: shoe.ref,
          name: shoe.name,
          price: shoe.price,
          size : selectedSize,
          quantity : 1,
        };
        addItem(item);
        
      }

    useEffect(()=>{
        const newestShoesData = async () =>{
            try{
                const NewestShoesResponse = await axios.get('http://127.0.0.1:1011/api/getNewestShoes');
                const ShoesSizesResponse = await  axios.get('http://127.0.0.1:1011/api/getShoeSizes');
                const NewestShoesList = NewestShoesResponse.data.list_newest_shoes || [];
                const ShoesSizesList = ShoesSizesResponse.data.list_shoeSizes || [];
                setNewestShoes(NewestShoesList);
                setShoeSizes(ShoesSizesList);
            }catch(error){console.error('An error occured when fetching data :', error)}
        }
        newestShoesData();
        
    }, [])
    return(
        <div>
            <Header/>
            <div className="newest-title"
                style={{position:'absolute',
                        width:'100%',
                        aspectRatio:20,
                        top:113,

                }}>
                <BsStars className="bsstars1" style={{
                    position:'absolute'}} />
                <h2 className="bsstars-title">Newest Shoes</h2>
                <BsStars className="bsstars2" style={{
                    position:'absolute'}} />
            </div>
            <div className="newest-test" style={{aspectRatio:2.42/productShowHeight(newestShoes),
                                                marginTop:'5%',
            }} >
        {
        newestShoes.map((shoe, index) => {
          return (
            <div >
            <div
              className="newest-test1"
              key={shoe.id}
              style={{
              position: "absolute",
              left: `${(index % 4) * 26 + 0.5}%`,
              marginTop: `${Math.floor(index / 4) * 41 +1}%`,
              }}
            >
              <img
                src={`http://127.0.0.1:1011/${shoe.image}`}
                className="newest-test-img"
                alt={shoe.name}
              />
              <div className="newest-test-name-price">
                <p style={{ position: "absolute", fontSize: "auto" }}>
                  {shoe.category} {shoe.ref} {shoe.name}
                </p>
                <br/>
                <p 
                  style={{
                  position: "absolute",
                  display:"flex",
                  fontSize: "auto",
                  justifyContent:"center",
                  alignItems:"center" }}>
                  PRIX : {shoe.price}
                </p>
              </div>

              <div className="newest-test-sizes">
                {sizeFilter(shoeSizes, shoe.id).map((size, index) => {
                    return (
                      <div
                          key={index}
                          className="size-box"
                          style={{
                          position: "absolute",
                          left: `${(index % 4) * 28}%`,
                          marginTop: `${Math.floor(index / 4) * 17}%`,
                        }}
                      >
                        <button
                          className={`newest-size-button ${
                            clickedButton[shoe.id] === size[0] ? "clicked" : ""
                          }`}
                          style={{ outline: "none", padding: 0 }}
                          onClick={() => handleSizeClick(shoe.id, size[0])}
                          
                        >
                          {size[0]}
                        </button>
                      </div>
                    
                    );
                })}
              </div>
              <div className="newest-command-box">
                <button onClick={()=>handleCommand(shoe)} className="newest-command-butt">Commander</button>
              </div>
            </div>
            </div>);
        })}
        </div>
        </div>


    );


};
export default Sandales;