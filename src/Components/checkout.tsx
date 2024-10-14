import React, { useState } from "react";
import Header from "./header";
import "../Styles/checkout.css"
import { clientData, usePayment } from '../Contexts/paymentContext';
import { useForm } from 'react-hook-form';
import { IoArrowBackOutline } from "react-icons/io5";
import { FaPhone } from 'react-icons/fa6';
import { BsGeoAltFill } from 'react-icons/bs';
import { FaCity,FaRegUserCircle, FaUserCircle} from 'react-icons/fa';
import { MdAlternateEmail} from 'react-icons/md';
import { useNavigate } from "react-router-dom";
import ReactCountryFlag from "react-country-flag";
import Footer from "./footer";

type FormValues = {
  FirstName : string;
  LastName : string;
  Email : string;
  Tel: string;
  City: string;
  Address : string

}


const Checkout :  React.FC = () => {
    const navigate = useNavigate();
    const {setClientForm, clientForm} = usePayment();
    const Clientform = useForm<FormValues>({
      defaultValues:clientForm
    })
    const {register,
        handleSubmit,
        formState : {errors, isSubmitting},
        getValues,
        
  } = Clientform;

    const [selectedCurrency, setSelectedCurrency] = useState<string>('MAD')
    const [isModify, setIsModify] = useState<boolean>(false)

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

    const isClt = (data:clientData) =>{
        for(const p of Object.keys(data)){
         if(data[p as keyof clientData] ==""){return false}
        }return true
    }

          
       const validateCommand = async () =>{
     
         //TODO: send data to server
         //... 
         if(isClt(clientForm)){
          }
         const clientCoord : clientData = {
           FirstName : getValues('FirstName'),
           LastName : getValues('LastName'),
           Email : getValues('Email'),
           Tel : getValues('Tel'),
           City : getValues('City'),
           Address : getValues('Address'),
         }
         setClientForm(clientCoord)
         setIsModify(true)
         await new Promise ((resolve)=>setTimeout(resolve, 1000))
         navigate("/Checkout")
       }

    
    return(<>
      <Header/>
      <div className="mt-1">
      <div className="checkoutBar shadow rounded d-flex justify-content-between ">
        <button className="btn btn-primary btn-back my-2 mx-1 p-0"
                style={{width:90}}
                onClick={()=>navigate("/YourCart")}>
            <IoArrowBackOutline style={{marginRight:-3}} /> to cart
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
    <form className='form-floating card shadow-lg ClientInfosDiv p-2 pt-0 mt-2' onSubmit={handleSubmit(validateCommand)}>
          <div className='text-center my-2 fs-3'><b><FaUserCircle style={{marginTop:-3}}/> Client informations</b></div>
          <hr></hr>
      <span>
        <span style={{marginRight:"35%", fontSize:"1.25vw"}}><label className="form-label">First Name:</label></span>
        <span style={{fontSize:"1.25vw"}}><label className="form-label">Last Name:</label></span>
      </span> 
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
      <span >  {errors.FirstName && (
              <span style={{color:"red", marginRight:"16%", fontSize:"1.25vw"}}>{`${errors.FirstName.message}`}</span>
            )}
            {errors.LastName && (
              <span style={{color:"red", fontSize:"1.25vw"}}>{`${errors.LastName.message}`}</span>
            )}</span>

      <span>
        <span style={{marginRight:"40.5%", fontSize:"1.25vw"}}><label className="form-label">E-mail:</label></span>
        <span style={{fontSize:"1.25vw"}}><label className="form-label">Phone:</label></span>
      </span> 
      <div className="input-group mb-2">
          <span className="input-group-text" id="basic-addon2"><MdAlternateEmail /></span>
          <input  {...register("Email",{
                    required:"Your e-mail is required !"
          })} 
                  type="email" 
                  className={errors.Email?"form-control is-invalid":"form-control"}
                  placeholder="Your e-mail"
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
                placeholder='Cell phone number'
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
        <span style={{marginRight:"45%", fontSize:"1.25vw"}}><label className="form-label">City:</label></span>
        <span style={{fontSize:"1.25vw"}}><label className="form-label">Address:</label></span>
      </span> 
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
              {(isClt(clientForm) && isModify==false)?"Save modifications":"Save"}
        </button>
        <button type='button' 
                className={`btn btn-danger rounded ${(isModify)?'':'d-none'}`}
                onClick={()=>{setIsModify(false)}}
                disabled={!isModify}>
            Modify
        </button>


        

    </form>

    <form className='form-floating card rounded shadow-lg ClientInfosDivSM p-2 pt-0 mt-2' onSubmit={handleSubmit(validateCommand)}>
          <div className='text-center my-2 fs-3'><b><FaUserCircle style={{marginTop:-3}}/> Client informations</b></div>
          <hr></hr>
      <span><label className="form-label">First Name</label></span>
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
      <span><label className="form-label">Last Name</label></span>
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

      <span><label className="form-label">E-mail</label></span>
      <div className="input-group mb-2">
          <span className="input-group-text" id="basic-addon2"><MdAlternateEmail /></span>
          <input  {...register("Email",{
                    required:"Your e-mail is required !"
          })} 
                  type="email" 
                  className={errors.Email?"form-control is-invalid":"form-control"}
                  placeholder="Your e-mail"
                  readOnly={isModify}
                  disabled={isModify}/>
        </div>          
        {errors.Email && (
              <span style={{color:"red",fontSize:16}}>{`${errors.Email.message}`}</span>
            )}
      <span><label className="form-label">Phone</label></span>
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

      <span><label className="form-label">City</label></span>
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

        <span><label className="form-label">Address</label></span>
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
              {(isClt(clientForm) && isModify==false)?"Save modifications":"Save"}
        </button>
        <button type='button' 
                className={`btn btn-danger mb-2 rounded ${(isModify)?'':'d-none'}`}
                onClick={()=>{setIsModify(false)}}
                disabled={!isModify}>
            Modify
        </button>


        

    </form>

    </div>
    <Footer/>
    </>)



};
export default Checkout;