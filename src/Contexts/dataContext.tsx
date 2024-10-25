import React, { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { Shoe, ShoeSize } from "../Components/Shoes";


interface dataProps{
    shoesData : Shoe[],
    shoesDataDetails : ShoeSize[],
}

const apiUrl = import.meta.env.VITE_API_URL;
const DataContext = createContext<dataProps|undefined>(undefined);

export const DataContextProvider : React.FC<{children : ReactNode}> = ({children})=>{
    const [shoesData, setShoesData] = useState<Shoe[]>([]);
    const [shoesDataDetails, setShoesDataDetails] = useState<ShoeSize[]>([]);
    useEffect(() => {
        const eventSourceShoes = new EventSource(`${apiUrl}events/shoes/`);
        const eventSourceShoeSizes = new EventSource(`${apiUrl}events/shoe_sizes/`);
    
        eventSourceShoes.onmessage = (event) => {
          const { list_shoes } = JSON.parse(event.data);
          setShoesData(list_shoes);          
        };
    
        eventSourceShoeSizes.onmessage = (event) => {
          const { list_shoeSizes } = JSON.parse(event.data);
          setShoesDataDetails(list_shoeSizes);
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
      },[]);
    

    return(<DataContext.Provider
            value={{
                shoesData,
                shoesDataDetails
            }}>
        {children}
    </DataContext.Provider>)
}

export const useDataContext = () : dataProps =>{
    const context = useContext(DataContext);
    if (context === undefined) {
      throw new Error('useProductsContext must be used within a dataContextProvider');
    }
    return context;
}