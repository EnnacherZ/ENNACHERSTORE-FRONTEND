import React from "react";
import { useCart } from "./Contexts/cartContext";
import { FaRegTrashAlt } from "react-icons/fa";
import { useTranslation } from "react-i18next";
import "./cartItems.css";
import "./Styles/cart.css"

const CartItems : React.FC = () =>{
    const apiUrl = import.meta.env.VITE_API_URL;
    const {shoesItems, handleMinusQuantity, handlePlusQuantity} = useCart();
    const {t} = useTranslation();
    const item = shoesItems[0]

    return(<>
    <div  style={{fontSize:13,}} className='py-1 cart-item'>
                      <div className='imgCart py-2 pe-2'>
                        <img src={`${apiUrl}${item.image}`} className='imgCartImg rounded' />
                      </div>
                      <div className="d-flex flex-column justify-content-between cartPriceSM">
                        <div className='text-center' style={{wordSpacing:3, textTransform: 'capitalize'}}>
                          <b>{item.category.toLowerCase()}</b> {item.name.toLowerCase()} ({item.size})
                        </div>
                        <div className='d-flex flex-row justify-content-between '
                            style={{height:98}}>
                        <div className='priceDetailsSM'>
                          <span className="present-price me-2"><strong style={{fontSize:14}}>{(item.price*(1-item.promo*0.01)).toFixed(2)} {t('mad')}</strong></span>
                          <div className={item.promo==0?'d-none':''}>
                              <b style={{color:'red'}}>{item.promo}%off </b>
                          </div>
                          <div style={{fontSize:12}}>
                              TOTAL : <b style={{color:'green', }}>{(item.price*(1-0.01*item.promo) * item.quantity).toFixed(2)} {t('mad')}</b>
                          </div>                              
                        </div>                               
                        <div className='d-flex justify-content-around align-items-center'
                              style={{marginRight:2}}>
                          <div className="input-group  cart-quantity ">
                              <button className="btn btn-outline-primary btn-sm rounded-0 p-0"
                                      style={{height:25, width:40}}
                                      onClick={()=>handleMinusQuantity(item)}> - 
                              </button>
                              <input
                                type="text"
                                className="text-center align-middle  border border-secondary rounded-0"
                                value={item.quantity}
                                readOnly
                                style={{
                                  outline:'none'
                                }}
                              />
                              <button className="btn btn-outline-success btn-sm rounded-0 p-0 "
                                      style={{height:25, width:40}}
                                      onClick={()=>handlePlusQuantity(item)}>+
                              </button>
                          </div>
                          <div>
                          <button className="btnCart btn btn-light  border-red p-0" 
                            style={{ outline: 0, fontSize:15, width:35, display:'inline', height:30}} 
                            >
                          <FaRegTrashAlt  /> 
                          </button>                                
                          </div>
                        </div>                               
                        </div>
                      </div>                            
                  </div>
                  <div  style={{fontSize:13,}} className='py-1 cart-item'>
                      <div className='imgCart py-2 pe-2'>
                        <img src={`${apiUrl}${item.image}`} className='imgCartImg rounded' />
                      </div>
                      <div className="d-flex flex-column justify-content-between cartPriceSM">
                        <div className='text-center' style={{wordSpacing:3, textTransform: 'capitalize'}}>
                          <b>{item.category.toLowerCase()}</b> {item.name.toLowerCase()} ({item.size})
                        </div>
                        <div className='d-flex flex-row justify-content-between '
                            style={{height:98}}>
                        <div className='priceDetailsSM'>
                          <span className="present-price me-2"><strong style={{fontSize:14}}>{(item.price*(1-item.promo*0.01)).toFixed(2)} {t('mad')}</strong></span>
                          <div className={item.promo==0?'d-none':''}>
                              <b style={{color:'red'}}>{item.promo}%off </b>
                          </div>
                          <div style={{fontSize:12}}>
                              TOTAL : <b style={{color:'green', }}>{(item.price*(1-0.01*item.promo) * item.quantity).toFixed(2)} {t('mad')}</b>
                          </div>                              
                        </div>                               
                        <div className='d-flex justify-content-around align-items-center'
                              style={{marginRight:2}}>
                          <div className="input-group  cart-quantity ">
                              <button className="btn btn-outline-primary btn-sm rounded-0 p-0"
                                      style={{height:25, width:40}}
                                      onClick={()=>handleMinusQuantity(item)}> - 
                              </button>
                              <input
                                type="text"
                                className="text-center align-middle  border border-secondary rounded-0"
                                value={item.quantity}
                                readOnly
                                style={{
                                  outline:'none'
                                }}
                              />
                              <button className="btn btn-outline-success btn-sm rounded-0 p-0 "
                                      style={{height:25, width:40}}
                                      onClick={()=>handlePlusQuantity(item)}>+
                              </button>
                          </div>
                          <div>
                          <button className="btnCart btn btn-light  border-red p-0" 
                            style={{ outline: 0, fontSize:15, width:35, display:'inline', height:30}} 
                            >
                          <FaRegTrashAlt  /> 
                          </button>                                
                          </div>
                        </div>                               
                        </div>
                      </div>                            
                  </div>





                  (<>
                  
                  </>)





                  
    </>)
};
export default CartItems;