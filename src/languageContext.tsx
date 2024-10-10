import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import React, {createContext, Dispatch, ReactNode, useContext, useEffect, useState} from 'react';

i18n
  .use(initReactI18next)
  .init({
    resources: {
      en: {
        translation: {
          welcome: "Welcome to our application",
          home : "Home",
          shoes : "Shoes",
          sandals : 'Sandals',
          shirts : 'Shirts',
          pants :'Pants',
          YourCart : 'Your cart',
          ourPromotions : 'Our promotions',
          ourProducts : 'Our products',
          viewProduct : 'View the product',
          addCart : 'Add to cart',
          soldOut : 'Sold out',
          sizes:'Sizes',
          price:'Price',
          mad  : 'MAD',
          next : 'Next',
          previous : 'Previous',

          
        },
      },
      fr: {
        translation: {
          welcome: "Bienvenue dans notre application",
          home : "Accueil",
          shoes : "Chaussures",
          sandals : 'Sandales',
          shirts : 'Shirts',
          pants :'Pants',
          YourCart : 'Votre panier',
          ourPromotions : 'Nos promotions',
          ourProducts : 'Nos produits',
          viewProduct : 'Voir le produit',
          addCart : 'Ajouter au panier',
          soldOut : 'Epuisé',
          sizes : 'Tailles',
          price : 'Prix',
          mad : 'MAD',
          next : 'Suivant',
          previous : 'Précédant',
        },
      },
      ar: {
        translation: {
          welcome: "مرحبًا بك في تطبيقنا",
          home : "الرئيسية",
          shoes : "الاحذية",
          sandals : 'صنادل',
          shirts : 'اقمصة',
          pants :'سراويل',
          YourCart : 'السلة',
          ourPromotions : 'عروض التخفيضات',
          ourProducts : 'منتوجاتنا',
          viewProduct : 'معاينة المنتج',
          addCart : 'اضافة الى السلة',
          soldOut : 'نفذ',
          sizes : 'المقاسات',
          price : 'السعر',
          mad : "د.م",
          next : 'التالي',
          previous : 'السابق',
          
        },
      },
    },
    lng: "ar",
    fallbackLng: "en",
    interpolation: {
      escapeValue: false, 
    },
  });

  interface langContextProps{
    currentLang : string;
    setCurrentLang : Dispatch<React.SetStateAction<string>>
  }
  export const selectedLang = (l:string) => {
    let a = '';
    switch(l){
        case    'العربية':
            a = 'ar';
            break;
        case 'Français':
            a = 'fr';
            break;
        case 'English':
            a='en';
            break
    }return a
}
  const langContext = createContext<langContextProps | undefined>(undefined);
  export const LangContextProvider : React.FC<{children:ReactNode}> = ({children}) =>{
    const [currentLang, setCurrentLang] = useState<string>("Français");
    useEffect(()=>{
        i18n.changeLanguage(selectedLang(currentLang));
    },[currentLang])


    return(
        <langContext.Provider value={{currentLang, setCurrentLang}}>
            {children}
        </langContext.Provider>
    )
  };

export default i18n;
export const useLangContext = () : langContextProps => {
    const context = useContext(langContext);
    if(context===undefined){
        throw new Error('useLangContext must be used within a langContextProvider');
    }
    return context
}