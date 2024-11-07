import React, {useState, useEffect, createContext, useContext, ReactNode, Dispatch} from "react";
import { ShoeSize } from "../Components/Shoes";
import { SandalSize } from "../Components/Sandales";
import { AllItems, useCart } from "./cartContext"; 

export interface clientData{
    FirstName : string;
    LastName : string;
    Email : string;
    Tel: string;
    City: string;
    Address : string;
    OrderId : string;
    Amount : number;
    Currency : string;
}
export interface PaymentResponse {
    code: string;                        
    message: string;             
    order_id: string;             
    success: boolean;            
    transaction_id: string;  
    amount : number | undefined;
    currency : string | undefined
}
export interface paymentContextProps { 
    clientForm : clientData | undefined;
    setClientForm : (data:clientData) => void;
    paymentResponse : PaymentResponse | undefined;
    setPaymentResponse : Dispatch<React.SetStateAction<PaymentResponse | undefined>>;
    shoesOrder : ShoeSize[];
    sandalsOrder : SandalSize[];
    transAllItems : AllItems| undefined;
    
    
}

const paymentContext = createContext<paymentContextProps|undefined>(undefined)

export const PaymentProvider : React.FC<{children:ReactNode}> =({children}) => {
    const {shoesItems, sandalsItems, allItems } = useCart();
    const [shoesOrder, setShoesOrder] = useState<ShoeSize[]>([]);
    const [sandalsOrder, setSandalsOrder] = useState<SandalSize[]>([])
    const [transAllItems, setTransAllItems] = useState<AllItems|undefined>()
    const [paymentResponse, setPaymentResponse] = useState<PaymentResponse | undefined>(
        {
            code: "string;",                        
    message: "string",             
    order_id: "gttrtzerufuoerigfihrgfrgrtttyyjyujuyr",          
    success: true,            
    transaction_id: "kfvighvgopbhrôbj^rbpujb^àtotjôtjà^tt", 
    amount : 43753745345,
    currency : "string | undefined"
}
    );
    const [clientForm, setClientForm] = useState<clientData | undefined>(() => {
        try {
            const savedClientData = sessionStorage.getItem("ClientData");
            if (savedClientData === null || savedClientData==undefined) { // Vérifie si c'est null
                return undefined;
            }
            return JSON.parse(savedClientData);
        } catch{
            return undefined; 
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

    useEffect(()=>{
        setTransAllItems(allItems);
    },[allItems])
;




    return(
        <paymentContext.Provider value={{clientForm,
                                        transAllItems, 
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