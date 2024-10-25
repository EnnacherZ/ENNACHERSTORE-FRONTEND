import React, {useState, useEffect, createContext, useContext, ReactNode, Dispatch} from "react";
import { ShoeSize } from "../Components/Shoes";
import { SandalSize } from "../Components/Sandales";
import { useCart } from "./cartContext";

export interface clientData{
    FirstName : string;
    LastName : string;
    Email : string;
    Tel: string;
    City: string;
    Address : string;
    OrderId : string;
}
export interface PaymentResponse {
    code: string;                 
    is_success: boolean;         
    message: string;             
    order_id: string;             
    success: boolean;            
    transaction_id: string;       
}



export interface paymentContextProps { 
    clientForm : clientData | undefined;
    setClientForm : (data:clientData) => void;
    paymentResponse : PaymentResponse | undefined;
    setPaymentResponse : Dispatch<React.SetStateAction<PaymentResponse | undefined>>;
    shoesOrder : ShoeSize[];
    sandalsOrder : SandalSize[];
    
    
}

const paymentContext = createContext<paymentContextProps|undefined>(undefined)

export const PaymentProvider : React.FC<{children:ReactNode}> =({children}) => {
    const {shoesItems, sandalsItems} = useCart();
    const [shoesOrder, setShoesOrder] = useState<ShoeSize[]>([]);
    const [sandalsOrder, setSandalsOrder] = useState<SandalSize[]>([])
    const [paymentResponse, setPaymentResponse] = useState<PaymentResponse>();
    const [clientForm, setClientForm] = useState<clientData | undefined>(() => {
        try {
            const savedClientData = sessionStorage.getItem("ClientData");
            if (savedClientData === null || savedClientData==undefined) { // Vérifie si c'est null
                return undefined;
            }
            return JSON.parse(savedClientData);
        } catch(err){
            console.log(err)
            return undefined; // Retourne undefined en cas d'erreur
        }
    });

    useEffect(()=>{
        try{
            sessionStorage.setItem('ClientData', JSON.stringify(clientForm))
        }catch(error){
            console.error('Error saving clientData to sessionStorage:', error);
        }
    },[clientForm])

    useEffect(()=>{
        const order :ShoeSize[] = [];
        for(const p of shoesItems){
            order.push({productId : p.id,
                        size : p.size,
                        quantity : p.quantity
            })
        }
        setShoesOrder(order)
    },[shoesItems])
    useEffect(()=>{
        const order :SandalSize[] = [];
        for(const p of sandalsItems){
            order.push({productId : p.id,
                        size : p.size,
                        quantity : p.quantity
            })
        }
        setSandalsOrder(order)
    },[sandalsItems])




    return(
        <paymentContext.Provider value={{clientForm, 
                                        setClientForm,
                                        paymentResponse,
                                        setPaymentResponse,
                                        shoesOrder,
                                        sandalsOrder}}>
            {children}
        </paymentContext.Provider>
    )
} 
export const usePayment = (): paymentContextProps => {
    const context = useContext(paymentContext);
    if (context === undefined) {
      throw new Error('usePayment must be used within a PaymentProvider');
    }
    return context;
  };