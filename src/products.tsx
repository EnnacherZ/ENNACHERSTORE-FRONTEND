import React, { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom/';
import './products.css';
import { Shoe, ShoeSize } from "./Shoes";
import { useCart } from "./cartContext";
import { FaCartPlus } from "react-icons/fa6";
import { RiErrorWarningLine } from "react-icons/ri";
import { Bounce, toast, ToastContainer } from "react-toastify";
import FilterSection, { DataToFilter } from "./FilterSection";
import NotFound from "./NotFound";
import { motion } from "framer-motion";
import packageJson from "../package.json";
import { useProductsContext } from "./ProductsContext";
import { Sandal, SandalSize } from "./Sandales";
import ReactPaginate from 'react-paginate';
import { useTranslation } from "react-i18next";
import { selectedLang, useLangContext } from "./languageContext";

interface productsShow {
   pData: any;
   pDataDetails: any;
   productShowed: string;
   handleFilter: (criteria: DataToFilter) => void;
}

const Products: React.FC<productsShow> = ({ pData, pDataDetails, productShowed, handleFilter }) => {
    const apiUrl = packageJson.config.backendURL;
    const { setTargetedProduct } = useProductsContext();
    const navigate = useNavigate();
    const { addItem } = useCart();
    const {t} = useTranslation();
    const {currentLang} = useLangContext();
    const [products, setProducts] = useState<Shoe[]>([]);
    const [productDetails, setProductDetails] = useState<ShoeSize[]>([]);
    const [clickedButton, setClickedButton] = useState<{ [key: number]: number | null }>({});
    const [selectedShoeDetails, setSelectedShoeDetails] = useState<{ [key: number]: { size: number; quantity: number | null } }>({});
    const [currentPage, setCurrentPage] = useState(0);
    const itemsPerPage = 20;

    const handleSizeClick = (shoeId: number, size: number, quantity: number) => {
        setClickedButton((prevClickedButton) => ({
            ...prevClickedButton,
            [shoeId]: size,
        }));
        setSelectedShoeDetails((prevDetails) => ({
            ...prevDetails, [shoeId]: { size, quantity }
        }));
    };

    function sizeFilter(L: ShoeSize[], l: number) {
        let x = L.filter((p) => p.productId === l).map((p) => [p.size, p.quantity] as [number, number]);
        return x;
    }

    const isRemaining = (i: number) => {
        const shoeDetail = selectedShoeDetails[i];
        if (!shoeDetail) {
            return true;
        }
        return shoeDetail.quantity !== null && shoeDetail.quantity > 0;
    };

    useEffect(() => {
        setProducts(pData);
        setProductDetails(pDataDetails);
    }, [pData, pDataDetails]);

    const handleCommand = (shoe: Shoe) => {
        if (!selectedShoeDetails[shoe.id]) {
            toast.error("Size is not selected", {
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
            return;
        }
        const item = {
            product: productShowed,
            id: shoe.id,
            category: shoe.category,
            ref: shoe.ref,
            name: shoe.name,
            price: shoe.price,
            size: selectedShoeDetails[shoe.id].size,
            quantity: 1,
            image: shoe.image,
            promo: shoe.promo
        };
        addItem(item);
        toast.success("New shoe item is added", {
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
    };

    const getProductDetail = (pro: Shoe | Sandal, proDetail: ShoeSize[] | SandalSize[]) => {
        setTargetedProduct(pro, proDetail);
        navigate(`/productDetail/${pro.productType}/${pro.category}/${pro.ref}/`);
    };

    const handlePageChange = (selectedPage: { selected: number }) => {
        setCurrentPage(selectedPage.selected);
    };

    const displayedProducts = products.slice(currentPage * itemsPerPage, (currentPage + 1) * itemsPerPage);
    const pageCount = Math.ceil(products.length / itemsPerPage);
    console.log(currentLang)
    return (
        <>
            <div className="productsDiv mt-3">
                <FilterSection handleFilter={handleFilter} productType={productShowed} />
                {products.length > 0 && (
                    <div className="products-wrapper">
                        {displayedProducts.map((pro) => (
                            <motion.div
                                key={pro.id}
                                initial={{ opacity: 0, y: 50 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.8 }}>
                                <div className="productCard p-0 rounded-3 d-flex flex-column">
                                    <div className="imgContainer rounded-3" onClick={() => getProductDetail(pro, productDetails)}>
                                        <img src={`${apiUrl}${pro.image}`} />
                                    </div>
                                    <div className="text-center product-infos"
                                        style={{ wordSpacing: 2, gap: 2, textTransform: 'capitalize' }}
                                        onClick={() => getProductDetail(pro, productDetails)}>
                                        <div>{pro.category.toLowerCase()} {pro.ref.toLowerCase()}</div>
                                        <div>{pro.name.toLowerCase()}</div>
                                    </div>
                                    <div className="product-text text-center product-price fw-bold"
                                        style={{ wordSpacing: 2 }}
                                        onClick={() => getProductDetail(pro, productDetails)}>
                                        {pro.promo === 0 ? (
                                            <span className="product-pprice">{(pro.price).toFixed(2)} {t('mad')}</span>
                                        ) : (
                                            <>
                                                <span className="product-pprice">{(pro.price * (100 - pro.promo) * 0.01).toFixed(2)} {t('mad')}</span>
                                                <span className="product-dprice">
                                                    {(pro.price).toFixed(2)} {t('mad')}
                                                </span>
                                            </>
                                        )}
                                    </div>
                                    <div  className={`fw-bold ps-1 my-1 size-label 
                                                    ${selectedLang(currentLang)=='ar'?'rtl':''}`} 
                                          onClick={() => getProductDetail(pro, productDetails)}>
                                        {t('sizes')} :
                                    </div>
                                    <div className="product-sizes-box">
                                        {sizeFilter(productDetails, pro.id).map((i, index) => (
                                            <button className={`product-size-button ${clickedButton[pro.id] === i[0] ? 'clicked' : ''}`}
                                                style={i[1] !== 0 ? {} : {
                                                    borderColor: 'red',
                                                    color: 'red', textDecoration: 'line-through',
                                                    textDecorationColor: 'red'
                                                }}
                                                key={index}
                                                onClick={() => { handleSizeClick(pro.id, i[0], i[1]) }}>
                                                {i[0]}
                                            </button>
                                        ))}
                                    </div>
                                    <div className="rounded-0 mb-0">
                                        <button className="px-1 comm-button rounded"
                                            onClick={() => handleCommand(pro)}
                                            disabled={!isRemaining(pro.id)}>
                                            {isRemaining(pro.id) ? (
                                                <><FaCartPlus size={16} className="comm-icon" /> {t('addCart')}</>
                                            ) : (
                                                <><RiErrorWarningLine size={18} className="comm-icon" /> {t('soldOut')} </>
                                            )}
                                        </button>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                        
                    </div>
                )}
                {products.length === 0 && (
                    <NotFound onReset={() => { window.location.reload(); window.scrollTo(0, 0); }} />
                )}
                <ToastContainer className={'Toast'} style={{ width: "50%" }} />
                
            </div>
            {products.length > 0 && (
                    <ReactPaginate
                        previousLabel={`< ${t('previous')}`}
                        nextLabel={`${t('next')} >`}
                        breakLabel={'...'}
                        pageCount={pageCount}
                        marginPagesDisplayed={2}
                        pageRangeDisplayed={5}
                        onPageChange={handlePageChange}
                        containerClassName={'pagination'}
                        activeClassName={'active'}
                        
                    />
                )}
        </>
    );
};

export default Products;
