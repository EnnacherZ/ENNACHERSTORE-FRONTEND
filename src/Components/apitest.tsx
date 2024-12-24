import axios from 'axios';
import React, { useState } from 'react';


const Apitest : React.FC = () => {
    const [token, setToken] = useState<string>("");

    const getToken = async () =>{
        try{
            const respo = await axios.post('http://192.168.1.9:1011/api/getTokenhh');
        setToken(respo.data.token || '')
        console.log(respo.data)
        }catch(err){console.log(err)}
    }

    return(<>
    <div>
    <button onClick={()=>getToken()}>
            click here
        </button>

        <div className="fw-bold">{token}</div>
    </div>
        
    </>)
}
export default Apitest