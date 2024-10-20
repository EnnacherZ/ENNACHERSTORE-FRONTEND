import React, { useState, useEffect } from 'react';
import { CurrencyCode, YouCanPay,} from 'youcan-payment-nodejs-sdk';
import { useNavigate } from 'react-router-dom';

const PaymentComponent: React.FC = () => {
    const [amount, setAmount] = useState<number>(0);
    const [tokenId, setTokenId] = useState<string | null>(null);
    const [isScriptLoaded, setIsScriptLoaded] = useState<boolean>(false);
    const [isDisplayed, setIsDisplayed] =useState<boolean>(false)
    const navigate = useNavigate();

    useEffect(() => {
        const scriptId = 'ycpay-script';
        if (!document.getElementById(scriptId)) {
            const script = document.createElement('script');
            script.src = 'https://youcanpay.com/js/ycpay.js';
            script.async = true;
            script.onload = () => setIsScriptLoaded(true);
            script.id = scriptId;
            document.body.appendChild(script);
        } else {
            setIsScriptLoaded(true);
        }

        return () => {
            const existingScript = document.getElementById(scriptId);
            if (existingScript) {
                document.body.removeChild(existingScript);
            }
        };
    }, []);

    const handleTokenize = async () => {
        const youCanPayment = new YouCanPay('pri_sandbox_a54c2b28-f8e5-4920-a440-64003', true);

        try {
            const token = await youCanPayment.getToken({
                amount: 500,
                currency: CurrencyCode.MAD,
                customer_ip: '10.25.28.33',
                order_id: '112',
                success_url: 'https://google.com/',
                error_url: 'https://youtube.com/',
                customer: {
                    name: '',
                    address: '',
                    zip_code: '',
                    city: '',
                    state: '',
                    country_code: '',
                    phone: '',
                    email: '',
                },
            });

            setTokenId(token.id);
            setIsDisplayed(true)
        } catch (err) {
            console.error(err);
        }
    };

    useEffect(() => {
        const displayPayForm = () =>{
        if (isScriptLoaded && tokenId) {
            const ycPay = new YCPay('pub_sandbox_1bfc0387-7aea-49ab-b51e-930e5', {
                locale: 'en',
                isSandbox: true,
                errorContainer: '#error-container',
                formContainer: '#payment-container'
            });

            ycPay.renderCreditCardForm('default');
        
        
            const payButton = document.getElementById('pay');
            if (payButton) {
                const handlePayClick = () => {
                    ycPay.pay(tokenId)
                        .then(successCallback)
                        .catch(errorCallback);
                };

                // Retirer l'ancien gestionnaire d'événements pour éviter les duplications
                payButton.removeEventListener('click', handlePayClick);
                payButton.addEventListener('click', handlePayClick);
            }
        }
        setIsDisplayed(false);
        };
        if(isDisplayed){displayPayForm()}

    }, [isScriptLoaded, tokenId]);

    const successCallback = (response: any) => {
        console.log('Payment successful:', response);
        navigate("/Home");
    };

    const errorCallback = (response: any) => {
        console.error('Payment error:', response);
    };

    return (
        <div>
            <h1>Effectuer un paiement</h1>
            <h2>Token : {tokenId}</h2>
            <input
                type="number"
                value={amount}
                onChange={(e) => setAmount(Number(e.target.value))}
                placeholder="Montant"
            />
            <button onClick={handleTokenize} >Tokeniser le paiement</button>
            <button id="pay" disabled={!tokenId}>Payer</button>
            <div id="error-container"></div>
            <div id="payment-container"></div>
        </div>
    );
};

export default PaymentComponent;
