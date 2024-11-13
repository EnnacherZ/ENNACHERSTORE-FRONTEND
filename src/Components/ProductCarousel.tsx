import React from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import "../Styles/ProductCarousel.css";
import { Shoe, ShoeSize,} from "./Shoes";
import { Sandal, SandalSize } from "./Sandales";
import { useNavigate } from "react-router-dom";
import { useProductsContext } from "../Contexts/ProductsContext";
import { useTranslation } from "react-i18next";
import Loading from "./loading";

interface ProductCarouselProps {
  Data : Shoe[];
  DataDetails : any;
  productType : string;
}

const ProductCarousel : React.FC<ProductCarouselProps> = ({Data, DataDetails, productType}) => {
  const apiUrl = import.meta.env.VITE_API_URL
  const {t} = useTranslation();
  const navigate = useNavigate();
  const {setTargetedProduct} = useProductsContext();
    const responsive = {
        superLargeDesktop: {
          breakpoint: { max: 4000, min: 1024 },
          items: 4
        },
        desktop: {
          breakpoint: { max: 1024, min: 768 },
          items: 3
        },
        tablet: {
          breakpoint: { max: 768, min: 464 },
          items: 2
        },
        mobile: {
          breakpoint: { max: 464, min: 0 },
          items: 1
        }
      };
      const getProductDetail = (pro : Shoe| Sandal, proDetail : ShoeSize[] | SandalSize[]) =>{
        setTargetedProduct(pro, proDetail);
        navigate(`/productDetail/${pro.productType}/${pro.category}/${pro.ref}/`)
  
      }

      const productRender = (l:string)=>{
        let x = '';
        switch(l){
          case 'Shoes':
            x = 'goShoesSec';
            break;
          case 'Sandals':
            x = 'goSandalsSec';
            break;
          case 'Shirts':
            x = 'goShurtsSec';
            break;
          case 'Pants':
            x = 'goPantsSec';
            break;
        }
        return x;
      }

    return(
      <><hr className="my-1"/>
        {Data.length==0 && <Loading message="Products are being loaded"/>}
        <Carousel className={`mt-1 productCarousel z-0 `} 
                responsive={responsive}
                swipeable={true}
                autoPlay={Data.length>1}
                infinite={true}
                autoPlaySpeed={1000}
                transitionDuration={1000}
                showDots={true}
                >
            {Data.map((item, index)=>(
            <div className="productCarouselCard card rounded shadow text-center d-flex flex-column mt-2" key={index}>
            <div className="productCImgCont rounded-4">
              <img src={`${apiUrl}${item.image}`} className="rounded-top" alt="" />
            </div>
            <div className="productCInfos1 my-1 fw-bold" >
              {(item.category).toLowerCase()} {(item.ref).toLowerCase()}
            </div>
            <div className="productCInfos2 my-1 fw-bold">
                {(item.name).toLowerCase()}
            </div>
            <div className="productCPrice my-1">
              <div className="productCPriceP my-1">{(item.price*(1-item.promo*0.01)).toFixed(2)} MAD</div>
              <div className={`productCPriceD my-1 ${item.promo==0?'d-none':''}`}>{item.price} MAD</div>
              <div className={`productCDiscount my-1 ${item.promo==0?'d-none':''}`}> {item.promo}% off</div>
            </div>
            <button className="btn btn-dark fw-bold productCView mb-0"
                    onClick={()=>getProductDetail(item, DataDetails)}>
              {t('viewProduct')} 
            </button>

          </div>
            ))}

        </Carousel>
        <div className="d-flex justify-content-center mt-3">
          <button className="btn btn-outline-secondary fw-bold"
                  onClick={()=>navigate(`/${productType}`)}> 
            {t(productRender(productType))} 
          </button>
        </div>
        <hr className="my-1"/>
      </>

    )


}
export default ProductCarousel;


