import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';



export interface CartItem {
  product: string;
  id: number;
  ref: string;
  category: string;
  name: string;
  price: number;
  size: number;
  image : string;
  promo: number;
  quantity: number;
}

export interface AllItems {
  Shoes:CartItem[];
  Sandals:CartItem[];
  Clothes : CartItem[];
  Pants : CartItem[]
}
export interface AllItemsPrice {
  amountShoes: number;
  amountSandals: number;
  amountClothes : number;
  amountPants : number
}

export interface CartContextType {
  allItems : AllItems;
  shoesItems: CartItem[];
  sandalsItems : CartItem[];
  clothesItems : CartItem[];
  pantsItems : CartItem[];
  itemCount: number;
  cartTotalAmount : AllItemsPrice;
  total : number;
  addItem: (item: CartItem) => void;
  removeItem: (item: CartItem) => void;
  clearCart: () => void;
  handlePlusQuantity : (item : CartItem) => void;
  handleMinusQuantity : (item : CartItem) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [cartTotalAmount, setCartTotalAmount] = useState<AllItemsPrice>({
    amountShoes: 0,
    amountSandals: 0,
    amountClothes : 0,
    amountPants : 0
  });
  const total = cartTotalAmount.amountShoes + cartTotalAmount.amountSandals + cartTotalAmount.amountPants + cartTotalAmount.amountClothes;
  const [shoesItems, setShoesItems] = useState<CartItem[]>(() => {
    try {
      const savedShoesItems = localStorage.getItem('CartShoesItems');
      if (savedShoesItems) {
        return JSON.parse(savedShoesItems);
      }
      return [];
    } catch (error) {
      console.error('Error parsing CartItems from localStorage:', error);
      return [];
    }
  });
  const [sandalsItems, setSandalsItems] = useState<CartItem[]>(() => {
    try {
      const savedSandalsItems = localStorage.getItem('CartSandalsItems');
      if (savedSandalsItems) {
        return JSON.parse(savedSandalsItems);
      }
      return [];
    } catch (error) {
      console.error('Error parsing CartItems from localStorage:', error);
      return [];
    }
  });
  const [clothesItems, setClothesItems] = useState<CartItem[]>(() => {
    try {
      const savedClothesItems = localStorage.getItem('CartClothesItems');
      if (savedClothesItems) {
        return JSON.parse(savedClothesItems);
      }
      return [];
    } catch (error) {
      console.error('Error parsing CartItems from localStorage:', error);
      return [];
    }
  });
  const [pantsItems, setPantsItems] = useState<CartItem[]>(() => {
    try {
      const savedPantsItems = localStorage.getItem('CartPantsItems');
      if (savedPantsItems) {
        return JSON.parse(savedPantsItems);
      }
      return [];
    } catch (error) {
      console.error('Error parsing CartItems from localStorage:', error);
      return [];
    }
  });

  const allItems = {
    Shoes: shoesItems,
    Sandals: sandalsItems,
    Clothes: clothesItems,
    Pants: pantsItems,
  };

  const [itemCount, setItemCount] = useState<number>(() => {
    try {
      const savedCount = localStorage.getItem('itemsCounter');
      if (savedCount) {
        return JSON.parse(savedCount);
      }
      return 0;
    } catch (error) {
      console.error('Error parsing itemsCounter from localStorage:', error);
      return 0;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('CartShoesItems', JSON.stringify(shoesItems));
      const amount:number  = (shoesItems.reduce((acc, item)=>(acc +(item.price*(1-item.promo*0.01)*item.quantity)), 0))
      setCartTotalAmount((prevTotal) => ({
        ...prevTotal,
        amountShoes: Math.round(amount * 100) / 100, 
      }));
    } catch (error) {
      console.error('Error saving CartItems to localStorage:', error);
    }
  }, [shoesItems]);
  useEffect(() => {
    try {
      localStorage.setItem('CartSandalsItems', JSON.stringify(sandalsItems));
      const amount:number  = sandalsItems.reduce((acc, item)=>(acc +(item.price*(1-item.promo*0.01)*item.quantity)), 0)
      setCartTotalAmount((prevTotal) => ({
        ...prevTotal,
        amountSandals: Math.round(amount * 100) / 100, 
      }));
    } catch (error) {
      console.error('Error saving CartItems to localStorage:', error);
    }
  }, [sandalsItems]);
  useEffect(() => {
    try {
      localStorage.setItem('CartClothesItems', JSON.stringify(clothesItems));
      const amount:number  = clothesItems.reduce((acc, item)=>(acc +(item.price*(1-item.promo*0.01)*item.quantity)), 0)
      setCartTotalAmount((prevTotal) => ({
        ...prevTotal,
        amountClothes: Math.round(amount * 100) / 100, 
      }));
    } catch (error) {
      console.error('Error saving CartItems to localStorage:', error);
    }
  }, [clothesItems]);
  useEffect(() => {
    try {
      localStorage.setItem('CartPantsItems', JSON.stringify(pantsItems));
      const amount:number  = pantsItems.reduce((acc, item)=>(acc +(item.price*(1-item.promo*0.01)*item.quantity)), 0)
      setCartTotalAmount((prevTotal) => ({
        ...prevTotal,
        amountPants: Math.round(amount * 100) / 100, 
      }));
    } catch (error) {
      console.error('Error saving CartItems to localStorage:', error);
    }
  }, [pantsItems]);

  useEffect(()=>{
    setItemCount(()=>{
      let cnt =0;
      for(const p of Object.keys(allItems)){
        for(const m of allItems[p as keyof AllItems]){
          cnt+=m.quantity
        }
      }
      return cnt
    })
  }, [allItems])


  useEffect(() => {
    try {
      localStorage.setItem('itemsCounter', JSON.stringify(itemCount));
    } catch (error) {
      console.error('Error saving itemsCounter to localStorage:', error);
    }
  }, [itemCount]);

  const addItem = (item: CartItem) => {
    if(item.product==='Shoe'){

      if(shoesItems.find((it)=>it.id===item.id && it.size ===item.size)){
        setShoesItems((prevItems)=>prevItems.map((it)=>it.id===item.id&&it.size===item.size?
          {...it, quantity :it.quantity+=1}:it))
      }else{
      setShoesItems((prevItems) => [...prevItems, item]);
      }
    }
    if(item.product==='Sandal'){
      if(sandalsItems.find((it)=>it.id===item.id && it.size ===item.size)){
        setSandalsItems((prevItems)=>prevItems.map((it)=>it.id===item.id&&it.size===item.size?
          {...it, quantity :it.quantity+=1}:it))
      }else{
      setSandalsItems((prevItems) => [...prevItems, item]);
      }
    } 
    if(item.product==='Cloth'){
      if(clothesItems.find((it)=>it.id===item.id && it.size ===item.size)){
        setClothesItems((prevItems)=>prevItems.map((it)=>it.id===item.id&&it.size===item.size?
          {...it, quantity :it.quantity+=1}:it))
      }else{
      setClothesItems((prevItems) => [...prevItems, item]);
      }
    }
    if(item.product==='Pant'){
      if(pantsItems.find((it)=>it.id===item.id && it.size ===item.size)){
        setPantsItems((prevItems)=>prevItems.map((it)=>it.id===item.id&&it.size===item.size?
          {...it, quantity :it.quantity+=1}:it))
      }else{
      setPantsItems((prevItems) => [...prevItems, item]);
      }
    }
  };

  const handlePlusQuantity = (item: CartItem) =>{
    if(item.product==='Shoe'){
      setShoesItems((prevItems)=>
        prevItems.map((it)=>it.id===item.id&&it.size===item.size?{...it, quantity: it.quantity+1}:it))
    }
    if(item.product==='Sandal'){
      setSandalsItems((prevItems)=>
        prevItems.map((it)=>it.id===item.id&&it.size===item.size?{...it, quantity: it.quantity+1}:it))
    }
    if(item.product==='Cloth'){
      setClothesItems((prevItems)=>
        prevItems.map((it)=>it.id===item.id&&it.size===item.size?{...it, quantity: it.quantity+1}:it))
    }
    if(item.product==='Pant'){
      setPantsItems((prevItems)=>
        prevItems.map((it)=>it.id===item.id&&it.size===item.size?{...it, quantity: it.quantity+1}:it))
    }

}

const handleMinusQuantity = (item:CartItem) =>{
    if(item.quantity<2){return}
    if(item.product==='Shoe'){
      setShoesItems((prevItems)=>
        prevItems.map((it)=>it.id===item.id&&it.size===item.size?{...it, quantity: it.quantity-1}:it))
    }
    if(item.product==='Sandal'){
      setSandalsItems((prevItems)=>
        prevItems.map((it)=>it.id===item.id&&it.size===item.size?{...it, quantity: it.quantity-1}:it))
    }
    if(item.product==='Cloth'){
      setClothesItems((prevItems)=>
        prevItems.map((it)=>it.id===item.id&&it.size===item.size?{...it, quantity: it.quantity-1}:it))
    }
    if(item.product==='Pant'){
      setPantsItems((prevItems)=>
        prevItems.map((it)=>it.id===item.id&&it.size===item.size?{...it, quantity: it.quantity-1}:it))
    }

}


  const removeItem = (item: CartItem) => {
    if(item.product=='Shoe'){
      setShoesItems((prevItems) => prevItems.filter((i) => i!==item));
      localStorage.setItem('CartShoesItems', JSON.stringify(shoesItems));
    }
    if(item.product=='Sandal'){
      setSandalsItems((prevItems) => prevItems.filter((i) => i!==item));
      localStorage.setItem('CartSandalsItems', JSON.stringify(shoesItems));
    }
    if(item.product=='Cloth'){
      setClothesItems((prevItems) => prevItems.filter((i) => i!==item));
      localStorage.setItem('CartClothesItems', JSON.stringify(shoesItems));
    }
    if(item.product=='Pant'){
      setPantsItems((prevItems) => prevItems.filter((i) => i!==item));
      localStorage.setItem('CartPantsItems', JSON.stringify(shoesItems));
    }
  };

  const clearCart = () => {
    setShoesItems([]);
    setItemCount(0);
    localStorage.removeItem('CartItems');
    localStorage.removeItem('itemsCounter');
  };


  return (
    <CartContext.Provider value={{allItems, 
                                  shoesItems, 
                                  sandalsItems, 
                                  clothesItems, 
                                  pantsItems, 
                                  itemCount, 
                                  cartTotalAmount,
                                  total,
                                  addItem, 
                                  removeItem, 
                                  clearCart, 
                                  handleMinusQuantity, 
                                  handlePlusQuantity   }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = (): CartContextType => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
