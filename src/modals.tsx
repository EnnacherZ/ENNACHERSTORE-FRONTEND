import React, { useLayoutEffect, useState } from "react";
import { CartItem } from "./cartContext";
import ModalBackDrop from "./modalBackdrop";
import { motion} from "framer-motion";
import "./modals.css"
import { FaRegTrashAlt } from "react-icons/fa";
import { IoArrowBackOutline } from "react-icons/io5";
import { useTranslation } from "react-i18next";
import { selectedLang, useLangContext } from "./languageContext";
import packageJson from '../package.json'



interface cartConfirmProps {
    cible : string;
    item : CartItem;
    onRemove : () => void;
    onBack : () => void;
    onClearAll : () => void;
}

const dropIn = {
    hidden : {
        y : "-100vh",
        opacity : 0
    },
    visible : {
        y : 0,
        opacity : 1,
        transition:{
            type: "tween",
            duration: 0.8,
            ease: "easeInOut"
        }
    },
    exit : {
        y : "100vh",
        opacity : 0
    },
}

const Modals : React.FC<cartConfirmProps> =({item, cible, onBack, onRemove, onClearAll}) => {

    const [isSP, setIsSP] = useState<boolean>(false);
    const {t} = useTranslation();
    const {currentLang} = useLangContext();
    const apiUrl = packageJson.config.backendURL

    useLayoutEffect(()=>{
        if(window.innerWidth<600){
            setIsSP(true);
        }else{setIsSP(false)}
    }, [window.innerWidth])
    console.log(isSP)

    return(<>
    <ModalBackDrop onClose={onBack} >
        <motion.div
        onClick={e=>e.stopPropagation()}
        className=""
        variants={dropIn}
        initial="hidden"
        animate="visible"
        exit="exit"
        >
            
            <div    className={cible==="remove"?" card parentCartConf":"d-none "}>
                <div className={`ms-3 fw-bold ${selectedLang(currentLang)=='ar'?'rtl me-2':''}`} style={{fontSize:20, marginTop:"1%"}}>
                    {t('deleteConf')}
                </div>
                <hr></hr>
                <div className={`ms-3 mt-1 ${selectedLang(currentLang)=='ar'?'rtl me-2':''}`} style={isSP?{fontSize:16}:{fontSize:18,}}>
                    {t('removeItem')}
                </div >

                    <div className=" d-flex flex-column align-items-center card-body px-0 mb-2"
                     style={{width:"100%", aspectRatio:10, marginTop:"3%",paddingTop:"5%"}}>
                    <div className='col-md-4 imgCartConf py-1 px-1' >
                        <img src={`${apiUrl}${item.image}`} className='imgCartImgConf rounded' />
                        
                    </div> 
                    <div className={`d-flex justify-content-around g-0 mt-2 ${selectedLang(currentLang)=='ar'?'rtl':''}`}
                                    style={{width:"100%", textTransform:'capitalize'}}>
                    <div className='col-md-4  cartPriceConf1 text-start '>
                            <div style={{fontSize:14,}}><strong style={{fontWeight:500}}>{t('category')} : </strong>{item.category.toLowerCase()}</div> 
                            <div style={{fontSize:14,}}><strong style={{fontWeight:500}}>{t('ref')} :</strong> {item.ref.toLowerCase()}</div>
                            <div style={{fontSize:14,}}><strong style={{fontWeight:500}}>{t('name')} :</strong> {item.name.toLowerCase()}</div> 
                    </div> 
                    <div className='' style={{wordSpacing:5}}>
                            <div style={{fontSize:14,}}><strong style={{fontWeight:500}}>{t('price')} :</strong> <b id="inPr">{(item.price*(1-item.promo*0.01)).toFixed(2)}{t('mad')}</b></div> 
                            <div className={item.promo===0?"d-none":""} style={{fontSize:14,}}><strong style={{fontWeight:500}}>{t('before')} : </strong><b id='delPr'>{(item.price.toFixed(2))}{t('mad')}</b></div>
                            <div style={{fontSize:14,}}><b style={{ fontWeight:500}}>{t('size')} :</b> {item.size}</div>
                    </div> 

                    </div> 

                </div>
                <div className="align-bottom"
                    style={{ display:'flex',
                        justifyContent:'end',
                        marginBottom:"1%",
                        marginRight:"2%"
               }} >
                    <span className="mx-2"><button className="btn btn-secondary mt-2"
                                                    style={{fontSize:14}} 
                                                    onClick={onBack}>
                                                <IoArrowBackOutline size={20} /> {t('cancelBack')}
                                            </button>
                    </span>
                    <span className="mx-2"><button className="btn bry btn-danger mt-2"
                                                    style={{fontSize:14}} 
                                                    onClick={onRemove}>
                                                <FaRegTrashAlt  /> {t('remove')}
                                            </button>
                    </span>
                </div>

                
            </div>
            <div  className={cible==="clearAll"?"card align-middle parentCartConfAll ":"d-none"}
                    >
                <div className={`ms-3 fw-bold ${selectedLang(currentLang)=='ar'?'rtl me-2':''}`} style={{fontSize:20, marginTop:"1%"}}>
                    {t('deleteConf')}
                </div>
                <hr></hr>
                <div className={`ms-3 mt-1 ${selectedLang(currentLang)=='ar'?'rtl me-2':''}`} style={{fontSize:16, marginTop:"1%"}}>
                    {t('removeAll')}
                </div >
                <div className="align-bottom mt-4"
                    style={{ display:'flex',
                        justifyContent:'end',
                        alignItems:"end",
                        marginRight:"1%",
                        marginBottom:"2%"
                }} >
                    <span className="mx-2"><button className="btn btn-secondary "
                                                     style={isSP?{fontSize:13}:{}}
                                                    onClick={onBack}>
                                                <IoArrowBackOutline  /> {t('cancelBack')}
                                            </button>
                    </span>
                    <span className="mx-2"><button className="btn bry btn-danger"
                                                     style={isSP?{fontSize:13}:{}}
                                                    onClick={onClearAll}>
                                                <FaRegTrashAlt  /> {t('clearAllItems')}
                                            </button>
                    </span>
                </div>
            </div>

        </motion.div>

        

    </ModalBackDrop>
        
    </>)
}
export default Modals