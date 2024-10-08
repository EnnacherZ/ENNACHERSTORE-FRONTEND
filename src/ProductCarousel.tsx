import React from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import "./ProductCarousel.css";
import packageJson from "../package.json";
import { Shoe,} from "./Shoes";

interface ProductCarouselProps {
  Data : Shoe[]
}

const ProductCarousel : React.FC<ProductCarouselProps> = ({Data}) => {
  const apiUrl = packageJson.config.backendURL;

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
    return(
      <>
        <Carousel className={`mt-1 productCarousel z-0 ${Data.length===0?'d-none':""}`} 
                responsive={responsive}
                swipeable={true}
                autoPlay={true}
                infinite={true}
                autoPlaySpeed={1500}
                transitionDuration={100}
                showDots={true}>
            {Data.map((item, index)=>(
            <div className="productCarouselCard card rounded shadow text-center d-flex flex-column mt-2" key={index}>
            <div className="productCImgCont rounded-4">
              <img src={`${apiUrl}${item.image}`} className="rounded-top" alt="" />
            </div>
            <div className="productCInfos1 my-2 fw-bold" >
              {(item.category).toLowerCase()} {(item.ref).toLowerCase()}
            </div>
            <div className="productCInfos2 my-2 fw-bold">
                {(item.name).toLowerCase()}
            </div>
            <div className="productCPrice my-2">
              <div className="productCPriceP my-2">{(item.price*(1-item.promo*0.01)).toFixed(2)} MAD</div>
              <div className={`productCPriceD my-2 ${item.promo==0?'d-none':''}`}>{item.price} MAD</div>
              <div className={`productCDiscount my-2 ${item.promo==0?'d-none':''}`}> {item.promo}% off</div>
            </div>
            <button className="btn btn-dark rounded productCView mb-0">
              View the product 
            </button>

          </div>
            ))}

        </Carousel>
      </>

    )


}
export default ProductCarousel;