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
  const selectedLang = (l:string) => {
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
    const [currentLang, setCurrentLang] = useState<string>("");
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