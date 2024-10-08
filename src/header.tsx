import React, { useLayoutEffect, useState } from "react";
import { useCart } from "./cartContext";
import { Link, useNavigate } from "react-router-dom";
import "./header.css";
import icon1 from "./assets/icon3.svg";
import { FaBars, FaHome, FaShoppingCart, FaTshirt } from "react-icons/fa";
import { GiSandal } from "react-icons/gi";
import { PiPantsBold } from "react-icons/pi";
import { LiaShoePrintsSolid } from "react-icons/lia";
import { IoMdClose } from "react-icons/io";
import { FaAngleRight, FaShirt } from "react-icons/fa6";

const Header: React.FC = () => {
    const { itemCount } = useCart();
    const navigate = useNavigate();
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

    const handleclick = (a:string) => {
        navigate(`${a}`)    };

    const butData = [
        {
            path :"/Home" ,
            icon : <FaHome/>,
            name: 'Home' ,
            cName: 'text-nav',
        },
        {
            path : "/Shoes",
            icon : <LiaShoePrintsSolid/>,
            name: 'Shoes',
            cName: 'text-nav',
        },
        {
            path : "/Sandals",
            icon : <GiSandal/>,
            name: 'Sandals',
            cName: 'text-nav',
        },
        {
            path : "/Shirts",
            icon : <FaShirt/>,
            name: 'Shirts',
            cName: 'text-nav',
        },
        {
            path : '/Pants',
            icon : <PiPantsBold/>,
            name: 'Pants',
            cName: 'text-nav',
        },
    ]

    
    

    return (
        <div className="header-container border-bottom-5 shadow-sm" style={{borderBottomColor:"#7baccb"}}>
        {isPhone?(<>
            <div className="navbar">
            <div className="icon-section">
                <a onClick={() => navigate("/Home")}>
                    <img className="icon1" src={icon1} alt="Icon" />
                </a>
            </div>
            <div className="sideBarIcon d-flex align-items-center"><FaBars className="sideBarIconX" onClick={()=>setSidebar(true)}/></div>
            <div className="SmallCart d-flex" onClick={()=>navigate("/YourCart")}>
                <FaShoppingCart className="SmallCartIcon" />
                <span className="rounded" style={{backgroundColor:'#0e92e4', color:"white", direction:'rtl'}}>
                {itemCount}</span>
            </div>
            <nav className={sidebar?"nav-menu active":"nav-menu"}>
                <ul className="nav-menu-items p-0">
                    <li className="navbar-toggle ps-2" onClick={()=>setSidebar(false)}>
                        <Link to="#">
                            <IoMdClose className="toggleIcon"/>
                        </Link>
                    </li>
                    <hr className="me-4"/>
                    <li className="text-nav text-nav-li" onClick={()=>{setSidebar(false);navigate('/YourCart')}}>
                    <Link to="#"
                            data-active={location.pathname=="/YourCart"?"true":"false"}>
                    <FaShoppingCart/>
                        <span className="nav-span">
                            Your cart 
                        </span><span style={{fontSize:14}}>({itemCount})</span>
                    </Link>
                    </li>
                    {butData.map((item,index)=>{
                        return(
                            
                            <li key={index} className={item.cName} onClick={()=>{setSidebar(false);navigate(item.path);}}>
                                <Link to="#"
                                        data-active={location.pathname==item.path?"true":"false"}>
                                    {item.icon}
                                    <span className="nav-span">{item.name}</span>
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
                VOTRE PANIER
                <p style={{ position: 'absolute', right: '2%', top: '18%' }}>({itemCount})</p>
            </button>
            <div className="header-buttons btn-group" style={{ position: 'absolute', left: '15%', }}>
                <div className="vertical-line mx-1 muted"></div>
                <button
                    onClick={() => {handleclick("/Home")}}
                    type="button"
                    className={`btn rounded btn-header  text-end `}
                    data-active={location.pathname=="/Home"|| location.pathname=="/"?"true":"false"}
                    
                >   
                    <FaHome className="btn-header-icon" /> Accueil
                </button>
                <div className="vertical-line mx-1 muted"></div>
                <button
                    onClick={() => {handleclick("/Shoes")}}
                    type="button"
                    className={`btn rounded btn-header text-end`}
                    data-active={location.pathname=="/Shoes"?"true":"false"}
                >
                    <LiaShoePrintsSolid className="btn-header-icon" /> Shoes
                </button>
                <div className="vertical-line mx-1"></div>
                <button
                    onClick={() => {handleclick("/Sandals")}}
                    type="button"
                    className={`btn rounded btn-header text-end `}
                    data-active={location.pathname=="/Sandals"?"true":"false"}
                >
                    <GiSandal className="btn-header-icon" /> Sandals
                </button>
                <div className="vertical-line mx-1"></div>
                <button
                    onClick={() => {handleclick("/Shirts")}}
                    type="button"
                    className={`btn rounded btn-header text-end`}
                    data-active={location.pathname=="/Shirts"?"true":"false"}
                >
                    <FaTshirt className="btn-header-icon" /> Shirts
                </button>
                <div className="vertical-line mx-1"></div>
                <button
                    onClick={() =>{handleclick("/Pants")}}
                    type="button"
                    className={`btn rounded btn-header text-end`}
                    data-active={location.pathname==""?"true":"false"}
                >
                    <PiPantsBold className="btn-header-icon" /> Pants
                </button>
                <div className="vertical-line mx-1 muted"></div>
            </div>
        </>)}





        </div>
    );
};

export default Header;
