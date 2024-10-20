import React, { useEffect, useLayoutEffect, useState } from "react";
import Header from "./header";
import "../Styles/checkout.css"
import { clientData, usePayment } from '../Contexts/paymentContext';
import { useForm } from 'react-hook-form';
import { GoAlertFill } from "react-icons/go";
import { IoArrowBackOutline } from "react-icons/io5";
import { FaCcPaypal, FaCreditCard, FaMoneyBillTransfer, FaPhone } from 'react-icons/fa6';
import { BsGeoAltFill } from 'react-icons/bs';
import { FaCity,FaRegUserCircle, FaUserCircle} from 'react-icons/fa';
import { MdAlternateEmail} from 'react-icons/md';
import { useNavigate } from "react-router-dom";
import ReactCountryFlag from "react-country-flag";
import Footer from "./footer";
import { useTranslation } from "react-i18next";
import { v4 as uuidv4 } from 'uuid';
import { CurrencyCode, YouCanPay } from "youcan-payment-nodejs-sdk";
import { useLangContext, selectedLang } from "../Contexts/languageContext"; 

type FormValues = {
  FirstName : string;
  LastName : string;
  Email : string;
  Tel: string;
  City: string;
  Address : string;
  customerId : string;

}


const Checkout :  React.FC = () => {
    const navigate = useNavigate();
    const {t} = useTranslation();
    const {currentLang} = useLangContext();
    const {setClientForm, clientForm} = usePayment();
    const [isPhone, setIsPhone]= useState<boolean>()
    const [isScriptLoaded, setIsScriptLoaded] = useState<boolean>(false);
    const [tokenId, setTokenId] = useState<string>();
    const [selectedCurrency, setSelectedCurrency] = useState<string>('MAD')
    const [isModify, setIsModify] = useState<boolean>(false);
    const flN = () => {if(clientForm){return  clientForm?.FirstName+' '+clientForm?.LastName}else{return ''}}
    const Clientform = useForm<FormValues>({
      
      defaultValues:clientForm
    })
    const {register,
        handleSubmit,
        formState : {errors, isSubmitting},
        getValues,
        
  } = Clientform;



    const currencyRender = (l:string) => {
        let a = '';
        switch(l){
            case 'MAD':
                a = 'MA';
                break;
            case 'EUR €':
                a='EU';
                break;
            case 'USD $':
                a='US';
                break;
            
        }return a
    }

    const isClt = (data:clientData | undefined) =>{
      if(data == undefined){return false}
        for(const p of Object.keys(data)){
         if(data[p as keyof clientData] ==""){return false}
        }return true
    }

          
       const validateCommand = async () =>{
     
         //TODO: send data to server
         //... 
         const paySec = document.getElementById('paymentGatewayTitle')
         if(isClt(clientForm)){
          }
         const clientCoord : clientData = {
           FirstName : getValues('FirstName'),
           LastName : getValues('LastName'),
           Email : getValues('Email'),
           Tel : getValues('Tel'),
           City : getValues('City'),
           Address : getValues('Address'),
           customerId : uuidv4()
         }
         setClientForm(clientCoord)
         setIsModify(true)
         await new Promise ((resolve)=>setTimeout(resolve, 1000))
         if(isPhone){paySec?.scrollIntoView()}

       }

       useLayoutEffect(()=>{
        const phone = () => {
          if(window.innerWidth<=800){setIsPhone(true)}
          else(setIsPhone(false))
        };
        phone();
        addEventListener('resize', phone);
        return () =>{
          window.removeEventListener('resize', phone)
        }
       }, [window.innerWidth])

      useEffect(() => {
        // Charger le script YCPay dynamiquement
        const script = document.createElement('script');
        script.src = 'https://youcanpay.com/js/ycpay.js';
        script.async = true;
        script.onload = () => setIsScriptLoaded(true);
        document.body.appendChild(script);

        return () => {
            document.body.removeChild(script);
        };
      }, []);
      const handleYCPay = async () => {
        const youCanPayment = new YouCanPay(
            'pri_sandbox_a54c2b28-f8e5-4920-a440-64003',
            true
        );
        
        if(tokenId){return}
        else{
          try {
            // Obtenir le token
            const token = await youCanPayment.getToken({
                amount: 500, // Montant requis
                currency: CurrencyCode.MAD, // Devise requise
                customer_ip: '10.25.28.33', // IP du client requise
                order_id: '112', // ID de commande requis
                success_url: 'https://google.com/', // URL de succès requise
                error_url: 'https://youtube.com/', // URL d'erreur optionnelle
                customer: {
                    name: flN(), 
                    address: '', 
                    zip_code: '', 
                    city: '', 
                    state: '', 
                    country_code: '', 
                    phone: '', 
                    email: '', 
                },
            });

                setTokenId(token.id); // Mettre à jour l'état avec l'ID du token
                
                }catch(err){console.log(err)}
        }
      };

            useEffect(() => {
                if (isScriptLoaded && tokenId) {
                  const ycPay = new YCPay('pub_sandbox_1bfc0387-7aea-49ab-b51e-930e5', {
                    locale: selectedLang(currentLang),
                    isSandbox: true,
                    errorContainer: '#error-container',
                    formContainer: '#payment-container'
                });
                // render the payment methods
              ycPay.renderCreditCardForm('default')
              // Ajouter un gestionnaire d'événements pour le bouton de paiement
              const payButton = document.getElementById('pay');
              if (payButton) {
                  payButton.addEventListener('click', function() {
                      ycPay.pay(tokenId)
                          .then(successCallback)
                          .catch(errorCallback);
                  });
              }
          }
      }, [tokenId]);
      const successCallback = (response: any) => {
          console.log('Payment successful:', response);

          navigate("/Home")

      };

      const errorCallback = (response: any) => {
          // Votre code ici pour gérer l'erreur
          console.error('Payment error:', response);
      };
    return(<>
      <Header/>
      <div className="mt-1">
      <div className="checkoutBar shadow rounded d-flex justify-content-between ">
        <button className="btn btn-primary btn-back my-2 mx-1 p-0"
                style={{width:90}}
                onClick={()=>navigate("/YourCart")}>
            <IoArrowBackOutline style={{marginRight:-3}} /> {t('toCart')}
        </button>

        <div className="d-flex align-items-center "> 
            <strong style={{fontSize:14}}> Total : 1000000 {selectedCurrency}</strong>
        </div>

        <div style={{width:130, height:"100%"}} className="d-flex align-items-center me-0  justify-content-end">
            <ReactCountryFlag
                        className="checkFlag"
                        countryCode= {currencyRender(selectedCurrency)}
                        svg
                        style={{
                            width: '20%',
                            height: 35,
                            marginRight:3,
                        }}
                        title={currencyRender(selectedCurrency)}
                    />
            <select className="form-select  align-middle d-inline border-none"
                    style={{width:95, color:'green', fontWeight:500, backgroundColor:"#efecec"}}
                    onChange={(e)=>setSelectedCurrency(e.target.value)}
                    >
                <option defaultValue={'MAD'} style={{fontWeight:500}}>MAD</option>
                <option style={{fontWeight:500}}>USD $</option>
                <option style={{fontWeight:500}}>EUR €</option>
            </select>
        </div> 

    </div>

    <div className="alert"><GoAlertFill size={"1.3em"}  className="mx-2 alerticon"/> 
      {t('checkoutAlert')}
    </div>

    <div className="clientFormAndPayment disabled">
    {!isPhone?<form className='form-floating card shadow-lg ClientInfosDiv p-2 pt-0 mt-2' onSubmit={handleSubmit(validateCommand)}>
          <div className='text-center my-2 fs-3'><b><FaUserCircle style={{marginTop:-3}}/> {t('clientInfos')}</b></div>
          <hr></hr>
      <span>
        <span style={{marginRight:"35%", fontSize:"1.25vw"}}><label className="form-label">{t('firstN')}:</label></span>
        <span style={{fontSize:"1.25vw"}}><label className="form-label">{t('lastN')}:</label></span>
      </span> 
      <div className="input-group mb-2">
          <span className="input-group-text" ><FaRegUserCircle /></span> 
          <input  {...register("FirstName",{
                    required:"Your first name is required !"
          })}
                  type="text" 
                  className={errors.FirstName?"form-control is-invalid":"form-control"} 
                  placeholder={t('firstN')}
                  readOnly={isModify}
                  disabled={isModify}/>


          <span className="input-group-text"><FaRegUserCircle /></span> 
          <input  {...register("LastName",{
                    required:"Your last name is required !"
          })} 
                  type="text" 
                  className={errors.LastName?"form-control is-invalid":"form-control"}
                  placeholder={t('lastN')}
                  readOnly={isModify}
                  disabled={isModify}
                  />

      </div>
      <span >  {errors.FirstName && (
              <span style={{color:"red", marginRight:"16%", fontSize:"1.25vw"}}>{`${errors.FirstName.message}`}</span>
            )}
            {errors.LastName && (
              <span style={{color:"red", fontSize:"1.25vw"}}>{`${errors.LastName.message}`}</span>
            )}</span>

      <span>
        <span style={{marginRight:"40.5%", fontSize:"1.25vw"}}><label className="form-label">{t('email')}:</label></span>
        <span style={{fontSize:"1.25vw"}}><label className="form-label">{t('phN')}:</label></span>
      </span> 
      <div className="input-group mb-2">
          <span className="input-group-text" id="basic-addon2"><MdAlternateEmail /></span>
          <input  {...register("Email",{
                    required:"Your e-mail is required !"
          })} 
                  type="email" 
                  className={errors.Email?"form-control is-invalid":"form-control"}
                  placeholder={t('email')}
                  readOnly={isModify}
                  disabled={isModify}/>

                  <span className="input-group-text" id="basic-addon3"><FaPhone /></span>
        <input  {...register("Tel",{
                    required:"Your phone number is required !",
                    minLength : {
                      value:10,
                      message:"You should enter 06.. or 07... or +212... form "
                    }
                    
          })} 
                type="tel" 
                className={errors.Tel?"form-control is-invalid":"form-control"} 
                placeholder={t('phN')}
                readOnly={isModify}
                disabled={isModify}/>


      </div>
      <span >  {errors.Email && (
              <span style={{color:"red", marginRight:"16%", fontSize:"1.25vw"}}>{`${errors.Email.message}`}</span>
            )}
            {errors.Tel && (
              <span style={{color:"red", fontSize:"1.25vw"}}>{`${errors.Tel.message}`}</span>
            )}</span>

      <span>
        <span style={{marginRight:"45%", fontSize:"1.25vw"}}><label className="form-label">{t('city')}:</label></span>
        <span style={{fontSize:"1.25vw"}}><label className="form-label">{t('address')}:</label></span>
      </span> 
      <div className="input-group mb-3">
        <span className="input-group-text"><FaCity /></span>
        <input  {...register("City",{
                    required:"Your City name is required !"
          })} 
                type="text" 
                className={errors.City?"form-control is-invalid":"form-control"}
                placeholder={t('city')}
                readOnly={isModify}
                disabled={isModify}/>


                <span className="input-group-text"><BsGeoAltFill /></span>
        <input  {...register("Address",{
                    required:"Your address is required !"
          })} 
                type="text" 
                className={errors.Address?"form-control is-invalid":"form-control"} 
                placeholder={t('address')}
                readOnly={isModify}
                disabled={isModify}/>
      </div>
      <span >  {errors.City && (
              <span style={{color:"red", marginRight:"16%", fontSize:"1.25vw"}}>{`${errors.City.message}`}</span>
            )}
            {errors.Address && (
              <span style={{color:"red", fontSize:"1.25vw"}}>{`${errors.Address.message}`}</span>
            )}</span>

        <button type='submit' 
                disabled={isSubmitting}
                className={`btn btn-success  rounded ${isModify?"d-none":''}`}
                onClick={()=>{}}>
              {(isClt(clientForm) && isModify==false)?t('saveMod'):t('save')}
        </button>
        <button type='button' 
                className={`btn btn-danger rounded ${(isModify)?'':'d-none'}`}
                onClick={()=>{setIsModify(false)}}
                disabled={!isModify}>
            {t('modify')}
        </button>


        

    </form>:
      <form className='form-floating card rounded shadow-lg ClientInfosDivSM p-2 pt-0 mt-2' onSubmit={handleSubmit(validateCommand)}>
      <div className='text-center my-2 fs-3'><b><FaUserCircle style={{marginTop:-3}}/>{t('clientInfos')}</b></div>
      <hr></hr>
      <span><label className="form-label">{t('firstN')}</label></span>
      <div className="input-group mb-2">
        <span className="input-group-text" ><FaRegUserCircle /></span> 
        <input  {...register("FirstName",{
                  required:"Your first name is required !"
        })}
                type="text" 
                className={errors.FirstName?"form-control is-invalid":"form-control"} 
                placeholder="First Name"
                readOnly={isModify}
                disabled={isModify}/>
    </div>
    {errors.FirstName && (
        <span style={{color:"red", fontSize:16}}>{`${errors.FirstName.message}`}</span>
    )}
    <span><label className="form-label">{t('lastN')}</label></span>
    <div className="input-group mb-2">
        <span className="input-group-text"><FaRegUserCircle /></span> 
        <input  {...register("LastName",{
                  required:"Your last name is required !"
        })} 
                type="text" 
                className={errors.LastName?"form-control is-invalid":"form-control"}
                placeholder="Last Name"
                readOnly={isModify}
                disabled={isModify}/>

    </div>
    {errors.LastName && (
      <span style={{color:"red", fontSize:16}}>{`${errors.LastName.message}`}</span>
    )}

    <span><label className="form-label">{t('email')}</label></span>
    <div className="input-group mb-2">
        <span className="input-group-text" id="basic-addon2"><MdAlternateEmail /></span>
        <input  {...register("Email",{
                  required:"Your e-mail is required !"
        })} 
                type="email" 
                className={errors.Email?"form-control is-invalid":"form-control"}
                placeholder={t('email')}
                readOnly={isModify}
                disabled={isModify}/>
      </div>          
      {errors.Email && (
            <span style={{color:"red",fontSize:16}}>{`${errors.Email.message}`}</span>
          )}
    <span><label className="form-label">{t('phN')}</label></span>
      <div className="input-group mb-2">
      <span className="input-group-text" id="basic-addon3"><FaPhone /></span>
      <input  {...register("Tel",{
                  required:"Your phone number is required !",
                  minLength : {
                    value:10,
                    message:"You should enter 06.. or 07... or +212... form "
                  }
                  
        })} 
              type="tel" 
              className={errors.Tel?"form-control is-invalid":"form-control"} 
              placeholder='Cell phone number'
              readOnly={isModify}
              disabled={isModify}/>


    </div>
    {errors.Tel && (
        <span style={{color:"red", fontSize:16}}>{`${errors.Tel.message}`}</span>
    )}

    <span><label className="form-label">{t('city')}</label></span>
    <div className="input-group mb-3">
      <span className="input-group-text"><FaCity /></span>
      <input  {...register("City",{
                  required:"Your City name is required !"
        })} 
              type="text" 
              className={errors.City?"form-control is-invalid":"form-control"}
              placeholder='Your city'
              readOnly={isModify}
              disabled={isModify}/>
      </div>
      {errors.City && (
      <span style={{color:"red",fontSize:16}}>{`${errors.City.message}`}</span>
    )}

      <span><label className="form-label">{t('address')}</label></span>
      <div className="input-group mb-2">
              <span className="input-group-text"><BsGeoAltFill /></span>
      <input  {...register("Address",{
                  required:"Your address is required !"
        })} 
              type="text" 
              className={errors.Address?"form-control is-invalid":"form-control"} 
              placeholder="Your address"
              readOnly={isModify}
              disabled={isModify}/>
    </div>
    {errors.Address && (
      <span style={{color:"red", fontSize:16}}>{`${errors.Address.message}`}</span>
    )}

      <button type='submit' 
              disabled={isSubmitting}
              className={`btn btn-success  mb-2 rounded ${isModify?"d-none":''}`}
              onClick={()=>{}}>
            {(isClt(clientForm) && isModify==false)?t('saveMod'):t('save')}
      </button>
      <button type='button' 
              className={`btn btn-danger mb-2 rounded ${(isModify)?'':'d-none'}`}
              onClick={()=>{setIsModify(false)}}
              disabled={!isModify}>
          {t('modify')}
      </button>
    </form>}

    
    <div className={`paymentGateway ${isClt(clientForm)&&isModify?'':'is-disabled'} card shadow p-2 mt-2 `}
          id="paymentGateway">
      <div className="paymentGatewayTitle fs-3" id="paymentGatewayTitle">
        <FaMoneyBillTransfer className="mx-3"/> {t('paymentPortal')}
      </div>
      <hr></hr>
      <button className="creditCard rounded my-2" onClick={handleYCPay} >
        <FaCreditCard className="mx-3"/> {t('creditCard')}
      </button>
      <button className="paypal rounded my-2">
        <FaCcPaypal className="mx-3" /> PayPal method
      </button>
      <div id="error-container" ></div>
      <div id="payment-container" ></div>
      <button id="pay" className="rounded mt-2">{t('pay')}</button>
    </div>

    </div>
    </div>
    <Footer/>
    </>)



};
export default Checkout;