import React from "react";
import img2 from "./assets1/image.png";
import img3 from "./assets1/image1.png";
import "./test.css";

const images = [img2, img3, img2];

const Test :React.FC = ()=> {
    return (
        <div id="carouselExampleCaptions" className="carousel carousel-dark slide crs-home" data-bs-ride="carousel" >
            <div className="carousel-indicators crs-home_butts">
                {images.map((_images, i)=>(
                    <button key={i} type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to={`${i}`}  className={i==0?"active":""} aria-current={i==0?"true":"false"} aria-label={`Slide ${i+1}`}></button>
                ))}
            </div>
            <div className="carousel-inner crs-inner-home" >
                {images.map((img, index)=>(
                    <div key = {index} 
                        className={index==0?"carousel-item active crs-item-home":"carousel-item crs-item-home"} 
                        data-bs-interval={`1500`}>
                        <img src={img} className="d-block w-100 crs-img" alt={`Slide ${index + 1}`} />
                    </div>                    
                ))}
            </div>
            <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="prev">
                <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                <span className="visually-hidden">Previous</span>
            </button>
            <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="next">
                <span className="carousel-control-next-icon" aria-hidden="true"></span>
                <span className="visually-hidden">Next</span>
            </button>
        </div>
    );
};

export default Test;
