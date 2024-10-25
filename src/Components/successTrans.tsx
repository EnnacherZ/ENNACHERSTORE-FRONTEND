import React from "react";
import { usePayment } from "../Contexts/paymentContext";
import icon from "../assets/iconlogblue.png";
import "../Styles/successTrans.css";
import { useNavigate } from "react-router-dom";

const SuccessTrans :React.FC = () => {
    const navigate = useNavigate();
    const {paymentResponse} = usePayment();



    console.log(paymentResponse)
    return(<>
        <div className="transHeader d-flex justify-content-center">
            <div className="transIconDiv mt-3" onClick={()=>navigate('/Home')}>
                <img src={icon} alt="" />
            </div>
        </div>
        <div className="transSuccMsg mt-3">
            Votre opération est effectué avec succés 👍
        </div>
        <div className="transDetailsTable mt-4">
            <table className="table table-hover table-bordred " style={{margin:'auto'}}>
                <thead>
                    <tr className="text-center">
                        <th className="text-muted">Transaction id</th>
                        <th className="text-muted">Order id</th>
                        <th className="text-muted">Code</th>
                    </tr>
                </thead>
                <tbody><tr className="text-center">
                    <td>{paymentResponse?.transaction_id}</td>
                    <td>{paymentResponse?.order_id}</td>
                    <td>{paymentResponse?.code}</td>
                </tr></tbody>
            </table>
        </div>
    </>)
};
export default SuccessTrans;