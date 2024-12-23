import React from "react";
import "../Styles/TextProductsDetails.css";


const Text : React.FC<{textFor : string}> = ({textFor}) => {

  // className={`shoe-category ${textFor=='classic'?textFor:'d-none'}`}
    
return(<>
<div className={`shoe-category ${textFor=='classic'?textFor:'d-none'}`}>
  <h2 className="category-title">Chaussure de Cuir Classique</h2>
  <ul className="category-description">
    <li>Élégance intemporelle et sophistication.</li>
    <li>Confectionnée avec du cuir de haute qualité.</li>
    <li>Disponible dans des couleurs sobres.</li>
    <li>Semelle en cuir ou en gomme pour plus de confort.</li>
    <li>Doublure intérieure en cuir pour un confort optimal.</li>
    <li>Idéale pour des occasions formelles ou professionnelles.</li>
  </ul>
</div>
<div className={`shoe-category ${textFor=='basket'?textFor:'d-none'}`}>
  <h2 className="category-title">Chaussure de Cuir Basket</h2>
  <ul className="category-description">
    <li>Combinaison de confort et robustesse du cuir.</li>
    <li>Design dynamique avec une allure décontractée.</li>
    <li>Semelle en caoutchouc pour une excellente adhérence.</li>
    <li>Idéale pour un usage quotidien ou un look décontracté.</li>
    <li>Convient aussi bien avec un jean qu’un pantalon casual.</li>
  </ul>
</div>
<div className={`shoe-category ${textFor=='medical'?textFor:'d-none'}`}>
  <h2 className="category-title">Chaussure de Cuir Médicale</h2>
  <ul className="category-description">
    <li>Soutien optimal et stabilité accrue.</li>
    <li>Semelle ergonomique et intérieur rembourré pour un confort maximal.</li>
    <li>Technologies comme des semelles orthopédiques amovibles.</li>
    <li>Conçue pour ceux qui passent de longues heures debout.</li>
    <li>Design sobre et fonctionnel adapté à un cadre médical.</li>
  </ul>
</div>
<div className={`shoe-category shadow ${textFor=='mocassin'?textFor:'d-none'}`}>
  <h2 className="category-title">Chaussure de Cuir Mocassin</h2>
  <ul className="category-description">
    <li>Confort et style décontracté.</li>
    <li>Fabriqué en cuir souple de qualité supérieure.</li>
    <li>Design slip-on sans lacets ni fermetures.</li>
    <li>Doublure intérieure en cuir ou tissu pour plus de confort.</li>
    <li>Semelle flexible en caoutchouc ou cuir.</li>
    <li>Parfait pour des occasions semi-formelles ou des journées relaxantes.</li>
  </ul>
</div>



</>)

};
export default Text;