import React, {createContext, useContext, useState, ReactNode, useEffect} from "react";
import { Shoe, ShoeSize } from "../Components/Shoes";
import { Sandal, SandalSize } from "../Components/Sandales";

interface productDetail{
    selectedProduct : Shoe | Sandal;
    selectedProductInfos : ShoeSize[] | SandalSize[];
}

interface ProductDetailProps {
    DetailledProduct : productDetail | undefined;
    setTargetedProduct : (pro : Shoe|Sandal, proDetail : ShoeSize[]|SandalSize[]) => void
}

const ProductsContext = createContext<ProductDetailProps| undefined>(undefined);

export const ProductsContextProvider : React.FC<{children : ReactNode}> = ({children}) =>{

    const [DetailledProduct, setDetailledProduct] = useState<productDetail>(
        ()=>{
            try{
                const savedTargetedProduct = sessionStorage.getItem("EnnacherStoreTargetedProduct")
                if(savedTargetedProduct){return JSON.parse(savedTargetedProduct)}
                return {}
            }catch(error){console.log(error)}
        }
    );

    useEffect(()=>{
        try{
            sessionStorage.setItem('EnnacherStoreTargetedProduct', JSON.stringify(DetailledProduct))
        }catch(error){ console.log(error)
        }
    }, [DetailledProduct])

    const setTargetedProduct = (pro : Shoe|Sandal, proDetail : ShoeSize[]|SandalSize[]) =>{
        setDetailledProduct(
            {
                selectedProduct : pro,
                selectedProductInfos : proDetail
            }
        )
    }


    return(
    <ProductsContext.Provider value={{DetailledProduct, setTargetedProduct}}>
        {children}
    </ProductsContext.Provider>)
} 

export const useProductsContext = (): ProductDetailProps => {
    const context = useContext(ProductsContext);
    if (context === undefined) {
      throw new Error('useProductsContext must be used within a ProductsProvider');
    }
    return context;
  };