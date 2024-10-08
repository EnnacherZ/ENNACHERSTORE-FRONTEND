import React, { useEffect } from 'react';
import useScript from './funcycn';

interface YouCanPayProps {
  pubKey: string;
  tokenId: string;
}

const YouCanPay: React.FC<YouCanPayProps> = ({ pubKey, tokenId }) => {
  useScript('https://youcanpay.com/js/ycpay.js');

  useEffect(() => {
    const initPayment = () => {
      const ycPay = new (window as any).YCPay(pubKey, {
        formContainer: '#payment-container',
      });

      // Render the form
      ycPay.renderAvailableGateways();

      // Start the payment on button click
      document.getElementById('pay')?.addEventListener('click', function () {
        ycPay
          .pay(tokenId)
          .then((response: any) => {
            successCallback(response);
          })
          .catch((response: any) => {
            errorCallback(response);
          });
      });

      const successCallback = (response: any) => {
        console.log('Payment successful:', response);
        // Your success logic here
      };

      const errorCallback = (response: any) => {
        console.error('Payment error:', response);
        // Your error handling logic here
      };
    };

    if ((window as any).YCPay) {
      initPayment();
    } else {
      const script = document.querySelector(`script[src="https://youcanpay.com/js/ycpay.js"]`);
      script?.addEventListener('load', initPayment);
    }
  }, [pubKey, tokenId]);

  return (
    <div>
      <div id="error-container"></div>
      <div id="payment-container"></div>
      <button id="pay">Pay</button>
    </div>
  );
};

export default YouCanPay;
