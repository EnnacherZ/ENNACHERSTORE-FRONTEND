import React, {useEffect, useLayoutEffect, useState } from "react";
import { useCart } from "../Contexts/cartContext";
import { Link, useNavigate } from "react-router-dom";
import "../Styles/header.css";
import icon1 from "../assets/icon3.svg";
import {FaHome, FaShoppingCart, FaTshirt } from "react-icons/fa";
import { GiSandal } from "react-icons/gi";
import { PiPantsBold } from "react-icons/pi";
import { LiaShoePrintsSolid } from "react-icons/lia";
import { FaAngleRight, FaShirt } from "react-icons/fa6";
import { MdLanguage } from "react-icons/md";
import { useTranslation } from "react-i18next";
import "../Contexts/languageContext";
import { useLangContext } from "../Contexts/languageContext";

const Header: React.FC = () => {
    const { itemCount } = useCart();
    const navigate = useNavigate();
    const {setCurrentLang, currentLang} = useLangContext();
    const {t} = useTranslation();
    const [sidebar, setSidebar] =useState<boolean>(false);
    const [isPhone, setIsPhone] = useState<boolean>(false);

    useLayoutEffect(()=>{
        const handleResize = () => 
        {if(window.innerWidth<=800){
            setIsPhone(true)
        }else{
            setIsPhone(false)
        }}
        handleResize();
        addEventListener('resize', handleResize);
        return () =>{window.removeEventListener('resize', handleResize)}
    }, [window.innerWidth])

    useEffect(()=>{
        setSidebar(false)
    },[currentLang])

    const handleclick = (a:string) => {
        navigate(`${a}`)    };

    const butData = [
        {
            path :"/Home" ,
            icon : <FaHome/>,
            name: 'home' ,
            cName: 'text-nav',
        },
        {
            path : "/Shoes",
            icon : <LiaShoePrintsSolid/>,
            name: 'shoes',
            cName: 'text-nav',
        },
        {
            path : "/Sandals",
            icon : <GiSandal/>,
            name: 'sandals',
            cName: 'text-nav',
        },
        {
            path : "/Shirts",
            icon : <FaShirt/>,
            name: 'shirts',
            cName: 'text-nav',
        },
        {
            path : '/Pants',
            icon : <PiPantsBold/>,
            name: 'pants',
            cName: 'text-nav',
        },
    ]    
    

    return (
        <div    className="header-container border-bottom-5 shadow-sm" 
                style={{borderBottomColor:"#7baccb"}}
                >
        {isPhone?(<>
            <div className="navbar">
            <div className="icon-section">
                <a onClick={() => navigate("/Home")}>
                    <img className="icon1" src={icon1} alt="Icon" />
                </a>
            </div>
            <div className="sideBarIcon " onClick={()=>setSidebar(!sidebar)}>
                <div    className={sidebar?`sideBarIconLine1 active`:"sideBarIconLine1"}
                        onClick={()=>setSidebar(!sidebar)}></div>
                <div    className={sidebar?`sideBarIconLine2 active`:"sideBarIconLine2"}
                        onClick={()=>setSidebar(!sidebar)}></div>
                <div    className={sidebar?`sideBarIconLine3 active`:"sideBarIconLine3"}
                        onClick={()=>setSidebar(!sidebar)}></div>
            </div>
            <div className="SmallCart d-flex" onClick={()=>navigate("/YourCart")}>
                <FaShoppingCart className="SmallCartIcon" />
                <span className="rounded" style={{backgroundColor:'#0e92e4', color:"white", direction:'rtl'}}>
                {itemCount}</span>
            </div>
            <nav className={sidebar?"nav-menu active":"nav-menu"}>
                <ul className="nav-menu-items p-0">
                    <li className="text-nav text-nav-li langSelectorPhone justify-content-around">
                    <MdLanguage size={30}/>
                        <select className=""
                                onChange={(e)=>setCurrentLang(e.target.value)}
                                value={currentLang}
                                >
                            <option >
                                Français
                            </option>
                            <option >
                                العربية
                            </option>
                            <option >
                                English
                            </option>
                        </select>
                    </li>
                    <li className="text-nav text-nav-li" onClick={()=>{setSidebar(false);navigate('/YourCart')}}>
                    <Link to="#"
                            data-active={location.pathname=="/YourCart"?"true":"false"}>
                    <FaShoppingCart/>
                        <span className="nav-span">
                            {t('YourCart')} 
                        </span><span style={{fontSize:14}}>({itemCount})</span>
                    </Link>
                    </li>
                    {butData.map((item,index)=>{
                        return(
                            
                            <li key={index} className={item.cName} onClick={()=>{setSidebar(false);navigate(item.path);}}>
                                <Link to="#"
                                        data-active={location.pathname==item.path?"true":"false"}>
                                    {item.icon}
                                    <span className="nav-span">{t(item.name)}</span>
                                    <span className="nav-span-icon"><FaAngleRight /></span>
                                </Link>
                            </li>
                        )
                    })}

                </ul>
            </nav>
            </div>

        </>):(<>
            <div className="icon-section">
                <a onClick={() => navigate("/Home")}>
                    <img className="icon1" src={icon1} alt="Icon" />
                </a>
            </div>
            <button
                onClick={() => navigate("/YourCart")}
                className="btn rounded-pill border-cart btn-cart mt-1 me-1"
                style={{ outline: "none",zIndex: 20, fontSize:"1.3vw" }}
            >
                <FaShoppingCart className="cart-icon" style={{ marginRight: '2%' }} />
                {t('YourCart')}
                <p style={{ position: 'absolute', right: '2%', top: '18%' }}>({itemCount})</p>
            </button>
            <div className="header-buttons btn-group" style={{ position: 'absolute', left: '12%', }}>
                <div className="vertical-line mx-1 muted"></div>
                <button
                    onClick={() => {handleclick("/Home")}}
                    type="button"
                    className={`btn rounded btn-header  text-end `}
                    data-active={location.pathname=="/Home"|| location.pathname=="/"?"true":"false"}
                    
                >   
                    <FaHome className="btn-header-icon" /> {t('home')}
                </button>
                <div className="vertical-line mx-1 muted"></div>
                <button
                    onClick={() => {handleclick("/Shoes")}}
                    type="button"
                    className={`btn rounded btn-header text-end`}
                    data-active={location.pathname=="/Shoes"?"true":"false"}
                >
                    <LiaShoePrintsSolid className="btn-header-icon" /> {t('shoes')}
                </button>
                <div className="vertical-line mx-1"></div>
                <button
                    onClick={() => {handleclick("/Sandals")}}
                    type="button"
                    className={`btn rounded btn-header text-end `}
                    data-active={location.pathname=="/Sandals"?"true":"false"}
                >
                    <GiSandal className="btn-header-icon" /> {t('sandals')}
                </button>
                <div className="vertical-line mx-1"></div>
                <button
                    onClick={() => {handleclick("/Shirts")}}
                    type="button"
                    className={`btn rounded btn-header text-end`}
                    data-active={location.pathname=="/Shirts"?"true":"false"}
                >
                    <FaTshirt className="btn-header-icon" /> {t('shirts')}
                </button>
                <div className="vertical-line mx-1"></div>
                <button
                    onClick={() =>{handleclick("/Pants")}}
                    type="button"
                    className={`btn rounded btn-header text-end`}
                    data-active={location.pathname==""?"true":"false"}
                >
                    <PiPantsBold className="btn-header-icon" /> {t('pants')}
                </button>

                <div className="vertical-line mx-1 muted"></div>
            </div>
            <div className="LanguageSelector flex-column">
                <MdLanguage size={25}/>
                <select className=""
                        onChange={(e)=>setCurrentLang(e.target.value)}
                        value={currentLang}>
                    <option>
                        Français
                    </option>
                    <option>
                        العربية
                    </option>
                    <option>
                        English
                    </option>
                </select>
            </div>

        </>)}





        </div>
    );
};

export default Header;
