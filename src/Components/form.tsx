import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { BsGeoAltFill } from "react-icons/bs";
import { FaCity, FaRegUserCircle } from "react-icons/fa";
import { FaPhone } from "react-icons/fa6";
import { MdAlternateEmail } from "react-icons/md";
import { useLangContext } from "../Contexts/languageContext";
import { clientData, usePayment } from "../Contexts/paymentContext";
import { useTranslation } from "react-i18next";
import "../Styles/checkout.css"

type FormValues = {
    FirstName : string;
    LastName : string;
    Email : string;
    Tel: string;
    City: string;
    Address : string;
    customerId : string;
  
  }

const Form : React.FC = () => {
    const {currentLang} = useLangContext();
    const {t} = useTranslation();
    const {setClientForm, clientForm, setPaymentResponse, shoesOrder, sandalsOrder} = usePayment();
    const [isModify, setIsModify] = useState<boolean>(false);

    const Clientform = useForm<FormValues>({
          
          defaultValues:clientForm
        })
        const {register,
            handleSubmit,
            formState : {errors, isSubmitting},
            getValues,
      } = Clientform;
    const isClt = (data:clientData | undefined) =>{
        if(data == undefined){return false}
            for(const p of Object.keys(data)){
            if(data[p as keyof clientData] ==""){return false}
            }return true
          }


    return(<>
    <form>

        <div className="form-first-line flex-column">
            <div className="input-group">
        
                <span className="input-group-text" ><FaRegUserCircle /></span> 
              <input  {...register("FirstName",{
                        required:t('fnreq')+' !'
              })}
                      type="text" 
                      className={errors.FirstName?"form-control is-invalid":"form-control"} 
                      placeholder={t('firstN')}
                      readOnly={isModify}
                      disabled={isModify}/>
            </div>
            <div className="input-group">
            <span className="input-group-text"><FaRegUserCircle/></span> 
              <input  {...register("LastName",{
                        required:t('lnreq')+' !'
              })} 
                      type="text" 
                      className={errors.LastName?"form-control is-invalid":"form-control"}
                      placeholder={t('lastN')}
                      readOnly={isModify}
                      disabled={isModify}
                      />
            </div>
        </div>
        <div className="form-second-line flex-column">
            <div className="">

            </div>
            <div className="">

            </div>
        </div>
        <div className="form-third-line flex-column">
            <div className="">

            </div>
            <div className="">

            </div>
        </div>

    <span>
            <span style={{marginRight:"35%", fontSize:"1.25vw"}}><label className="form-label">{t('firstN')}:</label></span>
            <span style={{fontSize:"1.25vw"}}><label className="form-label">{t('lastN')}:</label></span>
          </span> 
          <div className="input-group mb-2">
              <span className="input-group-text" ><FaRegUserCircle /></span> 
              <input  {...register("FirstName",{
                        required:t('fnreq')+' !'
              })}
                      type="text" 
                      className={errors.FirstName?"form-control is-invalid":"form-control"} 
                      placeholder={t('firstN')}
                      readOnly={isModify}
                      disabled={isModify}/>
    
    
              <span className="input-group-text"><FaRegUserCircle/></span> 
              <input  {...register("LastName",{
                        required:t('lnreq')+' !'
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
                  <span style={{color:"red", fontSize:"1.25vw", marginLeft:"2.5%"}}>{`${errors.LastName.message}`}</span>
                )}</span>
    
          <span>
            <span style={{marginRight:"40.5%", fontSize:"1.25vw"}}><label className="form-label">{t('email')}:</label></span>
            <span style={{fontSize:"1.25vw"}}><label className="form-label">{t('phN')}:</label></span>
          </span> 
          <div className="input-group mb-2">
              <span className="input-group-text" id="basic-addon2"><MdAlternateEmail /></span>
              <input  {...register("Email",{
                        required:t('emlreq')+' !'
              })} 
                      type="email" 
                      className={errors.Email?"form-control is-invalid":"form-control"}
                      placeholder={t('email')}
                      readOnly={isModify}
                      disabled={isModify}/>
    
                      <span className="input-group-text" id="basic-addon3"><FaPhone /></span>
            <input  {...register("Tel",{
                        required:t('telreq')+' !',
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
                  <span style={{color:"red", fontSize:"1.25vw", marginLeft:"8%"}}>{`${errors.Tel.message}`}</span>
                )}</span>
    
          <span>
            <span style={{marginRight:"45%", fontSize:"1.25vw"}}><label className="form-label">{t('city')}:</label></span>
            <span style={{fontSize:"1.25vw"}}><label className="form-label">{t('address')}:</label></span>
          </span> 
          <div className="input-group mb-3">
            <span className="input-group-text"><FaCity /></span>
            <input  {...register("City",{
                        required:t('cityreq')+' !'
              })} 
                    type="text" 
                    className={errors.City?"form-control is-invalid":"form-control"}
                    placeholder={t('city')}
                    readOnly={isModify}
                    disabled={isModify}/>
    
    
                    <span className="input-group-text"><BsGeoAltFill /></span>
            <input  {...register("Address",{
                        required:t('addressreq')+' !'
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
    
    
            
    
        </form>
    </>)
}
export default Form;