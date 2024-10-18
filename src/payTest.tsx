import React, { useState, useEffect } from 'react';
import axios from 'axios';



const PaymentComponent: React.FC = () => {
    const [amount, setAmount] = useState<number>(0);
    const [tokenId, setTokenId] = useState();
    const [error, setError] = useState<string | null>(null);
    const [isScriptLoaded, setIsScriptLoaded] = useState<boolean>(false);

    useEffect(() => {
        // Charger le script YCPay dynamiquement
        const script = document.createElement('script');
        script.src = 'https://youcanpay.com/js/ycpay.js';
        script.async = true;
        script.onload = () => setIsScriptLoaded(true);
        document.body.appendChild(script);

        return () => {
            document.body.removeChild(script);
        };
    }, []);

    const handleTokenize = async () => {
        const url = 'https://youcanpay.com/api/tokenize';

        const data = {
            pri_key: 'pri_sandbox_a54c2b28-f8e5-4920-a440-64003',
            order_id: '12',
            amount: 500,
            currency: 'MAD',
            success_url: 'https://yourdomain.com/orders-status/success',
            error_url: 'https://yourdomain.com/orders-status/failed',
            
        };

        try {
            const result = await axios.post(url, data, {
                headers: {
                    'Accept': 'application/json',
                },
            });
            setTokenId(result.data.token.id);
            
        } catch (err) {
            console.log(err);
            setError('Erreur lors de la tokenisation du paiement.');
        }
    };

    useEffect(() => {
        if (isScriptLoaded && tokenId) {
            const ycPay = new YCPay('pub_sandbox_1bfc0387-7aea-49ab-b51e-930e5', {
                locale: 'en',
                isSandbox: true,
                errorContainer: '#error-container',
                formContainer: '#payment-container'
            });
            // render the payment methods
            ycPay.renderCreditCardForm('default')
            // Ajouter un gestionnaire d'événements pour le bouton de paiement
            const payButton = document.getElementById('pay');
            if (payButton) {
                payButton.addEventListener('click', function() {
                    ycPay.pay(tokenId)
                        .then(successCallback)
                        .catch(errorCallback);
                });
            }
        }
    }, [isScriptLoaded, tokenId]);

    const successCallback = (response: any) => {
        // Votre code ici pour gérer le succès
        console.log('Payment successful:', response);
    };

    const errorCallback = (response: any) => {
        // Votre code ici pour gérer l'erreur
        console.error('Payment error:', response);
    };
    console.log(tokenId)
    return (
        <div>
            <h1>Effectuer un paiement</h1>
            {error && <div style={{ color: 'red' }}>{error}</div>}
            <input
                type="number"
                value={amount}
                onChange={(e) => setAmount(Number(e.target.value))}
                placeholder="Montant"
            />
            <button onClick={handleTokenize}>Tokeniser le paiement</button>
            <button id="pay" disabled={!tokenId}>Payer</button> {/* Bouton de paiement */}
            <div id="error-container"></div>
            <div id="payment-container"></div>
        </div>
    );
};

export default PaymentComponent;
