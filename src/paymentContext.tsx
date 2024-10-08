import React, {useState, useEffect, createContext, useContext, ReactNode} from "react";
import { CartItem } from "./cartContext";

export interface clientData{
    FirstName : string;
    LastName : string;
    Email : string;
    Tel: string;
    City: string;
    Address : string
}

export interface paymentContextProps { 
    clientForm : clientData;
    setClientForm : (data:clientData) => void;
    
}

const paymentContext = createContext<paymentContextProps|undefined>(undefined)

export const PaymentProvider : React.FC<{children:ReactNode}> =({children}) => {

    const [clientForm, setClientForm] = useState<clientData>(()=>{
        try{
            const savedClientData = sessionStorage.getItem("ClientData");
            if(savedClientData!=undefined){
                return JSON.parse(savedClientData)
            }return {
                FirstName: '',
                LastName: '',
                Email: '',
                Tel: '',
                City: '',
                Address: ''
            };
        }catch(error){
            console.error('Error parsing clientData from localStorage:', error);
      return ;
        }
    });

    useEffect(()=>{
        try{
            sessionStorage.setItem('ClientData', JSON.stringify(clientForm))
        }catch(error){
            console.error('Error saving clientData to sessionStorage:', error);
        }
    },[clientForm])



    return(
        <paymentContext.Provider value={{clientForm, setClientForm}}>
            {children}
        </paymentContext.Provider>
    )
} 
export const usePayment = (): paymentContextProps => {
    const context = useContext(paymentContext);
    if (context === undefined) {
      throw new Error('usePayment must be used within a CartProvider');
    }
    return context;
  };