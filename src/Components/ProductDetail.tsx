import React, { useLayoutEffect, useState } from "react";
import "../Styles/ProductDetail.css";
import Header from "./header";
import { Shoe, ShoeSize } from "./Shoes";
import { TbRosetteDiscount } from "react-icons/tb";
import { RiErrorWarningLine } from "react-icons/ri";
import { FaCartPlus } from "react-icons/fa6";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/free-mode";
import "swiper/css/thumbs";
import {Swiper, SwiperSlide} from "swiper/react";
import { Autoplay, FreeMode, Navigation, Thumbs } from "swiper/modules";
import {Swiper as SwiperType} from "swiper";
import Footer from "./footer";
import { useProductsContext } from "../Contexts/ProductsContext";
import { Sandal, SandalSize } from "./Sandales";
import { Bounce, toast, ToastContainer } from "react-toastify";
import { useCart } from "../Contexts/cartContext";
import { useTranslation } from "react-i18next";
import { selectedLang, useLangContext } from "../Contexts/languageContext";

const apiUrl = import.meta.env.VITE_API_URL

const ProductDetail: React.FC = () => {
    const {DetailledProduct} = useProductsContext();
    const {addItem} = useCart();
    const {t} = useTranslation();
    const {currentLang} = useLangContext();
    const [clickedButton, setClickedButton] = useState<{ [key: number]: number | null }>({});
    const [selectedShoeDetails, setSelectedShoeDetails] = useState<{ [key: number]: { size: number; quantity: number | null } }>({});
    const [thumbsSwiper, setThumbsSwiper] = useState<SwiperType | null>(null);
    const [isPhone, setIsPhone] = useState<boolean>()

    useLayoutEffect(()=>{
        const phone = () =>{
            if(innerWidth<800){setIsPhone(true)}
            else{setIsPhone(false)}
        }
        phone();
        addEventListener('resize', phone);
        return () =>{window.removeEventListener('resize', phone)}
    },[window.innerWidth])

    const handleSizeClick = (shoeId: number, size: number, quantity: number) => {
        setClickedButton(prev => ({ ...prev, [shoeId]: size }));
        setSelectedShoeDetails(prev => ({ ...prev, [shoeId]: { size, quantity } }));
    };


    function sizeFilter(L: ShoeSize[] | SandalSize[], l: number) {
        if (!L) return []; 
        return L.filter(p => p.productId === l).map(p => [p.size, p.quantity] as [number, number]);
    }

    const isRemaining = (i: number) => {
        const detail = selectedShoeDetails[i];
        return detail ? detail.quantity !== null && detail.quantity > 0 : true;
    };

    const proImg = (pro: Shoe | Sandal ) => [pro.image, pro.image1, pro.image2, pro.image3, pro.image4];

    const handleCommand = (pro: Shoe | Sandal) => {
        if(!selectedShoeDetails[pro.id]){
            toast.error(t('toastSizeAlert'), {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: false,
                pauseOnHover: false,
                draggable: true,
                progress: undefined,
                theme: "colored",
                transition: Bounce,
            });
          return
        }
        const item = {
          product : pro.productType,
          id: pro.id,
          category: pro.category,
          ref: pro.ref,
          name: pro.name,
          price: pro.price,
          size: selectedShoeDetails[pro.id].size,
          quantity: 1,
          image : pro.image,
          promo : pro.promo
        };
        addItem(item);
        toast.success(t('toastAddSuccess') , {
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: false,
            pauseOnHover: false,
            draggable: true,
            progress: undefined,
            theme: "colored",
            transition: Bounce,
        });
      };

    if(!DetailledProduct){return(<>non</>)}
    return (
        <>
            <Header />

            <div className={`ProductDetailDiv mt-2 d-flex justify-content-around ${isPhone?'flex-column ':''}`}>
                <div className={`mt-2 mb-4 text-center 
                                ProductDetailName phone ${isPhone?'':'d-none'} 
                                ${selectedLang(currentLang)=='ar'?'rtl':''}`}>
                        {t('productPreview')} 
                    </div>
                <div className={`ProducyDetailImgs ${isPhone?'phone':''}`}>
                    <Swiper
                        className='ProductDetailImgDiv'
                        spaceBetween={30}
                        navigation={true}
                        thumbs={thumbsSwiper?{ swiper: thumbsSwiper }:undefined}
                        modules={[Navigation, FreeMode, Thumbs, Autoplay]}
                        autoplay={{delay:1500, disableOnInteraction:true}}
                    >
                        {proImg(DetailledProduct?.selectedProduct).map((ig, index) => (
                            <SwiperSlide className="ProductDetailImgDiv" key={index}>
                                <img src={`${apiUrl}${ig}`} alt="" className="rounded" />
                            </SwiperSlide>
                        ))}
                    </Swiper>
                    <Swiper
                        onSwiper={setThumbsSwiper}
                        spaceBetween={5}
                        slidesPerView={5}
                        freeMode={true}
                        watchSlidesProgress={true}
                        modules={[Navigation, FreeMode, Thumbs]}
                        className="zero mt-2">
                        {proImg(DetailledProduct?.selectedProduct).map((ig, index)=>(
                            <SwiperSlide key={index} className="thunme">
                                <img src={`${apiUrl}${ig}`} alt="" />
                            </SwiperSlide>
                        ))}

                    </Swiper>
                </div>
                <div className={`mt-2 ProductDetailNP ${isPhone?'phone':''}`}>
                    <div className={`ProductDetailInfos1 mt-2 mb-4 text-center 
                                    ProductDetailName ${isPhone?'d-none':''} 
                                    ${selectedLang(currentLang)=='ar'?'rtl':''}`}>
                        {t('productPreview')}
                    </div>
                    <div className={`ProductDetailName mt-1 mb-3 text-muted ${isPhone?'phone':''}`}>
                        {(DetailledProduct?.selectedProduct.category).toUpperCase()} {(DetailledProduct?.selectedProduct.productType).toUpperCase()} : {(DetailledProduct?.selectedProduct.ref).toUpperCase()}
                    </div>
                    <div className={`ProductDetailName mt-1 mb-3 text-muted ${isPhone?'phone':''}`}>
                        {(DetailledProduct?.selectedProduct.name).toUpperCase()}
                    </div>
                    {DetailledProduct?.selectedProduct.promo !== 0 && (
                        <div    className={`${selectedLang(currentLang)=='ar'?'rtl text-center':""}`}
                                style={{
                                    color: 'red',
                                    paddingLeft: '6%',
                                    fontWeight: 'bold',
                                    fontSize: isPhone?'4.5vw':'1.9vw'
                                }}>
                            <TbRosetteDiscount /> {t('promotion')} !
                        </div>
                    )}
                    <div className={`ProductDetailPS d-flex my-4 ${isPhone?'phone':''}`}>
                        <div className={`ProductDetailPP ${isPhone?'phone':''}`}>
                            {(DetailledProduct?.selectedProduct.price * (1 - DetailledProduct?.selectedProduct.promo * 0.01)).toFixed(2)} MAD
                        </div>
                        <div className={`ProductDetailDP text-muted d-flex ${isPhone?'phone':''}`}>
                            {(DetailledProduct?.selectedProduct.price).toFixed(2)} {t('mad')}
                        </div>
                        <div className={`ProductDetailDC ${isPhone?'phone':''} 
                                        ${selectedLang(currentLang)=='ar'?'rtl':''}`}>
                            {(DetailledProduct?.selectedProduct.promo)} % {t('off')}
                        </div>
                    </div>
                    <div className={`my-2 ${selectedLang(currentLang)=='ar'?'rtl':""}`} style={{
                        paddingLeft: '6%',
                        fontWeight: 'bold',
                        fontSize: isPhone?'3.3vw':'1.4vw'
                    }}>
                        {t('sizes')} :
                    </div>
                    <div className="ProductDetailSizesBox">
                        {sizeFilter(DetailledProduct?.selectedProductInfos, DetailledProduct?.selectedProduct.id).map((i, index) => (
                            <button
                                className={`ProductDetailSizesButton ${clickedButton[DetailledProduct?.selectedProduct.id] === i[0] ? 'clicked' : ''}`}
                                style={i[1] !== 0 ? {} : {
                                    borderColor: 'red',
                                    color: 'red',
                                    textDecoration: 'line-through',
                                    textDecorationColor: 'red'
                                }}
                                key={index}
                                onClick={() => { handleSizeClick(DetailledProduct?.selectedProduct.id, i[0], i[1]) }}
                            >
                                {i[0]}
                            </button>
                        ))}
                    </div>
                    <div className="rounded-0 mb-0">
                        <button
                            className={`ProductDetailComButton ${isPhone?'phone':''}`}
                            onClick={() => handleCommand(DetailledProduct?.selectedProduct)}
                            disabled={!isRemaining(DetailledProduct?.selectedProduct.id)}
                        >
                            {isRemaining(DetailledProduct?.selectedProduct.id) ? (
                                <>
                                    <FaCartPlus size={20} className="ProductDetailComIcon" /> {t('addCart')}
                                </>
                            ) : (
                                <>
                                    <RiErrorWarningLine size={20} className="ProductDetailComIcon" /> {t('soldOut')}
                                </>
                            )}
                        </button>
                    </div>
                    <div className="ProductDetailText">
                        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Doloribus in adipisci possimus deleniti labore eaque reprehenderit, esse distinctio repellat asperiores dignissimos dicta sint cupiditate debitis ducimus ratione. Delectus saepe ex nisi error natus magni hic molestiae! Perspiciatis officiis architecto laboriosam odit illo, quasi delectus consequuntur, deserunt nemo est eius excepturi a saepe sint itaque expedita commodi quisquam nisi odio dolorem voluptate quos optio alias molestias. Reiciendis perferendis adipisci eius culpa fuga facilis consectetur, inventore provident minus quam maxime earum similique accusamus sapiente at dolore. Labore, tempore! Dolorum eius quos laborum necessitatibus aliquam ut, aspernatur quaerat nam dolorem ea, qui voluptatibus.
                        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Consequuntur molestiae neque dolorum rerum saepe sequi vitae maxime praesentium minima ipsam, debitis ducimus et libero quos ex. Ducimus totam voluptate dolor!
                    </div>
                    
                </div>
            </div>
            <Footer />
            <ToastContainer className={'Toast'} style={{ width: "70%", marginLeft:'15%' }}/>
        </>
    );
};
export default ProductDetail;





