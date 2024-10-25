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
          productPreview : 'Product preview',
          productInfos : 'Product infos',
          quantitAction : 'Quantity/Action',
          total:'Total',
          clearCart : 'Clear cart',
          orderSummary : 'ORDER SUMMARY',
          shipping : 'Shipping',
          other : 'Other',
          size : 'Size',
          totalAmount : 'Total amount',
          removeItem : 'Are you sure you want to remove this item ?',
          deleteConf : 'Delete confirmation ',
          category : 'Category',
          ref : 'Ref',
          name : 'Name',
          before : 'Before',
          remove : 'Remove',
          cancelBack : 'Cancel and Back',
          removeAll : 'Are you sure you want to remove all the items ?',
          clearAllItems : 'Clear all items',
          shopNow : 'Shop now',
          nullCart: 'There are no items in your shopping cart',
          promotion : 'Promotion',
          off : 'Off',
          toastSizeAlert : 'Size is not selected !',
          toastAddSuccess : 'A new shoe item is added !',
          toCart : "To cart",
          clientInfos : 'Client informations',
          paymentPortal : 'Payment portal',
          checkoutAlert : 'Fill the form firstly, then choose the payment method 👍🏻',
          creditCard : 'Credit card',
          firstN :'First name',
          lastN : 'Last name',
          email : 'E-mail',
          phN : 'Phone number',
          address : 'Address',
          city : 'City',
          save : 'Save',
          saveMod : 'Save modifications',
          modify:'Modify',
          pay:'Pay',
          loading : 'Loading . . .',


          
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
          productPreview : 'Aperçu du produit',
          productInfos : 'Infos du produit',
          quantitAction : 'Quantité/Action',
          total:'Total',
          clearCart : 'Vider le panier',
          orderSummary : 'La commande',
          shipping : 'Transport',
          other : 'Autre',
          size : 'Taille',
          totalAmount : 'Montant ',
          removeItem : 'Etes-vous sûr de vouloir supprimer cet élément ?',
          deleteConf : 'Confirmation de supression',
          category : 'Catégorie',
          ref : 'Ref',
          name : 'Nom',
          before : 'Avant',
          remove : 'Supprimer',
          cancelBack : 'Annuler et revenir',
          removeAll : 'Etes-vous sûr de vouloir supprimer tous les éléments ?',
          clearAllItems : 'Effacer tous',
          shopNow : 'Achetez maintenant',
          nullCart: 'Il n\'y a aucun article dans votre panier',
          promotion : 'Promotion',
          off : 'Moins',
          toastSizeAlert : "La taille n'est pas choisie !",
          toastAddSuccess : "Une nouvelle chaussure est ajoutée !",
          toCart : "Retour au panier",
          clientInfos : 'Informations du client',
          paymentPortal : 'Portail de paiement',
          checkoutAlert : "Remplissez d'abord le formulaire, puis choisissez le mode de paiement 👍🏻",
          creditCard : 'Carte bancaire',
          firstN :'Prénom',
          lastN : 'Nom',
          email : 'E-mail',
          phN : 'N° de téléphone',
          address : 'Adresse',
          city : 'Ville',
          save : 'Sauvegarder',
          saveMod : 'Sauvegarder les modifications',
          modify:'Modifier',
          pay : 'Payer',
          loading : 'Chargement . . .',
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
          productPreview : 'معاينة المنتج',
          productInfos : 'تفاصيل المنتج',
          quantitAction : 'الكمية/اجراء',
          total:'المجموع',
          clearCart : 'افراغ السلة',
          orderSummary : 'ملخص الطلبية',
          shipping : 'النقل',
          other : 'اخرى',
          size : 'المقاس',
          totalAmount : 'المبلغ الاجمالي',
          removeItem : 'هل أنت متأكد أنك تريد إزالة هذا العنصر؟',
          deleteConf : 'تاكيد الحذف',
          category : 'الصنف',
          ref : 'المرجع',
          name : 'الاسم',
          before : 'قبل',
          remove : 'حذف',
          cancelBack : 'الالغاء و العودة',
          removeAll : 'هل أنت متأكد أنك تريد حذف كافة العناصر؟',
          clearAllItems : 'حذف الكل',
          shopNow : 'تسوق الآن',
          nullCart: 'لا يوجد أي سلع في سلة التسوق الخاصة بك',
          promotion : 'عرض خاص',
          off : 'تخفيض',
          toastSizeAlert : "! لم يتم اختيار مقاس محدد",
          toastAddSuccess : "! تمت اضافة عنصر جديد الى السلة ",
          toCart : "الرجوع الى السلة",
          clientInfos : 'معلومات الزبون',
          paymentPortal : 'بوابة الدفع',
          checkoutAlert : "👍🏻قم أولاً بملء النموذج، ثم اختر طريقة الدفع",
          creditCard : 'بطاقة بنكية',
          firstN :'الاسم',
          lastN : 'النسب',
          email : 'البريد الالكتروني',
          phN : 'رقم الهاتف',
          address : 'العنوان',
          city : 'المدينة',
          save : 'حفظ',
          saveMod : 'حفظ التغييرات',
          modify:'تعديل',
          pay : 'دفع',
          loading : '. . . جاري التحميل ',

        },
      },
    },
    lng: "fr",
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